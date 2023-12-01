from flask import Flask, request, jsonify
from flask_cors import CORS
import dev_server as lids_d

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
    with open('lids_d_gui_error_log.db', 'a') as error_log_file:
        error_log_file.write(error_message + '\n')

def alerts():
    return lids_d.get_alerts()

@app.route("/getData",methods=['GET'])
def get_data():
    return jsonify(lids_d.get_alerts())

@app.route('/', methods=['POST', 'GET'])
def handle_file_upload():
    try:
        if request.method == 'POST':
            if 'file' not in request.files:
                log_error("Error handling file upload: No file part")
                return jsonify({'error': 'No file part'})

            file = request.files['file']

            if file.filename == '':
                log_error("Error handling file upload: No selected file")
                return jsonify({'error': 'No selected file'})

            # Specify the destination folder for saving the file
            destination_folder = './'

            # Save the file to the specified folder
            file.save(destination_folder + file.filename)
        
            # Pass the file path to ingest_config
            server_info, net_systems = lids_d.ingest_config(file.filename)
            if server_info is not None and net_systems is not None:
                lids_d.manage_connections(server_info, net_systems)
            
            return jsonify({'message': 'File uploaded successfully'})

        elif request.method == 'GET':
            return jsonify({'message': 'Server is running'})
    except Exception as e:
        log_error(f"Error handling file upload: {str(e)}")
        
if __name__=="__main__":
    app.run(debug=True)
