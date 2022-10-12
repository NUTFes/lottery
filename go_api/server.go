package main

import (
  "os"
  "api/domain"
  "github.com/labstack/echo/v4"
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
  "net/http"
)

var (
  db  *gorm.DB
  err error
  dsn = os.Getenv("DSN")
)

func main() {
  dbinit()
  e := echo.New()
  e.GET("/", healthCheck)
  e.Logger.Fatal(e.Start(":1323"))
}

func healthCheck(c echo.Context) error {
  return c.String(http.StatusOK, "Health Check")
}

func dbinit() {
  db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
  if err != nil {
  }
  db.Migrator().CreateTable(domain.User{})
}