-- name: CreateTranslator :one
INSERT INTO translator (
    name,
    surname,
    phone_number,
    email
) VALUES ( 
    $1, $2, $3, $4
) RETURNING *;

-- name: GetTranslator :one
SELECT * FROM translator WHERE translator_id = $1;

-- name: GetTranslators :many
SELECT * FROM translator ORDER BY name;

-- name: UpdateTranslator :one
UPDATE translator SET
    name = $2,
    surname = $3,
    phone_number = $4,
    email = $5
WHERE translator_id = $1
RETURNING *;

-- name: DeleteTranslator :exec
DELETE FROM translator WHERE translator_id = $1;
