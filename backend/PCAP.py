from tabulate import tabulate
from flask import Flask, jsonify
# Define your data as a list of lists (each inner list represents a row)

# class Table:
#     def __init__(self,level,time,port,description,ipSource,ipDestination,date,details):
#       self.level = level
#       self.time = time
#       self.port = port 
#       self.description = description
#       self.ipSource = ipSource
#       self.ipDestination = ipDestination
#       self.date = date
#       self.details = details        

# def pcapTable():
#     data = [
#         ['Low',"10:20 PM",88,'Multiple password attempts',
# '182.12.4.101','152.13.1.101',
#  '09-28-2023',
#  'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.']
#     ]
   
    
    # Define the headers for your table
    # headers = ["Time", "Source", "Destination","Protocol","Length","Description"]
    
    
    # Use the tabulate function to format the table
    # table = tabulate(data, headers, tablefmt="grid")
    
    # # Print the formatted table
    # print(table)
    
app = Flask(__name__)
@app.route('/api/object', methods=['GET'])
def sendInfo():
  table =  {
      level: 'Mid',
      time: "dateTime",

      port: 48,
      description: 'Multiple password attempts',
      ipSource: '182.12.4.101',
      ipDestination: '152.13.1.101',
      date: '09-28-2023',
      details: 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',


    }
  return jsonify(table)

if __name__ == '__main__':
    app.run(debug=True)
    
