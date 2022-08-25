from datetime import datetime

from pydantic import BaseModel


class PlaceCreate(BaseModel):
    # Request Body (Create)
    name: str


class PlaceDelete(BaseModel):
    # Request Body (Delete)
    id: int


class Place(BaseModel):
    # Response Body
    id: int
    name: str
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    # Request Body (Create)
    number: int
    place_id: int


class UserDelete(BaseModel):
    # Request Body (Delete)
    number: int
    place_id: int = 0


class User(BaseModel):
    # Response Body
    id: int
    number: int
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class WinnerCreate(BaseModel):
    # Request Body (Create)
    user_id: int


class WinnerDelete(BaseModel):
    # Request Body (Delete)
    user_id: int


class Winner(BaseModel):
    # Response Body
    id: int
    user_id: int
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class Time(BaseModel):
    start: datetime
    end: datetime


class UserPlacesBase(BaseModel):
    place_id: int
    user_id: int


class UserPlacesCreate(UserPlacesBase):
    pass


class UserPlacesDelete(UserPlacesBase):
    pass


class UserPlaces(UserPlacesBase):
    place_id: int
    user_id: int

    class Config:
        orm_mode = True
