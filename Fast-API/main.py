from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

from starlette.templating import Jinja2Templates
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED
from starlette.responses import RedirectResponse

from database import SessionLocal
import crud
import schemas

import re
pattern = re.compile(r'[0-9]{8}')

app = FastAPI(
  title='Stickee',
  description='student ID keeper',
  version='0.9 beta'
)

#: Configure CORS
origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


templates = Jinja2Templates(directory="templates")
jinja_env = templates.env

@app.get("/", response_model=List[schemas.Place])
def read_places(request: Request, db: Session = Depends(get_db)):
    db_places = crud.get_places(db)
    return templates.TemplateResponse('index.html', {'request': request, 'place':db_places})

@app.post("/add", response_model=schemas.Place)
async def create_place(request: Request, db: Session = Depends(get_db)):
    place = schemas.PlaceCreate
    data = await request.form() 
    place.name = data['place']
    db_place = crud.get_place_by_name(db, name=place.name)
    if db_place:
        raise HTTPException(status_code=400, detail="Place already registered")
    crud.create_place(db=db, place=place)
    return RedirectResponse(url="/", status_code=303)

@app.post("/delete/{p_id}", response_model=schemas.Place)
def delete_place(p_id: int, db: Session = Depends(get_db)):
    place = schemas.Place
    place.id = p_id
    db_place = crud.get_place_by_id(db, id=place.id)
    if db_place is None:
        raise HTTPException(status_code=404, detail="Place not found")
    crud.delete_place(db=db, place=place)
    return RedirectResponse(url="/", status_code=303)

@app.get("/place/{p_id}", response_model=List[schemas.User])
def read_users(request: Request, p_id: int, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_id(db, id=p_id)
    db_users = crud.get_users(db, p_id)
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return templates.TemplateResponse('place.html',
                                    {'request': request,
                                    'place': db_place,
                                    'user': db_users})

@app.post("/place/{p_id}/add", response_model=schemas.User)
async def create_user(request: Request, p_id: int, db: Session = Depends(get_db)):
    data = await request.form()
    user = schemas.UserCreate
    user.place_id = p_id
    user.number = data['number']
    db_user = crud.get_user_by_number(db, user=user)
    if db_user:
        crud.update_user(db=db, user=user)
        return RedirectResponse(url='/place/'+str(p_id), status_code=303)
    if pattern.match(user.number) is None:
        error="idは8桁の半角数字にしてください"
        db_place = crud.get_place_by_id(db, id=p_id)
        db_users = crud.get_users(db, p_id)
        return templates.TemplateResponse('place.html',{'request': request, 'place': db_place,'user': db_users,'error': error})
    crud.create_user(db=db, user=user)
    return RedirectResponse(url='/place/'+str(p_id), status_code=303)

@app.post("/place/{p_id}/delete/{u_id}", response_model=schemas.User)
def delete_user(p_id: int, u_id: int, db: Session = Depends(get_db)):
    user = schemas.User
    user.place_id = p_id
    user.id = u_id
    db_user = crud.get_user_by_id(db, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete_user(db=db, user=user)
    return RedirectResponse(url='/place/'+str(p_id), status_code=303)

@app.get("/place/{p_id}/latest", response_model=schemas.User)
def read_latest_users(request: Request, p_id: int, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_id(db, id=p_id)
    db_users = crud.get_latest_users(db, p_id)
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return templates.TemplateResponse('latest.html',
                                    {'request': request,
                                    'place': db_place,
                                    'user': db_users})

@app.get("/place/{p_id}/random", response_model=schemas.User)
def read_random_users(request: Request,p_id: int, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_id(db, id=p_id)
    db_users = crud.get_random_users(db, p_id)
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return templates.TemplateResponse('random.html',
                                    {'request': request,
                                    'place': db_place,
                                    'user': db_users})
# =============================================================


@app.get("/api", response_model=List[schemas.Place])
def read_places(db: Session = Depends(get_db)):
    db_places = crud.get_places(db)
    return db_places

@app.post("/api/add", response_model=schemas.Place)
async def create_place(place: schemas.PlaceCreate, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_name(db, name=place.name)
    if db_place:
        raise HTTPException(status_code=400, detail="Place already registered")
    return crud.create_place(db=db, place=place)

@app.delete("/api/delete/{p_id}", response_model=schemas.Place)
def delete_place(p_id: int, place: schemas.Place, db: Session = Depends(get_db)):
    place.id = p_id
    db_place = crud.get_place_by_id(db, id=place.id)
    if db_place is None:
        raise HTTPException(status_code=404, detail="Place not found")
    return crud.delete_place(db=db, place=place)


@app.get("/api/place/{p_id}", response_model=List[schemas.User])
def read_users(p_id: int, db: Session = Depends(get_db)):
    db_users = crud.get_users(db, p_id)
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_users

@app.post("/api/place/{p_id}/add", response_model=schemas.User)
async def create_user(p_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    user.place_id = p_id
    db_user = crud.get_user_by_number(db, user=user)
    if db_user:
        return crud.update_user(db=db, user=user)
    return crud.create_user(db=db, user=user)

@app.delete("/api/place/{p_id}/delete/{u_id}", response_model=schemas.User)
def delete_user(p_id: int, u_id: int, user: schemas.User, db: Session = Depends(get_db)):
    user.place_id = p_id
    user.id = u_id
    db_user = crud.get_user_by_id(db, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_user(db=db, user=user)

@app.get("/api/place/{p_id}/latest", response_model=schemas.User)
def read_latest_users(p_id: int, db: Session = Depends(get_db)):
    db_users = crud.get_latest_users(db, p_id)
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_users

@app.get("/api/place/{p_id}/random", response_model=schemas.User)
def read_random_users(p_id: int, db: Session = Depends(get_db)):
    db_users = crud.get_random_users(db, p_id)
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_users