// DB操作
package infrastructure

import (
	"github.com/NUTFes/lottery/go_api/domain"
	"gorm.io/gorm"
)

type EventInfrastructure struct {
	db *gorm.DB
}

func NewEventInfrastructure(db *gorm.DB) *EventInfrastructure {
	return &EventInfrastructure{db: db}
}

// 全イベントの取得
func (u *EventInfrastructure) FindAll() (*domain.Events, error) {
	events := domain.Events{}
	if err := u.db.Find(&events).Error; err != nil {
		return nil, err
	}
	return &events, nil
}

// idを指定してイベントを取得
func (u *EventInfrastructure) Find(id int) (*domain.Event, error) {
	event := domain.Event{}
	if err := u.db.First(&event, id).Error; err != nil {
		return nil, err
	}
	return &event, nil
}

// イベントの作成
func (u *EventInfrastructure) Create(event *domain.Event) error {
	if err := u.db.Create(event).Error; err != nil {
		return err
	}
	return nil
}

// イベントの更新
func (u *EventInfrastructure) Update(event *domain.Event) error {
	if err := u.db.Updates(event).Error; err != nil {
		return err
	}
	return nil
}

// イベントの削除
func (u *EventInfrastructure) Delete(id int) error {
	event := domain.Event{}
	if err := u.db.Delete(&event, id).Error; err != nil {
		return err
	}
	return nil
}
