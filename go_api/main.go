package main

import (
	"net/http"

	_ "github.com/NUTFes/lottery/go_api/docs"
	"github.com/NUTFes/lottery/go_api/infrastructure"
	controller "github.com/NUTFes/lottery/go_api/interfaces"
	"github.com/NUTFes/lottery/go_api/usecase"
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

// @title NUTFes Lottery API
// @version 1.0
// @description NUTFes Lottery API
// @host localhost:1323
// @BasePath /
// @schemes http

func main() {
	e := echo.New()
	// DB接続
	client := infrastructure.ConnectDB()

	// 依存の方向：controller -> usecase -> domain <- infrastructure
	userInfrastructure := infrastructure.NewUserInfrastructure(client)
	eventInfrastructure := infrastructure.NewEventInfrastructure(client)

	userUsecase := usecase.NewUserUsecase(userInfrastructure)
	eventUsecase := usecase.NewEventUsecase(eventInfrastructure)

	userController := controller.NewUserController(userUsecase)
	eventController := controller.NewEventController(eventUsecase)

	// ルーティング(APIが増えると、server.goが肥大化するので、今後別にファイルに分ける)

	// users
	e.GET("/users", userController.IndexUser)
	e.GET("/users/:id", userController.ShowUser)
	e.POST("/users", userController.CreateUser)
	e.PUT("/users/:id", userController.UpdateUser)
	e.DELETE("/users/:id", userController.DeleteUser)

	// events
	e.GET("/events", eventController.IndexEvent)
	e.GET("/events/:id", eventController.ShowEvent)
	e.POST("/events", eventController.CreateEvent)
	e.PUT("/events/:id", eventController.UpdateEvent)
	e.DELETE("/events/:id", eventController.DeleteEvent)

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