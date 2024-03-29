// DB操作
package infrastructure

import (
	"github.com/NUTFes/lottery/api/domain"
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
	u.db.Debug().Find(&users)
	return &users, nil
}

// idを指定してユーザーを取得
func (u *UserInfrastructure) Find(id int) (*domain.User, error) {
	user := domain.User{}
	if err := u.db.First(&user, id).Error; err != nil {
		return nil, err
	}
	u.db.Debug().First(&user, id)
	return &user, nil
}

// ユーザーの作成
func (u *UserInfrastructure) Create(user *domain.User) error {
	if err := u.db.Create(user).Error; err != nil {
		return err
	}
	u.db.Debug().Create(user)
	return nil
}

// ユーザーの更新
func (u *UserInfrastructure) Update(user *domain.User) error {
	if err := u.db.Updates(user).Error; err != nil {
		return err
	}
	u.db.Debug().Updates(user)
	return nil
}

// ユーザーの削除
func (u *UserInfrastructure) Delete(id int) error {
	user := domain.User{}
	if err := u.db.Delete(&user, id).Error; err != nil {
		return err
	}
	u.db.Debug().Delete(&user, id)
	return nil
}

// イベントに紐づいた全ユーザーの取得
func (u *UserInfrastructure) FindAllLinkEvent() (*domain.Users, error) {
	users := domain.Users{}
	if err := u.db.Preload("Events").Find(&users).Error; err != nil {
		return nil, err
	}
	u.db.Debug().Preload("Events").Find(&users)
	return &users, nil
}

// イベントに紐づいたユーザーの取得
func (u *UserInfrastructure)FindLinkEvent(id int) (*domain.User, error) {
	user := domain.User{}
	if err := u.db.Preload("Events").First(&user, id).Error; err != nil {
		return nil, err
	}
	u.db.Debug().Preload("Events").First(&user, id)
	return &user, nil
}
