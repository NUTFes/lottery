package usecase

import (
	"github.com/NUTFes/lottery/go_api/domain"
)

type eventUsersUsecase struct {
	eventUsersRepository domain.EventUsersRepository
}

type EventUsersUsecase interface {
	CreateEventUsers(eventUsers *domain.EventUsers) error
	DeleteEventUsers(eventID uint64, userID uint64) error
}

func NewEventUsersUsecase(eur domain.EventUsersRepository) EventUsersUsecase {
	return &eventUsersUsecase{eventUsersRepository: eur}
}

// 中間テーブルへのInsert
func (e *eventUsersUsecase) CreateEventUsers(eventUsers *domain.EventUsers) error {
	if err := e.eventUsersRepository.Create(eventUsers); err != nil {
		return err
	}
	return nil
}

// 中間テーブルのレコードDelete
func (e *eventUsersUsecase) DeleteEventUsers(eventID uint64, userID uint64) error {
	if err := e.eventUsersRepository.Delete(eventID, userID); err != nil {
		return err
	}
	return nil
}
