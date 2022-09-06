import os
from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv

from database import SQLITE3_NAME, Base, SessionLocal, engine
from models import Admin, Place, Time, User, UserPlaces, Winner

JST = timezone(timedelta(hours=+9), "JST")

load_dotenv()
ST_USER = os.getenv("ST_USER")
ST_PASS = os.getenv("ST_PASS")

if __name__ == "__main__":
    path = SQLITE3_NAME
    db = SessionLocal()

    if not os.path.isfile(path):

        # テーブルを作成する
        Base.metadata.create_all(engine)

    admin = Admin(name=ST_USER, password=ST_PASS)
    db.add(admin)
    time = Time(
        start=datetime.now(JST) - timedelta(hours=3),
        end=datetime.now(JST) + timedelta(hours=3),
    )
    db.add(time)

    place = Place()
    place.name = "体育館前-1"

    user = User()
    user.number = 10001000
    user.places.append(place)
    db.add(user)

    place = Place()
    place.name = "体育館前-2"

    user = User()
    user.number = 20002000
    user.places.append(place)
    db.add(user)

    user = User()
    user.number = 12121212
    db.add(user)

    user_places = UserPlaces()
    user_places.place_id = 1
    user_places.user_id = 3
    db.add(user_places)

    user_places = UserPlaces()
    user_places.place_id = 2
    user_places.user_id = 3
    db.add(user_places)

    winner = Winner(user_id=1, number=10001000)
    db.add(winner)

    db.commit()
    db.close()  # セッションを閉じる
