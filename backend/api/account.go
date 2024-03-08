package api

import (
	db "ixlas-dashboard/db/sqlc"

	"github.com/gin-gonic/gin"
)

type LoginAccountRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type CreateAccountRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
}

func (s *Server) createAccount(c *gin.Context) {
	var req CreateAccountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	args := db.CreateAccountParams{
		Username: req.Username,
		Email:    req.Email,
		Password: req.Password,
	}

	_, err := s.query.CreateAccount(c, args)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "success"})
}

func (s *Server) loginAccount(c *gin.Context) {
	var req LoginAccountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	user, err := s.query.GetAccount(c, req.Username)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if user.Password != req.Password {
		c.JSON(400, gin.H{"error": "invalid password"})
		return
	}

	c.JSON(200, gin.H{"message": "success"})
}
