from sqlalchemy import create_engine, Engine 
from models.product import Base

import os


def get_db_engine() -> Engine:
    DATABASE_URI = os.getenv("DATABASE_URI")

    if not DATABASE_URI:
        raise ValueError("DATABASE_URI not set in environment variables")

    engine = create_engine(DATABASE_URI)
    Base.metadata.create_all(bind=engine)
    return engine