variable "aws_image_region" {
  type =  string
  sensitive = true
}

variable "app_nexusgraph_com_ssl_cert_file_path" {
  type =  string
  sensitive = true
}

variable "app_nexusgraph_com_ssl_cert_key_file_path" {
  type =  string
  sensitive = true
}

variable "app_nexusgraph_com_nginx_config_file_path" {
  type =  string
  sensitive = true
}

variable "app_nexusgraph_com_dot_env_file_path" {
  type =  string
  sensitive = true
}

variable "skip_create_ami" {
  type =  bool
  sensitive = true
}

packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "app-nexusgraph-com" {
  ami_name = "app-nexusgraph-com"
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
  name = "install-app-nexusgraph-com"
  sources = [
    "source.amazon-ebs.app-nexusgraph-com"
  ]

  # Load SSL Certificates into AMI image
  provisioner "file" {
    source = "${var.app_nexusgraph_com_ssl_cert_file_path}"
    destination = "/home/ubuntu/aws-app-nexusgraph-com.crt"
  }
  provisioner "file" {
    source = "${var.app_nexusgraph_com_ssl_cert_key_file_path}"
    destination = "/home/ubuntu/aws-app-nexusgraph-com.key"
  }

  # Load Nginx config file into AMI image
  provisioner "file" {
    source = "${var.app_nexusgraph_com_nginx_config_file_path}"
    destination = "/home/ubuntu/app-nexusgraph-com-nginx.conf"
  }

  # Load React env file into AMI image
  provisioner "file" {
    source = "${var.app_nexusgraph_com_dot_env_file_path}"
    destination = "/home/ubuntu/app-nexusgraph-com-nginx.env"
  }

  provisioner "shell" {
    script = "../scripts/aws-app-nexusgraph-com-pkr-setup.sh"
  }
}
