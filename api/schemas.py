from datetime import datetime
from pydantic import BaseModel


class PlaceBase(BaseModel):
    name: str


class PlaceCreate(PlaceBase):
    pass


class PlaceDelete(PlaceBase):
    pass


class Place(PlaceBase):
    id: int
    name: str
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    place_id: int
    number: int


class UserCreate(UserBase):
    pass


class UserDelete(UserBase):
    pass


class User(UserBase):
    id: int
    place_id: int
    number: int
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class WinnerBase(BaseModel):
    place_id: int
    user_id: int


class WinnerCreate(WinnerBase):
    pass


class WinnerDelete(WinnerBase):
    pass


class Winner(WinnerBase):
    id: int
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class Time(BaseModel):
    start: datetime
    end: datetime


class PlaceUserBase(BaseModel):
    place_id: int
    user_id: int


class PlaceUserCreate(PlaceUserBase):
    pass


class PlaceUserDelete(PlaceUserBase):
    pass


class PlaceUser(PlaceUserBase):
    place_id: int
    user_id: int

    class Config:
        orm_mode = True
