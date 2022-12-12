package infrastructure

import (
	"github.com/NUTFes/lottery/go_api/domain"
	"gorm.io/gorm"
)

type EventUsersInfrastructure struct {
	db *gorm.DB
}

func NewEventUsersInfrastructure(db *gorm.DB) *EventUsersInfrastructure {
	return &EventUsersInfrastructure{db: db}
}

// 中間テーブルへのInsert
func (e *EventUsersInfrastructure) Create(eventUsers *domain.EventUsers) error {
	if err := e.db.Create(eventUsers).Error; err != nil {
		return err
	}
	e.db.Debug().Create(eventUsers)
	return nil
}
