FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN apk add curl
RUN go build -o main .
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.17.0/migrate.linux-amd64.tar.gz --output migrate.tar.gz
RUN tar -xf migrate.tar.gz

FROM alpine:latest AS production
EXPOSE 8080
WORKDIR /app
COPY --from=builder /app/main .
COPY --from=builder /app/migrate /usr/bin/migrate
COPY ./db/migration /app/migration
COPY wait-for.sh /app/
COPY start.sh /app/
CMD [ "/app/main" ]
ENTRYPOINT [ "/app/start.sh" ]
