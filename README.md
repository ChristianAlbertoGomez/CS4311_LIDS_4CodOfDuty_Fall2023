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
*  Mr. Sebastián Quiñones 
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

### Available Scripts

#### npm start

Runs the app in the development mode.
Opens [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

#### npm install

Installs the necessary files so t hat you are able to run the app in developement mode.

## Date:

September 17, 2023,  3:42 PM
