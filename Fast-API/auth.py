import hashlib
import db
from models import Place
from starlette.status import HTTP_401_UNAUTHORIZED
from fastapi import HTTPException


def auth(credentials):
    """ Basic認証チェック """
    # Basic認証で受け取った情報
    placename = credentials.username
    password = hashlib.md5(credentials.password.encode()).hexdigest()
    # データベースからユーザ名が一致するデータを取得
    place = db.session.query(Place).filter(Place.placename == placename).first()
    db.session.close()

    # 該当ユーザがいない場合
    if place is None or place.password != password:
        error = 'ユーザ名かパスワードが間違っています．'
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=error,
            headers={"WWW-Authenticate": "Basic"},
        )
    return placename