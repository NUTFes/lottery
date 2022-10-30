package main

import (
	"net/http"

	echoSwagger "github.com/swaggo/echo-swagger"

	"github.com/labstack/echo/v4"
)

type (
	Response struct {
		Int64  int64  `json:"int64"`
		String string `json:"string"`
		World  *Item  `json:"world"`
	}

	Item struct {
		Text string `json:"text"`
	}
)

func main() {
	e := echo.New()
	e.GET("/", healthCheck)
	e.GET("/swagger/*", echoSwagger.WrapHandler)
	e.GET("/checkswagger/", checkswagger)
	e.Logger.Fatal(e.Start(":1323"))
}

func healthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "Health Check")
}

func checkswagger(c echo.Context) error {
	return c.JSON(http.StatusOK, &Response{
		Int64:  1,
		String: "string",
		World: &Item{
			Text: "checkswagger",
		},
	})
}
