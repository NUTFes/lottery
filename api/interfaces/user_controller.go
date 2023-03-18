// UserのControllerを定義する
package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/NUTFes/lottery/api/domain"
	"github.com/NUTFes/lottery/api/usecase"
	"github.com/labstack/echo/v4"
)

type userController struct {
	userUsecase usecase.UserUsecase
}

type UserController interface {
	IndexUser(c echo.Context) error
	ShowUser(c echo.Context) error
	CreateUser(c echo.Context) error
	UpdateUser(c echo.Context) error
	DeleteUser(c echo.Context) error
	IndexUserLinkEvent(c echo.Context) error
	ShowUserLinkEvent(c echo.Context) error
}

func NewUserController(uu usecase.UserUsecase) UserController {
	return &userController{userUsecase: uu}
}

// 全ユーザーの取得
func (u *userController) IndexUser(c echo.Context) error {
	users, err := u.userUsecase.FindAllUser()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, users)
}

// idを指定してユーザーを取得
func (u *userController) ShowUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	user, err := u.userUsecase.FindUser(id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, user)
}

// ユーザーの作成
func (u *userController) CreateUser(c echo.Context) error {
	name := c.QueryParam("name")
	number, _ := strconv.ParseUint(c.QueryParam("number"), 10, 64)

	user := &domain.User{
		Name:      name,
		Number:    number,
		CreatedAT: time.Now(),
		UpdatedAT: time.Now(),
	}
	if err := u.userUsecase.CreateUser(user); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, user)
}

// ユーザーの更新
func (u *userController) UpdateUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	name := c.QueryParam("name")
	number, _ := strconv.ParseUint(c.QueryParam("number"), 10, 64)

	user := &domain.User{
		ID:        uint(id),
		Name:      name,
		Number:    number,
		UpdatedAT: time.Now(),
	}
	if err := u.userUsecase.UpdateUser(user); err != nil {
		return err
	}
	return c.JSON(http.StatusOK, user)
}

// ユーザーの削除
func (u *userController) DeleteUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := u.userUsecase.DeleteUser(id); err != nil {
		return err
	}
	return c.String(http.StatusOK, "Delete user")
}

// イベントに紐づいたユーザーの取得
func (u *userController) IndexUserLinkEvent(c echo.Context) error {
	users, err := u.userUsecase.FindAllUsersLinkEvent()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, users)
}

// イベントに紐づいたユーザーの取得
func (u *userController) ShowUserLinkEvent(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	user, err := u.userUsecase.FindUserLinkEvent(id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, user)
}
