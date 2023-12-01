import subprocess

def run_gui():
    try:
        # Start the React application using 'npm start' in the background
        react_process = subprocess.Popen(["npm", "start"], cwd="./../src")
    
        # Run 'python file_upload.py' and capture the file path returned by the server
        subprocess.check_output(["python3", "backend_gui_demo.py"])
    except Exception as e:
        print("An error occurred:", str(e))

if __name__ == '__main__':
    run_gui()
