terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source     = "./modules/vpc"
  cidr_block = var.vpc_cidr
}

module "eks" {
  source     = "./modules/eks"
  subnet_ids = module.vpc.private_subnet_ids
  cluster_name = "book-library-cluster"
}

module "rds" {
  source          = "./modules/rds"
  db_name         = "bookdb"
  username        = "user"
  password        = "password12345"
  subnet_ids      = module.vpc.private_subnet_ids
  vpc_security_groups = [module.vpc.default_sg_id]
}
