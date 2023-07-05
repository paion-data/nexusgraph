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

provider "aws" {
  region = var.aws_deploy_region
}
