// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.21.0
// source: account.sql

package db

import (
	"context"
	"time"
)

const createAccount = `-- name: CreateAccount :one
INSERT INTO accounts (
    username,
    email,
    password
) VALUES (
    $1,
    $2,
    $3
) RETURNING id, username, email, created_at
`

type CreateAccountParams struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CreateAccountRow struct {
	ID        int32     `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

func (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (CreateAccountRow, error) {
	row := q.db.QueryRowContext(ctx, createAccount, arg.Username, arg.Email, arg.Password)
	var i CreateAccountRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.CreatedAt,
	)
	return i, err
}

const getAccount = `-- name: GetAccount :one
SELECT id, username, password, email, created_at FROM accounts WHERE username = $1 LIMIT 1
`

type GetAccountRow struct {
	ID        int32     `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"password"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

func (q *Queries) GetAccount(ctx context.Context, username string) (GetAccountRow, error) {
	row := q.db.QueryRowContext(ctx, getAccount, username)
	var i GetAccountRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Password,
		&i.Email,
		&i.CreatedAt,
	)
	return i, err
}
