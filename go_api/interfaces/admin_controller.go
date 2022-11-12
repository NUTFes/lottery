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

func NewAdminController(uu usecase.AdminUsecase) AdminController {
	return &adminController{adminUsecase: uu}
}

// 全アドミンユーザーの取得
func (u *adminController) IndexAdmin(c echo.Context) error {
	admins, err := u.adminUsecase.FindAllAdmin()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, admins)
}

// idを指定してアドミンユーザーを取得
func (u *adminController) ShowAdmin(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	admin, err := u.adminUsecase.FindAdmin(id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, admin)
}

// アドミンユーザーの作成
func (u *adminController) CreateAdmin(c echo.Context) error {
	name := c.QueryParam("name")
	email := c.QueryParam("email")

	admin := &domain.Admin{
		Name:      name,
		Email:     email,
		CreatedAT: time.Now(),
		UpdatedAT: time.Now(),
	}
	if err := u.adminUsecase.CreateAdmin(admin); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, admin)
}

// アドミンユーザーの更新
func (u *adminController) UpdateAdmin(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	name := c.QueryParam("name")
	email := c.QueryParam("email")

	admin := &domain.Admin{
		ID:        uint(id),
		Name:      name,
		Email:     email,
		UpdatedAT: time.Now(),
	}
	if err := u.adminUsecase.UpdateAdmin(admin); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, admin)
}

// アドミンユーザーの削除
func (u *adminController) DeleteAdmin(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := u.adminUsecase.DeleteAdmin(id); err != nil {
		return err
	}
	return c.String(http.StatusOK, "Delete admin")
}
