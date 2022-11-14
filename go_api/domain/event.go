package domain

import (
	"time"
)

type Event struct {
	ID          uint      `json:"id" gorm:"primary_key;not null"`
	Name        string    `json:"name" gorm:"not null"`
	Description string    `json:"description" gorm:"not null"`
	CreatedAT   time.Time `json:"created_at" gorm:"not null"`
	UpdatedAT   time.Time `json:"updated_at" gorm:"not null"`
}

type Events []Event

type EventRepository interface {
	FindAll() (*Events, error)
	Find(id int) (*Event, error)
	Create(user *Event) error
	Update(user *Event) error
	Delete(id int) error
}
