from models import *
from database import Base, engine, SQLITE3_NAME, SessionLocal
import os

if __name__ == "__main__":
    path = SQLITE3_NAME
    db = SessionLocal()

    if not os.path.isfile(path):

        # テーブルを作成する
        Base.metadata.create_all(engine)

    admin = Place(name='体育館前')
    db.add(admin)
    db.commit()

    time = Time()
    db.add(time)
    db.commit()

    user = User()
    db.add(user)
    db.commit()

    winner = Winner()
    db.add(winner)
    db.commit()

    db.close()  # セッションを閉じる