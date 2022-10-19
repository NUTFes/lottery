package domain

import (
	"time"
)

type Event struct {
	ID        int       `json:"id" gorm:"primary_key;not null"`
	Name      int       `json:"name" gorm:"not null"`
	CreatedID time.Time `json:"created_id" gorm:"not null"`
	UpdatedID time.Time `json:"updated_id" gorm:"not null"`

}