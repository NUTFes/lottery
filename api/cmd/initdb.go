package main

import (
	"os"

	"github.com/NUTFes/lottery/api/domain"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db  *gorm.DB
	err error
	dsn = os.Getenv("DSN")
)

func main() {
	Dbmain()
	CreateSeed()
}

func Dbmain() {
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return
	}
	db.AutoMigrate(domain.User{})
	db.AutoMigrate(domain.Admin{})
	db.AutoMigrate(domain.Event{})
	db.AutoMigrate(domain.Winner{})
}
