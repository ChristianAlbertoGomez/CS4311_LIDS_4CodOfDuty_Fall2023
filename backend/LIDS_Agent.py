import pyshark, socket, defusedxml.ElementTree as ET

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

    # Simulate getting the current IP (replace this line with your actual method)
    current_ip = get_current_ip()
    print(f"Current IP is {current_ip}")

    # Use the actual current_ip value here
    if current_ip in net_systems:
        return server_info, net_systems, net_systems[current_ip]  # Return server, network systems, and current system info
    else:
        print("Error matching host to configuration file")  # Handle the case where the current IP is not found
        return server_info, net_systems, None

def extract_payload(packet, transport_layer):
    """
    Extracts the payload data from a packet based on the transport layer protocol.
    Args:
        packet: The packet object from which to extract the payload data.
        transport_layer: The transport layer protocol of the packet (e.g., 'TCP', 'UDP').
    Returns:
        The payload data extracted from the packet, or None if no payload data is found.
    """
    if transport_layer == 'TCP':
        # If the transport layer is TCP, return the payload data from the packet.
        return packet.data.data
    elif transport_layer == 'UDP':
        # If the transport layer is UDP, return the payload data from the packet.
        return packet.payload.raw_value
    elif hasattr(packet, 'payload'):
        # If the transport layer is not specified, try to extract payload data if it exists.
        return packet.payload.raw_value
    else:
        # If no payload data is found, return None.
        return None

def create_packet(packet):
    """
    Extracts relevant information from a packet and returns a dictionary containing the packet header and payload.  
    Args:
        packet: The packet object from which to extract information.     
    Returns:
        dict: A dictionary containing the packet header and payload.
    """
    # Initialize a dictionary to store packet information.
    packet_info = {
        'header': {
            'src_ip': getattr(packet.ip, 'src', None), # Extract source IP address from the packet if it exists, otherwise set to None.
            'dest_ip': getattr(packet.ip, 'dst', None), # Extract destination IP address from the packet if it exists, otherwise set to None.
            'src_port': None,  
            'dest_port': None,  
            'time': packet.sniff_time,  # Set the timestamp from the packet.
            'proto': None, 
            'payload_length': packet.length,  # Set the payload length from the packet.
        },
        'payload': None,  # Initialize payload as None.
    }

    try:
        # Try to extract transport layer information if available.
        transport_layer = packet.transport_layer
        if transport_layer:
            # Extract source port from the transport layer if it exists, otherwise set to None.
            packet_info['header']['src_port'] = getattr(transport_layer, 'srcport', None)
            # Extract destination port from the transport layer if it exists, otherwise set to None.
            packet_info['header']['dest_port'] = getattr(transport_layer, 'dstport', None)
            packet_info['header']['proto'] = transport_layer
            # Extract and set the payload using the extract_payload function, or set an empty string if no payload is found.
            payload = extract_payload(packet, transport_layer)
            packet_info['payload'] = payload if payload is not None else ""
    except AttributeError:
        # Handle exceptions that may occur during attribute extraction.
        pass

    return packet_info

def sniff_traffic(server_info: dict, system_info: dict, capture_interface: str) -> None:
    """
    Sniffs live network traffic on the specified interface and prints the captured packets.
    Args:
        server_info (dict): Information about the server.
        system_info (dict): Information about the system.
        capture_interface (str): The interface to capture traffic on (e.g., 'eth0' for Ethernet or 'wlan0' for Wi-Fi).
    """
    try:
        # Create 'capture' object with specified interface
        with pyshark.LiveCapture(interface=capture_interface) as capture:
            print("Capturing live network traffic. Press Ctrl+C to stop...")
            
            # Start capturing packets continuously using capture object
            for captured_packet in capture.sniff_continuously():
                try:
                    # Create and print the packet
                    created_packet = create_packet(captured_packet)
                    print(created_packet)
                except (AttributeError, pyshark.PySharkException) as e: # Handle errors that may occur during packet analysis
                    print(f"An error occurred during packet analysis: {str(e)}")
                except KeyboardInterrupt: # Handle user interruption (Ctrl+C)
                    print("Capture stopped by user.")

    except (pyshark.capture.capture.TSharkNotFoundException, pyshark.capture.capture.TSharkCrashException) as e:
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

def createPacket(packet):
    # get packet protocol
    protocol = packet.transport_layer

    #check if packet is TCP or UDP
    if(protocol == 'TCP'):

        #get packet header information
        srcAddress = packet.ip.src
        srcPort = packet[protocol].srcport
        dstAddress = packet.ip.dst
        dstPort = packet[protocol].dstport
        timeStamp = packet.sniff_time
        payLoadLength = packet.length

        #create packet header
        packetHeader = {'SrcIP': srcAddress, 'SrcPort': srcPort, 'DstIP': dstAddress, 'dstPort':dstPort, 'time':timeStamp, 'protocol':protocol, 'payLoadLen':payLoadLength}

        #get packet payload
        payload = packet.tcp.payload

        #create packet
        createdPacket = {}
        createdPacket['header'] = packetHeader
        createdPacket['payload'] = payload

        #return packet
        return createdPacket

    elif(protocol == 'UDP'):

        #get packet header information
        srcAddress = packet.ip.src
        srcPort = packet[protocol].srcport
        dstAddress = packet.ip.dst
        dstPort = packet[protocol].dstport
        timeStamp = packet.sniff_time
        payLoadLength = packet.length

        #create packet header
        packetHeader = {'srcIP': srcAddress, 'srcPort': srcPort, 'dstIP': dstAddress, 'dstPort':dstPort, 'time':timeStamp, 'protocol':protocol, 'payLoadLen':payLoadLength}

        #get packet payload
        payload = packet.udp.payload

        #create packet
        createdPacket = {}
        createdPacket['header'] = packetHeader
        createdPacket['payload'] = payload

        #return packet
        return createdPacket


def analyzePacket(packet, system_info):
    
    #check if packet is in whitelist
    for i, j in system_info.items():
        for k in j['whitelist']:

            if packet['header']['srcIP'] == k:
                print("Packet in whitelist")

                #send to whitelist storage
                #createAlert(packet,"whitelist")
                #storeWhitelistPackets()

            else:
                print("Packet not in whitelist")

                #send to malicious storage
                #createAlert(packet,"unknown ip")
                #storeMaliciousPackets()
                #sendAlert()

    raise ValueError('test')


#store_malicious_packets()
#create_alert(packet, system_info, "unknown ip")
#save_alert()
#notify_alert()
#encrypt_alert()
#send_alert()
#display_alert()

if __name__ == "__main__":
    # Prompt the user to enter the configuration file path
    CONFIG_FILE = 'config_file.xml'
    server_info, system_info, net_systems = ingest_config(CONFIG_FILE)
    
    if server_info is not None and net_systems is not None:
        # Call connect_server with the server_info dictionary and capture_interface
        connect_server(server_info, system_info)