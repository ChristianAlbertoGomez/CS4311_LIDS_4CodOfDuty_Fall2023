from tabulate import tabulate

# Define your data as a list of lists (each inner list represents a row)
def alertTable():
    data = [
        [2, 11.6578, "192.128.0.1", 80, "Unknown host ping"],
        [3, 11.6578, "193.127.0.2", 27, "port scan"],
        [1, 11.6578, "192.128.0.1", 80, "Fail login attempt"],
        [2, 11.6578, "193.124.0.3", 4040, "Unknown host ping"]
    ]

    # Define the headers for your table
    headers = ["Level", "Time", "IP", "Port", "Description"]

    # Use the tabulate function to format the table
    table = tabulate(data, headers, tablefmt="grid")

    # Print the formatted table
    print(table)
