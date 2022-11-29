// UserのEntityとRepositoryのインターフェースを定義する
package domain

import (
	"time"
)

type User struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Name      string    `json:"name"`
	Number    uint64    `json:"number" gorm:"unique;not null"`
	CreatedAT time.Time `json:"created_at" gorm:"not null"`
	UpdatedAT time.Time `json:"updated_at" gorm:"not null"`
	Events    []Events  `json:"event,omitempty" gorm:"many2many:event_user;"`
}

type Users []User

type UserRepository interface {
	FindAll() (*Users, error)
	Find(id int) (*User, error)
	Create(user *User) error
	Update(user *User) error
	Delete(id int) error
}
