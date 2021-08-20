from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from starlette.templating import Jinja2Templates  # new
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED

import db
from models import User, Task

import hashlib

import re
pattern = re.compile(r'\w{4,20}')
pattern_pw = re.compile(r'\w{6,20}')
pattern_mail = re.compile(r'^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$')


app = FastAPI(
  title='FastAPIでつくるtoDoアプリケーション',
  description='FastAPIチュートリアル：FastAPI(とstarlette)でシンプルなtoDoアプリを作りましょう．',
  version='0.9 beta'
)

templates = Jinja2Templates(directory="templates")
jinja_env = templates.env

security = HTTPBasic()

def index(request: Request):
  return templates.TemplateResponse('index.html', 
                                   {'request': request})

def admin(request: Request, credentials: HTTPBasicCredentials = Depends(security)):
    # Basic認証で受け取った情報
    username = credentials.username
    password = hashlib.md5(credentials.password.encode()).hexdigest()
 
    # データベースからユーザ名が一致するデータを取得
    user = db.session.query(User).filter(User.username == username).first()
    task = db.session.query(Task).filter(Task.user_id == user.id).all() if user is not None else []
    db.session.close()
 
    # 該当ユーザがいない場合
    if user is None or user.password != password:
        error = 'ユーザ名かパスワードが間違っています'
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=error,
            headers={"WWW-Authenticate": "Basic"},
        )
 
    # 特に問題がなければ管理者ページへ
    return templates.TemplateResponse('admin.html',
                                      {'request': request,
                                       'user': user,
                                       'task': task})

# controllers.py
async def register(request: Request):
  if request.method == 'GET':
    return templates.TemplateResponse('register.html',
                                      {'request': request,
                                        'username': '',
                                        'error': []})

  if request.method == 'POST':
    # POSTデータ
    data = await request.form()
    username = data.get('username')
    password = data.get('password')
    password_tmp = data.get('password_tmp')
    mail = data.get('mail')

    # new ここから
    error = []

    tmp_user = db.session.query(User).filter(User.username == username).first()

    # 怒涛のエラー処理
    if tmp_user is not None:
      error.append('同じユーザ名のユーザが存在します。')
    if password != password_tmp:
      error.append('入力したパスワードが一致しません。')
    if pattern.match(username) is None:
      error.append('ユーザ名は4~20文字の半角英数字にしてください。')
    if pattern_pw.match(password) is None:
      error.append('パスワードは6~20文字の半角英数字にしてください。')
    if pattern_mail.match(mail) is None:
      error.append('正しくメールアドレスを入力してください。')

    # エラーがあれば登録ページへ戻す
    if error:
      return templates.TemplateResponse('register.html',
                                        {'request': request,
                                          'username': username,
                                          'error': error})

    # 問題がなければユーザ登録
    user = User(username, password, mail)
    db.session.add(user)
    db.session.commit()
    db.session.close()

    return templates.TemplateResponse('complete.html',
                                      {'request': request,
                                        'username': username})