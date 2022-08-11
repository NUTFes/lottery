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

    admin = Admin(name=ST_USER, password=ST_PASS)
    db.add(admin)
    time = Time()
    db.add(time)
    winner = Winner()
    db.add(winner)

    place = Place()
    place.name = "体育館前-1"

    user = User()
    user.number = 10001000
    user.places.append(place)
    db.add(user)

    db.commit()
    db.close()  # セッションを閉じる
