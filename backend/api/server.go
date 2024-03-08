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

	// Enable CORS
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	router.POST("/login", s.loginAccount)
	router.POST("/account", s.createAccount)

	router.GET("/translators", s.getTranslators)
	router.GET("/translator/:id", s.getTranslator)
	router.POST("/translator", s.createTranslator)
	router.PUT("/translator/:id", s.updateTranslator)
	router.DELETE("/translator/:id", s.deleteTranslator)

	router.GET("/statuses", s.getStatuses)
	router.GET("/status/:id", s.getStatus)
	router.POST("/status", s.createStatus)

	router.GET("/notaries", s.getNotaries)
	router.GET("/notary/:id", s.getNotary)
	router.POST("/notary", s.createNotary)
	router.PUT("/notary/:id", s.updateNotary)
	router.DELETE("/notary/:id", s.deleteNotary)

	router.GET("/orders/:page", s.getOrders)
	router.GET("/order/:id", s.getOrder)
	router.PUT("/order/:id", s.updateOrder)
	router.POST("/order", s.createOrder)
	router.DELETE("/order/:id", s.deleteOrder)
	router.GET("/orders/count", s.getOrdersCount)

	router.GET("/languages", s.getLanguages)

	s.router = router
}
