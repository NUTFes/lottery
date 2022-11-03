// UserのUsecaseを定義する
package usecase

import (
	"github.com/NUTFes/lottery/go_api/domain"
)

type userUsecase struct {
	userRepository domain.UserRepository
}

type UserUsecase interface {
	FindAllUser() (*domain.Users, error)
	FindUser(id int) (*domain.User, error)
	CreateUser(user *domain.User) error
	UpdateUser(user *domain.User) error
	DeleteUser(id int) error
}

func NewUserUsecase(ur domain.UserRepository) UserUsecase {
	return &userUsecase{userRepository: ur}
}

// 全ユーザーの取得
func (u *userUsecase) FindAllUser() (*domain.Users, error) {
	users, err := u.userRepository.FindAll()
	if err != nil {
		return nil, err
	}
	return users, nil
}

// idを指定してユーザーを取得
func (u *userUsecase) FindUser(id int) (*domain.User, error) {
	user, err := u.userRepository.Find(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// ユーザーの作成
func (u *userUsecase) CreateUser(user *domain.User) error {
	if err := u.userRepository.Create(user); err != nil {
		return err
	}
	return nil
}

// ユーザーの更新
func (u *userUsecase) UpdateUser(user *domain.User) error {
	if err := u.userRepository.Update(user); err != nil {
		return err
	}
	return nil
}

// ユーザーの削除
func (u *userUsecase) DeleteUser(id int) error {
	if err := u.userRepository.Delete(id); err != nil {
		return err
	}
	return nil
}
