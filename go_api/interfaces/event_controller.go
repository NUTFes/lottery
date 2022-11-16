// EventのControllerを定義する
package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/NUTFes/lottery/go_api/domain"
	"github.com/NUTFes/lottery/go_api/usecase"
	"github.com/labstack/echo/v4"
)

type eventController struct {
	eventUsecase usecase.EventUsecase
}

type EventController interface {
	IndexEvent(c echo.Context) error
	ShowEvent(c echo.Context) error
	CreateEvent(c echo.Context) error
	UpdateEvent(c echo.Context) error
	DeleteEvent(c echo.Context) error
}

func NewEventController(eu usecase.EventUsecase) EventController {
	return &eventController{eventUsecase: eu}
}

// 全イベントの取得
func (e *eventController) IndexEvent(c echo.Context) error {
	events, err := e.eventUsecase.FindAllEvent()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, events)
}

// idを指定してイベントを取得
func (e *eventController) ShowEvent(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	event, err := e.eventUsecase.FindEvent(id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, event)
}

// イベントの作成
func (e *eventController) CreateEvent(c echo.Context) error {
	name := c.QueryParam("name")
	description := c.QueryParam("description")

	event := &domain.Event{
		Name:        name,
		Description: description,
		CreatedAT:   time.Now(),
		UpdatedAT:   time.Now(),
	}
	if err := e.eventUsecase.CreateEvent(event); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, event)
}

// イベントの更新
func (e *eventController) UpdateEvent(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	name := c.QueryParam("name")
	description := c.QueryParam("description")

	event := &domain.Event{
		ID:          uint(id),
		Name:        name,
		Description: description,
		UpdatedAT:   time.Now(),
	}
	if err := e.eventUsecase.UpdateEvent(event); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, event)
}

// イベントの削除
func (e *eventController) DeleteEvent(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := e.eventUsecase.DeleteEvent(id); err != nil {
		return err
	}
	return c.String(http.StatusOK, "Delete event")
}
