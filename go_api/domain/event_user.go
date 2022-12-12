package domain

type EventUsers struct {
	EventID uint64 `json:"event_id" gorm:"not null;"`
	UserID  uint64 `json:"user_id" gorm:"not null;"`
}

type EventUsersRepository interface {
	Create(eventUsers *EventUsers) error
}
