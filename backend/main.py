# from config import *
# from Alerts import *
# from PCAP import *
import LIDS as lids

if __name__ == "__main__":
    # Need config file from frontend sent here
    CONFIG_FILE = 'config_file.xml'
    
    #print(f"Using configuration file: {CONFIG_FILE}")
    server_info, net_systems, system_info = lids.ingest_config(CONFIG_FILE)

    # if server_info is not None and net_systems is not None:
    #     # Call connect_server with the server_info dictionary and system information
    #     lids.connect_server(server_info, system_info)

    while True:
        try:
            print('Welcome, please select one of the following options (1-6)')
            userInp = int(input("1) Configuration File\n2) Show PCAP\n3) Select PCAP\n4) Alerts\n5) Help\n6) Exit\n"))
            if userInp > 6 or userInp < 1:
                print("Please select a valid option")
            elif userInp == 1:
                print("Please select a valid option")
                # setConfigFile()
            elif userInp == 2:
                print("Please select a valid option")
                # pcapTable() 
            elif userInp == 3:
                print("You'll be able to search for a specific PCAP")
            elif userInp == 4:
                print("Please select a valid option")
                # alertTable()
            elif userInp == 5:
                print("You'll find help options here")
            elif userInp == 6:
                print("Have a nice day")
                break
        except ValueError:
            print("Invalid input. Please enter a number (1-6).")
