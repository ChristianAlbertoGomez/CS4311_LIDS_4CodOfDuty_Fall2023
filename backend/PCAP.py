from tabulate import tabulate

# Define your data as a list of lists (each inner list represents a row)
data = [
    ["12:40", "192.102.1.2", "TCP","18","4000 -> 80 [SYN]..."],
    ["06:25", "187.004.3.5", "TCP","90","2480 -> 80 [SYN]..."],
    ["14:41", "100.821.5.1", "TCP","92","2480 -> 80 [SYN]..."],
]

# Define the headers for your table
headers = ["Time", "Source", "Destination","Protocol","Length","Description"]

# Use the tabulate function to format the table
table = tabulate(data, headers, tablefmt="grid")

# Print the formatted table
print(table)
