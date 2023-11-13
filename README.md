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
- [LIDS GUI Information](#lidsguiinformation)
- [CLI Information](#cliinformation)
- [Tools & Framewords](#tools&frameworks)
- [Available Scripts](#availablescripts)


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

### Troubleshooting

If you encounter any issues during the installation process, consider the following:

- **Linux Lite Installation Issues:**
  - Check the official Linux Lite documentation and community forums for troubleshooting.

- **VMware Installation Issues:**
  - Ensure your system meets VMware's requirements.
  - Check the VMware documentation for troubleshooting steps.

- **Python Installation Issues:**
  - Double-check that you downloaded the correct version.
  - Refer to the Python documentation for installation troubleshooting.

- **React Installation Issues:**
  - Make sure you have Node.js and npm installed.
  - Check the React documentation for troubleshooting.

- **Flask Installation Issues:**
  - Confirm that Python and pip are correctly installed.
  - Refer to the Flask documentation for troubleshooting.




## LIDS GUI Information

First page, LIDS GUI allows the users to upload a configuration file for the system to read.  Once readable, it transfers to the second screen where the alerts are put into data tables where it shows the following:

Level

* Ranges from Low (least important) to High (most important). You can, also, order them from lowest to highest or highest to lowest.

Time

* The time it took to catch the alert, can be reordered from shorest to longest and vice versa.

IP

* IP addresses of the connecting device

Port

* Port numbers used by the connecting device, can be reordered from smallest to largest.

Description

* Description of the actions being taken from the connecting device.

Notifications

* Shows any notifications being taken towards LIDS

Errors

* Any errors that LIDS has ran into.

## CLI Information

The CLI or Command Line Interface is mainly to start the program from the command line or terminal. Once the script is ran, it will open up the LIDS program where you will begin to detect.

## Tools & Frameworks
* Linux Lite 6.6
* VMware 
* Python v3.10.12
* JavaScript v12.22.09
* React v18.2.0
* Flask v2.0.1

### Available Scripts

#### npm start

Runs the app in the development mode.
Opens [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

#### npm install

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

## Date:

October 30, 2023,  9:30 PM
