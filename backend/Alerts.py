from tabulate import tabulate
from flask import Flask

app = Flask(__name__)



@app.route("/alerts")
def alerts():
    return [{"level": 'Low',"time": 8.233,"ip": '192.12.4.101',"port": 88,"description": 'Multiple password attempts',},
            {"level": 'Mid',"time": 7.653,"ip": '182.12.4.101',"port": 64,"description": 'Account blocked',},
            {"level": 'High',"time": 9.152,"ip": '192.12.00.101',"port": 99,"description": 'Brute force connection',},
            {"level": 'Low',"time": 2.233,"ip": '192.12.4.101',"port": 88,"description": 'Multiple password attempts',},
            {"level": 'Mid',"time": 5.312,"ip": '172.12.4.101',"port": 48,"description": 'Multiple password attempts',}]
if __name__=="__main__":
    app.run(debug=True)

def createAlerts(packet,whitelist):
    """for i,v in packet['header']:
        i+=1"""
    return packet['header']

# Define your data as a list of lists (each inner list represents a row)
def alertTable():
    data = alerts()

    # Use the tabulate function to format the table
    table = tabulate(data, headers='keys', tablefmt="grid")

    # Print the formatted table
    print(table)
