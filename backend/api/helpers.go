package api

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func apiError(err error) gin.H {
	fmt.Println(err)
	return gin.H{"error": err.Error()}
}
