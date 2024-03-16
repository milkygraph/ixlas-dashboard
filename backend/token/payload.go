package token

import (
	"errors"
	"time"

	uuid "github.com/google/uuid"
)

var (
	ErrorInvalidToken = errors.New("invalid token")
	ErrorExpiredToken = errors.New("token expired")
)

type Payload struct {
	ID         uuid.UUID `json:"id"`
	Username   string    `json:"username"`
	Created_at time.Time `json:"created_at"`
	Expires_at time.Time `json:"expires_at"`
}

func (p *Payload) Valid() error {
	if time.Now().After(p.Expires_at) {
		return ErrorExpiredToken
	}
	return nil
}

func NewPayload(username string, duration time.Duration) (*Payload, error) {
	tokenID, err := uuid.NewRandom()
	if err != nil {
		return nil, err
	}

	return &Payload{
		ID:         tokenID,
		Username:   username,
		Created_at: time.Now(),
		Expires_at: time.Now().Add(duration),
	}, nil
}
