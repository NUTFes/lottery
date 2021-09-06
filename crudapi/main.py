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
    places = crud.get_places(db)
    return templates.TemplateResponse('index.html', {'request': request, 'places':places})

@app.post("/add", response_model=schemas.Place)
async def create_place(request: Request, place: schemas.PlaceCreate, db: Session = Depends(get_db)):
    data = await request.form()
    place = schemas.Place(name=data['place'])
    db_place = crud.get_place_by_name(db, place=place)
    if db_place:
        raise HTTPException(status_code=400, detail="Email already registered")
    crud.create_place(db=db, place=place)
    return RedirectResponse('/')

@app.delete("/delete/{p_id}", response_model=schemas.Place)
def delete_place(p_id: int, place: schemas.Place, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_id(db, p_id=p_id)
    if db_place:
        print("ok")
    crud.delete_place(db=db, place=place, p_id=p_id)
    return RedirectResponse('/')


@app.get("/place/{p_id}", response_model=schemas.User)
def read_users(request: Request, p_id: int, db: Session = Depends(get_db)):
    users = crud.get_users(db, p_id)
    db_place = crud.get_place_by_id(db, p_id=p_id)
    return templates.TemplateResponse('place.html',{'request': request,'place': db_place,'user': users})

@app.post("/place/{p_id}/add", response_model=schemas.User)
async def create_place(request: Request, p_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    data = await request.form()
    user.number=data['number']
    db_user = crud.get_user_by_number(db, user=user)
    if db_user:
        raise HTTPException(status_code=400, detail="User number already registered")
    return crud.create_place(db=db, user=user, p_id=p_id)

@app.delete("/place/{p_id}/delete/{u_id}", response_model=schemas.User)
def delete_place(p_id: int, u_id: int, user: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.get_place_by_id(db, p_id=p_id, u_id=u_id)
    if db_user:
        raise print("ok")
    return crud.delete_place(db=db, user=user)








@app.get("/api", response_model=List[schemas.Place])
def read_places(db: Session = Depends(get_db)):
    db_places = crud.get_places(db)
    return db_places

@app.post("/api/add", response_model=schemas.Place)
async def create_place(place: schemas.PlaceCreate, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_name(db, name=place.name)
    if db_place:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_place(db=db, place=place)

@app.delete("/api/delete/{p_id}", response_model=schemas.Place)
def delete_place(place: schemas.Place, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_id(db, id=place.id)
    if db_place is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_place(db=db, place=place)


@app.get("/api/place/{p_id}", response_model=schemas.User)
def read_users(p_id: int, db: Session = Depends(get_db)):
    db_users = crud.get_users(db, p_id)
    if db_users is None:
        raise HTTPException(status_code=404, detail="Place not found")
    return db_users

@app.post("/api/place/{p_id}/add", response_model=schemas.User)
async def create_place(p_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_number(db, user=user)
    if db_user:
        raise HTTPException(status_code=400, detail="User number already registered")
    return crud.create_place(db=db, user=user, p_id=p_id)

@app.delete("/api/place/{p_id}/delete/{u_id}", response_model=schemas.User)
def delete_place(p_id: int, u_id: int, user: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.get_place_by_id(db, p_id=p_id, u_id=u_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_place(db=db, user=user)