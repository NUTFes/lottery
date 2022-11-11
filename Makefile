
build:
	docker compose build
	docker compose run --rm go go mod tidy
run:
	docker compose up -d
run-go:
	docker compose up go db -d
run-initdb:
	docker compose up db -d
	docker compose run --rm go go run cmd/initdb.go
down:
	docker compose down
