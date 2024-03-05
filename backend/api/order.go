package api

import (
	"fmt"
	db "ixlas-dashboard/db/sqlc"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func (s *Server) getOrders(c *gin.Context) {
	pageParam := c.Param("page")
	page, err := strconv.ParseInt(pageParam, 10, 64)
	if err != nil {
		fmt.Println(err)
		fmt.Println("pageParam: ", pageParam)
		c.JSON(400, gin.H{"error": "page must be a valid number"})
		return
	}

	args := db.GetOrdersParams{
		Limit:  10,
		Offset: 10 * (int32(page) - 1),
	}
	orders, err := s.query.GetOrders(c, args)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, orders)
}

func (s *Server) getOrder(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a valid number"})
		return
	}

	order, err := s.query.GetOrder(c, id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, order)
}

// CreateOrderRequest defines the request JSON for creating a new order
type CreateOrderRequest struct {
	Name          string `json:"name" binding:"required"`
	Surname       string `json:"surname" binding:"required"`
	PhoneNumber   string `json:"phone_number" binding:"required"`
	LanguageFrom  string `json:"language_from" binding:"required"`
	LanguageTo    string `json:"language_to" binding:"required"`
	NumberOfPages int32  `json:"number_of_pages" binding:"required"`
	NotaryID      int32  `json:"notary_id" binding:"required"`
	TotalPayment  string `json:"total_payment" binding:"required"`
	DownPayment   string `json:"down_payment" binding:"required"`
	TranslatorID  int32  `json:"translator_id" binding:"required"`
	Expenses      string `json:"expenses"`
	Details       string `json:"details"`
}

func (s *Server) createOrder(c *gin.Context) {
	var req CreateOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	args := db.CreateOrderParams{
		IssuedDate:    time.Now(),
		Name:          req.Name,
		Surname:       req.Surname,
		PhoneNumber:   req.PhoneNumber,
		LanguageFrom:  req.LanguageFrom,
		LanguageTo:    req.LanguageTo,
		NumberOfPages: req.NumberOfPages,
		NotaryID:      req.NotaryID,
		TotalPayment:  req.TotalPayment,
		DownPayment:   req.DownPayment,
		Remaining:     req.TotalPayment,
		TranslatorID:  req.TranslatorID,
		Expenses:      req.Expenses,
		StatusID:      1,
		Details:       req.Details,
	}

	fmt.Println(args.IssuedDate)

	order, err := s.query.CreateOrder(c, args)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, order)
}

type UpdateOrderRequest struct {
	IssuedDate    time.Time `json:"issued_date" binding:"required"`
	Name          string    `json:"name" binding:"required"`
	Surname       string    `json:"surname" binding:"required"`
	PhoneNumber   string    `json:"phone_number" binding:"required"`
	LanguageFrom  string    `json:"language_from" binding:"required"`
	LanguageTo    string    `json:"language_to" binding:"required"`
	NumberOfPages int32     `json:"number_of_pages" binding:"required"`
	NotaryID      int32     `json:"notary_id" binding:"required"`
	TotalPayment  string    `json:"total_payment" binding:"required"`
	DownPayment   string    `json:"down_payment" binding:"required"`
	Remaining     string    `json:"remaining" binding:"required"`
	TranslatorID  int32     `json:"translator_id" binding:"required"`
	Expenses      string    `json:"expenses"`
	StatusID      int32     `json:"status_id" binding:"required"`
	Details       string    `json:"details"`
}

func (s *Server) updateOrder(c *gin.Context) {
	var req UpdateOrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a valid number"})
		return
	}

	args := db.UpdateOrderParams{
		OrderID:       id,
		Name:          req.Name,
		Surname:       req.Surname,
		PhoneNumber:   req.PhoneNumber,
		LanguageFrom:  req.LanguageFrom,
		LanguageTo:    req.LanguageTo,
		NumberOfPages: req.NumberOfPages,
		NotaryID:      req.NotaryID,
		TotalPayment:  req.TotalPayment,
		DownPayment:   req.DownPayment,
		Remaining:     req.Remaining,
		TranslatorID:  req.TranslatorID,
		Expenses:      req.Expenses,
		StatusID:      req.StatusID,
		Details:       req.Details,
	}

	order, err := s.query.UpdateOrder(c, args)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, order)
}

func (s *Server) deleteOrder(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseInt(idParam, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": "id must be a valid number"})
		return
	}

	err = s.query.DeleteOrder(c, id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"status": "ok"})
}

func (s *Server) getOrdersCount(c *gin.Context) {
	count, err := s.query.GetOrdersCount(c)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, count)
}
