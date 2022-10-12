package database

import (
    "api/domain"
)

type UserRepository struct {
    SqlHandler
}

func (db *UserRepository) Store(u domain.User) {
    db.Create(&u)
}

func (db *UserRepository) Select() []domain.User {
    user := []domain.User{}
    db.FindAll(&user)
    return user
}
func (db *UserRepository) Delete(id string) {
    user := []domain.User{}
    db.DeleteById(&user, id)
}