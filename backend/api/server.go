package api

import (
	db "ixlas-dashboard/db/sqlc"
	"ixlas-dashboard/token"

	"github.com/gin-gonic/gin"
)

type Server struct {
	query      *db.Queries
	router     *gin.Engine
	tokenMaker token.JWTMaker
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
	router.POST("/signup", s.createAccount)

	authRoutes := router.Group("/").Use(authMiddleware(s.tokenMaker))

	authRoutes.GET("/translators", s.getTranslators)
	authRoutes.GET("/translator/:id", s.getTranslator)
	authRoutes.POST("/translator", s.createTranslator)
	authRoutes.PUT("/translator/:id", s.updateTranslator)
	authRoutes.DELETE("/translator/:id", s.deleteTranslator)

	authRoutes.GET("/statuses", s.getStatuses)
	authRoutes.GET("/status/:id", s.getStatus)
	authRoutes.POST("/status", s.createStatus)

	authRoutes.GET("/notaries", s.getNotaries)
	authRoutes.GET("/notary/:id", s.getNotary)
	authRoutes.POST("/notary", s.createNotary)
	authRoutes.PUT("/notary/:id", s.updateNotary)
	authRoutes.DELETE("/notary/:id", s.deleteNotary)

	authRoutes.GET("/orders/:page", s.getOrders)
	authRoutes.GET("/order/:id", s.getOrder)
	authRoutes.PUT("/order/:id", s.updateOrder)
	authRoutes.POST("/order", s.createOrder)
	authRoutes.DELETE("/order/:id", s.deleteOrder)
	authRoutes.GET("/orders/count", s.getOrdersCount)

	authRoutes.GET("/languages", s.getLanguages)

	s.router = router
}
