#!/bin/bash
set -x

# Copyright 2023 Paion Data. All rights reserved.

sudo apt update && sudo apt upgrade -y
sudo apt install software-properties-common -y

# Install Node 16
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install npm & yarn
sudo npm install -g npm
sudo npm install -g yarn

# Bundle up app
git clone https://github.com/paion-data/nexusgraph.git
cd /home/ubuntu/nexusgraph
yarn
yarn build

# Install Nginx and load SSL config
sudo apt install -y nginx
sudo mv /home/ubuntu/nginx-ssl.conf /etc/nginx/sites-enabled/default
sudo mv /home/ubuntu/server.crt /etc/ssl/certs/server.crt
sudo mv /home/ubuntu/server.key /etc/ssl/private/server.key

# Install Python 3.10 for http server running app
sudo apt update && sudo apt upgrade -y
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt install python3.10 -y
sudo apt install python3-pip -y
sudo apt install python3.10-venv -y
alias python=python3.10
alias python3=python3.10
