import json, socket, defusedxml.ElementTree as ET

# config_file
# node_list
# node
# alert_list
# alert

# Simple encryption key used for testing 
encryption_key = 0x5A

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

# decrypt_alert()
# notify_alert()
# display_alert()
# display_node_list()
# convert_alert_XML()
# convert_alert_JSON()
# convert_alert_CSV()

def manage_connections(server_info: dict):
    """
    Manages incoming connections to the server.
    Args:
        server_info (dict): A dictionary containing the server IP and port.
    Returns:
        None
    """
    # Testing purposes only
    SERVER_IP, SERVER_PORT = get_current_ip(), int(server_info['port'])
    
    # Real server implementation
    # SERVER_IP, SERVER_PORT = server_info['ip'], int(server_info['port'])
    
    # Create a socket to listen for connections
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((SERVER_IP, SERVER_PORT))
    server_socket.listen(5)

    print(f"Server is listening on {SERVER_IP}:{SERVER_PORT}")

    while True:
        client_socket, client_address = server_socket.accept()
        print(f"Accepted connection from {client_address}")
        receive_alert(client_socket)
        
def decrypt_alert(encrypted_alert):
    """
    Decrypt an alert using XOR encryption.
    Args:
        encrypted_alert (bytes): The encrypted alert data.
    Returns:
        dict: The decrypted alert.
    """
    encrypted_alert_list = list(encrypted_alert)
    decrypted_alert = []
    for encrypted_char in encrypted_alert_list:
        decrypted_char = chr(encrypted_char ^ encryption_key)
        decrypted_alert.append(decrypted_char)
    decrypted_alert_string = ''.join(decrypted_alert)
    return eval(decrypted_alert_string)  # Convert the decrypted string back to a dictionary

def receive_alert(client_socket):
    """
    Receives alerts from a client connected to a server.
    Args:
        client_socket (socket): A socket object representing the connection with the client.
    Returns:
        None
    Raises:
        None
    """
    print("Client connected and has established a connection.")
    while True:
        data = client_socket.recv(1024)  # Receive data from the client

        if not data:
            # If no data is received, the client has disconnected
            print("Client disconnected")
            break

        # Process the received data
        alert_data = decrypt_alert(data)
        process_alert(alert_data)

    client_socket.close()

def process_alert(alert):
    # Process the received alert
    print(f"Received Alert: {alert}")
    # Add your code to process the alert here

# def save_alert(alert_data):

if __name__ == "__main__":
    # Set configuration file
    CONFIG_FILE = 'config_file.xml' 
    print(f"Using configuration file: {CONFIG_FILE}")
    server_info, net_systems = ingest_config(CONFIG_FILE)

    if server_info is not None and net_systems is not None:
        manage_connections(server_info)
