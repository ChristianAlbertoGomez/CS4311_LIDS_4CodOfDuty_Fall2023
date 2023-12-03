from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import threading, dev_server as lids_d

app = Flask(__name__)
CORS(app, origins=["http://localhost:3001"])

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
    
def merge_db_files():
    file1_path = 'lids_d_main_error_log.db'
    file2_path = 'server_error_log.db'
    file3_path = 'lids_d_gui_error_log.db'
    output_file_path = '/home/arnim_zola/Desktop/dev/backend/lids_d_errors.txt'
    try:
        # Open the first database file and read its content
        with open(file1_path, 'r', encoding='utf-8') as file1:
            content_file1 = file1.readlines()

        # Open the second database file and read its content
        with open(file2_path, 'r', encoding='utf-8') as file2:
            content_file2 = file2.readlines()
            
        # Open the second database file and read its content
        with open(file3_path, 'r', encoding='utf-8') as file3:
            content_file3 = file3.readlines()

        # Combine the content from both files
        merged_content = content_file1 + content_file2 + content_file3

        # Write the merged content to the output text file
        with open(output_file_path, 'w', encoding='utf-8') as output_file:
            output_file.writelines(merged_content)

        print(f"Merged content from {file1_path}, {file2_path} and {file3_path} into {output_file_path}")
    except Exception as e:
        print(f"Error merging files: {e}")

@app.route('/getErrors')
def get_file():
    merge_db_files()
    return send_file('./lids_d_errors.txt', as_attachment=True)

@app.route("/getData",methods=['GET'])
def get_data():
    return jsonify(lids_d.get_alerts())
    
def process_file_upload(file):
    """
    Process file upload in a separate thread.
    """
    try:
        # Pass the file path to ingest_config
        server_info, net_systems = lids_d.ingest_config(file.filename)
        if server_info is not None and net_systems is not None:
            lids_d.manage_connections(server_info, net_systems)
        print("File processing completed successfully")
    except Exception as e:
        log_error(f"Error processing file upload: {str(e)}")

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
            #server_info, net_systems = lids_d.ingest_config(file.filename)
            #if server_info is not None and net_systems is not None:
                #lids_d.manage_connections(server_info, net_systems)
                
            # Create a new thread for processing the file
            thread = threading.Thread(target=process_file_upload, args=(file,))
            thread.start()
            
            return jsonify({'message': 'File uploaded successfully'})

        elif request.method == 'GET':
            return jsonify({'message': 'Server is running'})

        # Add a default response for unsupported methods
        else:
            return jsonify({'error': 'Unsupported method'})

    except Exception as e:
        log_error(f"Error handling file upload: {str(e)}")
        
if __name__=="__main__":
    app.run(debug=True)
