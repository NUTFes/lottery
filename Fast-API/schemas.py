from datetime import datetime
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
    id: int
    name: str
    updated_at: datetime
    created_at: datetime
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
    place_id: int
    number: int
    updated_at: datetime
    created_at: datetime
    # ORMを使用する
    class Config:
        orm_mode = True


class WinnerBase(BaseModel):
    place_id: int
    user_id: int
# データの作成時に使用 idといった作成時には不要なものを持たない
class WinnerCreate(WinnerBase):
    pass
class WinnerDelete(WinnerBase):
    pass
# データ読み取り時に使用
class Winner(WinnerBase):
    id: int
    updated_at: datetime
    created_at: datetime
    # ORMを使用する
    class Config:
        orm_mode = True