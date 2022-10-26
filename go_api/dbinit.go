package main

import (
	"github.com/NUTFes/lottery/go_api/domain"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func dbinit() {
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return
	}
	db.Migrator().CreateTable(domain.User{})
	db.Migrator().CreateTable(domain.Admin{})
	db.Migrator().CreateTable(domain.Event{})
	db.Migrator().CreateTable(domain.Winner{})
}
