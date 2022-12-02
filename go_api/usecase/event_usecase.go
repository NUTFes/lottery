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
	FindAllEventsLinkUser() (*domain.Events, error)
	FindEventLinkUser(id int) (*domain.Event, error)
}

func NewEventUsecase(er domain.EventRepository) EventUsecase {
	return &eventUsecase{eventRepository: er}
}

// 全イベントの取得
func (e *eventUsecase) FindAllEvent() (*domain.Events, error) {
	events, err := e.eventRepository.FindAll()
	if err != nil {
		return nil, err
	}
	return events, nil
}

// idを指定してイベントを取得
func (e *eventUsecase) FindEvent(id int) (*domain.Event, error) {
	event, err := e.eventRepository.Find(id)
	if err != nil {
		return nil, err
	}
	return event, nil
}

// イベントの作成
func (e *eventUsecase) CreateEvent(event *domain.Event) error {
	if err := e.eventRepository.Create(event); err != nil {
		return err
	}
	return nil
}

// イベントの更新
func (e *eventUsecase) UpdateEvent(event *domain.Event) error {
	if err := e.eventRepository.Update(event); err != nil {
		return err
	}
	return nil
}

// イベントの削除
func (e *eventUsecase) DeleteEvent(id int) error {
	if err := e.eventRepository.Delete(id); err != nil {
		return err
	}
	return nil
}

// ユーザーに紐づいた全イベントの取得
func (e *eventUsecase) FindAllEventsLinkUser() (*domain.Events, error) {
	events, err := e.eventRepository.FindAllLinkUser()
	if err != nil {
		return nil, err
	}
	return events, nil
}

// ユーザーに紐づいたイベントの取得
func (e *eventUsecase) FindEventLinkUser(id int) (*domain.Event, error) {
	event, err := e.eventRepository.FindLinkUser(id)
	if err != nil {
		return nil, err
	}
	return event, nil
}
