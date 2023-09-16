from tabulate import tabulate

# Define your data as a list of lists (each inner list represents a row)
data = [
    ["Alice", 28, "Engineer"],
    ["Bob", 35, "Designer"],
    ["Charlie", 22, "Manager"],
]

# Define the headers for your table
headers = ["Name", "Age", "Occupation"]

# Use the tabulate function to format the table
table = tabulate(data, headers, tablefmt="grid")

# Print the formatted table
print(table)
