package main

import (
	"time"

	"github.com/NUTFes/lottery/go_api/domain"
)

func CreateSeed() {
	createUser()
	createAdmin()
	createEvent()
	createWinner()
	createEventUser()
}

func createUser() {
	var users = []domain.User{
		{ID: 1, Name: "tanaka kenta", Number: 19109282, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 2, Name: "sato manabu", Number: 18107078, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 3, Name: "yamaguti taro", Number: 20011222, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 4, Name: "ito toru", Number: 17133233, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 5, Name: "suzuki jiro", Number: 21569033, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 6, Name: "sato saburo", Number: 20123456, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 7, Name: "suzuki shiro", Number: 18123457, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 8, Name: "yoshida goro", Number: 17189458, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 9, Name: "yamada jiro", Number: 16123459, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 10, Name: "fujita mutsuko", Number: 15123460, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 11, Name: "kikuti kenta", Number: 18177461, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 12, Name: "yamada taro", Number: 19120362, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 13, Name: "iguti jiro", Number: 20199463, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 14, Name: "yamada saburo", Number: 22123464, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 15, Name: "sasaki kengo ", Number: 23123465, CreatedAT: time.Now(), UpdatedAT: time.Now()},
	}
	db.Create(&users)
}

func createAdmin() {
	var admins = []domain.Admin{
		{ID: 1, Name: "imanaga yoshio", Email: "y.imanaga.nutfes@gmail.com", Password: "password", CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 2, Name: "tanaka ryuta", Email: "r.tanaka.nutfes@gmail.com", Password: "password", CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 3, Name: "sato toshiya", Email: "t.sato.nutfes@gmail.com", Password: "password", CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 4, Name: "muneoka taro", Email: "t.muneoka.nutfes@gmail.com", Password: "password", CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 5, Name: "yamaguchi yu", Email: "y.yamaguchi.nutfes@gmail.com", Password: "password", CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 6, Name: "yamada ibuki", Email: "i.yamada.nutfes@gmail.com", Password: "password", CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 7, Name: "kise shintaro", Email: "s.kise.nutfes@gmail.com", Password: "password", CreatedAT: time.Now(), UpdatedAT: time.Now()},
	}
	db.Create(&admins)
}

func createEvent() {
	var events = []domain.Event{
		{ID: 1, Name: "麻雀 day1", Description: "9/10日11:00より、egg roomにて開催します。", MaxAttendee: 20, StartAt: time.Date(2023, 9, 11, 11, 0, 0, 0, time.Local), EndAt: time.Date(2023, 9, 11, 15, 0, 0, 0, time.Local), CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 2, Name: "麻雀 day2", Description: "9/11日11:00より、egg roomにて開催します。", MaxAttendee: 20, StartAt: time.Date(2023, 9, 12, 11, 0, 0, 0, time.Local), EndAt: time.Date(2023, 9, 12, 15, 0, 0, 0, time.Local), CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 3, Name: "poker day1", Description: "9/10日11:00より、D講義室にて開催します。", MaxAttendee: 32, StartAt: time.Date(2023, 9, 11, 11, 0, 0, 0, time.Local), EndAt: time.Date(2023, 9, 11, 15, 0, 0, 0, time.Local), CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 4, Name: "poker day2", Description: "9/11日11:00より、D講義室にて開催します。", MaxAttendee: 32, StartAt: time.Date(2023, 9, 12, 11, 0, 0, 0, time.Local), EndAt: time.Date(2023, 9, 12, 15, 0, 0, 0, time.Local), CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 5, Name: "lottery", Description: "9/11日16:00より、メインステージにて開催します。", StartAt: time.Date(2023, 9, 12, 16, 0, 0, 0, time.Local), EndAt: time.Date(2023, 9, 11, 1, 7, 0, 0, time.Local), CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 6, Name: "カラオケ day1", Description: "9/10日11:00より、メインステージにて開催します。", StartAt: time.Date(2023, 9, 11, 11, 0, 0, 0, time.Local), EndAt: time.Date(2023, 9, 11, 15, 0, 0, 0, time.Local), CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 7, Name: "カラオケ day2", Description: "9/11日11:00より、メインステージにて開催します。", StartAt: time.Date(2023, 9, 12, 11, 0, 0, 0, time.Local), EndAt: time.Date(2023, 9, 12, 15, 0, 0, 0, time.Local), CreatedAT: time.Now(), UpdatedAT: time.Now()},
	}
	db.Create(&events)
}

func createWinner() {
	var winners = []domain.Winner{
		{ID: 1, UserID: 1, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 2, UserID: 2, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 3, UserID: 3, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 4, UserID: 4, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 5, UserID: 5, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 6, UserID: 6, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 7, UserID: 7, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 8, UserID: 8, CreatedAT: time.Now(), UpdatedAT: time.Now()},
		{ID: 9, UserID: 9, CreatedAT: time.Now(), UpdatedAT: time.Now()},
	}
	db.Create(&winners)
}

func createEventUser() {
	var eventUsers = []domain.EventUsers{
		{UserID: 1, EventID: 1},
		{UserID: 1, EventID: 2},
		{UserID: 1, EventID: 3},
		{UserID: 1, EventID: 4},
		{UserID: 1, EventID: 5},
		{UserID: 1, EventID: 6},
		{UserID: 1, EventID: 7},
		{UserID: 2, EventID: 3},
		{UserID: 2, EventID: 6},
		{UserID: 2, EventID: 7},
		{UserID: 3, EventID: 1},
		{UserID: 3, EventID: 3},
		{UserID: 3, EventID: 5},
		{UserID: 3, EventID: 7},
		{UserID: 4, EventID: 7},
		{UserID: 5, EventID: 6},
		{UserID: 5, EventID: 2},
		{UserID: 5, EventID: 7},
		{UserID: 6, EventID: 1},
		{UserID: 6, EventID: 2},
		{UserID: 6, EventID: 3},
		{UserID: 6, EventID: 7},
		{UserID: 7, EventID: 7},
		{UserID: 8, EventID: 2},
		{UserID: 8, EventID: 7},
		{UserID: 9, EventID: 7},
		{UserID: 11, EventID: 1},
		{UserID: 11, EventID: 5},
		{UserID: 11, EventID: 6},
		{UserID: 13, EventID: 2},
		{UserID: 13, EventID: 3},
		{UserID: 14, EventID: 2},
		{UserID: 14, EventID: 4},
		{UserID: 15, EventID: 4},
	}
	db.Create(&eventUsers)
}
