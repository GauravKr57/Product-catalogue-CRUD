from models.product import get_all_products, get_product_by_id, add_product, update_product, delete_product as model_delete_product  # Rename to avoid conflict

def fetch_all_products():
    return get_all_products()

def fetch_product_details(product_id):
    return get_product_by_id(product_id)

def create_product(product):
    product_id = add_product(product)
    return product_id

def update_product_details(product_id, updated_product):
    update_product(product_id, updated_product)

def delete_product(product_id):
    model_delete_product(product_id)  # Correctly refer to the model's delete function
