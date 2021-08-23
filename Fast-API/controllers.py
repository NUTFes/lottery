from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from starlette.templating import Jinja2Templates
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED

import db
from models import Place, Log

import hashlib

import re
pattern = re.compile(r'\w{4,20}')
pattern_pw = re.compile(r'\w{6,20}')

from datetime import datetime
from datetime import timedelta

from auth import auth

from starlette.responses import RedirectResponse

app = FastAPI(
  title='Stickee',
  description='student ID keeper',
  version='0.9 beta'
)

templates = Jinja2Templates(directory="templates")
jinja_env = templates.env

security = HTTPBasic()

def index(request: Request):
  placename = db.session.query(Place).all()
  return templates.TemplateResponse('index.html', 
                                   {'request': request, 'placename':placename})


def admin(request: Request, credentials: HTTPBasicCredentials = Depends(security)):

    placename = auth(credentials)
    password = hashlib.md5(credentials.password.encode()).hexdigest()

    place = db.session.query(Place).filter(Place.placename == placename).first()
    log = db.session.query(Log).filter(Log.place_id == place.id).all()
    db.session.close()
 
    # 該当ユーザがいない場合
    if place is None or place.password != password:
        error = 'ユーザ名かパスワードが間違っています'
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=error,
            headers={"WWW-Authenticate": "Basic"},
        )
 
    # 特に問題がなければ管理者ページへ
    return templates.TemplateResponse('admin.html',
                                      {'request': request,
                                       'place': place,
                                       'log': log})


async def register(request: Request):
  if request.method == 'GET':
    return templates.TemplateResponse('register.html',
                                      {'request': request,
                                        'placename': '',
                                        'error': []})

  if request.method == 'POST':
    # POSTデータ
    data = await request.form()
    placename = data.get('placename')
    password = data.get('password')
    password_tmp = data.get('password_tmp')

    error = []

    tmp_place = db.session.query(Place).filter(Place.placename == placename).first()

    # 怒涛のエラー処理
    if tmp_place is not None:
      error.append('同じ場所が存在します。')
    if password != password_tmp:
      error.append('入力したパスワードが一致しません。')
    # if pattern.match(placename) is None:
    #   error.append('ユーザ名は4~20文字の半角英数字にしてください。')
    if pattern_pw.match(password) is None:
      error.append('パスワードは6~20文字の半角英数字にしてください。')
    # エラーがあれば登録ページへ戻す
    if error:
      return templates.TemplateResponse('register.html',
                                        {'request': request,
                                         'placename': placename,
                                         'error': error})
    # 問題がなければユーザ登録
    place = Place(placename, password)
    db.session.add(place)
    db.session.commit()
    db.session.close()

    return templates.TemplateResponse('complete.html',
                                     {'request': request,
                                      'placename': placename})


async def add(request: Request, credentials: HTTPBasicCredentials = Depends(security)):
    # 認証
    placename = auth(credentials)
    # ユーザ情報を取得
    place = db.session.query(Place).filter(Place.placename == placename).first()
    # # フォームからデータを取得
    data = await request.form()
    student_id = int(data['student_id'])
    log = Log(place.id, student_id)
    db.session.add(log)
    db.session.commit()
    db.session.close()

    return RedirectResponse('/admin')


def delete(t_id, credentials: HTTPBasicCredentials = Depends(security)):
    # 認証
    placename = auth(credentials)
    # ログインユーザ情報を取得
    place = db.session.query(Place).filter(Place.placename == placename).first()
    # 該当タスクを取得
    log = db.session.query(Log).filter(Log.id == t_id).first()
    # もしユーザIDが異なれば削除せずリダイレクト
    if log.place_id != place.id:
        return RedirectResponse('/admin')
    # 削除してコミット
    db.session.delete(log)
    db.session.commit()
    db.session.close()
    
    return RedirectResponse('/admin')


def get(credentials: HTTPBasicCredentials = Depends(security)):
    # 認証
    placename = auth(credentials)
    # ユーザ情報を取得
    place = db.session.query(Place).filter(Place.placename == placename).first()
    # タスクを取得
    log = db.session.query(Log).filter(Log.place_id == place.id).all()

    db.session.close()

    # JSONフォーマット
    log = [{
        'id': t.id,
        'place_id': t.place_id,
        'student_id': t.student_id,
        'time': t.time.strftime('%Y-%m-%d %H:%M:%S'),
    } for t in log]

    return log

def delete_place(p_id):
    # 認証
    placename = db.session.query(Place).filter(Place.id == p_id).first()
    # 削除してコミット
    db.session.delete(placename)
    db.session.commit()
    db.session.close()
    
    return RedirectResponse('/')

async def add_place(request: Request):
    data = await request.form()
    place = Place(placename = data['placename'],password='fastapi')
    db.session.add(place)
    db.session.commit()
    db.session.close()

    return RedirectResponse('/')