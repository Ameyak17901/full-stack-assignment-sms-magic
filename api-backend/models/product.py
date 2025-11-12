from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped
from sqlalchemy import String, Float
from sqlalchemy.types import DateTime

class Base(DeclarativeBase):
    pass

class Product(Base):
    __tablename__ = "Product"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(String(255))
    price: Mapped[float] = mapped_column(Float())
    total_quantity: Mapped[int]
    available_quantity: Mapped[int]
    need_restock: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))

    def to_dict(self):
        return { c.name: getattr(self, c.name ) for c in self.__table__.columns}