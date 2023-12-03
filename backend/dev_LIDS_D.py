import subprocess

def log_error(error_message):
    """
    Logs an error message to the 'error_log.db' file.
    Args:
        error_message (str): The error message to be logged.
    Returns:
        None
    """
    with open('lids_d_main_error_log.db', 'a') as error_log_file:
        error_log_file.write(error_message + '\n')

def run_gui():
    try:
        # Start the React application using 'npm start' in the background
        react_process = subprocess.Popen(["npm", "start"], cwd="./../src")
        
        # Run 'python file_upload.py' and capture the file path returned by the server
        subprocess.check_output(["python", "dev_lids_d_gui.py"])
    except Exception as e:
        log_error(f"Error occurred while starting LIDS D server: {str(e)}")

if __name__ == '__main__':
    run_gui()
