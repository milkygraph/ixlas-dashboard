-- name: CreateOrder :one
INSERT INTO "order" (
    issued_date,
    name,
    surname,
    phone_number,
    language_from,
    language_to,
    number_of_pages,
    notary_id,
    total_payment,
    down_payment,
    remaining,
    translator_id,
    expenses,
    status_id,
    details
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
) RETURNING *;

-- name: GetOrder :one
SELECT * FROM "order" WHERE order_id = $1;

-- name: GetOrders :many
SELECT * FROM "order" ORDER BY order_id LIMIT $1 OFFSET $2;

-- name: UpdateOrder :one
UPDATE "order" SET
    issued_date = $1,
    name = $2,
    surname = $3,
    phone_number = $4,
    language_from = $5,
    language_to = $6,
    number_of_pages = $7,
    notary_id = $8,
    total_payment = $9,
    down_payment = $10,
    remaining = $11,
    translator_id = $12,
    expenses = $13,
    status_id = $14,
    details = $15
WHERE order_id = $16 RETURNING *;

-- name: DeleteOrder :exec
DELETE FROM "order" WHERE order_id = $1;
