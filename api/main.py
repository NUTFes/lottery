import hashlib
from typing import List, Union

from fastapi import Depends, FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

import crud
import schemas
from database import SessionLocal
from notifier import Notifier

notifier = Notifier()


app = FastAPI(title="Stickee", description="student ID keeper", version="0.9 beta")


#: Configure CORS
origins = [
    "http://localhost:8888",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():  # Dependency
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def get_root():
    return {"message": "Hello World"}


@app.get("/api")
def get_api():
    return {"message": "Hello API"}


# 現在の登録人数の取得
@app.get("/api/register")
def get_registers_view(db: Session = Depends(get_db)):
    register_num = 0
    place_num = len(crud.get_places(db))
    for i in range(1, place_num + 1):
        register = crud.get_users(db, i)
        register_num += len(register)
    return register_num


@app.get("/api/places", response_model=List[schemas.Place])
def read_places(
    user_id: Union[int, None] = None,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)
    db_places = crud.get_places(db, user_id=user_id)
    return db_places


@app.post("/api/place", response_model=schemas.Place)
async def create_place(
    place: schemas.PlaceCreate,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)
    db_place = crud.get_place_by_name(db, name=place.name)
    if db_place:
        raise HTTPException(status_code=400, detail="Place already registered")
    return crud.create_place(db=db, place=place)


@app.delete("/api/place", response_model=schemas.Place)
def delete_place(
    place: schemas.PlaceDelete,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)
    db_place = crud.get_place_by_id(db, id=place.id)
    if db_place is None:
        raise HTTPException(status_code=404, detail="Place not found")
    return crud.delete_place(db=db, place=place)


@app.get("/api/users", response_model=List[schemas.User])
def read_users(
    place_id: Union[int, None] = None,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)
    db_users = crud.get_users(db, place_id=place_id)
    if db_users is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_users


@app.post("/api/user", response_model=schemas.User)
async def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)
    db_user_places = crud.get_user_places(db, user=user, place_id=user.place_id)
    db_user = crud.get_user_by_number(db, user=user)
    # 同じ番号が同じ場所に既に登録されている場合はUPDATE
    if db_user_places:
        print("21341234123412341")
        return crud.update_user(db=db, user=user)
    # placeのみ登録されていない場合は登録
    elif db_user:
        print("adfasdfasdfasdf")
        return crud.add_user_places(db=db, user=user)

    return crud.create_user(db=db, user=user)


@app.delete("/api/user", response_model=schemas.User)
def delete_user(
    user: schemas.UserDelete,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)
    db_user = crud.get_user_by_id(db, user=user, place_id=user.place_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_user(db=db, user=user, place_id=user.place_id)


@app.get("/api/random", response_model=List[schemas.User])
def read_random_user(
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)
    db_user = crud.get_random_user(db)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    winner = schemas.WinnerCreate
    winner.user_id = db_user.id
    crud.create_winner(db, winner)
    return [db_user]


@app.get("/api/winners", response_model=List[schemas.User])
def read_winners(db: Session = Depends(get_db)):
    db_win_users = crud.get_win_users(db)
    if db_win_users is None:
        raise HTTPException(status_code=404, detail="Winner not found")
    return db_win_users


@app.post("/api/winner", response_model=schemas.Winner)
async def create_winner(
    winner: schemas.WinnerCreate,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)

    user = schemas.User
    user.id = winner.user_id

    db_user = crud.get_user_by_id(db, user=user, place_id=None)
    db_winner = crud.get_winner_by_user_id(db, winner=winner)

    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    elif db_winner:
        raise HTTPException(status_code=409, detail="Winner already exists")
    return crud.create_winner(db=db, winner=winner)


@app.delete("/api/winner", response_model=schemas.WinnerDelete)
def delete_winner(
    winner: schemas.WinnerDelete,
    db: Session = Depends(get_db),
    credentials: HTTPBasicCredentials = Depends(HTTPBasic()),
):
    auth(db, credentials)
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
# @app.get("/push/{message}")
# async def push_to_connected_websockets(message: str):
#     # ブロードキャスト
#     await notifier.push(f"{message}")

# サーバ起動時の処理
@app.on_event("startup")
async def startup():
    # プッシュ通知の準備
    await notifier.generator.asend(None)


def auth(db, credentials):
    adminname = credentials.username
    password = hashlib.md5(credentials.password.encode()).hexdigest()
    db_admin = crud.get_admin_by_name(db, adminname)
    # 該当ユーザがいない場合
    if db_admin.password != password:
        error = "ユーザ名かパスワードが間違っています"
        raise HTTPException(
            status_code=401,
            detail=error,
            headers={"WWW-Authenticate": "Basic"},
        )
    return adminname
