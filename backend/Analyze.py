import pyshark
from Project.CS4311_LIDS_4CodOfDuty_Fall2023.backend.monitor_network import check_whitelist

def getPacketInfo(packet):
    protocol = packet.transport_layer
    srcAddress = packet.ip.src
    srcPort = packet[protocol].srcport
    destAddress = packet.ip.dst
    dstPort = packet[protocol].dstport
    timeStamp = packet.sniff_time
    return f'Packet Timestamp: {timeStamp}' \
            f'\nProtocol type: {protocol}' \
            f'\nSource address: {srcAddress}' \
            f'\nSource port: {srcPort}' \
            f'\nDestination address: {destAddress}' \
            f'\nDestination port: {dstPort}\n'

def analyze(packet, system_Info):
    if packet.ip.src in check_whitelist(packet.ip.dst, packet.ip.src):
        return
    else:
        getPacketInfo(packet)
