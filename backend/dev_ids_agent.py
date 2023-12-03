import csv, json, os, time, socket, netifaces, threading, tabulate, defusedxml.ElementTree as ET
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from scapy.all import sniff, sendp, rdpcap
from scapy.layers.inet import IP, TCP, UDP
from xml.dom import minidom

#Global Variables
alert_id_counter = 0
lidsd_socket = None
alerts = []
freq_ip = {}

# Maximum size of alerts list in gigabits
MAX_ALERTS_SIZE_GB = 2

# Path to the folder for saving pcap files
SAVE_FOLDER = 'saved_pcap_files'

# AES encryption key used for testing
encryption_key = b'0123456789ABCDEF'

def log_error(error_message):
    """
    Logs an error message to the 'error_log.db' file.
    Args:
        error_message (str): The error message to be logged.
    Returns:
        None
    """
    with open('lids_backend_error_log.db', 'a') as error_log_file:
        error_log_file.write(error_message + '\n')
        
# DEMO ONLY
def get_current_ip(interface: str) -> str:
    """
    Retrieves the IP address of a specific network interface.
    
    Args:
        interface (str): The name of the network interface (e.g., 'eth0', 'wlan0').

    Returns:
        str: The IP address of the specified network interface, or None if an error occurs.
    """
    try:
        ip_address = netifaces.ifaddresses(interface)[netifaces.AF_INET][0]['addr']
        return ip_address
    except (KeyError, IndexError, netifaces.error) as e:
        error_message = f"Error determining the IP address of interface '{interface}': {str(e)}"
        print(error_message)
        log_error(error_message)
        return None

def ingest_config(config: str):
    """
    Reads and parses an XML configuration file to extract information about the server, network systems, and the current IP address.
    Args:
        config (str): The path to the XML configuration file.
    Returns:
        tuple: A tuple containing three dictionaries:
            - server_info (dict): A dictionary containing the server information extracted from the XML file.
            - net_systems (dict): A dictionary containing the network system information extracted from the XML file.
            - current_system (dict): A dictionary containing the information of the current system based on the current IP address.
    """
    server_info = {}
    net_systems = {}
    current_ip = None

    try:
        with open(config, 'r') as file:
            tree = ET.parse(file)
            root = tree.getroot()
            if root is None:
                error_message = "Empty or invalid XML file."
                print(error_message)
                log_error(error_message)
                return server_info, net_systems, None
    except FileNotFoundError:
        error_message = "File not found."
        print(error_message)
        log_error(error_message)
        return server_info, net_systems, None
    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        print(error_message)
        log_error(error_message)
        return server_info, net_systems, None

    server_element = root.find('.//server')
    if server_element is not None:
        server_info = {
            'ip': server_element.findtext('ip'),
            'mac': server_element.findtext('mac'),
            'port': server_element.findtext('port'),
        }

    system_elements = root.findall('.//network/system')
    for system in system_elements:
        system_dict = {
            'name': system.findtext('name'),
            'mac': system.findtext('mac'),
            'ports': system.findtext('ports').split(','),
        }
        whitelist_element = system.find('whitelist')
        if whitelist_element is not None:
            system_dict['whitelist'] = [ip.text for ip in whitelist_element]  # Extract whitelist IPs

        system_ip = system.findtext('ip')
        net_systems[system_ip] = system_dict

    # Simulate getting the current IP
    interface_name = 'eth0' 
    current_ip = get_current_ip(interface_name)
    print(f"Current IP is {current_ip}")

    if current_ip in net_systems:
        return server_info, net_systems, net_systems[current_ip]
    else:
        error_message = "Error matching host to configuration file"
        print(error_message)
        log_error(error_message)
        return None, None, None
    
