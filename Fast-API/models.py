from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.sql.functions import current_timestamp


from database import Base, engine


class Place(Base):
    """
    Placeテーブル
    id      : 主キー
    name    : Place名
    message : メッセージ
    """
    __tablename__ = 'place'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(256))
    message = Column('message', String(256), default="はじめまして",
        nullable=False)

class User(Base):
    """
    NfcタッチUser
    id          : 主キー
    place_id    : 外部キー
    number      : 学籍番号
    updated_at  : 最終更新
    created_at  : 登録日時
    """
    __tablename__ = 'user'
    id = Column('id',Integer, primary_key=True, autoincrement=True)
    place_id = Column('place_id', ForeignKey('place.id'))
    number = Column('number', Integer)
    updated_at = Column(
        'updated_at',
        DateTime,
        default=datetime.now(),
        nullable=False,
        server_default=current_timestamp(),
    )
    created_at = Column(
        'created_at',
        DateTime,
        default=datetime.now(),
        nullable=False,
        server_default=current_timestamp(),
    )

class Time(Base):
    """
    Placeテーブル
    id    : 主キー
    start :　開始時間
    end   : 終了時間
    """
    __tablename__ = 'time'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    start = Column(
        'starttime',
        DateTime,
        default=datetime.strptime("1990-01-01 00:00", '%Y-%m-%d %H:%M'),
        nullable=False,
    )
    end = Column(
        'endtime',
        DateTime,
        default=datetime.strptime("2030-01-01 00:00", '%Y-%m-%d %H:%M'),
        nullable=False)


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)