import pyshark, socket, defusedxml.ElementTree as ET
from flask import Flask, request, jsonify
from sys import exit, argv

# STIGFile
# CONFIG_FILE
# malicious_packets
# alert_list
# SERVER_ADDRESS
# alert

def get_current_ip() -> str:
    """
    Retrieves the current system's IP address.
    Returns:
        The current system's IP address as a string.
    """
    try:
        # Get the IP address using the hostname
        ip_address = socket.gethostbyname(socket.gethostname())
    
        return ip_address
    except socket.error as e:
        print(f"Error determining the current system's IP address: {str(e)}")
        return None

def ingest_config(config: str):
    """
    Parse the given XML configuration file and extract server information and network system information.
    Args:
        config: A string representing the path to the XML configuration file.
    Returns:
        A tuple containing the server information dictionary, the network system information dictionary,
        and the current system's information dictionary.
    """
    server_info = {}
    net_systems = {}

    try:
        # Parse the XML file using a context manager
        with open(config, 'r') as file:
            tree = ET.parse(file)  # Parse the XML file
            root = tree.getroot()  # Get the root element of the XML tree
            if root is None:
                print("Empty or invalid XML file.")  # Handle an empty or invalid XML file
                return server_info, net_systems, None
    except FileNotFoundError:
        print("File not found.")  # Handle file not found
        return server_info, net_systems, None
    except Exception as e:
        print("An error occurred:", str(e))  # Handle other exceptions
        return server_info, net_systems, None

    # Extract server information from the XML
    server_element = root.find('.//server')
    if server_element is not None:
        server_info = {
            'ip': server_element.findtext('ip'),  # Extract server IP
            'port': server_element.findtext('port'),  # Extract server port
            'nic': server_element.findtext('nic'),  # Extract server NIC
        }

    # Extract network system information from the XML
    system_elements = root.findall('.//network/system')
    for system in system_elements:
        system_dict = {
            'name': system.findtext('name'),  # Extract system name
            'mac': system.findtext('mac'),  # Extract system MAC address
            'ports': system.findtext('ports').split(','),  # Extract and split system ports
        }
        whitelist_element = system.find('whitelist')
        if whitelist_element is not None:
            system_dict['whitelist'] = [ip.text for ip in whitelist_element]  # Extract whitelist IPs

        system_ip = system.findtext('ip')  # Extract system IP
        net_systems[system_ip] = system_dict  # Store system information in a dictionary

    # Simulate getting the current IP 
    current_ip = get_current_ip()
    print(f"Current IP is {current_ip}")
    current_ip = "10.0.0.2" # For testing purposes

    # Use the actual current_ip value here
    if current_ip in net_systems:
        return server_info, net_systems, net_systems[current_ip]  # Return server, network systems, and current system info
    else:
        print("Error matching host to configuration file")  # Handle the case where the current IP is not found
        return server_info, net_systems, None

def create_packet(packet):
    """
    Creates a packet object by extracting the header information and payload data from a given packet.
    Args:
        packet (object): The captured packet object.
    Returns:
        dict: A dictionary representing the created packet, containing the header information and payload data.
    """
    # Determine the transport layer protocol (e.g., TCP or UDP)
    protocol = packet.transport_layer

    # Extract source and destination addresses, ports, timestamp, and payload length
    srcAddress = packet.ip.src  # Source IP address
    srcPort = packet[protocol].srcport  # Source port
    dstAddress = packet.ip.dst  # Destination IP address
    dstPort = packet[protocol].dstport  # Destination port
    timeStamp = packet.sniff_time  # Timestamp
    payLoadLength = packet.length  # Payload length

    # Create a dictionary for the packet header
    packetHeader = {
        'srcIP': srcAddress,
        'srcPort': srcPort,
        'dstIP': dstAddress,
        'dstPort': dstPort,
        'time': timeStamp,
        'protocol': protocol,
        'payLoadLen': payLoadLength
    }

    # Extract the payload data based on the transport layer protocol
    if protocol == 'TCP':
        payload = packet.tcp.payload
    elif protocol == 'UDP':
        payload = packet.udp.payload

    # Create the final packet dictionary containing the header and payload
    createdPacket = {
        'header': packetHeader,
        'payload': payload
    }

    return createdPacket