def print_config_details(server_info: dict, net_systems: dict):
    interface_name = 'eth0' 
    current_ip = get_current_ip(interface_name)
    print(f"Current IP is {current_ip}\n")
    
    # Print server information
    print("Server Information:")
    print(f"Server IP: {server_info.get('ip', 'N/A')}")
    print(f"Server MAC Address: {server_info.get('mac', 'N/A')}")
    print(f"Server Port: {server_info.get('port', 'N/A')}\n")

    # Print network system information
    print("Network Systems:")
    for ip, system in net_systems.items():
        if ip == current_ip:
            print("*** This system matches the host system ***")
        print(f"System IP: {ip}")
        print(f"System Name: {system.get('name', 'N/A')}")
        print(f"System MAC: {system.get('mac', 'N/A')}")
        print(f"System Ports: {', '.join(system.get('ports', []))}\n")

# Extract protocol information from the captured packet
def get_protocol_info(packet):
    protocol = packet[IP].proto
    src_port, dst_port, payload = None, None, None
    
    if protocol == 6 and TCP in packet:  # TCP
        src_port = packet[TCP].sport
        dst_port = packet[TCP].dport
        payload = packet[TCP].payload
    elif protocol == 17 and UDP in packet:  # UDP
        src_port = packet[UDP].sport
        dst_port = packet[UDP].dport
        payload = packet[UDP].payload
        
    # Convert src_port and dst_port to strings
    src_port_str = str(src_port) if src_port is not None else "Unknown"
    dst_port_str = str(dst_port) if dst_port is not None else "Unknown"
    
    return protocol, src_port_str, dst_port_str, payload
  
# Save alerts locally once MAX_ALERTS_SIZE_GB is reached 
def save_alerts_to_json():
    global alerts
    if not os.path.exists(SAVE_FOLDER):
        os.makedirs(SAVE_FOLDER)

    # Save the alerts list to a JSON file
    json_file_path = os.path.join(SAVE_FOLDER, f'alerts_{time.strftime("%Y%m%d%H%M%S")}.json')
    with open(json_file_path, 'w') as file:
        json.dump(alerts, file, indent=4)

    print(f'Alerts saved to {json_file_path}')

def analyze_packet(packet, system_info, host_ip):
    """
    Analyzes inbound network packets and checks for various conditions, such as whether the source IP is in the whitelist, whether the destination port is in the system's port list, and whether there are any failed login attempts for specific protocols. It creates alerts based on the analysis results.
    Args:
        packet (object): The network packet object to be analyzed.
        system_info (dict): A dictionary containing information about the system, including the whitelist of IP addresses and the list of system ports.
        host_ip (str): The IP address of the host system.
    Returns:
        None
    """
    global alerts 
    
    # Add a check to ignore packets sent by the LIDS_D server
    if packet.haslayer(IP) and packet[IP].src == '10.0.0.160':
        return
        
    if packet.haslayer(IP) and packet[IP].dst == host_ip:
        src_ip, dst_ip = packet[IP].src, packet[IP].dst
        protocol, src_port, dst_port, payload = get_protocol_info(packet)

        # Check if packet is in whitelist
        if src_ip not in system_info.get('whitelist', []):
            create_alert(packet, 'low', 'Source IP is not in whitelist', system_info)

        # Check if port number is in system port list
        if dst_port not in system_info.get('ports', []):
            create_alert(packet, 'low', 'Packet read in an unknown port', system_info)

        # Check for SSH failed login attempts from whitelisted and non-whitelisted IP addresses
        if (src_port == 22) and 'SSH' in payload:
            if src_ip in system_info.get('whitelist', []):
                if 'Permission denied' in payload:
                    create_alert(packet, 'med', 'Failed login attempt from whitelisted IP', system_info)
            else:
                if 'Permission denied' in payload:
                    create_alert(packet, 'high', 'Failed login attempt from non-whitelisted IP', system_info)

        # Check for RDP failed login attempts from whitelisted and non-whitelisted IP addresses
        if (src_port == 3389) and 'RDP' in payload:
            if src_ip in system_info.get('whitelist', []):
                if 'Failed login' in payload:
                    create_alert(packet, 'med', 'Failed login attempt from whitelisted IP', system_info)
                else:
                    if 'Failed login' in payload:
                        create_alert(packet, 'high', 'Failed login attempt from non-whitelisted IP', system_info)

        # Check for FTP failed login attempts from whitelisted and non-whitelisted IP addresses
        if (src_port == 21) and 'FTP' in payload:
            if src_ip in system_info.get('whitelist', []):
                if '530 Login incorrect' in payload:
                    create_alert(packet, 'med', 'Failed login attempt from whitelisted IP', system_info)
            else:
                if '530 Login incorrect' in payload:
                    create_alert(packet, 'high', 'Failed login attempt from non-whitelisted IP', system_info)
                    
        if packet.haslayer(TCP):
            if packet[TCP].flags == 'S':
                try:
                    freq_ip['dst_port'] += 1
                except:
                    freq_ip['dst_port'] = 1
        elif packet.haslayer(UDP):
            try:
                freq_ip['dst_port'] += 1
            except:
                freq_ip['dst_port']= 1
        
        for key, val in freq_ip.items():
             if val > 10:
                 create_alert(packet, 'high', 'Port scanning detected', system_info)
                 
                 # Reset the value of the port and IP to 0
                 freq_ip[key] = 0
                 
        # Check if the size of alerts list has reached 2 gigabits
        alerts_size_gb = sum(len(json.dumps(alert)) for alert in alerts) * 8e-9
        if alerts_size_gb >= MAX_ALERTS_SIZE_GB:
            save_alerts_to_json()
            alerts = []  # Reset the alerts list

