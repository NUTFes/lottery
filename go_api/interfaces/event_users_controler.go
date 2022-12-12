package controller

import (
	"net/http"
	"strconv"

	"github.com/NUTFes/lottery/go_api/domain"
	"github.com/NUTFes/lottery/go_api/usecase"
	"github.com/labstack/echo/v4"
)

type eventUsersController struct {
	eventUsersUsecase usecase.EventUsersUsecase
}

type EventUsersController interface {
	CreateEventUsers(c echo.Context) error
}

func NewEventUsersController(eu usecase.EventUsersUsecase) EventUsersController {
	return &eventUsersController{eventUsersUsecase: eu}
}

// 中間テーブルへのInsert
func (eu *eventUsersController) CreateEventUsers(c echo.Context) error {
	eventID, _ := strconv.ParseUint(c.QueryParam("event_id"), 10, 64)
	userID, _ := strconv.ParseUint(c.QueryParam("user_id"), 10, 64)

	eventUsers := &domain.EventUsers{
		EventID: eventID,
		UserID:  userID,
	}
	if err := eu.eventUsersUsecase.CreateEventUsers(eventUsers); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, eventUsers)
}
