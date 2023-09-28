import pyshark

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


    