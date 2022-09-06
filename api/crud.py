import random
from datetime import datetime, timedelta, timezone
from typing import Union

from sqlalchemy.orm import Session
from sqlalchemy.sql import func

import models
import schemas
import backup

# タイムゾーンの生成
JST = timezone(timedelta(hours=+9), "JST")


def get_places(db: Session, user_id: Union[int, None]):
    if user_id is None:
        return db.query(models.Place).all()
    else:
        return (
            db.query(models.Place, models.UserPlaces)
            .filter(
                models.Place.id == models.UserPlaces.place_id,
                models.UserPlaces.user_id == user_id,
            )
            .all()
        )


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


def get_users(db: Session, place_id: Union[int, None]):
    if place_id is None:
        return db.query(models.User).all()
    else:
        return (
            db.query(models.User)
            .join(models.UserPlaces)
            .join(models.Place)
            .filter(models.Place.id == place_id)
            .all()
        )


def get_user_by_number(db: Session, user: schemas.UserCreate):
    return (
        db.query(models.User, models.UserPlaces, models.Place)
        .filter(
            models.User.id == models.UserPlaces.user_id,
            models.UserPlaces.place_id == models.Place.id,
            models.Place.id == user.place_id,
            models.User.number == user.number,
        )
        .first()
    )


def get_user_by_id(db: Session, user: schemas.User, place_id: Union[int, None]):
    if place_id == 0:
        return db.query(models.User).filter(models.User.id == user.id).first()
    else:
        return (
            db.query(models.User)
            .filter(models.Place.id == place_id, models.User.id == user.id)
            .first()
        )


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        number=user.number,
        updated_at=datetime.now(JST),
        created_at=datetime.now(JST),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_user_places = models.UserPlaces(user_id=db_user.id, place_id=user.place_id)
    db.add(db_user_places)
    db.commit()
    db.refresh(db_user_places)
    backup.backup(db_user.number, db_user.updated_at)
    return db_user


def delete_user(db: Session, user: schemas.User, place_id: Union[int, None]):
    if place_id == 0:
        db_users = db.query(models.User).filter(models.User.id == user.id).all()
        for db_user in db_users:
            db.delete(db_user)
            db.commit()
        return
    else:
        db_user = (
            db.query(models.User)
            .filter(models.Place.id == place_id, models.User.id == user.id)
            .first()
        )
        db.delete(db_user)
        db.commit()
        return


def update_user(db: Session, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.number == user.number).first()
    db_user.updated_at = datetime.now(JST)
    db.add(db_user)
    db.commit()
    db.refresh(user_info = db_user)
    return db_user


def add_user_places(db: Session, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.number == user.number).first()
    db_user.updated_at = datetime.now(JST)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_user_places = models.UserPlaces(user_id=db_user.id, place_id=user.place_id)
    db.add(db_user_places)
    db.commit()
    db.refresh(db_user_places)

    return db_user


def get_latest_users(db: Session, p_id: int):
    res = (
        db.query(func.max(models.User.updated_at).label("latest_update"))
        .filter(models.User.place_id == p_id)
        .first()
    )
    db_user = db.query(models.User).filter(models.User.updated_at == res.latest_update).first()
    return db_user


def get_random_user(db: Session):
    db_time = db.query(models.Time).filter(models.Time.id == 1).first()
    starttime = db_time.start
    endtime = db_time.end
    winners = db.query(models.Winner).all()
    list = []
    for winner in winners:
        list.append(winner.user_id)
    res = (
        db.query(models.User)
        .filter(
            models.User.id.notin_(list),
            models.User.updated_at >= starttime,
            models.User.updated_at <= endtime,
        )
        .all()
    )
    try:
        db_user = random.choice(res)
    except BaseException:
        return None

    return db_user


def update_time(db: Session, time: schemas.Time):
    db_time = db.query(models.Time).filter(models.Time.id == 1).first()
    print(vars(db_time))
    db_time.start = time.start
    db_time.end = time.end
    db.commit()
    db.refresh(db_time)
    return db_time


def get_times(db: Session, time: int):
    return db.query(models.User).filter(models.User == time).all()


def get_limit_time(db: Session):
    time = db.query(models.Time).first()
    return time


def get_win_users(db: Session):
    # placeを絞り込んだWinnersでUserを絞込んでUserを返している
    winners = db.query(models.Winner).all()
    list = []
    for winner in winners:
        list.append(winner.user_id)
    win_users = db.query(models.User).filter(models.User.id.in_(list)).all()
    return win_users


def get_winners(db: Session):
    # placeを絞り込んだWinnersでUserを絞込んでUserを返している
    winners = db.query(models.Winner).all()
    return winners


def create_winner(db: Session, winner: schemas.WinnerCreate):
    db_user = db.query(models.User).filter(models.User.id == winner.user_id).first()
    db_winner = models.Winner(
        user_id=winner.user_id,
        number=db_user.number,
        updated_at=datetime.now(JST),
        created_at=datetime.now(JST),
    )
    db.add(db_winner)
    db.commit()
    db.refresh(db_winner)
    return db_winner


def get_winner_by_user_id(db: Session, winner: schemas.Winner):
    return db.query(models.Winner).filter(models.Winner.user_id == winner.user_id).first()


def delete_winner(db: Session, winner: schemas.Winner):
    db_winner = db.query(models.Winner).filter(models.Winner.user_id == winner.user_id).first()
    db.delete(db_winner)
    db.commit()
    return


def get_admin_by_name(db: Session, name):
    admin = db.query(models.Admin).filter(models.Admin.name == name).first()
    return admin


def get_user_places(db: Session, user: schemas.User, place_id: int):
    return (
        db.query(models.User, models.UserPlaces)
        .filter(
            models.User.id == models.UserPlaces.user_id,
            models.UserPlaces.place_id == place_id,
            models.User.number == user.number,
        )
        .first()
    )
