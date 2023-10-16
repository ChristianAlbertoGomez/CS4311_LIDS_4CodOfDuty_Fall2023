from tabulate import tabulate
from flask import Flask
import datetime
app = Flask(__name__)


# Get the current "date" and "time"
current_time = datetime.datetime.now()

# Format it as "month-day-year hour-minute-second"
formatted_time = current_time.strftime("%m-%d-%Y %H:%M:%S")


alert = [   
         {
            "level": 'High',
            "time": formatted_time,
            "port": 99,
            "description": 'Brute force connection',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-28-2023',
            "details": 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It is like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.'
            },
            {
            "level": 'High',
            "time": formatted_time,
            "port": 99,
            "description": 'Brute force connection',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-21-2023',
            "details": 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It iss like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',
            },
            {
            "level": 'Low',
            "time": formatted_time,
            "port": 88,
            "description": 'Multiple password attempts',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-28-2023',
            "details": 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.'
            },
            {
            "level": 'Mid',
            "time": formatted_time,
            "port": 48,
            "description": 'Multiple password attempts',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-22-2023',
            "details": 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
            },
            {
            "level": 'Low',
            "time": formatted_time,
            "port": 88,
            "description": 'Multiple password attempts',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-12-2023',
            "details": 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
            },
            {
            "level": 'Mid',
            "time": formatted_time,
            "port": 64,
            "description": 'Account blocked',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-15-2023',
            "details": 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple "time"s.',
            },
            {
            "level": 'High',
            "time": formatted_time,
            "port": 99,
            "description": 'Brute force connection',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-23-2023',
            "details": 'Brace yourself for a digital onslaught - a "Brute Force Connection" is underway. An attacker is systematically trying every possible combination of usernames and passwords to gain access to our system. It is like a relentless digital burglar attempting every conceivable key until they break in. We have fortified our defenses to detect and thwart such brute force attacks, as they are inherently malicious in nature and pose a severe threat to our security.',
            },
            {
            "level": 'Low',
            "time": formatted_time,
            "port": 88,
            "description": 'Multiple password attempts',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-28-2023',
            "details": 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
            },
            {
            "level": 'Mid',
            "time": formatted_time,
            "port": 48,
            "description": 'Multiple password attempts',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-28-2023',
            "details": 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
            },
            {
            "level": 'Low',
            "time": formatted_time,
            "port": 88,
            "description": 'Multiple password attempts',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-20-2023',
            "details": 'We have identified a concerning pattern in our system - multiple attempts to access an account with different passwords. This behavior raises alarms as it indicates a potential unauthorized access attempt. It poses a significant risk to the security of your data and our network. Our dedicated security team is already in action, implementing measures to protect your information and thoroughly investigate this incident.',
            },
            {
            "level": 'Mid',
            "time": formatted_time,
            "port": 64,
            "description": 'Account blocked',
            "ipSource": '182.12.4.101',
            "ipDestination": '152.13.1.101',
            "date": '09-02-2023',
            "details": 'Your account has been temporarily restricted, and here is why: We have detected unusual activity, particularly a series of failed login attempts. To safeguard your account from potential unauthorized access, we have taken the precautionary step of blocking access. Think of it as your bank card being temporarily blocked after entering the wrong PIN multiple "time"s.',
            }
        ]


@app.route("/alerts")
def alerts():
    return alert



def createAlerts(packet,whitelist):
    alert.append({"level": 'Mid',"time": 7.653,"ip": '182.12.4.101',"port": 64,"description": 'Account blocked',})
    #return packet['header']
if __name__=="__main__":
    app.run(debug=True)
    createAlerts(0,1)

# Define your data as a list of lists (each inner list represents a row)
def alertTable():
    data = alerts()

    # Use the tabulate function to format the table
    table = tabulate(data, headers='keys', tablefmt="grid")

    # Print the formatted table
    print(table)