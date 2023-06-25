# Copyright 2023 Paion Data. All rights reserved.

packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "paion-data-messier-61" {
  ami_name = "paion-data-messier-61"
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
  name = "install-paion-data-messier-61"
  sources = [
    "source.amazon-ebs.paion-data-messier-61"
  ]

  provisioner "shell" {
    script = "../scripts/setup.sh"
  }
}
