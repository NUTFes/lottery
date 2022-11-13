// DB操作
package infrastructure

import (
	"github.com/NUTFes/lottery/go_api/domain"
	"gorm.io/gorm"
)

type AdminInfrastructure struct {
	db *gorm.DB
}

func NewAdminInfrastructure(db *gorm.DB) *AdminInfrastructure {
	return &AdminInfrastructure{db: db}
}

// 全アドミンユーザーの取得
func (u *AdminInfrastructure) FindAll() (*domain.Admins, error) {
	admins := domain.Admins{}
	if err := u.db.Find(&admins).Error; err != nil {
		return nil, err
	}
	return &admins, nil
}

// idを指定してアドミンユーザーを取得
func (u *AdminInfrastructure) Find(id int) (*domain.Admin, error) {
	admin := domain.Admin{}
	if err := u.db.First(&admin, id).Error; err != nil {
		return nil, err
	}
	return &admin, nil
}

// アドミンユーザーの作成
func (u *AdminInfrastructure) Create(admin *domain.Admin) error {
	if err := u.db.Create(admin).Error; err != nil {
		return err
	}
	return nil
}

// アドミンユーザーの更新
func (u *AdminInfrastructure) Update(admin *domain.Admin) error {
	if err := u.db.Updates(admin).Error; err != nil {
		return err
	}
	return nil
}

// アドミンユーザーの削除
func (u *AdminInfrastructure) Delete(id int) error {
	admin := domain.Admin{}
	if err := u.db.Delete(&admin, id).Error; err != nil {
		return err
	}
	return nil
}
