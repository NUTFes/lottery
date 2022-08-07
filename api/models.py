import hashlib
from datetime import datetime, timedelta, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp

from database import Base, engine

JST = timezone(timedelta(hours=+9), "JST")


class PlaceUser(Base):
    """
    PlaceUserテーブル
    place_id    : 外部キー
    user_id     : 外部キー
    """

    __tablename__ = "place_users"

    place_id = Column("place_id", Integer, ForeignKey("place.id"), primary_key=True)
    user_id = Column("user_id", Integer, ForeignKey("user.id"), primary_key=True)


class Place(Base):
    """
    Placeテーブル
    id          : 主キー
    name        : Place名
    user        : userテーブルとのリレーション
    updated_at  : 最終更新
    created_at  : 登録日時
    """

    __tablename__ = "place"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(256))
    user = relationship(
        "User", secondary=PlaceUser.__tablename__, back_populates="place"
    )
    updated_at = Column(
        "updated_at",
        DateTime,
        default=datetime.now(JST),
        nullable=False,
        server_default=current_timestamp(),
    )
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(JST),
        nullable=False,
        server_default=current_timestamp(),
    )


class User(Base):
    """
    Userテーブル
    id          : 主キー
    place       : placeテーブルとのリレーション
    number      : 学籍番号
    updated_at  : 最終更新
    created_at  : 登録日時
    """

    __tablename__ = "user"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    place = relationship(
        "Place", secondary=PlaceUser.__tablename__, back_populates="user"
    )
    number = Column("number", Integer)
    updated_at = Column(
        "updated_at",
        DateTime,
        default=datetime.now(JST),
        nullable=False,
        server_default=current_timestamp(),
    )
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(JST),
        nullable=False,
        server_default=current_timestamp(),
    )


class Time(Base):
    """
    Placeテーブル
    id    : 主キー
    start : 開始時間
    end   : 終了時間
    """

    __tablename__ = "time"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    start = Column(
        "starttime",
        DateTime,
        default=datetime.strptime("2021-01-01 00:00", "%Y-%m-%d %H:%M"),
        nullable=False,
    )
    end = Column(
        "endtime",
        DateTime,
        default=datetime.strptime("2021-12-31 00:00", "%Y-%m-%d %H:%M"),
        nullable=False,
    )


class Winner(Base):
    """
    当選者テーブル
    id          : 主キー
    place_id    : 外部キー
    user_id     : 外部キー
    updated_at  : 最終更新
    created_at  : 登録日時
    """

    __tablename__ = "winner"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    place_id = Column("place_id", ForeignKey("place.id"))
    user_id = Column("user_id", ForeignKey("user.id"))
    updated_at = Column(
        "updated_at",
        DateTime,
        default=datetime.now(JST),
        nullable=False,
        server_default=current_timestamp(),
    )
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(JST),
        nullable=False,
        server_default=current_timestamp(),
    )


class Admin(Base):
    """
    Adminテーブル
    id      : 主キー
    name    : admin name
    password: admin pass
    """

    __tablename__ = "admin"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(256))
    password = Column("password", String(256))

    def __init__(self, name, password):
        self.name = name
        # パスワードはハッシュ化して保存
        self.password = hashlib.md5(password.encode()).hexdigest()


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
