.PHONY: build test up down k8s-staging k8s-prod

build:
	docker-compose build

test:
	docker-compose run --rm backend pytest -q || true

up:
	docker-compose up -d

down:
	docker-compose down

k8s-staging:
	kubectl apply -k kubernetes/overlays/staging

k8s-prod:
	kubectl apply -k kubernetes/overlays/production
