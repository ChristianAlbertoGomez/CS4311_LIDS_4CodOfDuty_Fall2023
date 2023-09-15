import xml.etree.ElementTree as ET

def parse_config_file(config): 
    # Parse the XML file
    tree = ET.parse(config)
    root = tree.getroot()

    # Create a dictionary for the server information
    server_info = {}
    for child in root.findall('server'):
        for subchild in child:
            server_info[subchild.tag] = subchild.text

    # Create a list of dictionaries for each system in the network
    net_systems = []
    for child in root.findall('network/system'):
        system_dict = {}
        for subchild in child:
            if subchild.tag == 'whitelist':
                system_dict[subchild.tag] = [ip.text for ip in subchild]
            else:
                system_dict[subchild.tag] = subchild.text
        net_systems.append(system_dict)

    return server_info, net_systems