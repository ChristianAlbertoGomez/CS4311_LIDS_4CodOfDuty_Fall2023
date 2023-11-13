# Lightweight Intrusion Detection System

## Description

The Lightweight-Intrusion-Detection System (LIDS) is a software product that meets the needs of the DAC cyber analysts at the DEVCOM Analysis Center for conducting Cyber Vulnerability Assessments (CVAs). The customer requested the development of LIDS because publicly available intrusion detection system software products require heavy use of a device’s resources. Therefore, the main objective of this project is to create a lightweight intrusion detection system in terms of required resources, number of dependencies, and total lines of code. As required by the customer, LIDS includes three sub-systems, called agents from now on LIDS agent,
Lightweight Network Intrusion Detection System (LNIDS) agent, and Lightweight Intrusion Detection System Distributed (LIDS-D) agent. Collectively, the three agents compose and work as an intrusion detection system that detects and sends alerts (LIDS agents and LNIDS agents) based on parameters given by the DAC cyber analysts, stores network traffic (LNIDS), and stores alerts generated from several instances of LIDS agents and one LNIDS agent on a single instance of a LIDS-D agent. An overview of each agent (sub-system) follows.

Lightweight Intrusion Detection System (LIDS) Agent

* The LIDS agent detects alerts (malicious network interactions) and is meant to be lightweight on resource consumption, and terminal and graphic interfaces. This is a detection system that monitors network traffic on the DAC cyber analyst’s computer and produces alerts when malicious network packets are detected. The LIDS agent stores both malicious network packets and alerts in the DAC cyber analyst’s computer. The LIDS agent sends alerts to the LIDS-D agent. The LIDS agent makes use of a configuration file to identify whitelist nodes and server connection information. The LIDS agent has a graphical interface and a Command Line Interface. The LIDS system may have several instances of LIDS agents.

Lightweight Network Intrusion Detection System (LNIDS) Agent

* The LNIDS agent detects alerts (malicious network interactions) and is meant to be lightweight on resource consumption and placed on the network SPAN port. The LNIDS agent stores the network traffic in external storage and sends alerts to the LIDS-D agent. The LNIDS agent makes use of a configuration file to identify whitelist nodes and server connection information. The LIDS system has one LNIDS agent.

Lightweight Intrusion Detection System Distributed (LIDS-D) Agent

* The LIDS-D agent accepts connection requests from all LIDS agents and the LNIDS agent on a network. The LIDS-D agent stores the alerts received from LIDS agents and the LNIDS agent. The LIDS-D agent notifies the DAC cyber analysts of alerts as received and allows analysts to review all the alerts at any moment, display the list of nodes, save alerts to external storage, and export alerts. The LIDS-D agent has a terminal interface and a graphic interface. The LIDS system has one LIDS-D agent.

## Customers

* Ms. Diana Ramírez 
* Ms. Herandy Vázquez
* Mr. Sebastián Quiñones 
* Dr. Gurijala

## Team #4: Code of Duty
### Team members

* Darinka Carrasco-Cardona
* Carlos Cepeda 
* Courtney Woods 
* Christian Gomez 
* Christopher Porras 
* Sergio Velasco 
* David Gonzalez 
* Tony Alanis