def analyze_packet(packet, system_info):
    # Check if packet is in whitelist
    if packet['header']['srcIP'] not in system_info['whitelist']:
        print("ALERT: Source IP is not in whitelist.\n"
            f"{packet['header']['srcIP']} not in {system_info['whitelist']}")
        
    # Check if the destination port is in expected ports
    if packet['header']['dstPort'] not in system_info['ports']:
        print("ALERT: Destination Port is not in list of expected ports.\n"
            f"{packet['header']['dstPort']} not in {system_info['ports']}")
        
    # Check for SSH failed login attempts 
    if packet['header']['srcPort'] == '22' and "Permission denied" in packet['payload']:
        print("ALERT: Failed SSH login detected.")
        create_alert(packet, system_info)

    # Check for RDP failed login attempts 
    if packet['header']['srcPort'] == '3389' and "Failed login" in packet['payload']:
        print("ALERT: Failed RDP login detected.")
        create_alert(packet, system_info)

    # Check for FTP failed login attempts 
    if packet['header']['srcPort'] == '21' and "530 Login incorrect" in packet['payload']:
        print("ALERT: Failed FTP login detected.")
        create_alert(packet, system_info)

def sniff_traffic(server_info: dict, system_info: dict, capture_interface: str) -> None:
    """
    Sniffs live network traffic on the specified interface and prints the captured TCP and UDP packets.
    Args:
        server_info (dict): Information about the server.
        system_info (dict): Information about the system.
        capture_interface (str): The interface to capture traffic on (e.g., 'eth0' for Ethernet or 'wlan0' for Wi-Fi).
    """
    try:
        # Create 'capture' object with specified interface and display filter
        with pyshark.LiveCapture(interface=capture_interface, display_filter='tcp or udp') as capture:
            print("Capturing live network traffic. Press Ctrl+C to stop...")
            
            # Start capturing packets continuously using capture object
            for captured_packet in capture.sniff_continuously():
                try:
                    # Create packet from captured packet and send to be analyzed
                    created_packet = create_packet(captured_packet)
                    analyze_packet(created_packet, system_info)
                except (AttributeError) as e: # Handle errors that may occur during packet analysis
                    print(f"An error occurred during packet analysis: {str(e)}")
                except KeyboardInterrupt: # Handle user interruption (Ctrl+C)
                    print("Capture stopped by user.")

    except (pyshark.capture.capture.TSharkVersionException, pyshark.capture.capture.TSharkCrashException) as e:
        print(f"Capture error occurred: {str(e)}") # Handle capture errors, such as TShark not found or crashing

def connect_server(server_info: dict, system_info: dict):
    # try:
    #     # Create a socket connection to the server
    #     server_address = (server_info['ip'], int(server_info['port']))
    #     connection_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #     connection_socket.connect(server_address)

    # Start sniffing traffic
    capture_interface = 'Wi-Fi'
    sniff_traffic(server_info, system_info, capture_interface)

    # except socket.error as e:
    #     print("Error connecting to the server:", str(e))

#store_malicious_packets()
#save_alert()
#notify_alert()
#encrypt_alert()
#send_alert()
#display_alert()

alerts=[]

def get_alerts():
    return alerts

def create_alert(packet, whitelist):
    res={'level':'Mid','time':packet['header']['time'],'port':packet['header']['srcPort'],'description':'Placeholder','ipSource':packet['header']['srcIP'],'ipDestination':packet['header']['dstIP'],'date':'placeholder','details':'placeholder'}
    alerts.append(res)


if __name__ == "__main__":
    
    if len(argv) < 2:
        print("Usage: python3 <LIDS> <config_file>")
        exit(1)

    # Now you can use 'config_file' in your Python code
    CONFIG_FILE = argv[1]  # Get the second item (index 1) in sys.argv
    print(f"Using configuration file: {CONFIG_FILE}")
    server_info, net_systems, system_info = ingest_config(CONFIG_FILE)

    if server_info is not None and net_systems is not None:
        # Call connect_server with the server_info dictionary and capture_interface
        connect_server(server_info, system_info)