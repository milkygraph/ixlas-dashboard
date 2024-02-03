package api

import (
	db "ixlas-dashboard/db/sqlc"

	"github.com/gin-gonic/gin"
)

type Server struct {
	query  *db.Queries
	router *gin.Engine
}

func NewServer(q *db.Queries) *Server {
	server := &Server{
		query: q,
	}
	server.setupRouter()
	return server
}

func (s *Server) Run() {
	s.router.Run(":8080")
}

func (s *Server) setupRouter() {
	gin.SetMode(gin.DebugMode)
	router := gin.Default()

	router.GET("/translator", s.getTranslators)
	router.GET("/translator/:id", s.getTranslator)
	router.POST("/translator", s.createTranslator)
	router.DELETE("/translator/:id", s.deleteTranslator)

	router.GET("/status", s.getStatuses)
	router.GET("/status/:id", s.getStatus)
	router.POST("/status", s.createStatus)

	router.GET("/notary", s.getNotaries)
	router.GET("/notary/:id", s.getNotary)
	router.POST("/notary", s.createNotary)
	router.DELETE("/notary/:id", s.deleteNotary)

	router.GET("/order", s.getOrders)
	router.GET("/order/:id", s.getOrder)
	router.POST("/order", s.createOrder)
	router.DELETE("/order/:id", s.deleteOrder)

	s.router = router
}