# Sniff traffic on the network and send captured packets to the analyze packet function
def sniff_traffic(capture_interface, system_info):
    """
    Capture live inbound network traffic on a specified interface and analyze each packet.
    Args:
        capture_interface (str): The name of the network interface to capture traffic from.
        system_info (dict): A dictionary containing information about the system, such as whitelist IPs and system ports.
        host_ip (str): The IP address of the host system.
    Returns:
        None
    Raises:
        KeyboardInterrupt: If the user stops the capture.
        Exception: If an error occurs during live traffic capture.
    """
    try:
        print("Capturing live traffic...")
        interface_name = 'eth0' 
        host_ip = get_current_ip(interface_name)
        packet = sniff(iface=capture_interface, filter="tcp or udp", prn=lambda pkt: analyze_packet(pkt, system_info, host_ip))
    except KeyboardInterrupt:
        print("Capture stopped by the user.")
    except Exception as e:
        error_message = f"An error occurred during live traffic capture: {str(e)}"
        print(error_message)
        log_error(error_message)
        
def connect_to_lidsd(server_info, system_info, user_interface):
    global lidsd_socket
    try:
        if user_interface == 'c':
            print("Connecting to LIDS-D Server...")
            
        lidsd_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # Create a socket for connection to LIDS-D
        lidsd_socket.connect((server_info['ip'], int(server_info['port'])))  # Attempt to connect to LIDS-D server
        
        if user_interface == 'c':
            print("Connected to LIDS-D Server")
            
        elif user_interface == 'g':
            sniff_traffic('eth0', system_info)
        
    except socket.error as e:
        error_message = f"Error connecting to LIDS-D server: {str(e)}"
        if user_interface == 'c':
            print(error_message)
        log_error(error_message)
        
def disconnect_from_lidsd(user_interface):
    try:
        if user_interface == 'c':
            print("Disconnecting from LIDS-D Server...")
            
        lidsd_socket.shutdown(socket.SHUT_RDWR)  # Shutdown both read and write
        lidsd_socket.close()  # Close the socket to LIDS-D
        
        if user_interface == 'c':
            print("Disconnected from the LIDS-D server")
    except Exception as e:
        error_message = f"Error disconnecting from the LIDS-D server: {str(e)}"
        if user_interface == 'c':
            print(error_message)
        log_error(error_message)

def encrypt_alert(alert):
    """
    Encrypt an alert using AES encryption.
    Args:
        alert (dict): The alert data to be encrypted.
    Returns:
        bytes: The encrypted alert.
    """
    alert_json = json.dumps(alert, indent=None, separators=(',', ':'))
    backend = default_backend()
    cipher = Cipher(algorithms.AES(encryption_key), modes.CFB(b'\0' * 16), backend=backend)
    encryptor = cipher.encryptor()
    encrypted_alert = encryptor.update(alert_json.encode('utf-8')) + encryptor.finalize()
    return encrypted_alert
    
