from fastapi import FastAPI
from .config import init_db
from .routes import router

app = FastAPI(
    title="Drone Booking API",
    description="API for managing customers and drone shot bookings.",
    version="1.0.0"
)

@app.on_event("startup")
async def start_db():
    await init_db()

app.include_router(router, prefix="/api", tags=["API"])