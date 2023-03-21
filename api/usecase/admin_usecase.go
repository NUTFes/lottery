// AdminのUsecaseを定義する
package usecase

import (
	"github.com/NUTFes/lottery/api/domain"
)

type adminUsecase struct {
	adminRepository domain.AdminRepository
}

type AdminUsecase interface {
	FindAllAdmin() (*domain.Admins, error)
	FindAdmin(id int) (*domain.Admin, error)
	CreateAdmin(admin *domain.Admin) error
	UpdateAdmin(admin *domain.Admin) error
	DeleteAdmin(id int) error
}

func NewAdminUsecase(au domain.AdminRepository) AdminUsecase {
	return &adminUsecase{adminRepository: au}
}

// 全アドミンユーザーの取得
func (a *adminUsecase) FindAllAdmin() (*domain.Admins, error) {
	admins, err := a.adminRepository.FindAll()
	if err != nil {
		return nil, err
	}
	return admins, nil
}

// idを指定してアドミンユーザーを取得
func (a *adminUsecase) FindAdmin(id int) (*domain.Admin, error) {
	admin, err := a.adminRepository.Find(id)
	if err != nil {
		return nil, err
	}
	return admin, nil
}

// アドミンユーザーの作成
func (a *adminUsecase) CreateAdmin(admin *domain.Admin) error {
	if err := a.adminRepository.Create(admin); err != nil {
		return err
	}
	return nil
}

// アドミンユーザーの更新
func (a *adminUsecase) UpdateAdmin(admin *domain.Admin) error {
	if err := a.adminRepository.Update(admin); err != nil {
		return err
	}
	return nil
}

// アドミンユーザーの削除
func (a *adminUsecase) DeleteAdmin(id int) error {
	if err := a.adminRepository.Delete(id); err != nil {
		return err
	}
	return nil
}
