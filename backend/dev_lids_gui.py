from flask import Flask, request, jsonify, send_file
from tabulate import tabulate
from flask_cors import CORS
import dev_ids_agent as lids

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

# def merge_db_files():
#     file1_path = 'CS4311_LIDS_4CodOfDuty_Fall2023/backend/lids_backend_error_log.db'
#     file2_path = 'CS4311_LIDS_4CodOfDuty_Fall2023/backend/lids_main_error_log.db'
#     file3_path = 'CS4311_LIDS_4CodOfDuty_Fall2023/backend/lids_gui_error_log.db'
#     output_file_path = 'lids_errors.txt'
#     try:
#         # Open the first database file and read its content
#         with open(file1_path, 'r', encoding='utf-8') as file1:
#             content_file1 = file1.readlines()

#         # Open the second database file and read its content
#         with open(file2_path, 'r', encoding='utf-8') as file2:
#             content_file2 = file2.readlines()
            
#         # Open the second database file and read its content
#         with open(file3_path, 'r', encoding='utf-8') as file3:
#             content_file3 = file3.readlines()

#         # Combine the content from both files
#         merged_content = content_file1 + content_file2 + content_file3

#         # Write the merged content to the output text file
#         with open(output_file_path, 'w', encoding='utf-8') as output_file:
#             output_file.writelines(merged_content)

#         print(f"Merged content from {file1_path}, {file2_path} and {file3_path} into {output_file_path}")
#     except Exception as e:
#         print(f"Error merging files: {e}")

@app.route('/getErrors')
def get_file():
    #merge_db_files()
    return send_file('errors.txt', as_attachment=True)


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
