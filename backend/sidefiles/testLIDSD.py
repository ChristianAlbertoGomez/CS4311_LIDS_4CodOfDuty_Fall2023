import socket, defusedxml.ElementTree as ET
import xml.etree.cElementTree as ETE

import json
from xml.dom import minidom

# config_file
# node_list
# node
# alert_list
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
    current_ip = '10.0.0.1'
    print(f"Current IP is {current_ip}")

    # Use the actual current_ip value here
    # if get_current_ip() == server_info['ip']:
    if current_ip == server_info['ip']:
        return server_info, net_systems # Return server, network systems 
    else:
        print("Error matching host to configuration file")  # Handle the case where host IP does not match server IP
        return None, None

def manage_connections(server_info: dict):
    # Testing purposes only
    # SERVER_IP, SERVER_PORT = get_current_ip(), int(server_info['port'])
    
    SERVER_IP, SERVER_PORT = server_info['ip'], int(server_info['port'])
    
    # Create a socket to listen for connections
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((SERVER_IP, SERVER_PORT))
    server_socket.listen(5)  # Listen for up to 5 connection requests

    print(f"Server is listening on {SERVER_IP}:{SERVER_PORT}")

    while True:
        # Wait for a connection from a client
        client_socket, client_address = server_socket.accept()
        print(f"Accepted connection from {client_address}")

        # Handle the client's data
        receive_alert(client_socket)

def receive_alert(client_socket):
    print("Client connected and has established a connection.")

    while True:
        data = client_socket.recv(1024)  # Receive data from the client 

        if not data:
            # If no data is received, the client has disconnected
            print("Client disconnected")
            break

        # Process the received data 
        save_alert(data.decode('utf-8'))

    client_socket.close()

def save_alert(alert_data):
    print(f"Received Alert: {alert_data}")

def export_alerts(alerts, format):
    
    if format.lower() == 'xml':
        root = ETE.Element("root")

        for alert in alerts:
            alertElement = ETE.SubElement(root, "alert")
            for i,j in alert.items():
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
        header = ['level','time','port','description','ipSource','ipDestination','date','details']

        with open('alerts.csv', 'w') as f:
            f.write(','.join(header) + '\n')
            for alert in alerts:
                for i,j in alert.items():
                    f.write(str(j) + ',')
                f.write('\n')
    else:
        print('Invalid format')

# decrypt_alert()
# notify_alert()
# display_alert()
# display_node_list()