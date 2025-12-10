from pymongo import MongoClient
import os
from bson import ObjectId 

# MongoDB Client
client = MongoClient("mongodb://localhost:27017/")
db = client['ecommerce']  # Corrected typo in the database name
products_collection = db['products']
counters_collection = db['counters']  # Collection for managing auto-increment IDs

# Auto-incrementing the product ID
def get_next_product_id():
    counter = counters_collection.find_one_and_update(
        {'_id': 'product_id'},
        {'$inc': {'seq': 1}},
        upsert=True,
        return_document=True
    )
    return counter['seq']

# Product CRUD operations
def get_all_products():
    return list(products_collection.find({}))

def get_product_by_id(product_id):
    try:
        if isinstance(product_id, str):
            product_id = int(product_id)
        print(f"Querying product with ID: {product_id}")  # Add logging to check the ID being queried
        product = products_collection.find_one({"_id": product_id})
        print(f"Product found: {product}")  # Log the found product
        return product
    except Exception as e:
        print(f"Error finding product with ID {product_id}: {e}")
        return None


def add_product(product):
    product_id = get_next_product_id()
    product['_id'] = product_id

    # Generate image URL based on product name
    product['image'] = f'https://placehold.co/300x200/png?text={product["name"]}'  # Generate image URL dynamically

    # Insert the product into the collection
    products_collection.insert_one(product)
    return product_id



def update_product(product_id, updated_product):
    """Update by integer _id"""
    try:
        product_id = int(product_id)
    except ValueError:
        print(f"Invalid product_id (not int): {product_id}")
        return 0

    # Optional: regenerate image if name changed
    if 'name' in updated_product:
        updated_product['image'] = (
            f'https://placehold.co/300x200/png?text={updated_product["name"]}'
        )

    print(f"Updating product with ID: {product_id}")
    print(f"Updated product data: {updated_product}")

    result = products_collection.update_one(
        {"_id": product_id},
        {"$set": updated_product}
    )

    print(f"Matched: {result.matched_count}, modified: {result.modified_count}")
    return result.modified_count   # 1 if updated, 0 if not found


def delete_product(product_id):
    print(f"Attempting to delete product with ID: {product_id}")
    # Ensure the product_id is of the correct type
    try:
        product_id = int(product_id)  # or str(product_id) depending on your ID format
        product = products_collection.find_one({"_id": product_id})
        if product:
            products_collection.delete_one({"_id": product_id})
            print(f"Product with ID {product_id} deleted.")
        else:
            print(f"Product with ID {product_id} not found.")
    except Exception as e:
        print(f"Error in deleting product with ID {product_id}: {e}")



