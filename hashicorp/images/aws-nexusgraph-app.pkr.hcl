# Copyright 2023 Paion Data. All rights reserved.

source "amazon-ebs" "nexusgraph-app" {
  ami_name = "nexusgraph-app"
  force_deregister = "true"
  force_delete_snapshot = "true"

  ami_groups = ["all"]

  instance_type = "t2.micro"
  region = "${var.aws_image_region}"
  source_ami_filter {
    filters = {
      name = "ubuntu/images/*ubuntu-*-20.04-amd64-server-*"
      root-device-type = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {
  name = "install-nexusgraph-app"
  sources = [
    "source.amazon-ebs.nexusgraph-app"
  ]

  # Load SSL Certificates into AMI image
  provisioner "file" {
    source = "./server-app.crt"
    destination = "/home/ubuntu/server.crt"
  }
  provisioner "file" {
    source = "./server-app.key"
    destination = "/home/ubuntu/server.key"
  }

  # Load Nginx config file into AMI image
  provisioner "file" {
    source = "./nginx-ssl-app.conf"
    destination = "/home/ubuntu/nginx-ssl.conf"
  }

  provisioner "shell" {
    script = "../scripts/setup-app.sh"
  }
}
