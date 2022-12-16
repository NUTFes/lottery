// DB操作
package infrastructure

import (
	"github.com/NUTFes/lottery/go_api/domain"
	"gorm.io/gorm"
)

type WinnerInfrastructure struct {
	db *gorm.DB
}

func NewWinnerInfrastructure(db *gorm.DB) *WinnerInfrastructure {
	return &WinnerInfrastructure{db: db}
}

// 全ウィナーの取得
func (w *WinnerInfrastructure) FindAll() (*domain.Winners, error) {
	winners := domain.Winners{}
	if err := w.db.Find(&winners).Error; err != nil {
		return nil, err
	}
	w.db.Debug().Find(&winners)
	return &winners, nil
}

// idを指定してウィナーを取得
func (w *WinnerInfrastructure) Find(id int) (*domain.Winner, error) {
	winner := domain.Winner{}
	if err := w.db.First(&winner, id).Error; err != nil {
		return nil, err
	}
	w.db.Debug().First(&winner, id)
	return &winner, nil
}

// ウィナーの作成
func (w *WinnerInfrastructure) Create(winner *domain.Winner) error {
	if err := w.db.Create(winner).Error; err != nil {
		return err
	}
	w.db.Debug().Create(winner)
	return nil
}

// ウィナーの更新
func (w *WinnerInfrastructure) Update(winner *domain.Winner) error {
	if err := w.db.Updates(winner).Error; err != nil {
		return err
	}
	w.db.Debug().Updates(winner)
	return nil
}

// ウィナーの削除
func (w *WinnerInfrastructure) Delete(id int) error {
	winner := domain.Winner{}
	if err := w.db.Delete(&winner, id).Error; err != nil {
		return err
	}
	w.db.Debug().Delete(&winner, id)
	return nil
}

// ユーザーに紐づいた全ウィナーの取得
func (w *WinnerInfrastructure) FindAllLinkUser() (*domain.Winners, error) {
	winners := domain.Winners{}
	Winner := domain.Winners{}
	if err := w.db.Preload("Users").Where(&Winner{Users: ""}).Find(&winners).Error; err != nil {
		return nil, err
	}
	w.db.Debug().Preload("Users").Select("user_id").Find(&winners)
	return &winners, nil
}

// ユーザーに紐づいたウィナーの取得
func (w *WinnerInfrastructure) FindLinkUser(id int) (*domain.Winner, error) {
	winner := domain.Winner{}
	if err := w.db.Preload("Users").First(&winner, id).Error; err != nil {
		return nil, err
	}
	w.db.Debug().Preload("Users").First(&winner, id)
	return &winner, nil
}
