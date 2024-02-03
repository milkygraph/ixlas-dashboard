-- name: CreateNotary :one
INSERT INTO notary (
    notary_name
) VALUES ( 
    $1
) RETURNING *;

-- name: GetNotary :one
SELECT * FROM notary WHERE notary_id = $1;

-- name: GetNotaries :many
SELECT * FROM notary ORDER BY notary_name;

-- name: UpdateNotary :one
UPDATE notary SET
    notary_name = $2
WHERE notary_id = $1
RETURNING *;

-- name: DeleteNotary :exec
DELETE FROM notary WHERE notary_id = $1;
