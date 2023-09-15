from parse_config import *
from monitor_network import *

# Ask user to provide name of config file
config_file_name = input("Enter a name for the configuration file: ")

# Ask enter system to monitor
sys_name = input("Name of system to monitor: ")

# Parse configuration file for the network
server_info, systems_on_net = parse_config_file(config_file_name)

# Find the target system to monitor in list of systems on the network
for sys in enumerate(systems_on_net):
    if sys[1]['name'] == sys_name:
        target_sys = systems_on_net[sys[0]]

print(f"Target System: {target_sys}")

print("Monitoring network...\n")
monitor_network(target_sys)