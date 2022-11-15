// AdminのControllerを定義する
package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/NUTFes/lottery/go_api/domain"
	"github.com/NUTFes/lottery/go_api/usecase"
	"github.com/labstack/echo/v4"
)

type adminController struct {
	adminUsecase usecase.AdminUsecase
}

type AdminController interface {
	IndexAdmin(c echo.Context) error
	ShowAdmin(c echo.Context) error
	CreateAdmin(c echo.Context) error
	UpdateAdmin(c echo.Context) error
	DeleteAdmin(c echo.Context) error
}

func NewAdminController(au usecase.AdminUsecase) AdminController {
	return &adminController{adminUsecase: au}
}

// 全アドミンユーザーの取得
func (a *adminController) IndexAdmin(c echo.Context) error {
	admins, err := a.adminUsecase.FindAllAdmin()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, admins)
}

// idを指定してアドミンユーザーを取得
func (a *adminController) ShowAdmin(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	admin, err := a.adminUsecase.FindAdmin(id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, admin)
}

// アドミンユーザーの作成
func (a *adminController) CreateAdmin(c echo.Context) error {
	name := c.QueryParam("name")
	email := c.QueryParam("email")
	password := c.QueryParam("password")

	admin := &domain.Admin{
		Name:      name,
		Email:     email,
		Password:  password,
		CreatedAT: time.Now(),
		UpdatedAT: time.Now(),
	}
	if err := a.adminUsecase.CreateAdmin(admin); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, admin)
}

// アドミンユーザーの更新
func (a *adminController) UpdateAdmin(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	name := c.QueryParam("name")
	email := c.QueryParam("email")
	password := c.QueryParam("password")

	admin := &domain.Admin{
		ID:        uint(id),
		Name:      name,
		Email:     email,
		Password:  password,
		UpdatedAT: time.Now(),
	}
	if err := a.adminUsecase.UpdateAdmin(admin); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, admin)
}

// アドミンユーザーの削除
func (a *adminController) DeleteAdmin(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := a.adminUsecase.DeleteAdmin(id); err != nil {
		return err
	}
	return c.String(http.StatusOK, "Delete admin")
}
