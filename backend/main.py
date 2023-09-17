from config import *

def options(userInp):
  options ={
  1: setConfigFile(),
  2: "Show PCAP",
  3: "Select PCAP",
  4: "Alerts",
  5: "Help",
  }
  return options[userInp]
  
menu = True
while menu:
  print('Welcome, please select one of the following options (1-6)')
  userInp = int(input("1) Configuration File\n2) Show PCAP\n3) Select PCAP\n4) Alerts\n5) Help\n6) Exit\n"))
  if userInp > 6 or userInp < 1:
    print("Please select a valid option")
  elif userInp == 6:
    print("Have a great day")
    menu = False
  else:
    options(userInp)