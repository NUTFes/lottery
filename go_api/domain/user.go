package domain

import (
	"time"
)

type User struct {
	ID        int       `json:"id" gorm:"primary_key"`
	Name      string    `json:"name"`
	Numeber   int       `json:"number" gorm:"unique;not null"`
	CreatedAT time.Time `json:"created_at" gorm:"not null"`
	UpdatedAT time.Time `json:"updated_at" gorm:"not null"`

}

