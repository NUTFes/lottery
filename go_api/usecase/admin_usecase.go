// AdminのUsecaseを定義する
package usecase

import (
	"github.com/NUTFes/lottery/go_api/domain"
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

func NewAdminUsecase(ur domain.AdminRepository) AdminUsecase {
	return &adminUsecase{adminRepository: ur}
}

// 全アドミンユーザーの取得
func (u *adminUsecase) FindAllAdmin() (*domain.Admins, error) {
	admins, err := u.adminRepository.FindAll()
	if err != nil {
		return nil, err
	}
	return admins, nil
}

// idを指定してアドミンユーザーを取得
func (u *adminUsecase) FindAdmin(id int) (*domain.Admin, error) {
	admin, err := u.adminRepository.Find(id)
	if err != nil {
		return nil, err
	}
	return admin, nil
}

// アドミンユーザーの作成
func (u *adminUsecase) CreateAdmin(admin *domain.Admin) error {
	if err := u.adminRepository.Create(admin); err != nil {
		return err
	}
	return nil
}

// アドミンユーザーの更新
func (u *adminUsecase) UpdateAdmin(admin *domain.Admin) error {
	if err := u.adminRepository.Update(admin); err != nil {
		return err
	}
	return nil
}

// アドミンユーザーの削除
func (u *adminUsecase) DeleteAdmin(id int) error {
	if err := u.adminRepository.Delete(id); err != nil {
		return err
	}
	return nil
}
