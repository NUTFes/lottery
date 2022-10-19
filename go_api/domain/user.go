package domain

import (
	"time"
)

type User struct {
	ID        int       `json:"id" gorm:"primary_key"`
	Name      string    `json:"name"`
	Numeber   int       `json:"number" gorm:"unique;not null"`
	CreatedID time.Time `json:"created_id" gorm:"not null"`
	UpdatedID time.Time `json:"updated_id" gorm:"not null"`

}

