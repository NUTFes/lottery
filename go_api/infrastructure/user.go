// DB操作
package infrastructure

import (
	"github.com/NUTFes/lottery/go_api/domain"
	"gorm.io/gorm"
)

type UserInfrastructure struct {
	db *gorm.DB
}

func NewUserInfrastructure(db *gorm.DB) *UserInfrastructure {
	return &UserInfrastructure{db: db}
}

// 全ユーザーの取得
func (u *UserInfrastructure) FindAll() (*domain.Users, error) {
	users := domain.Users{}
	if err := u.db.Find(&users).Error; err != nil {
		return nil, err
	}
	return &users, nil
}

// idを指定してユーザーを取得
func (u *UserInfrastructure) Find(id int) (*domain.User, error) {
	user := domain.User{}
	if err := u.db.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// ユーザーの作成
func (u *UserInfrastructure) Create(user *domain.User) error {
	if err := u.db.Create(user).Error; err != nil {
		return err
	}
	return nil
}

// ユーザーの更新
func (u *UserInfrastructure) Update(user *domain.User) error {
	if err := u.db.Updates(user).Error; err != nil {
		return err
	}
	return nil
}

// ユーザーの削除
func (u *UserInfrastructure) Delete(id int) error {
	user := domain.User{}
	if err := u.db.Delete(&user, id).Error; err != nil {
		return err
	}
	return nil
}
