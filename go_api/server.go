package main

import (
  "github.com/labstack/echo/v4"
  _"gorm.io/gorm"
  "net/http"
)

func main() {
  e := echo.New()
  e.GET("/", healthCheck)
  e.Logger.Fatal(e.Start(":1323"))
}

func healthCheck(c echo.Context) error {
  return c.String(http.StatusOK, "Health Check")
}
