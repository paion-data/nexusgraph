# Copyright 2023 Paion Data. All rights reserved.

variable "aws_deploy_region" {
  type = string
  description = "The EC2 region"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.42.0"
    }
  }
  required_version = ">= 0.14.5"
}

provider "aws" {
  region = var.aws_deploy_region
}

data "aws_ami" "latest-paion-data-messier-61" {
  most_recent = true
  owners = ["899075777617"]

  filter {
    name   = "name"
    values = ["paion-data-messier-61"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "paion-data-messier-61-instance" {
  ami = "${data.aws_ami.latest-paion-data-messier-61.id}"
  instance_type = "t2.micro"
  tags = {
    Name = "Paion Data Messier-61"
  }

  user_data = <<-EOF
    #!/bin/bash
    cd /home/ubuntu/Messier-61/packages/messier-61-app
    yarn start
  EOF
}
