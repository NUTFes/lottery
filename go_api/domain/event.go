package domain

import (
	"time"
)

type Event struct {
	ID        int       `json:"id" gorm:"primary_key;not null"`
	Name      string    `json:"name" gorm:"not null"`
	CreatedAT time.Time `json:"created_at" gorm:"not null"`
	UpdatedAT time.Time `json:"updated_at" gorm:"not null"`
}
