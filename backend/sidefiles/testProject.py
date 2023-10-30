import typer
import subprocess
from PyInquirer import prompt, print_json, Separator
from rich import print as rprint
import PCAP as pcap

app = typer.Typer()

@app.command("g")
def sample():
    subprocess.run(f'npm start', shell=True)

if __name__ == '__main__':
    app()
    