import sys, json, socket, threading, defusedxml.ElementTree as ET
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

# config_file
# node_list
# node
# alert_list
# alert

# AES encryption key used for testing
encryption_key = b'0123456789ABCDEF'

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
            'mac': server_element.findtext('mac'),  #Extract server MAC address
            'port': server_element.findtext('port'),  # Extract server port
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
    # Testing purposes only
    SERVER_IP, SERVER_PORT = get_current_ip(), int(server_info['port'])

    # Real server implementation
    # SERVER_IP, SERVER_PORT = server_info['ip'], int(server_info['port'])

    # Create a socket to listen for connections
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((SERVER_IP, SERVER_PORT))
    server_socket.listen(10)

    print(f"Server is listening on {SERVER_IP}:{SERVER_PORT}")

    while True:
        client_socket, client_address = server_socket.accept()
        print(f"Accepted connection from {client_address}")

        # Use threading to handle each client connection
        client_handler_thread = threading.Thread(target=handle_client, args=(client_socket,))
        client_handler_thread.start()
        
def decrypt_alert(encrypted_alert):
    """
    Decrypt an alert using AES decryption.
    Args:
        encrypted_alert (bytes): The encrypted alert data.
    Returns:
        dict: The decrypted alert.
    """
    backend = default_backend()
    cipher = Cipher(algorithms.AES(encryption_key), modes.CFB(b'\0' * 16), backend=backend)
    decryptor = cipher.decryptor()
    decrypted_alert_json = decryptor.update(encrypted_alert) + decryptor.finalize()

    # Strip padding characters
    decrypted_alert_json = decrypted_alert_json.rstrip(b'\0')

    try:
        # Convert the decrypted JSON-formatted string back to a dictionary
        decrypted_alert = json.loads(decrypted_alert_json.decode('utf-8', errors='replace'))
        return decrypted_alert
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {str(e)}")
        return None

def receive_alert(client_socket):
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

def handle_client(client_socket):
    try:
        receive_alert(client_socket)
    finally:
        client_socket.close()

# def save_alert(alert_data):
      
if __name__ == '__main__':
    try:
        # Get command-line arguments, excluding the script name and get the XML path
        xml_path = sys.argv[1:]

        # Check if an argument exists at the expected index and if it ends with '.xml'
        if len(xml_path) > 0 and xml_path[0].endswith('.xml'):
            print(f"Using configuration file: {xml_path[0]}")
            server_info, net_systems = ingest_config(xml_path[0])
            
            if server_info is not None and net_systems is not None:
                manage_connections(server_info)
        else:
            # Print an error message if the argument is missing or invalid
            print("Error: Invalid XML file path. Please provide a valid XML file path.")
    except Exception as e:
        print("An error occurred:", str(e))
