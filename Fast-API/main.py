from typing import List

from fastapi import Depends, FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles

from sqlalchemy.orm import Session

from starlette.middleware.cors import CORSMiddleware
from starlette.templating import Jinja2Templates
from starlette.requests import Request
from starlette.responses import RedirectResponse

from datetime import datetime
from database import SessionLocal
from notifier import Notifier
notifier = Notifier()
import crud
import schemas

import re
pattern = re.compile(r'[0-9]{8}')

app = FastAPI(
  title='Stickee',
  description='student ID keeper',
  version='0.9 beta'
)

app.mount("/static", StaticFiles(directory="static"), name="static")

#: Configure CORS
origins = [
    "http://localhost:3000",
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

@app.get("/place/{p_id}/chat", response_model=List[schemas.Winner])
def read_places(request: Request, p_id: int, db: Session = Depends(get_db)):
    place = schemas.Place
    place.id = p_id
    db_place = crud.get_place_by_id(db, id=place.id)
    db_winners = crud.get_win_users(db, p_id)
    return templates.TemplateResponse('chat.html', {'request': request, 'place':db_place,'winner': db_winners})

@app.get("/", response_model=List[schemas.Place])
def read_places(request: Request, db: Session = Depends(get_db)):
    db_time     = crud.get_limit_time(db)
    start       = db_time.start.strftime('%Y-%m-%d')
    starttime   = db_time.start.strftime('%H:%M')
    end         = db_time.end.strftime('%Y-%m-%d')
    endtime     = db_time.end.strftime('%H:%M')


    db_places = crud.get_places(db)
    return templates.TemplateResponse('index.html', {'request': request, 'place':db_places, 'startdate':start,'starttime':starttime,'enddate':end,'endtime':endtime})
@app.post("/add", response_model=schemas.Place)
async def create_place(request: Request, db: Session = Depends(get_db)):
    place = schemas.PlaceCreate
    data = await request.form() 
    place.name = data['place']
    print(data)
    db_place = crud.get_place_by_name(db, name=place.name)
    if db_place:
        raise HTTPException(status_code=400, detail="Place already registered")
    crud.create_place(db=db, place=place)
    return RedirectResponse(url="/", status_code=303)

@app.post("/updatetime",response_model=schemas.Time)
async def update_time(request: Request, db:Session=Depends(get_db)):
    data = await request.form()
    start = data['startdate'] +  " " +data['starttime']
    end = data['enddate'] + " " +data['endtime']
    time = schemas.Time
    time.start=datetime.strptime(start, '%Y-%m-%d %H:%M')
    time.end=datetime.strptime(end, '%Y-%m-%d %H:%M')
    crud.update_time(db , time)
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

@app.get("/place/{p_id}/message", response_model=schemas.User)
def read_place_message(request: Request,p_id: int, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_id(db, id=p_id)
    print(db_place.id)
    return templates.TemplateResponse('message.html',{'request': request,'place': db_place})


@app.get("/place/{p_id}/random_before")
def read_random_users(request: Request, p_id: int, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_id(db, id=p_id)
    return templates.TemplateResponse('random_before.html',
                                    {'request': request, 'place': db_place})


@app.get("/place/{p_id}/random", response_model=schemas.User)
async def read_random_users(request: Request, p_id: int, db: Session = Depends(get_db)):
    db_place = crud.get_place_by_id(db, id=p_id)
    time = crud.get_limit_time(db)
    # DBに登録したTimeを引っ張り出してくる
    # time.start, time.endを使ってランダムやるよ
    db_user = crud.get_random_user(db, p_id,time.start,time.end)
    db_place = crud.get_place_by_id(db, id=p_id)
    if db_user is None:
        error="抽選番号がありません"
        return templates.TemplateResponse('error.html',
                                    {'request': request,
                                    'place': db_place,
                                    'error':error})
    winner = schemas.WinnerCreate
    winner.place_id = db_user.place_id
    winner.user_id = db_user.id
    crud.create_winner(db, winner)
    data = {
        "place_id": db_user.place_id,
        "client"  : "Random", 
        "message" : str(db_user.number)
    }
    await notifier.push(data)
    return templates.TemplateResponse('random.html',
                                    {'request': request,
                                    'place': db_place,
                                    'user': db_user})

@app.get("/place/{p_id}/winner", response_model=List[schemas.Winner])
def read_winners(request: Request, p_id: int, db: Session = Depends(get_db)):
    db_winners = crud.get_win_users(db, p_id)
    db_place = crud.get_place_by_id(db, id=p_id)
    if db_winners is None:
        raise HTTPException(status_code=404, detail="Winner not found")
    return templates.TemplateResponse('winner.html',
                                    {'request': request,
                                    'place': db_place,
                                    'winner': db_winners})

@app.post("/place/{p_id}/winner/delete/{w_id}", response_model=schemas.WinnerDelete)
def delete_winner(p_id: int, w_id: int, db: Session = Depends(get_db)):
    winner = schemas.Winner
    winner.place_id = p_id
    winner.user_id = w_id
    db_user = crud.get_winner_by_user_id(db, winner=winner)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Winner not found")
    crud.delete_winner(db=db, winner=winner)
    return RedirectResponse(url='/place/'+str(p_id)+'/winner', status_code=303)


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

@app.get("/api/place/{p_id}/random", response_model=schemas.User)
def read_random_user(p_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_random_user(db, p_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    winner = schemas.WinnerCreate
    winner.place_id = db_user.place_id
    winner.user_id = db_user.id
    crud.create_winner(db, winner)
    return db_user

@app.get("/api/place/{p_id}/winner", response_model=List[schemas.User])
#返しているのはUserなのでresponseはUser
def read_winners(p_id: int, db: Session = Depends(get_db)):
    db_win_users = crud.get_win_users(db, p_id)
    if db_win_users is None:
        raise HTTPException(status_code=404, detail="Winner not found")
    return db_win_users

@app.delete("/api/place/{p_id}/winner/delete/{w_id}", response_model=schemas.WinnerDelete)
def delete_winner(p_id: int, w_id: int, winner: schemas.Winner, db: Session = Depends(get_db)):
    winner.place_id = p_id
    winner.user_id = w_id
    db_user = crud.get_winner_by_user_id(db, winner=winner)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_winner(db=db, winner=winner)


# Websocket用のパス
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # クライアントとのコネクション確立
    await notifier.connect(websocket)
    try:
        while True:
            # クライアントからメッセージの受け取り
            data = await websocket.receive_json()
            # 双方向通信する場合
            #  await websocket.send_text(f"Message text was: {data}")
            # ブロードキャスト
            await notifier.push(data)
    # セッションが切れた場合
    except WebSocketDisconnect:
        # 切れたセッションの削除
        notifier.remove(websocket)

# ブロードキャスト用のAPI
@app.get("/push/{message}")
async def push_to_connected_websockets(message: str):
    # ブロードキャスト
    await notifier.push(f"{message}")

# サーバ起動時の処理
@app.on_event("startup")
async def startup():
    # プッシュ通知の準備
    await notifier.generator.asend(None)