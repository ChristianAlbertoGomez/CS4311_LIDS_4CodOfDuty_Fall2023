import time, socket, defusedxml.ElementTree as ET
from scapy.all import sniff, sendp, rdpcap
from scapy.layers.inet import IP, TCP, UDP

#Global Variables
alert_id_counter = 0
alerts = []

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
    freqIP = {}
    
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
                    freqIP[dst_port] += 1
                except:
                    freqIP[dst_port] = 1
        elif packet.haslayer(UDP):
            try:
                freqIP[(dst_port, dst_port)] += 1
            except:
                freqIP[(dst_port, dst_port)] = 1
        
        for i in freqIP:
            if freqIP[i] > 10:
                create_alert(packet, 'high', 'Port scanning detected')
                
                #reset the value of the port and ip to 0
                freqIP[i] = 0

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
        sniff(iface=capture_interface, prn=lambda packet: analyze_packet(packet, system_info, host_ip), filter="tcp or udp")
    except KeyboardInterrupt:
        print("Capture stopped by the user.")
    except Exception as e:
        error_message = f"An error occurred during live traffic capture: {str(e)}"
        print(error_message)
        log_error(error_message)

def replay_pcap_file(pcap_file, capture_interface, system_info, host_ip):
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
        sendp(packets, iface=capture_interface, filter="tcp or udp")  # Apply filter

        for captured_packet in packets:
            try:
                analyze_packet(captured_packet, system_info, host_ip)
            except AttributeError as e:
                error_message = f"An error occurred during packet analysis: {str(e)}"
                log_error(error_message)
    except Exception as e:
        error_message = f"An error occurred during PCAP file replay: {str(e)}"
        print(error_message)
        log_error(error_message)

def sniff_traffic(system_info):
    """
    Allows the user to choose between capturing live network traffic or replaying a packet capture file.
    Args:
        system_info (dict): A dictionary containing information about the system, such as whitelist IPs and system ports.
    Returns:
        None
    """
    print("Select an option:")
    print("1. Capture Live Traffic")
    print("2. Replay Packet Capture File")
    choice = input()

    if choice == "1":
        capture_interface = input("Enter the capture interface: ")
        sniff_live_traffic(capture_interface, system_info, '10.0.0.3')
    elif choice == "2":
        pcap_file = input("Enter the path to the PCAP file: ")
        capture_interface = input("Enter the capture interface for replay: ")
        replay_pcap_file(pcap_file, capture_interface, system_info, '10.0.0.3')
    else:
        error_message = "Invalid choice."
        print(error_message)
        log_error(error_message)
        
def connect_server(server_info: dict, system_info: dict):
    # try:
        #Testing purposes only
        # server_address = (get_current_ip(), int(server_info['port']))
        
        # Create a socket connection to the server
        # server_address = (server_info['ip'], int(server_info['port']))
        # connection_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # connection_socket.connect(server_address)

    # Start sniffing traffic
    # capture_interface = 'Wi-Fi'
    sniff_traffic(system_info)

    # except socket.error as e:
    #     print("Error connecting to the server:", str(e))
        
def get_alerts():
    return alerts

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
    alert_id_counter += 1
    alert_id = alert_id_counter
    
    protocol, src_port, dst_port, payload = get_protocol_info(packet)
    
    # Create a Zulu (UTC) format timestamp
    timestamp = create_zulu_timestamp()
    
    if severity == 'low':
        res = {
            'alert_id': alert_id,
            'level': 'Low',
            'time': timestamp,
            'src_port': src_port,
            'dst_port': dst_port,
            'description': src_port + ' -> ' + dst_port,
            'src_ip': packet[IP].src,
            'dst_ip': packet[IP].dst,
            'reason': description,
        }
    if severity == 'med':
        res = {
            'alert_id': alert_id,
            'level': 'Medium',
            'time': timestamp,
            'src_port': src_port,
            'dst_port': dst_port,
            'description': src_port + ' -> ' + dst_port,
            'src_ip': packet[IP].src,
            'dst_ip': packet[IP].dst,
            'reason': description,
        }
    if severity == 'high':
        res = {
            'alert_id': alert_id,
            'level': 'High',
            'time': timestamp,
            'src_port': src_port,
            'dst_port': dst_port,
            'description': src_port + ' -> ' + dst_port,
            'src_ip': packet[IP].src,
            'dst_ip': packet[IP].dst,
            'reason': description,
        }
    
    alerts.append(res)