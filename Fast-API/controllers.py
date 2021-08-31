from fastapi import FastAPI

from starlette.templating import Jinja2Templates
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED
from starlette.responses import RedirectResponse
import db
from models import Place, Log

# 正規表現でバリデーション
# import re
# pattern = re.compile(r'\w{4,20}')


app = FastAPI(
  title='Stickee',
  description='student ID keeper',
  version='0.9 beta'
)

templates = Jinja2Templates(directory="templates")
jinja_env = templates.env

def index(request: Request):
  placename = db.session.query(Place).all()
  return templates.TemplateResponse('index.html', 
                                   {'request': request, 'placename':placename})


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
    place = Place(placename = data['placename'])
    db.session.add(place)
    db.session.commit()
    db.session.close()

    return RedirectResponse('/')


def place(request: Request, p_id):
  place = db.session.query(Place).filter(Place.id == p_id).first()
  placename = db.session.query(Place).filter(Place.id == p_id).first()
  log = db.session.query(Log).filter(Log.place_id == p_id).all()
  db.session.close()
  return templates.TemplateResponse('place.html',
                                      {'p_id': p_id,
                                       'request': request,
                                       'place': place,
                                       'placename': placename,
                                       'log': log})


async def add_log(request: Request,p_id):
    place = db.session.query(Place).filter(Place.id == p_id).first()
    # # フォームからデータを取得
    data = await request.form()
    student_id = int(data['student_id'])
    log = Log(place.id, student_id)
    db.session.add(log)
    db.session.commit()
    db.session.close()

    return RedirectResponse('/place/'+str(p_id))



def delete_log(p_id,t_id):
    place = db.session.query(Place).filter(Place.id == p_id).first()
    # 該当タスクを取得
    log = db.session.query(Log).filter(Log.id == t_id).first()
    # もしユーザIDが異なれば削除せずリダイレクト
    if log.place_id != place.id:
        return RedirectResponse('/place/'+str(p_id))
    # 削除してコミット
    db.session.delete(log)
    db.session.commit()
    db.session.close()
    
    return RedirectResponse('/place/'+str(p_id))


def get(p_id):
    place = db.session.query(Place).filter(Place.id == p_id).first()
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