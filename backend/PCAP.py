from tabulate import tabulate

# Define your data as a list of lists (each inner list represents a row)
def pcapTable:
    data = [
        ["5.05", "192.168.0.8", "198.809.9.1","TCP","64","4830 -> 80 [SYN] Seq = 0..."],
        ["64.05", "193.156.0.1", "198.809.9.1","HTTP","478","POST/Action_page.php HTTP..."],
        ["12.05", "176.189.0.2", "198.809.9.1","TCP","120","4830 -> 80 [SYN] Seq = 1..."],
    ]
    
    # Define the headers for your table
    headers = ["Time", "Source", "Destination","Protocol","Length","Description"]
    
    # Use the tabulate function to format the table
    table = tabulate(data, headers, tablefmt="grid")
    
    # Print the formatted table
    print(table)
