from models import *
from database import Base, engine, SQLITE3_NAME, SessionLocal
import os

if __name__ == "__main__":
    path = SQLITE3_NAME
    db = SessionLocal()

    if not os.path.isfile(path):

        # テーブルを作成する
        Base.metadata.create_all(engine)

    # サンプルユーザ(admin)を作成
    admin = Place(name='admin')
    db.add(admin)  # 追加
    db.commit()  # データベースにコミット

    # サンプルタスク
    user = User(
        place_id=admin.id,
        number=10001000
    )
    db.add(user)
    db.commit()

    winner = Winner(
        place_id=admin.id,
        user_id=user.id
    )
    db.add(winner)
    db.commit()

    db.close()  # セッションを閉じる