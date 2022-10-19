package domain

import{
	"gorm.io/gorm"
}

type admin struct{
	ID int `json:"id" gorm:"primary_key;not null"`
	Name string `json:"name" gorm:"not null"`
	Email string `json:"email" gorm:"not null"`
	Password string `json:"password" gorm:"not null"`
	CreatedID time.Time `json:"created_id" gorm:"not null"`
	UpdatedID time.Time `json:"updated_id" gorm:"not null"`

}