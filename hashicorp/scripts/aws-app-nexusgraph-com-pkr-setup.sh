#!/bin/bash
set -x
set -e

# Copyright 2023 Paion Data. All rights reserved.

sudo apt update && sudo apt upgrade -y
sudo apt install software-properties-common -y

# Install Node 16
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install npm & yarn
sudo npm install -g npm@latest
npm -v
sudo npm install -g yarn

# Install serve for http server running app
sudo npm install -g serve

# Bundle up app
git clone https://github.com/paion-data/nexusgraph.git
cd /home/ubuntu/nexusgraph
mv /home/ubuntu/app-nexusgraph-com-nginx.env ./.env
yarn
yarn build

# Install Nginx and load SSL config
sudo apt install -y nginx
sudo mv /home/ubuntu/app-nexusgraph-com-nginx.conf /etc/nginx/sites-enabled/default
sudo mv /home/ubuntu/aws-app-nexusgraph-com.crt /etc/ssl/certs/server.crt
sudo mv /home/ubuntu/aws-app-nexusgraph-com.key /etc/ssl/private/server.key
