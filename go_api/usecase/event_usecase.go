// EventのUsecaseを定義する
package usecase

import (
	"github.com/NUTFes/lottery/go_api/domain"
)

type eventUsecase struct {
	eventRepository domain.EventRepository
}

type EventUsecase interface {
	FindAllEvent() (*domain.Events, error)
	FindEvent(id int) (*domain.Event, error)
	CreateEvent(event *domain.Event) error
	UpdateEvent(event *domain.Event) error
	DeleteEvent(id int) error
}

func NewEventUsecase(ur domain.EventRepository) EventUsecase {
	return &eventUsecase{eventRepository: ur}
}

// 全イベントの取得
func (u *eventUsecase) FindAllEvent() (*domain.Events, error) {
	events, err := u.eventRepository.FindAll()
	if err != nil {
		return nil, err
	}
	return events, nil
}

// idを指定してイベントを取得
func (u *eventUsecase) FindEvent(id int) (*domain.Event, error) {
	event, err := u.eventRepository.Find(id)
	if err != nil {
		return nil, err
	}
	return event, nil
}

// イベントの作成
func (u *eventUsecase) CreateEvent(event *domain.Event) error {
	if err := u.eventRepository.Create(event); err != nil {
		return err
	}
	return nil
}

// イベントの更新
func (u *eventUsecase) UpdateEvent(event *domain.Event) error {
	if err := u.eventRepository.Update(event); err != nil {
		return err
	}
	return nil
}

// イベントの削除
func (u *eventUsecase) DeleteEvent(id int) error {
	if err := u.eventRepository.Delete(id); err != nil {
		return err
	}
	return nil
}
