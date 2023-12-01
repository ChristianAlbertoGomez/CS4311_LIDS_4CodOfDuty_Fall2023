import csv, json, sys, socket, subprocess, threading, defusedxml.ElementTree as ET
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

# config_file
# node_list
# node
alerts = []

# AES encryption key used for testing
encryption_key = b'0123456789ABCDEF'

def log_error(error_message):
    """
    Logs an error message to the 'error_log.db' file.
    Args:
        error_message (str): The error message to be logged.
    Returns:
        None
    """
    with open('server_error_log.db', 'a') as error_log_file:
        error_log_file.write(error_message + '\n')

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
        log_error(f"Error determining the current system's IP address: {str(e)}")
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
                log_error("Error parsing configuration file: Empty or invalid XML file")  # Handle an empty or invalid XML file
                return server_info, net_systems, None
    except FileNotFoundError as file_error:  # Handle file not found
        log_error(f"Error parsing configuration file: {str(file_error)}")
        return server_info, net_systems, None
    except Exception as e:  # Handle other exceptions
        log_error(f"Error parsing configuration file: {str(e)}")
        return server_info, net_systems, None
        
    try:
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
        # print(f"Current IP is {current_ip}")

        # Use the actual current_ip value here
        # if get_current_ip() == server_info['ip']:
        if current_ip == server_info['ip']:
            return server_info, net_systems # Return server, network systems 
        else:
            log_error("Error saving configuration file: Error matching host to configuration file")
            # print("Error matching host to configuration file")  # Handle the case where host IP does not match server IP
            return None, None
    except Exception as e:
        log_error(f"Error saving configuration file: {str(e)}")
    
        
def convert_alert_XML(alerts: list):
    try: 
        root = ET.Element("root")
    
        for alert in alerts:
            alertElement = ET.SubElement(root, "alert")
            for i, j in alert.items():
                ET.SubElement(alertElement, i).text = str(j)
    
        xmlstr = minidom.parseString(ET.tostring(root)).toprettyxml(indent="   ")
        with open("alerts.xml", "w") as f:
            f.write(xmlstr)
            f.close()
    except Exception as e:
        log_error(f"Error exporting to XML: {str(e)}")

def convert_alert_JSON(alerts: list):
    try:
        # Convert the list of alerts to a JSON-formatted string with indentation
        alert_data = json.dumps(alerts, indent=4)
        
        # Write the JSON data to an 'alerts.json' file
        with open('alerts.json', 'w') as file:
            file.write(alert_data)
            
    except Exception as e:
        log_error(f"Error exporting to JSON: {str(e)}")

def convert_alert_CSV(alerts: list):
    try:
        # Define the headers for the CSV file
        headers = ['Alert ID', 'Level', 'Time', 'Src Port', 'Dest Port', 'Port Description', 'Src IP', 'Dest IP', 'Alert Description']
        
        # Extract alert data into a list of dictionaries
        alerts_data = [
            {
                'Alert ID': alert['alert_id'],
                'Level': alert['level'],
                'Time': alert['time'],
                'Src Port': alert['src_port'],
                'Dest Port': alert['dst_port'],
                'Port Description': alert['description'],
                'Src IP': alert['src_ip'],
                'Dest IP': alert['dst_ip'],
                'Alert Description': alert['reason']
            }
            for alert in alerts
        ]
        
        # Create a CSV file and write the alerts to it
        with open('alerts.csv', 'w', newline='') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=headers)
            writer.writeheader()
            writer.writerows(alerts_data)
    except Exception as e:
        log_error(f"Error exporting to CSV: {str(e)}")

# notify_alert()
# display_alert()
# display_node_list()

def manage_connections(server_info: dict, net_systems: dict):
    try:
        # Testing purposes only
        SERVER_IP, SERVER_PORT = get_current_ip(), int(server_info['port'])

        # Real server implementation
        # SERVER_IP, SERVER_PORT = server_info['ip'], int(server_info['port'])

        # Create a socket to listen for connections
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind((SERVER_IP, SERVER_PORT))
        server_socket.listen(10)

        # print(f"Server is listening on {SERVER_IP}:{SERVER_PORT}")

        while True:
            client_socket, client_address = server_socket.accept()
            # print(f"Accepted connection from {client_address}")

            # Use threading to handle each client connection
            client_handler_thread = threading.Thread(target=handle_client, args=(client_socket,))
            client_handler_thread.start()
    except Exception as e:
        log_error(f"Error with server-client connection: {str(e)}")
        
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

    # Find the end of the JSON object
    end_of_json = decrypted_alert_json.index(b'}') + 1

    # Extract the JSON object and the extra data
    json_data = decrypted_alert_json[:end_of_json]

    try:
        # Convert the decrypted JSON-formatted string back to a dictionary
        decrypted_alert = json.loads(json_data.decode('utf-8', errors='replace'))
        return decrypted_alert
    except json.JSONDecodeError as e:
        log_error(f"Error decoding JSON: {str(e)}")
        return None

def receive_alert(client_socket):
    # print("Client connected and has established a connection.")
    try:
        while True:
            data = client_socket.recv(1024)  # Receive data from the client
            
            if not data:
                # If no data is received, the client has disconnected
                # print("Client disconnected")
                break
            
            # Process the received data
            alert_data = decrypt_alert(data)
            process_alert(alert_data)
        
        client_socket.close()
    except Exception as e:
        log_error(f"Error recieving alerts from client: {str(e)}")

def process_alert(alert):
    # Process the received alert
    try:
        alerts.append(alert)
    except Exception as e:
        log_error(f"Error adding alert to alerts list: {str(e)}")
    
def get_alerts():
    return alerts  # Return a copy of the alerts list

def handle_client(client_socket):
    try:
        receive_alert(client_socket)
    except Exception as e:
        log_error(f"Error handling client connection: {str(e)}")
    finally:
        client_socket.close()

# def save_alert(alert_data):
