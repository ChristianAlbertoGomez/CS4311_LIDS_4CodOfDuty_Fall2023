import random as rand
import pyshark

rand_ip_addrs = ['10.0.0.1', '10.0.0.2', '10.0.0.3', '10.0.0.4', '10.0.0.5'
                '10.0.0.6', '10.0.0.7', '10.0.0.8', '10.0.0.9', '10.0.0.245']

def monitor_network(target_sys):
    # Analyze outgoing packets from local host
    capture = pyshark.LiveCapture(display_filter='ip.src == 127.0.0.1')
    
    for packet in capture.sniff_continuously():
        src_ip = packet.ip.src
        dest_ip = packet.ip.dst
        print(f"Outgoing packet from {src_ip} to {dest_ip}")
        
        new_src_ip = target_sys['ip']
        index = rand.randint(0, 8)
        print(f"Index: {index}")
        new_dest_ip = rand_ip_addrs[index]
        print(f"New dummy packet information:\nNew Source IP: {new_src_ip}\nNew Destination IP: {new_dest_ip}")
        
        check_whitelist(target_sys, new_dest_ip)
        
        
def check_whitelist(host, dest_ip):
    print(f"System name: {host['name']}\nWhitelist:{host['whitelist']}")
    if dest_ip not in host['whitelist']:
        print("Unknown IP address alert\n")
    else:
        print("Known IP address\n")