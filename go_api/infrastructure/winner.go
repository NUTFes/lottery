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
	return &winners, nil
}

// idを指定してウィナーを取得
func (w *WinnerInfrastructure) Find(id int) (*domain.Winner, error) {
	winner := domain.Winner{}
	if err := w.db.First(&winner, id).Error; err != nil {
		return nil, err
	}
	return &winner, nil
}

// ウィナーの作成
func (w *WinnerInfrastructure) Create(winner *domain.Winner) error {
	if err := w.db.Create(winner).Error; err != nil {
		return err
	}
	return nil
}

// ウィナーの更新
func (w *WinnerInfrastructure) Update(winner *domain.Winner) error {
	if err := w.db.Updates(winner).Error; err != nil {
		return err
	}
	return nil
}

// ウィナーの削除
func (w *WinnerInfrastructure) Delete(id int) error {
	winner := domain.Winner{}
	if err := w.db.Delete(&winner, id).Error; err != nil {
		return err
	}
	return nil
}
