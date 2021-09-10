from pydantic import BaseModel


# データの作成時に使用 idといった作成時には不要なものを持たない
class PlaceCreate(BaseModel):
    name: str
    pass
class PlaceDelete(BaseModel):
    name: str
    pass
# データ読み取り時に使用
class Place(BaseModel):
    name: str
    id: int
    # ORMを使用する
    class Config:
        orm_mode = True
class PlaceMessage(BaseModel):
    id: int
    message :str
    # ORMを使用する
    class Config:
        orm_mode = True


class UserBase(BaseModel):
    place_id: int
    number: int
# データの作成時に使用 idといった作成時には不要なものを持たない
class UserCreate(UserBase):
    pass
class UserDelete(UserBase):
    pass
# データ読み取り時に使用
class User(UserBase):
    id: int
    # ORMを使用する
    class Config:
        orm_mode = True