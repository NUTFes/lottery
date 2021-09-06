from pydantic import BaseModel


# データの作成および読み取りで使用する共通の属性
class PlaceBase(BaseModel):
    name: str
# データの作成時に使用 idといった作成時には不要なものを持たない
class PlaceCreate(PlaceBase):
    pass
class PlaceDelete(PlaceBase):
    pass
# データ読み取り時に使用
class Place(PlaceBase):
    id: int
    # ORMを使用する
    class Config:
        orm_mode = True


class UserBase(BaseModel):
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