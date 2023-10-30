from tabulate import tabulate
import backend as lids
# from flask import Flask

# app = Flask(__name__)
# alert = lids.get_alerts()

# @app.route("/alerts")
def alerts():
    return lids.get_alerts()

# Define your data as a list of lists (each inner list represents a row)
def alert_table():
    # Define the headers for the table, including the 'Alert ID' field
    headers = ['Alert ID', 'Level', 'Time', 'Src Port', 'Dest Port', 'Port Description', 'Src IP', 'Dest IP', 'Alert Description']

    # Extract the relevant information from the list of alerts, including the 'alertID'
    data = [[alert['alert_id'], alert['level'], alert['time'], alert['src_port'], alert['dst_port'], alert['description'], alert['src_ip'], alert['dst_ip'], alert['reason']] for alert in alerts()]
    
    # Use the tabulate function to format the table
    table = tabulate(data, headers=headers, tablefmt="grid")

    # Print the formatted table
    print(table)
