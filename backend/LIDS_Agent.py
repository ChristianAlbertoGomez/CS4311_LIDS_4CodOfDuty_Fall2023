import xml.etree.ElementTree as ET
import pyshark, socket

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
        hostname = socket.gethostname()
        ip_address = socket.gethostbyname(hostname)
        return ip_address
    except socket.error as e:
        print(f"Error determining the current system's IP address: {str(e)}")
        return None

def ingestConfig(config):
    """
    Parse the given XML configuration file and extract server information and network system information.
    Args:
        config: A string representing the path to the XML configuration file.
    Returns:
        A tuple containing the server information dictionary, the network system information dictionary,
        and the current system's information dictionary.
    """
    # Initialize data containers
    server_info = {}
    net_systems = {}

    try:
        # Parse the XML file
        with open(config, 'r') as file:
            tree = ET.parse(file)
            root = tree.getroot()
    except FileNotFoundError:
        print("File not found.")
        return server_info, net_systems, None
    except ET.ParseError:
        print("Error parsing the XML file.")
        return server_info, net_systems, None
    except Exception as e:
        print("An error occurred:", str(e))
        return server_info, net_systems, None

    # Extract server information
    server_element = root.find('.//server')
    if server_element is not None:
        server_info = {
            'ip': server_element.find('ip').text,
            'port': server_element.find('port').text,
            'nic': server_element.find('nic').text,
        }

    # Extract network system information
    system_elements = root.findall('.//network/system')
    for system in system_elements:
        system_dict = {}
        system_ip = system.find('ip').text  # Use the 'ip' element as the identifier
        system_dict['name'] = system.find('name').text
        system_dict['mac'] = system.find('mac').text
        system_dict['ports'] = system.find('ports').text.split(',')
        whitelist_element = system.find('whitelist')
        if whitelist_element is not None:
            system_dict['whitelist'] = [ip.text for ip in whitelist_element]

        # Use the system IP as the key
        net_systems[system_ip] = system_dict

    current_ip = get_current_ip()
    print(f"Current IP is {current_ip}")
    current_ip = '10.0.0.2'

    if current_ip in net_systems:
        return server_info, net_systems, net_systems[current_ip]
    else:
        print("Error matching host to configuration file")
        return server_info, net_systems, None

def connectServer(server_info: dict, system_info: dict):
    # try:
    #     # Create a socket connection to the server
    #     server_address = (server_info['ip'], int(server_info['port']))
    #     connection_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #     connection_socket.connect(server_address)

    # Start sniffing traffic
    sniffTraffic(server_info, system_info)

    # except socket.error as e:
    #     print("Error connecting to the server:", str(e))

def sniffTraffic(server_info: dict, system_info: dict) -> None:
    # Set the interface to capture traffic on (e.g., 'eth0' for Ethernet or 'wlan0' for Wi-Fi)
    capture_interface = 'Ethernet 4' 

    # Start capturing packets continuously
    capture = pyshark.LiveCapture(interface=capture_interface)

    print("Capturing live network traffic. Press Ctrl+C to stop...")

    try:
        for packet in capture.sniff_continuously():
            # analyzePacket(packet, system_info)
            print(packet)
    except KeyboardInterrupt:
        print("Capture stopped by user.")
        
#createPacket()
#analyzePacket()
#storeMaliciousPackets()
#createAlert(packet, system_info, "unknown ip")
#saveAlert()
#notifyAlert()
#encryptAlert()
#sendAlert()
#displayAlert()

if __name__ == "__main__":
    # Prompt the user to enter the configuration file path
    CONFIG_FILE = 'config_file.xml'
    server_info, system_info, net_systems = ingestConfig(CONFIG_FILE)
    
    if server_info is not None and net_systems is not None:
        # Call connectServer with the server_info dictionary and capture_interface
        connectServer(server_info, system_info)
