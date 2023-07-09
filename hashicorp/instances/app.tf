# Copyright 2023 Paion Data. All rights reserved.

variable "aws_deploy_region" {
  type = string
  description = "The EC2 region"
}

variable "zone_id" {
  type = string
  description = "Hosted zone ID on Route 53"
  sensitive = true
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

data "aws_ami" "latest-nexusgraph-app" {
  most_recent = true
  owners = ["899075777617"]

  filter {
    name   = "name"
    values = ["nexusgraph-app"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "nexusgraph-app" {
  ami = "${data.aws_ami.latest-nexusgraph-app.id}"
  instance_type = "t2.micro"
  tags = {
    Name = "Paion Data nexusgraph App"
  }
  security_groups = ["Paion Data nexusgraph"]

  user_data = <<-EOF
    #!/bin/bash
    cd /home/ubuntu/nexusgraph/dist
    python3 -m http.server 9000 --bind 127.0.0.1
  EOF
}

resource "aws_route53_record" "app-nexusgraph" {
  zone_id         = var.zone_id
  name            = "app.nexusgraph.com"
  type            = "A"
  ttl             = 300
  records         = [aws_instance.nexusgraph-app.public_ip]
  allow_overwrite = true
}
