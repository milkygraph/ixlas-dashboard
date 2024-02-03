package api

import (
	db "ixlas-dashboard/db/sqlc"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (s *Server) getTranslators(c *gin.Context) {
	translators, err := s.query.GetTranslators(c)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, translators)
}

func (s *Server) getTranslator(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a valid number"})
		return
	}

	translator, err := s.query.GetTranslator(c, int64(id))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, translator)
}

type CreateTranslatorRequest struct {
	Name        string `json:"name"`
	Surname     string `json:"surname"`
	PhoneNumber string `json:"phone_number"`
	Email       string `json:"email"`
}

func (s *Server) createTranslator(c *gin.Context) {
	var req CreateTranslatorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	args := db.CreateTranslatorParams{
		Name:        req.Name,
		Surname:     req.Surname,
		PhoneNumber: req.PhoneNumber,
		Email:       req.Email,
	}

	translator, err := s.query.CreateTranslator(c, args)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, translator)
}

func (s *Server) deleteTranslator(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a valid number"})
		return
	}

	err = s.query.DeleteTranslator(c, int64(id))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"status": "ok"})
}
