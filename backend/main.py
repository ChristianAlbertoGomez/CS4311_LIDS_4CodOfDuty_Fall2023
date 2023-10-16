import LIDS as lids
import os
import Alerts as alert
import LIDS_D as lidsd
if __name__ == '__main__':
    try:

        file = './config_file.xml'
        server_info, net_systems, system_info = lids.ingest_config(file)
        if server_info is not None and net_systems is not None:
            # Call connect_server with the server_info dictionary and system information
            lids.connect_server(server_info, system_info)
        while True:
            try:

                user = input(">>  ")
                if user.lower() == 'help':
                    print(' Config: Show/setups config file options')
                    print(' Show PCAP: will show most recent pcap')
                    print(' Show PCAP X: will show the specified pcap')
                    print(' Alerts: will show alerts')
                    print(' Exit: will exit the program')
                    print(' Export: will export the alerts to a file')
                    print(' Help: show system commands')
                elif user.lower() == 'config':
                    print(' will show config options')
                elif user.lower() == 'show pcap':
                    print(' will show most recent pcap')
                elif user.lower() == 'show pcap x':
                    print(' will show the specified pcap')
                elif user.lower() == 'alerts':
                    print('hi')
                    alert.alertTable( )
                elif user.lower() == 'export':
                    exp = input('>>  ')

                    if exp.lower() == 'xml':
                        lidsd.export_alerts(lids.get_alerts(),exp.lower())
                    elif exp.lower() == 'json':
                        lidsd.export_alerts(lids.get_alerts(),exp.lower())
                    elif exp.lower() == 'csv':
                        lidsd.export_alerts(lids.get_alerts(),exp.lower())
                    else:
                        print('Invalid command. Please try again.')

                elif user.lower() == 'exit':
                    print('Exiting...')
                    break
                else:
                    print('Invalid command. Please try again.')

            except ValueError:
                print('Invalid command. Please try again.')

    except Exception as e:
        print("An error occurred:", str(e))

