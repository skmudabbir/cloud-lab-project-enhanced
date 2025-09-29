resource "aws_vpc" "this" {
  cidr_block           = var.cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true
}

resource "aws_subnet" "private" {
  count                   = 2
  vpc_id                  = aws_vpc.this.id
  cidr_block              = cidrsubnet(var.cidr_block, 4, count.index + 1)
  map_public_ip_on_launch = false
}

resource "aws_security_group" "default" {
  name        = "default-sg"
  description = "Default SG"
  vpc_id      = aws_vpc.this.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "private_subnet_ids" {
  value = [for s in aws_subnet.private : s.id]
}

output "default_sg_id" {
  value = aws_security_group.default.id
}
