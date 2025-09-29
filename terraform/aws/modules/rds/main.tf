resource "aws_db_subnet_group" "this" {
  name       = "bookdb-subnet-group"
  subnet_ids = var.subnet_ids
}

resource "aws_db_instance" "this" {
  identifier              = "bookdb-instance"
  allocated_storage       = 20
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t3.micro"
  username                = var.username
  password                = var.password
  db_subnet_group_name    = aws_db_subnet_group.this.name
  publicly_accessible     = false
  vpc_security_group_ids  = var.vpc_security_groups
  skip_final_snapshot     = true
  db_name                 = var.db_name
}

output "endpoint" { value = aws_db_instance.this.address }
