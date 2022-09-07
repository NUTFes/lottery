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
    id: int
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
    number: int
    updated_at: datetime
    created_at: datetime

    class Config:
        orm_mode = True


class Time(BaseModel):
    start: datetime
    end: datetime

    class Config:
        orm_mode = True


class UserPlacesCreate(BaseModel):
    # Request Body (Create)
    place_id: int
    user_id: int


class UserPlacesDelete(BaseModel):
    # Request Body (Delete)
    place_id: int
    user_id: int


class UserPlaces(BaseModel):
    # Response Body
    place_id: int
    user_id: int

    class Config:
        orm_mode = True
