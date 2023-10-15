import json
import xml.etree.ElementTree as ET
from xml.dom import minidom


def exportJSON(alerts):
    x = json.dumps(alerts, indent=4)
    
    with open('alerts.json', 'w') as outfile:
        outfile.write(x)
        outfile.close()

def exportXML(alerts):
    root = ET.Element("root")

    for alert in alerts:
        alertElement = ET.SubElement(root, "alert")
        for i,j in alert.items():    
            ET.SubElement(alertElement, i).text = str(j)
    xmlstr = minidom.parseString(ET.tostring(root)).toprettyxml(indent="   ")
    with open("alerts.xml", "w") as f:
        f.write(xmlstr)
        f.close()

def exportCSV(alerts):
    header = ['level','time','port','description','ipSource','ipDestination','date','details']
    
    with open('alerts.csv', 'w') as f:
        f.write(','.join(header) + '\n')
        for alert in alerts:
            for i,j in alert.items():
                f.write(str(j) + ',')
            f.write('\n')