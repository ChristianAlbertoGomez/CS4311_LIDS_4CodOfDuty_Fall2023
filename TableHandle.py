from flask import Flask, render_template, request

app = Flask(__name__)

# Sample data for the table
table_data = [
    {'Lvl': 1, 'Time': 8.233, 'IP': '192.12.4.101', 'Port': 88, 'Description': 'Multiple password attempts'},
    # Add more data rows as needed
]

@app.route('/')
def index():
    return render_template('index.html', data=table_data)

if __name__ == '__main__':
    app.run(debug=True)