def send_alert_to_lidsd(alert):
    global lidsd_socket
    
    # If there is a connection to LIDS-D server send encrypted alert to server
    if lidsd_socket:
        try:
            encrypted_alert = encrypt_alert(alert)  # Encrypt alert packet
            lidsd_socket.send(encrypted_alert)  # Send encrypted alert to LIDS-D
        except Exception as e:
            print("Error sending alert to LIDS-D:", str(e))
        
def get_alerts():
    return alerts  # Return a copy of the alerts list

def create_zulu_timestamp():
    """
    Returns the current timestamp in Zulu (UTC) format.
    """
    gmtime = time.gmtime()
    timestamp = "{:04d}-{:02d}-{:02d}T{:02d}:{:02d}:{:02d}Z".format(
        gmtime.tm_year, gmtime.tm_mon, gmtime.tm_mday,
        gmtime.tm_hour, gmtime.tm_min, gmtime.tm_sec
    )
    return timestamp

def create_alert(packet, severity, description, system_info):
    """
    Creates an alert based on the information extracted from a packet.
    Args:
        packet (object): The packet object containing the network traffic information.
        severity (str): The severity level of the alert ('low', 'med', or 'high').
        description (str): A description of the alert.
    Returns:
        None
    """
    global alert_id_counter
    global alerts
    alert_id_counter += 1
    alert_id = f"{system_info['name']}:{alert_id_counter}"
    
    # Retrieve necessary information from the malicious packet
    protocol, src_port, dst_port, payload = get_protocol_info(packet)
    
    # Create a Zulu (UTC) format timestamp
    timestamp = create_zulu_timestamp()
    
    # Create alert object to store malicious packet information
    alert = {
        'alert_id': alert_id,
        'level': severity,
        'time': timestamp,
        'src_port': src_port,
        'dst_port': dst_port,
        'description': src_port + ' -> ' + dst_port,
        'src_ip': packet[IP].src,
        'dst_ip': packet[IP].dst,
        'reason': description,
    }
    alerts.append(alert) # Add the new alert to the list
    send_alert_to_lidsd(alert) # Send alert to LIDS-D server
    
def export_alerts(alerts: list, file_type: str):
    if file_type == 'xml':
        
        root = ET.Element("root")

        for alert in alerts:
            alertElement = ET.SubElement(root, "alert")
            for i, j in alert.items():
                ET.SubElement(alertElement, i).text = str(j)
        xmlstr = minidom.parseString(ET.tostring(root)).toprettyxml(indent="   ")
        with open("alerts.xml", "w") as f:
            f.write(xmlstr)
            f.close()
    elif file_type == 'json':
        # Convert the list of alerts to a JSON-formatted string with indentation
        alert_data = json.dumps(alerts, indent=4)
        
        # Write the JSON data to an 'alerts.json' file
        with open('alerts.json', 'w') as file:
            file.write(alert_data)
    elif file_type == 'csv':
        # Define the headers for the CSV file
        headers = ['Alert ID', 'Level', 'Time', 'Src Port', 'Dest Port', 'Port Description', 'Src IP', 'Dest IP', 'Alert Description']

        # Extract alert data into a list of dictionaries
        alerts_data = [
            {
                'Alert ID': alert['alert_id'],
                'Level': alert['level'],
                'Time': alert['time'],
                'Src Port': alert['src_port'],
                'Dest Port': alert['dst_port'],
                'Port Description': alert['description'],
                'Src IP': alert['src_ip'],
                'Dest IP': alert['dst_ip'],
                'Alert Description': alert['reason']
            }
            for alert in alerts
        ]

        # Create a CSV file and write the alerts to it
        with open('alerts.csv', 'w', newline='') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=headers)
            writer.writeheader()
            writer.writerows(alerts_data)
