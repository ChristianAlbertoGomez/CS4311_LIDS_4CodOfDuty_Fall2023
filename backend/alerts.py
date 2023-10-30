from tabulate import tabulate
import backend_test as lids
# from flask import Flask

# app = Flask(__name__)
# alert = lids.get_alerts()

# @app.route("/alerts")
def alerts():
    return lids.get_alerts()


def alert_table():
    """
    Formats and prints a table of alert information.
    This function uses the `tabulate` library to create the table and extracts the relevant information from a list of alerts.
    """
    # Defining the headers for the table
    headers = ['Alert ID', 'Level', 'Time', 'Src Port', 'Dest Port', 'Port Description', 'Src IP', 'Dest IP', 'Alert Description']

    # Extract the relevant information from the list of alerts
    data = [[alert['alert_id'], alert['level'], alert['time'], alert['src_port'], alert['dst_port'], alert['description'], alert['src_ip'], alert['dst_ip'], alert['reason']] for alert in alerts()]
    
    # Use the tabulate function to format the table
    table = tabulate(data, headers=headers, tablefmt="grid")
    print(table)
