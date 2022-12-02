// WinnerのControllerを定義する
package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/NUTFes/lottery/go_api/domain"
	"github.com/NUTFes/lottery/go_api/usecase"
	"github.com/labstack/echo/v4"
)

type winnerController struct {
	winnerUsecase usecase.WinnerUsecase
}

type WinnerController interface {
	IndexWinner(c echo.Context) error
	ShowWinner(c echo.Context) error
	CreateWinner(c echo.Context) error
	UpdateWinner(c echo.Context) error
	DeleteWinner(c echo.Context) error
}

func NewWinnerController(wu usecase.WinnerUsecase) WinnerController {
	return &winnerController{winnerUsecase: wu}
}

// 全ウィナーの取得
func (w *winnerController) IndexWinner(c echo.Context) error {
	winners, err := w.winnerUsecase.FindAllWinner()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, winners)
}

// idを指定してウィナーを取得
func (w *winnerController) ShowWinner(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	winner, err := w.winnerUsecase.FindWinner(id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, winner)
}

// ウィナーの作成
func (w *winnerController) CreateWinner(c echo.Context) error {
	user_id, _ := strconv.Atoi(c.QueryParam("user_id"))

	winner := &domain.Winner{
		UserID:    uint(user_id),
		CreatedAT: time.Now(),
		UpdatedAT: time.Now(),
	}
	if err := w.winnerUsecase.CreateWinner(winner); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, winner)
}

// ウィナーの更新
func (w *winnerController) UpdateWinner(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	user_id, _ := strconv.Atoi(c.QueryParam("user_id"))

	winner := &domain.Winner{
		ID:        uint(id),
		UserID:    uint(user_id),
		UpdatedAT: time.Now(),
	}
	if err := w.winnerUsecase.UpdateWinner(winner); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, winner)
}

// ウィナー削除
func (w *winnerController) DeleteWinner(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := w.winnerUsecase.DeleteWinner(id); err != nil {
		return err
	}
	return c.String(http.StatusOK, "Delete winner")
}
