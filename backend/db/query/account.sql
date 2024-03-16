-- name: CreateAccount :one
INSERT INTO accounts (
    username,
    email,
    password
) VALUES (
    $1,
    $2,
    $3
) RETURNING id, username, email, created_at;

-- name: GetAccount :one
SELECT * FROM accounts WHERE username = $1 LIMIT 1;
