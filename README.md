# Cloud Lab Project (Full Stack)

A full-stack demo with Flask API, React UI, MySQL, Redis; Docker for local dev, Kubernetes manifests for cluster deploy, and Terraform (AWS) for infra.

## Quick start (local)
1. Install Docker Desktop.
2. `docker-compose up -d`
3. Open http://localhost:3000 (frontend). API runs on http://localhost:5000.

## Using the API
```bash
curl http://localhost:5000/api/books
curl -X POST http://localhost:5000/api/login -H "Content-Type: application/json" -d '{"username":"admin","password":"password"}'
# Use returned token:
curl -X POST http://localhost:5000/api/books -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"name":"The Alchemist","author":"Paulo Coelho","price":9.99}'
```

## Kubernetes
```bash
kubectl apply -k kubernetes/overlays/staging
```

## Terraform (AWS)
```bash
cd terraform/aws
terraform init
terraform apply -auto-approve
```
