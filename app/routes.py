from fastapi import APIRouter, HTTPException, status
from beanie.operators import Set, Push
from typing import List
from app.models import Customer, Booking

router = APIRouter()

@router.post("/customer", response_model=Customer, status_code=status.HTTP_201_CREATED)
async def add_customer(customer: Customer):
    if await Customer.find_one(Customer.email == customer.email):
        raise HTTPException(status_code=400, detail="Email already exists")
    await customer.create()
    return customer

@router.get("/customer/{email}", response_model=Customer)
async def get_customer_details(email: str):
    customer = await Customer.find_one(Customer.email == email)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.post("/dashboard/{email}/booking", status_code=status.HTTP_201_CREATED)
async def add_customer_booking(email: str, booking: Booking):
    customer = await Customer.find_one(Customer.email == email)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    await customer.update(Push({Customer.bookings: booking}))
    return {"message": "Booking created successfully"}

