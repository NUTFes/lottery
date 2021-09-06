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
    print(place)
    db_place = models.Place(name=place.name)
    print(db_place)
    db.add(db_place)
    db.commit()
    db.refresh(db_place)
    return db_place

def delete_place(db: Session, place: schemas.Place):
    print(place)
    db_place = models.Place(id=2,name="string")
    print(db_place)
    db.delete(db_place)
    db.commit()
    db.refresh(db_place)
    return db_place


def get_users(db: Session, p_id: int):
    return db.query(models.User).filter(models.User.place_id == p_id).all()

def get_user_by_number(db: Session, p_id: int, number: int):
    return db.query(models.User).filter(models.User.place_id == p_id, models.User.number == number).first()

def get_user_by_id(db: Session, p_id: int, u_id: int):
    return db.query(models.User).filter(models.User.place_id == p_id, models.User.id == u_id).first()

def create_user(db: Session, user: schemas.UserCreate, p_id: int):
    db_user = models.User(place_id=p_id, number=user.number)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user: schemas.User):
    db_user = models.User(user.id, number=user.number)
    db.delete(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user