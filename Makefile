build:
	docker compose build
	docker compose run --rm api go mod tidy
	docker compose run --rm api go run cmd/initdb.go cmd/seed.go
	docker compose run --rm app npm install
run:
	docker compose up db -d
	docker compose up api
	docker compose up app
down:
	docker compose down
