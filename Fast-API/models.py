from datetime import datetime

from db import Base
from db import ENGINE

from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.dialects.mysql import INTEGER, BOOLEAN

SQLITE3_NAME = "./db.sqlite3"


class Place(Base):
    """
    Placeテーブル

    id       : 主キー
    placename : ユーザネーム
    """
    __tablename__ = 'place'
    id = Column(
        'id',
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True,
    )
    placename = Column('placename', String(256))

    def __init__(self, placename):
        self.placename = placename

    def __str__(self):
        return str(self.id) + ':' + self.placename


class Log(Base):
    """
    Nfcタッチlog

    id          : 主キー
    place_id    : 外部キー
    student_id  :
    time        : 最終タッチ時間
    """
    __tablename__ = 'log'
    id = Column(
        'id',
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True,
    )
    place_id = Column('place_id', ForeignKey('place.id'))
    student_id = Column(
        'student_id',
        INTEGER(unsigned=True)
    )
    time = Column(
        'time',
        DateTime,
        default=datetime.now(),
        nullable=False,
        server_default=current_timestamp(),
    )

    def __init__(self, place_id: int, student_id: int, time: datetime = datetime.now()):
        self.place_id = place_id
        self.student_id = student_id
        self.time = time

    def __str__(self):
        return str(self.id) + \
               ': place_id -> ' + str(self.place_id) + \
               ', student_id -> ' + str(self.student_id) + \
               ', time -> ' + self.time.strftime('%Y/%m/%d - %H:%M:%S')
    
    def main():
    # テーブルが存在しなければ、テーブルを作成
        Base.metadata.create_all(bind=ENGINE)

    if __name__ == "__main__":
        main()