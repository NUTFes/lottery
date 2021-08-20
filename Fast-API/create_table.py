from models import *
import db
import os


if __name__ == "__main__":
    path = SQLITE3_NAME
    if not os.path.isfile(path):

        # テーブルを作成する
        Base.metadata.create_all(db.engine)

    # サンプルユーザ(admin)を作成
    admin = User(username='admin', password='fastapi', mail='hoge@example.com')
    db.session.add(admin)  # 追加
    db.session.commit()  # データベースにコミット

    # サンプルタスク
    task = Task(
        user_id=admin.id,
        content='〇〇の締め切り',
        deadline=datetime(2019, 12, 25, 12, 00, 00),
    )
    print(task)
    db.session.add(task)
    db.session.commit()

    db.session.close()  # セッションを閉じる