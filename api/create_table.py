import os

from dotenv import load_dotenv

from database import SQLITE3_NAME, Base, SessionLocal, engine
from models import Admin, Place, Time, User, Winner

load_dotenv()
ST_USER = os.getenv("ST_USER")
ST_PASS = os.getenv("ST_PASS")

if __name__ == "__main__":
    path = SQLITE3_NAME
    db = SessionLocal()

    if not os.path.isfile(path):

        # テーブルを作成する
        Base.metadata.create_all(engine)

    place = Place(name="体育館前")
    db.add(place)
    db.commit()

    time = Time()
    db.add(time)
    db.commit()

    user = User(place_id=place.id, number=10001000)
    db.add(user)
    db.commit()

    winner = Winner(place_id=place.id, user_id=user.id)
    db.add(winner)
    db.commit()

    admin = Admin(name=ST_USER, password=ST_PASS)
    db.add(admin)
    db.commit()

    db.close()  # セッションを閉じる
