from models import *
import db
import os


if __name__ == "__main__":
    path = SQLITE3_NAME
    if not os.path.isfile(path):

        # テーブルを作成する
        Base.metadata.create_all(db.engine)

    # サンプルユーザ(admin)を作成
    admin = Place(placename='admin')
    db.session.add(admin)  # 追加
    db.session.commit()  # データベースにコミット

    # サンプルタスク
    log = Log(
        place_id=admin.id,
        student_id=10001000
    )
    print(log)
    db.session.add(log)
    db.session.commit()

    db.session.close()  # セッションを閉じる