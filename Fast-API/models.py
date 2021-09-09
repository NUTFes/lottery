from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from sqlalchemy.sql.functions import current_timestamp


from database import Base, engine


class Place(Base):
    """
    Placeテーブル
    id      : 主キー
    name    : Place名
    """
    __tablename__ = 'place'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(256))

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


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)