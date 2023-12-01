import os, sys, time, subprocess, threading, dev_ids_agent as lids, dev_lids_gui as alert, dev_LIDS_D as lids_d

def log_error(error_message):
    """
    Logs an error message to the 'error_log.db' file.
    Args:
        error_message (str): The error message to be logged.
    Returns:
        None
    """
    with open('lids_main_error_log.db', 'a') as error_log_file:
        error_log_file.write(error_message + '\n')

def clear_terminal():
    """
    Clears the terminal screen.
    """
    os.system('cls' if os.name == 'nt' else 'clear')

def print_help():
    """
    Prints a help text that provides a description of various commands that can be used in the program.
    """
    # Define the help text
    help_text = '''
        Command: Description of command
        
        'alerts': Shows a table of any generated alerts in real time.
        'clear': Clear terminal.
        'config': Shows detailed report of the configuration file entered by the user.
        'exit': Exit the program.
        'export': Will allow the user to export alerts.
        'help': Show system commands.
        'show pcap': Will show the most recent PCAP file.
        'show pcap pcap_filename': Will show the specified PCAP file.
        '''

    print(help_text)

def main_cli(xml_path, user_interface):
    # Show the xml file path that was given by the user
    print(f"Processing XML file: {xml_path}")

    # Pass the xml file path to the configuration ingestion and extract network information
    server_info, net_systems, system_info = lids.ingest_config(xml_path)
    if server_info is not None and net_systems is not None:
        lids.connect_to_lidsd(server_info, system_info, user_interface)  # Connect to LIDS D server
    
    # Start capturing and analyzing traffic in the background 
    lids_thread = threading.Thread(target=lids.sniff_traffic, args=('eth0', system_info,))
    lids_thread.daemon = True
    lids_thread.start()

    print_help()
    while True:
        try:
            user = input(">>  ")
            if user.lower() == 'alerts':
                alert.alert_table()
            elif user.lower() == 'clear':
                clear_terminal()
            elif user.lower() == 'config':
                lids.print_config_details(server_info, net_systems)
            elif user.lower() == 'export':
                exp = input('Enter format for export file: ')
                if exp.lower() == 'xml':
                    lids.export_alerts(lids.get_alerts(), exp.lower())
                elif exp.lower() == 'json':
                    lids.export_alerts(lids.get_alerts(), exp.lower())
                elif exp.lower() == 'csv':
                    lids.export_alerts(lids.get_alerts(), exp.lower())
                else:
                    log_error(f"Error processing command: {str(e)}")
                    print('Invalid command. Please try again.')
            elif user.lower() == 'help':
                print_help()
            elif user.lower() == 'show pcap':
                print(' will show most recent pcap')
            elif user.lower() == 'show pcap x':
                print(' will show the specified pcap')
            elif user.lower() == 'exit':
                lids.disconnect_from_lidsd(user_interface)
                print('Exiting...')
                break
            else:
                print('Invalid command. Please try again.')

        except Exception as e:
            # Log the exception and continue
            log_error(f"Error processing command: {str(e)}")
            print('Invalid command. Please try again.')

def run_gui():
    # Start the React application using 'npm start' in the background
    react_process = subprocess.Popen(["npm", "start"], cwd="./../src")
    
    # Run 'python file_upload.py' and capture the file path returned by the server
    subprocess.check_output(["python3", "lids_gui.py"])
        
if __name__ == '__main__':
    try:
        # Get command-line arguments, excluding the script name
        args = sys.argv[1:]

        if "-c" in args:
            try:
                # Find the index of the "-c" flag and add 1 to get the index of the XML path
                xml_index = args.index("-c") + 1

                # Check if an argument exists at the expected index and if it ends with '.xml'
                if xml_index < len(args) and args[xml_index].endswith('.xml'):
                    # Call the main_menu function with the XML file path
                    main_cli(args[xml_index], 'c')
                else:
                    # Print an error message if the argument is missing or invalid
                    print("Error: Invalid XML file path. Please provide a valid XML file path.")
            except ValueError:
                # Print an error message if the "-c" flag is provided without an argument
                print("Error: Please specify an XML file path with the -c flag.")
        elif "-g" in args:
            # Call the main_gui function if the "-g" flag is provided
            run_gui()
        else:
            # Print an error message if neither -c nor -g flag is provided
            print("Error: Please specify either -c or -g flag")
    except Exception as e:
        print("An error occurred:", str(e))
