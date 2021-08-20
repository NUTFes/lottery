from fastapi import FastAPI
from starlette.templating import Jinja2Templates  # new
from starlette.requests import Request
import db
from models import User, Task

app = FastAPI(
  title='FastAPIでつくるtoDoアプリケーション',
  description='FastAPIチュートリアル：FastAPI(とstarlette)でシンプルなtoDoアプリを作りましょう．',
  version='0.9 beta'
)

templates = Jinja2Templates(directory="templates")
jinja_env = templates.env  # Jinja2.Environment : filterやglobalの設定用



def index(request: Request):
  return templates.TemplateResponse('index.html', 
                                   {'request': request})

def admin(request: Request):
    # ユーザとタスクを取得
    # とりあえず今はadminユーザのみ取得
    user = db.session.query(User).filter(User.username == 'admin').first()
    task = db.session.query(Task).filter(Task.user_id == user.id).all()
    db.session.close()

    return templates.TemplateResponse('admin.html',
                                      {'request': request,
                                       'user': user,
                                       'task': task})