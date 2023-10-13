import json
def create_alert(packet, whitelist):
    res={'level':'Mid','time':packet['header']['time'],'port':packet['header']['srcPort'],'description':'Placeholder','ipSource':packet['header']['srcIP'],'ipDestination':packet['header']['dstIP'],'date':'placeholder','details':'placeholder'}
    alerts.append(res)
    

def exportJSON(alerts):
    x = json.dumps(alerts, indent=4)
    
    with open('alerts.json', 'w') as outfile:
        outfile.write(x)
        outfile.close()

    