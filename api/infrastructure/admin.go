// DB操作
package infrastructure

import (
	"github.com/NUTFes/lottery/api/domain"
	"gorm.io/gorm"
)

type AdminInfrastructure struct {
	db *gorm.DB
}

func NewAdminInfrastructure(db *gorm.DB) *AdminInfrastructure {
	return &AdminInfrastructure{db: db}
}

// 全アドミンユーザーの取得
func (a *AdminInfrastructure) FindAll() (*domain.Admins, error) {
	admins := domain.Admins{}
	if err := a.db.Find(&admins).Error; err != nil {
		return nil, err
	}
	a.db.Debug().Find(&admins)
	return &admins, nil
}

// idを指定してアドミンユーザーを取得
func (a *AdminInfrastructure) Find(id int) (*domain.Admin, error) {
	admin := domain.Admin{}
	if err := a.db.First(&admin, id).Error; err != nil {
		return nil, err
	}
	a.db.Debug().First(&admin, id)
	return &admin, nil
}

// アドミンユーザーの作成
func (a *AdminInfrastructure) Create(admin *domain.Admin) error {
	if err := a.db.Create(admin).Error; err != nil {
		return err
	}
	a.db.Debug().Create(admin)
	return nil
}

// アドミンユーザーの更新
func (a *AdminInfrastructure) Update(admin *domain.Admin) error {
	if err := a.db.Updates(admin).Error; err != nil {
		return err
	}
	a.db.Debug().Updates(admin)
	return nil
}

// アドミンユーザーの削除
func (a *AdminInfrastructure) Delete(id int) error {
	admin := domain.Admin{}
	if err := a.db.Delete(&admin, id).Error; err != nil {
		return err
	}
	a.db.Debug().Delete(&admin, id)
	return nil
}
