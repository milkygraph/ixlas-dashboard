package api

import (
	db "ixlas-dashboard/db/sqlc"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (s *Server) getNotaries(c *gin.Context) {
	notaries, err := s.query.GetNotaries(c)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, notaries)
}

func (s *Server) getNotary(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a valid number"})
		return
	}

	notary, err := s.query.GetNotary(c, int32(id))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, notary)
}

type CreateNotaryRequest struct {
	Name string `json:"name"`
}

func (s *Server) createNotary(c *gin.Context) {
	var req CreateNotaryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	notary, err := s.query.CreateNotary(c, req.Name)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, notary)
}

type UpdateNotaryRequest struct {
	Name string `json:"notary_name"`
}

func (s *Server) updateNotary(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 32)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a number"})
		return
	}

	var req UpdateNotaryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	notary, err := s.query.UpdateNotary(c, db.UpdateNotaryParams{
		NotaryID:   int32(id),
		NotaryName: req.Name,
	})
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, notary)
}

func (s *Server) deleteNotary(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a number"})
		return
	}

	err = s.query.DeleteNotary(c, int32(id))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"status": "ok"})
}
