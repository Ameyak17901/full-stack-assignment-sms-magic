from sqlalchemy.orm import Session
from sqlalchemy import select


from config import get_db_engine
from models.product import Product

engine = get_db_engine()
def check_restock_threshold(id):
    try:
        with Session(engine) as session:
            stmt = select(Product).where(Product.id == id)
            product = session.scalars(stmt).first()

            if not product:
                from main import app
                app.logger.error("Product with id not found")
                return { "status": 404, "message": "Product not found" }
            
            if product.available_quantity < 0.20 * product.total_quantity:
                product.need_restock = True
                session.commit()
                from main import app
                app.logger.info("Product needs restock")
                return { "status": 200, "message": "Product needs restock" }
            return { "status": 200, "message": "Product does not need restock" }


    except Exception as e:
        from main import app
        app.logger.error(f"Error checking restock threshold for the product: {e}")
        return { "status": 500, "message": str(e) }
    

def get_restock_product_list():
    try:
        with Session(engine) as session:
            stmt = select(Product).where(Product.need_restock == True)
            products = session.scalars(stmt).all()

            if not products:
                from main import app 
                app.logger.info("No products need restock")
                return { "status": 200, "message": "No products need restock" }

            return { "products": [product.to_dict() for product in products] }
    except Exception as e:
        from main import app 
        app.logger.error(f"Error fetching restock product list: {e}")


def update_product_restock_status(id, restock_quantity):
    try:
        with Session(engine) as session:
            stmt = select(Product).where(Product.id == id)
            product = session.scalars(stmt).first()

            if not product:
                from main import app
                app.logger.error("Product with id not found!")
                return { "status": 404, "message": "Product not found" }
            
            if product.need_restock:
                product.available_quantity += restock_quantity
                product.need_restock = False
                session.commit()
                from main import app 
                app.logger.info("Product restocked successfully!")
                return { "message": "Product restocked successfully!" }
            
            return { "message": "Product does not need restock" }
    except Exception as e:
        from main import app
        app.logger.error(f"Error updating restock status for the product: {e}")
