#!/bin/sh

set -e

echo "Running database migrations..."
migrate -path /app/migration/ -database "postgresql://root:kurero17@localhost:5432/ixlas?sslmode=disable" -verbose up

echo "Starting server..."
exec "$@"
