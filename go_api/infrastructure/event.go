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
func (e *EventInfrastructure) FindAll() (*domain.Events, error) {
	events := domain.Events{}
	if err := e.db.Find(&events).Error; err != nil {
		return nil, err
	}
	return &events, nil
}

// idを指定してイベントを取得
func (e *EventInfrastructure) Find(id int) (*domain.Event, error) {
	event := domain.Event{}
	if err := e.db.First(&event, id).Error; err != nil {
		return nil, err
	}
	return &event, nil
}

// イベントの作成
func (e *EventInfrastructure) Create(event *domain.Event) error {
	if err := e.db.Create(event).Error; err != nil {
		return err
	}
	return nil
}

// イベントの更新
func (e *EventInfrastructure) Update(event *domain.Event) error {
	if err := e.db.Updates(event).Error; err != nil {
		return err
	}
	return nil
}

// イベントの削除
func (e *EventInfrastructure) Delete(id int) error {
	event := domain.Event{}
	if err := e.db.Delete(&event, id).Error; err != nil {
		return err
	}
	return nil
}

// ユーザーに紐づいた全イベントの取得
func (e *EventInfrastructure) FindAllLinkUser() (*domain.Events, error) {
	events := domain.Events{}
	if err := e.db.Preload("Users").Find(&events).Error; err != nil {
		return nil, err
	}
	e.db.Debug().Preload("Users").Find(&events)
	return &events, nil
}

// ユーザーに紐づいたイベントの取得
func (e *EventInfrastructure) FindLinkUser(id int) (*domain.Event, error) {
	event := domain.Event{}
	if err := e.db.Preload("Users").First(&event, id).Error; err != nil {
		return nil, err
	}
	e.db.Debug().Preload("Users").First(&event, id)
	return &event, nil
}
