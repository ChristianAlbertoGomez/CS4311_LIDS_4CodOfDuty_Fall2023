import json, time, socket, threading, tabulate, defusedxml.ElementTree as ET
from scapy.all import sniff, sendp, rdpcap
from scapy.layers.inet import IP, TCP, UDP

#Global Variables
alert_id_counter = 0
lidsd_socket = None
alerts = []
freq_ip = {}

# Simple encryption key used for testing 
encryption_key = 0x5A

def log_error(error_message):
    """
    Logs an error message to the 'error_log.db' file.
    Args:
        error_message (str): The error message to be logged.
    Returns:
        None
    """
    with open('error_log.db', 'a') as error_log_file:
        error_log_file.write(error_message + '\n')

def get_current_ip() -> str:
    """
    Retrieves the current system's IP address.
    Returns:
        str: The current system's IP address as a string, or None if an error occurs.
    """
    try:
        ip_address = socket.gethostbyname(socket.gethostname())
        return ip_address
    except socket.error as e:
        error_message = f"Error determining the current system's IP address: {str(e)}"
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
            'port': server_element.findtext('port'),
            'nic': server_element.findtext('nic'),
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
    current_ip = get_current_ip()
    print(f"Current IP is {current_ip}")
    current_ip = "10.0.0.3"  # For testing purposes

    if current_ip in net_systems:
        return server_info, net_systems, net_systems[current_ip]
    else:
        error_message = "Error matching host to configuration file"
        print(error_message)
        log_error(error_message)
        return None, None, None
    
def print_config_details(server_info: dict, net_systems: dict):
    """
    Prints the server information and network system information based on the provided dictionaries.
    It also compares the current IP with the IP addresses in the network systems and indicates if there is a match.

    Args:
        server_info (dict): A dictionary containing the server information, including the IP address, port, and NIC.
        net_systems (dict): A dictionary containing the network system information, including the IP address, name, MAC address, and ports.

    Returns:
        None
    """
    # Simulate getting the current IP
    current_ip = get_current_ip()
    print(f"Current IP is {current_ip}")
    current_ip = "10.0.0.3"  # For testing purposes
    
    # Print server information
    print("Server Information:")
    print(f"Server IP: {server_info.get('ip', 'N/A')}")
    print(f"Server Port: {server_info.get('port', 'N/A')}")
    print(f"Server NIC: {server_info.get('nic', 'N/A')}")
    print()

    # Print network system information
    print("Network Systems:")
    for ip, system in net_systems.items():
        print(f"System IP: {ip}")
        print(f"System Name: {system.get('name', 'N/A')}")
        print(f"System MAC: {system.get('mac', 'N/A')}")
        print(f"System Ports: {', '.join(system.get('ports', []))}")
        
        print(f"{ip} == {current_ip}")
        if ip == current_ip:
            print("This system matches the host system.")
        
        print()

def get_protocol_info(packet):
    """
    Extracts information about the protocol, source port, destination port, and payload from a network packet.

    Args:
        packet (object): The network packet object to extract information from.

    Returns:
        tuple: A tuple containing the protocol number (int), source port (str), destination port (str), and payload (bytes).
    """
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
    if IP in packet and packet[IP].dst == host_ip:
        src_ip, dst_ip = packet[IP].src, packet[IP].dst
        protocol, src_port, dst_port, payload = get_protocol_info(packet)

        # Check if packet is in whitelist
        if src_ip not in system_info.get('whitelist', []):
            create_alert(packet, 'low', 'Source IP is not in whitelist')

        # Check if port number is in system port list
        if dst_port not in system_info.get('ports', []):
            create_alert(packet, 'low', 'Packet read in an unknown port')

        # Check for SSH failed login attempts from whitelisted and non-whitelisted IP addresses
        if (src_port == 22) and 'SSH' in payload:
            if src_ip in system_info.get('whitelist', []):
                if 'Permission denied' in payload:
                    create_alert(packet, 'med', 'Failed login attempt from whitelisted IP')
            else:
                if 'Permission denied' in payload:
                    create_alert(packet, 'high', 'Failed login attempt from non-whitelisted IP')

        # Check for RDP failed login attempts from whitelisted and non-whitelisted IP addresses
        if (src_port == 3389) and 'RDP' in payload:
            if src_ip in system_info.get('whitelist', []):
                if 'Failed login' in payload:
                    create_alert(packet, 'med', 'Failed login attempt from whitelisted IP')
                else:
                    if 'Failed login' in payload:
                        create_alert(packet, 'high', 'Failed login attempt from non-whitelisted IP')

        # Check for FTP failed login attempts from whitelisted and non-whitelisted IP addresses
        if (src_port == 21) and 'FTP' in payload:
            if src_ip in system_info.get('whitelist', []):
                if '530 Login incorrect' in payload:
                    create_alert(packet, 'med', 'Failed login attempt from whitelisted IP')
            else:
                if '530 Login incorrect' in payload:
                    create_alert(packet, 'high', 'Failed login attempt from non-whitelisted IP')

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
                create_alert(packet, 'high', 'Port scanning detected')
                
                # Reset the value of the port and IP to 0
                freq_ip[key] = 0

# Inside the sniff_live_traffic function, add host_ip as an argument:
def sniff_live_traffic(capture_interface, system_info, host_ip):
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
        # Define a custom function to analyze packets and filter for TCP and UDP
        def custom_analyze(packet):
            if IP in packet:
                protocol = packet[IP].proto
                if protocol in [6, 17]:  # TCP or UDP
                    analyze_packet(packet, system_info, host_ip)

        print("Capturing live traffic...")
        sniff(iface=capture_interface, prn=custom_analyze)
    except KeyboardInterrupt:
        print("Capture stopped by the user.")
    except Exception as e:
        error_message = f"An error occurred during live traffic capture: {str(e)}"
        print(error_message)
        log_error(error_message)