## Table of Contents
- [Installation](#installation)
- [Troubleshooting](#troubleshooting)
- [LIDS GUI Information](#lidsguiinformation)
- [CLI Information](#cliinformation)
- [Available Scripts](#availablescripts)
- [Contact Information](#contactinformation)
- [Release Date](#releasedate)


## Installation
### Tools & Frameworks

1. **Linux Lite 6.6:**
   - Download Linux Lite 6.6 from [official website](https://www.linuxliteos.com/download.php).
   - Follow the installation instructions provided on the website.

2. **VMware:**
   - Download and install VMware from the [official website](https://www.vmware.com/).
   - Follow the installation instructions for your operating system.

3. **Python v3.10.12:**
   - Download and install Python v3.10.12 from the [official Python website](https://www.python.org/downloads/release).
   - Follow the installation instructions for your operating system.

4. **JavaScript v12.22.09:**
   - JavaScript is typically included in web browsers. Ensure you have a web browser that supports JavaScript.

5. **React v18.2.0:**
   - Install React using npm:
     ```bash
     npm install -g react@18.2.0
     ```

6. **Flask v2.0.1:**
   - Install Flask using pip:
     ```bash
     pip install Flask==2.0.1
     ```
7. **Pyshark v3.1.2:**
   - Install pyshark using pip:
     ```bash
     pip install pyshark==3.1.2
     ```

### Troubleshooting

If you encounter any issues during the installation process, consider the following:

- **Linux Lite Installation Issues:**
  If you are facing problems with Linux Lite installation:
  - Check the official [Linux Lite documentation](https://www.linuxliteos.com/manual/install.html) for comprehensive installation guidance.
  - Visit the [Linux Lite Community Forums](https://www.linuxliteos.com/forums/) to seek assistance from the community.


- **VMware Installation Issues:**
  - Ensure your system meets VMware's requirements. Refer to the official [VMware Compatibility Guide](https://www.vmware.com/resources/compatibility/search.php) for hardware compatibility.
  - Check the [VMware Documentation](https://docs.vmware.com/en/VMware-Workstation-Pro/) for troubleshooting steps.


- **Python Installation Issues:**
  - Double-check that you downloaded the correct version from the [official Python website](https://www.python.org/downloads/).
  - Refer to the [Python Installation Guide](https://docs.python.org/3/using/index.html) for troubleshooting steps.
  - Upgrade pip using:
    ```bash
    pip install --upgrade pip

- **React Installation Issues:**
  - Ensure you have Node.js and npm installed. You can install them using:
    ```bash
    sudo apt-get install nodejs
    sudo apt-get install npm

- **Flask Installation Issues:**
  - Confirm that Python and pip are correctly installed. You can upgrade pip using:
    ```bash
    pip install --upgrade pip

- **Pyshark Installation Issues:**
  - Verify independencies.
  - Confirm that Python and pip are correctly installed. Upgrade pip using:
    ```bash
    pip install --upgrade pip
  - Refer to the Pyshark Documentation for troubleshooting guidance.
  - Ensure that dependencies, such as the wireshark library, are installed. On Linux, you can use:
    ```bash
    sudo apt-get install libwireshark-dev

# LIDS GUI Information

The LIDS (Log-based Intrusion Detection System) GUI provides users with a user-friendly interface for managing system alerts. Here's an overview of the key features and functionalities:

## Welcome Page

On the first page of the LIDS GUI, users can upload a configuration file for the system to read.

## Home Page

Once the configuration file is successfully processed, the LIDS GUI transfers to the second screen, where alerts are organized into data tables with the following information:

### Level

- Ranges from Low (least important) to High (most important).
- Order can be customized from lowest to highest or highest to lowest.

### Time

- Represents the time it took to catch the alert.
- Can be reordered from shortest to longest and vice versa.

### IP

- Displays the IP addresses of the connecting device.

### Port

- Shows the port numbers used by the connecting device.
- Can be reordered from smallest to largest.

### Description

- Provides a description of the actions being taken by the connecting device.

### Notifications

- Highlights any notifications being sent to LIDS.

### Errors

- Lists any errors encountered by LIDS during its operation.

## Alerts Page
### Level

- Ranges from Low (least important) to High (most important).
- Order can be customized from lowest to highest or highest to lowest.

### Time

- Represents the time it took to catch the alert.
- Can be reordered from shortest to longest and vice versa.

### IP

- Displays the IP addresses of the connecting device.

### Port

- Shows the port numbers used by the connecting device.
- Can be reordered from smallest to largest.

### Description

- Provides a description of the actions being taken by the connecting device.
  
## Network Map Page
### Known Devices
- A table that provides a list of all known devices that are connected in real time to the network. The table provides information such as id, user, protocol, operating system, date, and time.
### Unknown Devices
- A table that provides a list of all unknown devices that are connected in real time to the network. The table provides information such as id, user, protocol, operating system, date, and time.
### Config Server
- Button that allows the user to provide or change the current configuration file. Once the configuration file was changed, the server will be restarted.
### Server Report
- Button that provides a summary of the relevant information from the server to the user. Relevant information such as number of malicious packets, number of known/unknown devices, number of alerts, and the current configuration file.
### Alerts
- A table that provides a list of current detected alerts in the network.
## Settings Page
- A page that provides multiple settings for the LIDS device.
## Disconnect
- A button that allows the user to disconnect or turn off the LIDS device.


## CLI Information

The CLI or Command Line Interface is mainly to start the program from the command line or terminal. Once the script is ran, it will open up the LIDS program where you will begin to detect.

A Command Line Interface (CLI) is a text-based interface that enables users to interact with a computer or software application by entering commands into a terminal or command prompt. Unlike graphical user interfaces (GUIs), which rely on visual elements, CLIs operate solely through text-based commands.

## Key Components of a CLI:

1. **Commands:** Users communicate with the system by typing specific commands, usually followed by optional arguments and parameters. These commands instruct the computer to perform various tasks or operations.

2. **Prompt:** The CLI displays a prompt, such as a dollar sign ('$') or a greater-than sign ('>'), indicating that the system is ready to receive a command.

3. **Text Output:** The results of executed commands are displayed as text output in the same terminal. This output provides information about the success or failure of the command and any relevant data.


## Available Scripts
### npm start

Runs the app in the development mode.
Opens [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### npm install

Installs the necessary files so t hat you are able to run the app in developement mode.

## Synopsis

python3 main_dev.py [tag][filename]

### **tag** 

#### **-c**

Tag used for running the Command User Interface (CLI)

#### **-g**

Tag for running the GUI

### filename

the file path of where your current configuration file resides. 

# License

This project is licensed under the terms of the license provided by The University of Texas at El Paso.


# Contact Information

- 

# Release Date:

November 12, 2023,  6:30 PM
