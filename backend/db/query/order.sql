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
SELECT * FROM "order" ORDER BY order_id DESC LIMIT $1 OFFSET $2;

-- name: UpdateOrder :one
UPDATE "order" SET
    name = $1,
    surname = $2,
    phone_number = $3,
    language_from = $4,
    language_to = $5,
    number_of_pages = $6,
    notary_id = $7,
    total_payment = $8,
    down_payment = $9,
    remaining = $10,
    translator_id = $11,
    expenses = $12,
    status_id = $13,
    details = $14
WHERE order_id = $15 RETURNING *;

-- name: DeleteOrder :exec
DELETE FROM "order" WHERE order_id = $1;

-- name: GetOrdersCount :one
SELECT COUNT(*) FROM "order";