def replay_pcap_in_background(pcap_file, capture_interface, system_info, host_ip):
    """
    Replays a packet capture file by sending the captured packets to a specified network interface for analysis.
    Args:
        pcap_file (str): The path to the packet capture file.
        capture_interface (str): The name of the network interface to replay the packets on.
        system_info (dict): A dictionary containing information about the system, such as whitelist IPs and system ports.
    Returns:
        None
    Raises:
        Exception: If an error occurs during PCAP file replay.
    """
    try:
        packets = rdpcap(pcap_file)
        for captured_packet in packets:
            try:
                analyze_packet(captured_packet, system_info, host_ip)
                time.sleep(1)
                sendp(captured_packet, iface=capture_interface, filter='tcp or udp', timeout=2)
            except Exception as e:
                # Log the exception
                log_error(f"Error sending packet: {str(e)}")
    except Exception as e:
        # Log the exception
        log_error(f"Error reading PCAP file: {str(e)}")

def sniff_traffic(analysis_method: int, capture_interface: str, pcap_file, system_info: dict):
    """
    Allows the user to choose between capturing live network traffic or replaying a packet capture file.
    Args:
        system_info (dict): A dictionary containing information about the system, such as whitelist IPs and system ports.
    Returns:
        None
    """
    if analysis_method == "1":
        sniff_live_traffic(capture_interface, system_info, '10.0.0.3')
    elif analysis_method == "2":
        replay_pcap_in_background(pcap_file, capture_interface, system_info, '10.0.0.3')
    else:
        error_message = "Invalid choice."
        print(error_message)
        log_error(error_message)
        
def connect_to_lidsd(server_info):
    """
    Connects to a LIDS-D server using a socket.
    Args:
        server_info (dict): A dictionary containing the IP address and port number of the LIDS-D server.
    Returns:
        None
    Raises:
        socket.error: If there is an error connecting to the LIDS-D server.

    """
    global lidsd_socket
    try:
        print("Connecting to LIDS-D Server...")
        lidsd_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        lidsd_socket.connect((get_current_ip(), int(server_info['port'])))
        print("Connected to LIDS-D Server")
    except socket.error as e:
        print("Error connecting to LIDS-D server:", str(e))

def encrypt_alert(alert):
    """
    Encrypt an alert using XOR encryption.
    Args:
        alert (dict): The alert data to be encrypted.
    Returns:
        bytes: The encrypted alert.
    """
    alert_string = str(alert)
    encrypted_alert = []
    for char in alert_string:
        encrypted_char = ord(char) ^ encryption_key
        encrypted_alert.append(encrypted_char)
    encrypted_alert_bytes = bytes(encrypted_alert)
    return encrypted_alert_bytes
    
def send_alert_to_lidsd(alert):
    """
    Sends an alert to the LIDS-D server.
    Args:
        alert (object): The alert object containing the information about the alert.
    Raises:
        Exception: If there is an error sending the alert to LIDS-D.
    Returns:
        None
    """
    global lidsd_socket
    if lidsd_socket:
        try:
            encrypted_alert = encrypt_alert(alert)
            lidsd_socket.send(encrypted_alert)
        except Exception as e:
            print("Error sending alert to LIDS-D:", str(e))
        
def get_alerts():
    """
    Returns a copy of the alerts list.
    Returns:
        List
    """
    return alerts  # Return a copy of the alerts list

def create_zulu_timestamp():
    """
    Returns the current timestamp in Zulu (UTC) format.
    Returns:
        Timestamp
    """
    gmtime = time.gmtime()
    timestamp = "{:04d}-{:02d}-{:02d}T{:02d}:{:02d}:{:02d}Z".format(
        gmtime.tm_year, gmtime.tm_mon, gmtime.tm_mday,
        gmtime.tm_hour, gmtime.tm_min, gmtime.tm_sec
    )
    return timestamp

def create_alert(packet, severity, description):
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
    alert_id = alert_id_counter
    
    protocol, src_port, dst_port, payload = get_protocol_info(packet)
    
    # Create a Zulu (UTC) format timestamp
    timestamp = create_zulu_timestamp()
    
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

def export_alerts(alerts, format):
    """
    Exports alerts to different formats (XML, JSON, CSV) based on the specified format parameter.
    Args:
        alerts (list): A list of dictionaries representing the alerts to be exported. Each dictionary contains the alert details such as level, time, port, description, IP source, IP destination, date, and details.
        format (str): The format in which the alerts should be exported. It can be 'xml', 'json', or 'csv'.
    Returns:
        None
    Raises:
        None
    """
    if format.lower() == 'xml':
        root = ETE.Element("root")

        for alert in alerts:
            alertElement = ETE.SubElement(root, "alert")
            for i, j in alert.items():
                ETE.SubElement(alertElement, i).text = str(j)
        xmlstr = minidom.parseString(ETE.tostring(root)).toprettyxml(indent="   ")
        with open("alerts.xml", "w") as f:
            f.write(xmlstr)
            f.close()
    elif format.lower() == 'json':
        x = json.dumps(alerts, indent=4)

        with open('alerts.json', 'w') as outfile:
            outfile.write(x)
            outfile.close()
    elif format.lower() == 'csv':
        header = ['level', 'time', 'port', 'description', 'ipSource', 'ipDestination', 'date', 'details']

        with open('alerts.csv', 'w') as f:
            f.write(','.join(header) + '\n')
            for alert in alerts:
                for i, j in alert.items():
                    f.write(str(j) + ',')
                f.write('\n')
    else:
        print('Invalid format')