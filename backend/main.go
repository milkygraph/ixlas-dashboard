package main

import (
	"database/sql"
	"ixlas-dashboard/api"
	db "ixlas-dashboard/db/sqlc"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	conn, err := sql.Open("postgres", "postgresql://root:ixlas@localhost:5432/ixlas?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	queries := db.New(conn)
	server := api.NewServer(queries)
	server.Run()
}
