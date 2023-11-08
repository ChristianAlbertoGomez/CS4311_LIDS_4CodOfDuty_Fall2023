from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route('/', methods=['POST', 'GET'])
def handle_file_upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        # Specify the destination folder for saving the file
        destination_folder = 'backend/'

        # Save the file to the specified folder
        file.save(destination_folder + file.filename)
        return jsonify({'message': 'File uploaded successfully'})

    elif request.method == 'GET':
        return jsonify({'message': 'Server is running'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
  
