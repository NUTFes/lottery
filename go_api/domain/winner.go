package domain

import{
	"gorm.io/gorm"
}

type winner struct{
	ID int `json:"id" gorm:"primary_key;not null"`
	UserID int `json:"user_id" gorm:"not null"`
	CreatedID time.Time `json:"created_id" gorm:"not null"`
	UpdatedID time.Time `json:"updated_id" gorm:"not null"`

}