package domain

import (
	"time"
)

type Winner struct {
	ID        uint      `json:"id" gorm:"primary_key;not null"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	CreatedAT time.Time `json:"created_at" gorm:"not null"`
	UpdatedAT time.Time `json:"updated_at" gorm:"not null"`
	Users     Users     `json:"user,omitempty" gorm:"foreignKey:ID;references:UserID;not null"`
}

type Winners []Winner

type WinnerIncludedUser struct {
	ID		 uint   `json:"id"`
	Name   string `json:"name"`
	Number uint64 `json:"number"`
}

type WinnerIncludedUsers []WinnerIncludedUser

type WinnerRepository interface {
	FindAll() (*Winners, error)
	Find(id int) (*Winner, error)
	Create(winner *Winner) error
	Update(winner *Winner) error
	Delete(id int) error
	FindAllLinkUser() (*WinnerIncludedUsers, error)
	FindLinkUser(id int) (*Winner, error)
}
