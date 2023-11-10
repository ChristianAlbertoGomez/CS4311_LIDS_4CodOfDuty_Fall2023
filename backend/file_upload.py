from flask import Flask, request, jsonify
from flask_cors import CORS
import backend_test as lids

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

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
  
