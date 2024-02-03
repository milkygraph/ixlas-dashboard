-- name: CreateStatus :one
INSERT INTO status (
    status_name
) VALUES ( 
    $1
) RETURNING *;

-- name: GetStatus :one
SELECT * FROM status WHERE status_id = $1;

-- name: GetStatuses :many
SELECT * FROM status ORDER BY status_name;
