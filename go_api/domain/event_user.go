package domain

import (
	"time"
)

type Event_user struct {
	ID        int       `json:"id" gorm:"primary_key;not null"`
	UserID    int       `json:"user_id" gorm:"not null"`
	EventID   int       `json:"event_id" gorm:"not null"`
	CreatedAT time.Time `json:"created_at" gorm:"not null"`
	UpdatedAT time.Time `json:"updated_at" gorm:"not null"`

}