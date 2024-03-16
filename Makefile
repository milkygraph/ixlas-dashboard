postgres:
	docker run --network ixlas --name ixlas-postgres -e POSTGRES_DB=ixlas -e POSTGRES_USER=root -e POSTGRES_PASSWORD=ixlas -p 5432:5432 -d postgres:16-alpine

postgres-start:
	docker start ixlas-postgres

postgres-stop:
	docker stop ixlas-postgres

postgres-remove:
	docker stop ixlas-postgres && \
	docker rm ixlas-postgres

createdb:
	docker exec -it ixlas-postgres createdb --username=root ixlas

dropdb:
	docker exec -it ixlas-postgres dropdb ixlas

migrateup:
	migrate -path ./backend/db/migration -database "postgresql://root:ixlas@localhost:5432/ixlas?sslmode=disable" -verbose up

migratedown:
	migrate -path ./backend/db/migration -database "postgresql://root:ixlas@localhost:5432/ixlas?sslmode=disable" -verbose down 1

sqlc:
	cd backend && sqlc generate

test:
	go test -v -cover ./...

server:
	cd backend/ && air .

frontend:
	cd ./frontend/ixlas-dashboard/ && npm start

.PHONY: postgres createdb dropdb migrateup migratedown sqlc test server frontend
