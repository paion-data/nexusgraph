# Copyright 2023 Paion Data. All rights reserved.

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
    Name = "Paion Data nexusgraph Landing Page"
  }
  security_groups = ["Paion Data nexusgraph Landing Page"]

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
