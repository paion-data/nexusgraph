packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "messier-61" {
  ami_name      = "paion-data-messier-61"
  instance_type = "t2.micro"
  region        = "us-west-1"
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/*ubuntu-xenial-16.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {
  name = "install-messier-61"
  sources = [
    "source.amazon-ebs.messier-61"
  ]

  provisioner "shell" {
    inline = [
      "sudo apt update",
      "sudo apt install nodejs -y",
      "sudo apt install npm -y",
      "sudo npm install --global yarn",
      "git clone https://github.com/paion-data/Messier-61.git",
      "cd Messier-61/packages/messier-61-graph",
      "yarn install",
      "yarn start"
    ]
  }
}