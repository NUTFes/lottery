from sqlalchemy.orm import Session

import models
import schemas

def get_places(db: Session):
    return db.query(models.Place).all()

def get_place_by_name(db: Session, name: str):
    return db.query(models.Place).filter(models.Place.name == name).first()

def get_place_by_id(db: Session, id: int):
    return db.query(models.Place).filter(models.Place.id == id).first()

def create_place(db: Session, place: schemas.PlaceCreate):
    db_place = models.Place(name=place.name)
    db.add(db_place)
    db.commit()
    db.refresh(db_place)
    return db_place

def delete_place(db: Session, place: schemas.Place):
    db_place = db.query(models.Place).filter(models.Place.id == place.id).first()
    db.delete(db_place)
    db.commit()
    return


def get_users(db: Session, p_id: int):
    return db.query(models.User).filter(models.User.place_id == p_id).all()

def get_user_by_number(db: Session, user: schemas.UserCreate):
    return db.query(models.User).filter(models.User.place_id == user.place_id, models.User.number == user.number).first()

def get_user_by_id(db: Session, user: schemas.User):
    return db.query(models.User).filter(models.User.place_id == user.place_id, models.User.id == user.id).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(place_id=user.place_id, number=user.number)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user: schemas.User):
    db_user = db.query(models.User).filter(models.User.id == user.id).first()
    db.delete(db_user)
    db.commit()
    return