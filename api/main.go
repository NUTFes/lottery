package main

import (
	"net/http"
	// "os"

	_ "github.com/NUTFes/lottery/api/docs"
	"github.com/NUTFes/lottery/api/infrastructure"
	controller "github.com/NUTFes/lottery/api/interfaces"
	"github.com/NUTFes/lottery/api/usecase"
	echoSwagger "github.com/swaggo/echo-swagger"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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

	// cors設定
	arrowOrigins := []string{"*"}
	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: arrowOrigins,
	}))

	// 依存の方向：controller -> usecase -> domain <- infrastructure
	adminInfrastructure := infrastructure.NewAdminInfrastructure(client)
	eventInfrastructure := infrastructure.NewEventInfrastructure(client)
	eventUsersInfrastructure := infrastructure.NewEventUsersInfrastructure(client)
	userInfrastructure := infrastructure.NewUserInfrastructure(client)
	winnerInfrastructure := infrastructure.NewWinnerInfrastructure(client)

	adminUsecase := usecase.NewAdminUsecase(adminInfrastructure)
	eventUsecase := usecase.NewEventUsecase(eventInfrastructure)
	eventUsersUsecase := usecase.NewEventUsersUsecase(eventUsersInfrastructure)
	userUsecase := usecase.NewUserUsecase(userInfrastructure)
	winnerUsecase := usecase.NewWinnerUsecase(winnerInfrastructure)

	adminController := controller.NewAdminController(adminUsecase)
	eventController := controller.NewEventController(eventUsecase)
	eventUsersController := controller.NewEventUsersController(eventUsersUsecase)
	userController := controller.NewUserController(userUsecase)
	winnerController := controller.NewWinnerController(winnerUsecase)

	// ルーティング(APIが増えると、server.goが肥大化するので、今後別にファイルに分ける)

	// BasicAuth
	// e.Use(middleware.BasicAuth(func(username string, password string, c echo.Context) (bool, error) {
	// 	if username == os.Getenv("ADMIN_NAME") && password == os.Getenv("ADMIN_PASS") {
	// 		return true, nil
	// 	}
	// 	return false, nil
	// }))

	// admins
	e.GET("/admins", adminController.IndexAdmin)
	e.GET("/admins/:id", adminController.ShowAdmin)
	e.POST("/admins", adminController.CreateAdmin)
	e.PUT("/admins/:id", adminController.UpdateAdmin)
	e.DELETE("/admins/:id", adminController.DeleteAdmin)

	// events
	e.GET("/events", eventController.IndexEvent)
	e.GET("/events/:id", eventController.ShowEvent)
	e.POST("/events", eventController.CreateEvent)
	e.PUT("/events/:id", eventController.UpdateEvent)
	e.DELETE("/events/:id", eventController.DeleteEvent)
	e.GET("/events/users", eventController.IndexEventLinkUser)
	e.GET("/events/:id/users", eventController.ShowEventLinkUser)

	// event_users
	e.POST("/event-users", eventUsersController.CreateEventUsers)
	e.DELETE("/event-users", eventUsersController.DeleteEventUsers)

	// users
	e.GET("/users", userController.IndexUser)
	e.GET("/users/:id", userController.ShowUser)
	e.POST("/users", userController.CreateUser)
	e.PUT("/users/:id", userController.UpdateUser)
	e.DELETE("/users/:id", userController.DeleteUser)
	e.GET("/users/events", userController.IndexUserLinkEvent)
	e.GET("/users/:id/events", userController.ShowUserLinkEvent)

	// winners
	e.GET("/winners", winnerController.IndexWinner)
	e.GET("/winners/:id", winnerController.ShowWinner)
	e.POST("/winners", winnerController.CreateWinner)
	e.PUT("/winners/:id", winnerController.UpdateWinner)
	e.DELETE("/winners/:id", winnerController.DeleteWinner)
	e.GET("/winners/users", winnerController.IndexWinnerLinkUser)
	e.GET("/winners/:id/users", winnerController.ShowWinnerLinkUser)

	e.GET("/swagger/*", echoSwagger.WrapHandler)
	e.GET("/checkswagger/", checkswagger)

	// e.POST("/gocloak", cloak.CreateKeycloskUser)
	// e.GET("/gocloak/token", cloak.GetKeycloakToken)
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
