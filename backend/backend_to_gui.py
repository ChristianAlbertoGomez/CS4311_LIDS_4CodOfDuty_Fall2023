from flask import Flask, request, jsonify
from tabulate import tabulate
from flask_cors import CORS
import ids_logic as lids

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

def log_error(error_message):
    """
    Logs an error message to the 'error_log.db' file.
    Args:
        error_message (str): The error message to be logged.
    Returns:
        None
    """
    with open('file_upload_error_log.db', 'a') as error_log_file:
        error_log_file.write(error_message + '\n')

def alerts():
    return lids.get_alerts()

@app.route("/getData",methods=['GET'])
def get_data():
    return jsonify(lids.get_alerts())

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

@app.route('/', methods=['POST', 'GET'])
def handle_file_upload():
    try:
        if request.method == 'POST':
            if 'file' not in request.files:
                log_error('Error: No file part')
                return jsonify({'error': 'No file part'})

            file = request.files['file']

            if file.filename == '':
                log_error('Error: No selected file')
                return jsonify({'error': 'No selected file'})

            # Specify the destination folder for saving the file
            destination_folder = './'

            # Save the file to the specified folder
            file.save(destination_folder + file.filename)
        
            # Pass the file path to ingest_config
            server_info, net_systems, system_info = lids.ingest_config(file.filename)
            if server_info is not None and net_systems is not None:
                lids.connect_to_lidsd(server_info, system_info, 'g')
            
            return jsonify({'message': 'File uploaded successfully'})

        elif request.method == 'GET':
            return jsonify({'message': 'Server is running'})
    except Exception as e:
        log_error('Error handling file upload: ', str(e))
        
if __name__=="__main__":
    app.run(debug=True)
