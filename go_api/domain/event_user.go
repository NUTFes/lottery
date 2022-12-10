package domain

type EventUsers struct {
	EventID uint64 `json:"event_id"`
	UserID  uint64 `json:"user_id"`
}

type EventUsersRepository interface {
	Create(eventUsers *EventUsers) error
}
