from sqlalchemy.orm import Session
from sqlalchemy import select
from models.product import Product
from datetime import datetime

from config import get_db_engine

def get_product():
    try:
        engine = get_db_engine()
        with Session(engine) as session:
            # Get products
            stmt = select(Product)
            products = session.scalars(stmt).all()
        return { "products": [product.to_dict() for product in products] } 
    except Exception as e:
        return { "status": 500, "message": str(e) }

def create_product(product_data):
    try:
        engine = get_db_engine()
        with Session(engine) as session:
            # Get products
            new_product = Product(**product_data, created_at=datetime.now(), updated_at=datetime.now())
            session.add(new_product)
            session.commit()
        return { "status": 201, "message": "Product created successfully!" }    
    except Exception as e:
        return { "status": 500, "message": str(e) }

def get_product_by_id(id):
    try:
        engine = get_db_engine()
        with Session(engine) as session:
            # Get products
            stmt = select(Product).where(Product.id == id)
            product = session.scalars(stmt).first()
            from main import app 
            app.logger.info("Fetched product by id", product)
            return { "products": [product.to_dict()] } 
    except Exception as e:
        from main import app
        app.logger.error(f"Error fetching product by id: {e}")
        return { "status": 500, "message": str(e) }
    
def update_product(id, updated_data):
    try:
        engine = get_db_engine()
        with Session(engine) as session:

            stmt = select(Product).where(Product.id == id)
            product = session.scalars(stmt).first()

            for key, value in updated_data.items():
                setattr(product, key, value)
            product.updated_at = datetime.now()

            session.commit()
        from main import app
        app.logger.info("Product updated successfully!")
    except Exception as e:
       from main import app 
       app.logger.error(f"Error updating product data: {e}")     


def delete_product_by_id(id):
    try:
        engine = get_db_engine()
        with Session(engine) as session:
            # Get products
            stmt = select(Product).where(Product.id == id)
            product = session.scalars(stmt).first()

            if not product:
                return { "status": 404, "message": "Product not found!" }
            session.delete(product)
            session.commit()
            from main import app 
            app.logger.info("product deleted by id", product)
            return { "status": 200, "message": f"Product deleted successfully!" } 
    except Exception as e:
        from main import app
        app.logger.error(f"Error deleting product by id: {e}")
        return { "status": 500, "message": str(e) }

