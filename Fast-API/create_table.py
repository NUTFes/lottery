from models import *
import db
import os


if __name__ == "__main__":
    path = SQLITE3_NAME
    if not os.path.isfile(path):

        # テーブルを作成する
        Base.metadata.create_all(db.engine)

    # サンプルユーザ(admin)を作成
    admin = Place(name='admin')
    db.session.add(admin)  # 追加
    db.session.commit()  # データベースにコミット

    # サンプルタスク
    user = User(
        place_id=admin.id,
        st_num=10001000
    )
    db.session.add(user)
    db.session.commit()

    db.session.close()  # セッションを閉じる