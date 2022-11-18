
build:
	docker compose build
	docker compose run --rm go go mod tidy
run:
	docker compose up db -d
	docker compose up go
run-initdb:
	docker compose up db -d
	docker compose run --rm go go run cmd/initdb.go
down:
	docker compose down