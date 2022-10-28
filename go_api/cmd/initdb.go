package cmd

import (
	"os"

	"github.com/NUTFes/lottery/go_api/domain"

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
