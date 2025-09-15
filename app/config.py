import motor.motor_asyncio
from beanie import init_beanie
from .models import Customer 

from pydantic_settings import BaseSettings, SettingsConfigDict 
from typing import Optional

class Settings(BaseSettings):
    MONGODB_URI: str

    NODE_ENV: str = "development"
    PORT: int = 8000

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()


settings = Settings()

async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URI)
    await init_beanie(database=client.get_default_database(), document_models=[Customer])