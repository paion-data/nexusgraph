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

# Bundle up landing page
git clone https://github.com/paion-data/nexusgraph.git
cd /home/ubuntu/nexusgraph
yarn
cd packages/nexusgraph-landing-page
yarn
yarn build

# Install Nginx and load SSL config
sudo apt install -y nginx
sudo mv /home/ubuntu/nginx-ssl.conf /etc/nginx/sites-enabled/default
sudo mv /home/ubuntu/server.crt /etc/ssl/certs/server.crt
sudo mv /home/ubuntu/server.key /etc/ssl/private/server.key
