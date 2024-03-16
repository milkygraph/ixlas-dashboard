package api

import (
	"database/sql"
	"fmt"
	db "ixlas-dashboard/db/sqlc"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type accountResponse struct {
	Username         string        `json:"username"`
	Email            string        `json:"email"`
	Created_at       string        `json:"created_at"`
	PrivilegeLevelID sql.NullInt32 `json:"privilege_level_id"`
}

func newAccountResponse(account db.Account) accountResponse {
	return accountResponse{
		Username:         account.Username,
		Email:            account.Email,
		Created_at:       account.CreatedAt.String(),
		PrivilegeLevelID: account.PrivilegeLevelID,
	}
}

type createAccountRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
}

func (s *Server) createAccount(c *gin.Context) {
	var req createAccountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, apiError(err))
		return
	}

	args := db.CreateAccountParams{
		Username: req.Username,
		Email:    req.Email,
		Password: req.Password,
	}

	// Create an account with pending status
	account, err := s.query.CreateAccount(c, args)
	if err != nil {
		c.JSON(http.StatusBadRequest, apiError(err))
		return
	}

	c.JSON(http.StatusOK, newAccountResponse(db.Account{
		Username:  account.Username,
		Email:     account.Email,
		CreatedAt: time.Now(),
	}))
}

type loginAccountRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type loginUnserResponse struct {
	SessionID           uuid.UUID       `json:"session_id"`
	User                accountResponse `json:"user"`
	AccessToken         string          `json:"access_token"`
	RefreshToken        string          `json:"refresh_token"`
	AccessTokenExpires  time.Time       `json:"access_token_expires"`
	RefreshTokenExpires time.Time       `json:"refresh_token_expires"`
}

func (s *Server) loginAccount(c *gin.Context) {
	var req loginAccountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, apiError(err))
		return
	}

	account, err := s.query.GetAccount(c, req.Username)
	if err != nil {
		fmt.Print(err)
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, apiError(err))
			return
		}
		c.JSON(http.StatusInternalServerError, apiError(err))
		return
	}

	// Check for the password
	if account.Password != req.Password {
		c.JSON(http.StatusUnauthorized, apiError(fmt.Errorf("invalid password")))
		return
	}

	// Create a new session
	accessToken, accessPayload, err := s.tokenMaker.CreateToken(req.Username, time.Hour*20)
	if err != nil {
		c.JSON(http.StatusInternalServerError, apiError(err))
	}

	refreshToken, refreshPayload, err := s.tokenMaker.CreateToken(req.Username, time.Hour*24*7)
	if err != nil {
		c.JSON(http.StatusInternalServerError, apiError(err))
	}

	sessionID, err := s.query.CreateSession(c, db.CreateSessionParams{
		ID:           uuid.New(),
		Username:     req.Username,
		RefreshToken: refreshToken,
		UserAgent:    c.Request.UserAgent(),
		IpAddress:    c.ClientIP(),
		IsBlocked:    false,
		ExpiresAt:    refreshPayload.Expires_at,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, apiError(err))
	}

	c.JSON(http.StatusOK, loginUnserResponse{
		SessionID:           sessionID.ID,
		User:                newAccountResponse(account),
		AccessToken:         accessToken,
		RefreshToken:        refreshToken,
		AccessTokenExpires:  accessPayload.Expires_at,
		RefreshTokenExpires: refreshPayload.Expires_at,
	})
}
