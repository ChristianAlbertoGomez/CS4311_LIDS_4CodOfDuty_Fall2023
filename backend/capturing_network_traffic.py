import xml.etree.ElementTree as ET
import pyshark

def parse_config_file(config):
    """
    Parse the given XML configuration file and extract server information and network system information.
    Args:
        config: A string representing the path to the XML configuration file.
    Returns:
        A tuple containing the server information dictionary and the network system information dictionary.
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
        return None, None
    except ET.ParseError:
        print("Error parsing the XML file.")
        return None, None
    except Exception as e:
        print("An error occurred:", str(e))
        return None, None

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
        system_name = system.find('name').text  # Use the 'name' element as the identifier
        system_dict['name'] = system_name  # Store the system name
        system_dict['ip'] = system.find('ip').text
        system_dict['mac'] = system.find('mac').text
        system_dict['ports'] = system.find('ports').text.split(',')
        whitelist_element = system.find('whitelist')
        if whitelist_element is not None:
            system_dict['whitelist'] = [ip.text for ip in whitelist_element]

        # Use the system name as the key
        net_systems[system_name] = system_dict

    return server_info, net_systems


def monitor_network(server_info: dict, net_systems: dict) -> None:
    # Set the interface to capture traffic on (e.g., 'eth0' for Ethernet or 'wlan0' for Wi-Fi)
    capture_interface = 'Ethernet 4' 

    # Start capturing packets continuously
    capture = pyshark.LiveCapture(interface=capture_interface)

    print("Capturing live network traffic. Press Ctrl+C to stop...")

    try:
        for packet in capture.sniff_continuously():
            # Send captured packet to be analyzed
            print(packet)
    except KeyboardInterrupt:
        print("Capture stopped by user.")

    # You can add any additional processing or analysis of captured packets here.
        
if __name__ == "__main__":
    server_info, net_systems = parse_config_file('config_file.xml')
    if not(server_info or net_systems):
        print("Error with network configuration file.")
    else:
        monitor_network(server_info, net_systems)