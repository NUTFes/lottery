// WinnerのUsecaseを定義する
package usecase

import (
	"github.com/NUTFes/lottery/go_api/domain"
)

type winnerUsecase struct {
	winnerRepository domain.WinnerRepository
}

type WinnerUsecase interface {
	FindAllWinner() (*domain.Winners, error)
	FindWinner(id int) (*domain.Winner, error)
	CreateWinner(winner *domain.Winner) error
	UpdateWinner(winner *domain.Winner) error
	DeleteWinner(id int) error
	FindAllWinnersLinkUser() (*domain.WinnerIncludedUsers, error)
	FindWinnerLinkUser(id int) (*domain.Winner, error)
}

func NewWinnerUsecase(wr domain.WinnerRepository) WinnerUsecase {
	return &winnerUsecase{winnerRepository: wr}
}

// 全ウィナーの取得
func (w *winnerUsecase) FindAllWinner() (*domain.Winners, error) {
	winners, err := w.winnerRepository.FindAll()
	if err != nil {
		return nil, err
	}
	return winners, nil
}

// idを指定してウィナーを取得
func (w *winnerUsecase) FindWinner(id int) (*domain.Winner, error) {
	winner, err := w.winnerRepository.Find(id)
	if err != nil {
		return nil, err
	}
	return winner, nil
}

// ウィナーの作成
func (w *winnerUsecase) CreateWinner(winner *domain.Winner) error {
	if err := w.winnerRepository.Create(winner); err != nil {
		return err
	}
	return nil
}

// ウィナーの更新
func (w *winnerUsecase) UpdateWinner(winner *domain.Winner) error {
	if err := w.winnerRepository.Update(winner); err != nil {
		return err
	}
	return nil
}

// ウィナーの削除
func (w *winnerUsecase) DeleteWinner(id int) error {
	if err := w.winnerRepository.Delete(id); err != nil {
		return err
	}
	return nil
}

// ユーザーに紐づいた全イベントの取得
func (w *winnerUsecase) FindAllWinnersLinkUser() (*domain.WinnerIncludedUsers, error) {
	winnersIncludeUsers, err := w.winnerRepository.FindAllLinkUser()
	if err != nil {
		return nil, err
	}
	return winnersIncludeUsers, nil
}

// ユーザーに紐づいたイベントの取得
func (w *winnerUsecase) FindWinnerLinkUser(id int) (*domain.Winner, error) {
	winner, err := w.winnerRepository.FindLinkUser(id)
	if err != nil {
		return nil, err
	}
	return winner, nil
}
