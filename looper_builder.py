# TODO: Probably better for this to be ansible.
# 1. Checkout the rpo
# Install nvm
# nvm install node
# npm install


import os
import subprocess

# Change the working directory to the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

def run_command(command):
    try:
        # Run the command and check for errors
        result = subprocess.run(command, check=True, text=True, capture_output=True)
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e}")
        print(e.stderr)


# Git operations
commands = [
    ["/usr/bin/git", "remote", "update"],
    ["/usr/bin/git", "checkout", "production"],
    ["/usr/bin/git", "reset", "--hard", "origin/production"],
    ["/root/.nvm/versions/node/v22.6.0/bin/npm", "install"],
    ["/root/.nvm/versions/node/v22.6.0/bin/npm", "run", "build"],
    ["/root/.nvm/versions/node/v22.6.0/bin/npm", "run", "fetch-chain-data"],
    ["/usr/bin/rsync", "-vah", "--progress",
     "/root/projects/justinholmes.com/dist/",
     "jmyles_justinholmescom@ssh.nyc1.nearlyfreespeech.net:"]
]


for command in commands:
    run_command(command)

