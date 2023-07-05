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

data "aws_ami" "latest-nexusgraph-landing-page" {
  most_recent = true
  owners = ["899075777617"]

  filter {
    name   = "name"
    values = ["nexusgraph-landing-page"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "nexusgraph-landing-page" {
  ami = "${data.aws_ami.latest-nexusgraph-landing-page.id}"
  instance_type = "t2.micro"
  tags = {
    Name = "Nexus Graph Landing Page"
  }
  security_groups = ["nexusgraph Landing Page"]

  user_data = <<-EOF
    #!/bin/bash
    cd /home/ubuntu/nexusgraph/packages/nexusgraph-landing-page
    serve -s build
  EOF
}

resource "aws_route53_record" "nexusgraph-com" {
  zone_id         = var.zone_id
  name            = "nexusgraph.com"
  type            = "A"
  ttl             = 300
  records         = [aws_instance.nexusgraph-landing-page.public_ip]
  allow_overwrite = true
}
