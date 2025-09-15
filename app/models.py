# app/models.py
from beanie import Document
from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Optional

class Booking(BaseModel):
    location_id: str
    drone_shot_id: str
    booking_date: date  

class Customer(Document):
    email: EmailStr  
    name: str
    age: int
    gender: str
    bookings: List[Booking] = []
    registered_number: int

    class Settings:
        name = "customers"