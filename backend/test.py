from flask import Flask, request, jsonify
from flask_cors import CORS 


app = Flask(__name__)
CORS(app,origins=["http://localhost:3000"] )

@app.route('/', methods=['POST', 'GET'])
def handle_file_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Optionally, you can save the uploaded file to a directory.
    # To save it in a directory called 'uploads', you can use the following code:
    # file.save('uploads/' + secure_filename(file.filename))

    # You can then process the file or return a response as needed.
    print(file)
    return jsonify({'message': 'File uploaded successfully'})
  

if __name__ == '__main__':
  app.run(host='127.0.0.1', port=5000)
