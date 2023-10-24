import sys, LIDS_dev as lids, Alerts_dev as alert, LIDS_D as lids_d

def print_help():
    """
    Prints a help text that provides a description of various commands that can be used in the program.
    """
    # Define the help text
    help_text = '''
        Command: Description of command
        
        'congfig': Shows detailed report of the configuration file entered by the user.
        'show pcap': Will show the most recent PCAP file.
        'show pcap pcap_filename': Will show the specified PCAP file.
        'alerts': Shows a table of any generated alerts in real time.
        'exit': Exit the program.
        'export': Will allow the user to export alerts.
        'help': Show system commands.
        '''

    print(help_text)

def main_cli(xml_path):
    # Your CLI interface logic here
    print(f"Processing XML file: {xml_path}")
    
    server_info, net_systems, system_info = lids.ingest_config(xml_path)
    if server_info is not None and net_systems is not None:
        # Call connect_server with the server_info dictionary and system information
        lids.connect_server(server_info, system_info)
        
    print_help()
    while True:
        try:
            user = input(">>  ")
            if user.lower() == 'config':
                lids.print_config_details(server_info, net_systems)
            elif user.lower() == 'show pcap':
                print(' will show most recent pcap')
            elif user.lower() == 'show pcap x':
                print(' will show the specified pcap')
            elif user.lower() == 'alerts':
                alert.alert_table(alert.alerts())
            elif user.lower() == 'export':
                exp = input('>>  ')

                if exp.lower() == 'xml':
                    lids_d.export_alerts(lids.get_alerts(),exp.lower())
                elif exp.lower() == 'json':
                    lids_d.export_alerts(lids.get_alerts(),exp.lower())
                elif exp.lower() == 'csv':
                    lids_d.export_alerts(lids.get_alerts(),exp.lower())
                else:
                    print('Invalid command. Please try again.')
            elif user.lower() == 'help':
                print_help()
            elif user.lower() == 'exit':
                print('Exiting...')
                break
            else:
                print('Invalid command. Please try again.')

        except ValueError:
            print('Invalid command. Please try again.')

def main_gui():
    # Your GUI interface logic here
    print("GUI interface")


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
                    # Call the main_cli function with the XML file path
                    main_cli(args[xml_index])
                else:
                    # Print an error message if the argument is missing or invalid
                    print("Error: Invalid XML file path. Please provide a valid XML file path.")
            except ValueError:
                # Print an error message if the "-c" flag is provided without an argument
                print("Error: Please specify an XML file path with the -c flag.")
        elif "-g" in args:
            # Call the main_gui function if the "-g" flag is provided
            main_gui()
        else:
            # Print an error message if neither -c nor -g flag is provided
            print("Error: Please specify either -c or -g flag.")
        
        # file = './config_file.xml'
    except Exception as e:
        print("An error occurred:", str(e))