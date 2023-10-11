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

# Setup Messier-61
git clone https://github.com/paion-data/Messier-61.git
cd /home/ubuntu/Messier-61
yarn
cd packages/messier-61-app
yarn
