package domain

import (
	"time"
)

type Admin struct {
	ID        uint      `json:"id" gorm:"primary_key;not null"`
	Name      string    `json:"name" gorm:"not null"`
	Email     string    `json:"email" gorm:"not null"`
	Password  string    `json:"password" gorm:"not null"`
	CreatedAT time.Time `json:"created_at" gorm:"not null"`
	UpdatedAT time.Time `json:"updated_at" gorm:"not null"`
}

type Admins []Admin

// domainRepository
type AdminRepository interface {
	FindAll() (*Admins, error)
	Find(id int) (*Admin, error)
	Create(Admin *Admin) error
	Update(Admin *Admin) error
	Delete(id int) error
}
