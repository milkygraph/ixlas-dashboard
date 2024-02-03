package api

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

type CreateStatusRequest struct {
	Name string `json:"name"`
}

func (s *Server) createStatus(c *gin.Context) {
	var req CreateStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	status, err := s.query.CreateStatus(c, req.Name)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, status)
}

func (s *Server) getStatus(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a number"})
		return
	}

	status, err := s.query.GetStatus(c, int32(id))
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, status)
}

func (s *Server) getStatuses(c *gin.Context) {
	statuses, err := s.query.GetStatuses(c)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, statuses)
}
