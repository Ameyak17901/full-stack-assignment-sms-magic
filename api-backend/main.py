from flask import Flask, request


from lib.product import get_product, create_product, get_product_by_id, update_product, delete_product_by_id
from lib.restock import check_restock_threshold, get_restock_product_list, update_product_restock_status

app = Flask(__name__)



@app.get("/product")
def get_products():

    try:
        return get_product()
    except Exception as e:
        return { "status": 500, "message": str(e) }   
     
@app.post("/product")
def create_products():

    try:
        data = request.get_json()
        if not data:
            raise ValueError("No data provided in request body")
        print(request)
        result = create_product(data)
        return result
    except Exception as e:
        return { "status": 500, "message": str(e) }    
    
@app.get("/product/<id>")
def get_products_by_id(id):

    try:
        result = get_product_by_id(id=int(id))
        return result
    except Exception as e:
        app.logger.error(f"Error fetching product by id: {e}")
        return { "status": 500, "message": str(e) }    
    
@app.put("/product/<id>")
def update_products_by_id(id):

    try:
        data = request.get_json()

        update_product(id=int(id), updated_data=data)
        return { "status": 200, "message": "Product updated successfully!" }
    except Exception as e:
        app.logger.error(f"Error fetching product by id: {e}")
        return { "status": 500, "message": str(e) }    

@app.delete("/product/<id>")
def delete_products_by_id(id):

    try:
        result = delete_product_by_id(id=int(id))
        return result
    except Exception as e:
        app.logger.error(f"Error fetching product by id: {e}")
        return { "status": 500, "message": str(e) }    

# restock endpoints

@app.get("/restock/<id>")
def check_restock(id):
    try:
        result = check_restock_threshold(id=int(id))
        return result

    except Exception as e:
        app.logger.error(f"Error checking restock for product by id: {e}") 
        return { "status": 500, "message": str(e) }   

@app.get("/restock/list")
def get_restock_products():
    try:
        result = get_restock_product_list()

        return { "status": 200, "data": result.get("products", []) }
    except Exception as e:
        app.logger.error(f"Error fetching restock products: {e}")
        return { "status": 500, "message": str(e) }    

@app.put("/restock/update/<id>")
def update_restock_products(id):
    try:
        data = request.get_json()
        result = update_product_restock_status(int(id), restock_quantity=data.get("restock_quantity", 0))

        return { "status": 200, "message": result.get("message", "") }
    except Exception as e:
        app.logger.error(f"Error restocking products: {e}")
        return { "status": 500, "message": str(e) }    
    