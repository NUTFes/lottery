from fastapi import FastAPI

from starlette.templating import Jinja2Templates
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED
from starlette.responses import RedirectResponse
import db
from models import Place, User

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

@app.get('/')
@app.post('/')
def index(request: Request):
  place = db.session.query(Place).all()
  return templates.TemplateResponse('index.html', 
                                   {'request': request, 'place':place})

@app.route('/delete/{p_id}')
def delete_place(p_id):
    place = db.session.query(Place).filter(Place.id == p_id).first()
    db.session.delete(place)
    db.session.commit()
    db.session.close()   
    return RedirectResponse('/')

@app.post('/add')
async def add_place(request: Request):
    data = await request.form()
    place = Place(name = data['place'])
    db.session.add(place)
    db.session.commit()
    db.session.close()
    return RedirectResponse('/')

@app.get('/place/{p_id}')
@app.post('/place/{p_id}')
# @app.route('/place/{p_id}', methods=['GET', 'POST'])
def place(request: Request, p_id :int):
  place = db.session.query(Place).filter(Place.id == p_id).first()
  user = db.session.query(User).filter(User.place_id == p_id).all()
  db.session.close()
  return templates.TemplateResponse('place.html',
                                    {'request': request,
                                    'p_id': p_id,
                                    'place': place,
                                    'user': user})

@app.post('/place/{p_id}/add')
async def add_user(request: Request, p_id :int):
    place = db.session.query(Place).filter(Place.id == p_id).first()
    data = await request.form()
    st_num = int(data['st_num'])
    user = User(place.id, st_num)
    db.session.add(user)
    db.session.commit()
    db.session.close()
    return RedirectResponse('/place/'+str(p_id))


@app.route('/place/{p_id}/delete/{t_id}')
def delete_user(p_id :int,t_id :int):
    place = db.session.query(Place).filter(Place.id == p_id).first()
    user = db.session.query(User).filter(User.id == t_id).first()
    if user.place_id != place.id:
        return RedirectResponse('/place/'+str(p_id))
    db.session.delete(user)
    db.session.commit()
    db.session.close()
    return RedirectResponse('/place/'+str(p_id))

# @app.add_api_route('/get')
# def get(p_id :int):
#     place = db.session.query(Place).filter(Place.id == p_id).first()
#     user = db.session.query(User).filter(User.place_id == place.id).all()
#     db.session.close()

#     # JSONフォーマット
#     user = [{
#         'id': t.id,
#         'place_id': t.place_id,
#         'st_num': t.st_num,
#         'updated_at': t.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
#     } for t in user]

#     return user