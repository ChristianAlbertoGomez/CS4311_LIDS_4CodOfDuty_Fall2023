# from flask import Flask, request, jsonify

# app = Flask(__name__)

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({'message': 'No file part'})

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({'message': 'No selected file'})

#     # Process the uploaded file as needed (e.g., save it to the server or perform some operations)
#     # In this example, we're just returning the file name
#     return jsonify({'message': 'File uploaded successfully', 'filename': file.filename})

# if __name__ == '__main__':
#     app.run(debug=True)