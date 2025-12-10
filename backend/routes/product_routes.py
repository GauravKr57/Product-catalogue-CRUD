from flask import Blueprint, request, jsonify
from controllers.product_controller import fetch_all_products, fetch_product_details, create_product, update_product_details, delete_product

product_routes = Blueprint('product_routes', __name__)

# Fetch all products
@product_routes.route('/api/products', methods=['GET'])
def get_products():
    products = fetch_all_products()
    return jsonify(products)

# Fetch a single product by its ID
@product_routes.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    print(f"Received product ID: {product_id}")  # Log the product ID
    product = fetch_product_details(product_id)
    if not product:
        print(f"Product with ID {product_id} not found")  # Log if product is not found
    return jsonify(product)

# Add a new product (No image upload required)
@product_routes.route('/api/products', methods=['POST'])
def add_product():
    try:
        # Log the raw request data to check what is being sent
        print(f"Request data: {request.data}")  # Log raw data received from frontend

        # Parse the incoming data as JSON (since we're sending JSON data from frontend)
        product = request.get_json()  # Use get_json() to parse JSON data
        print(f"Processed product data: {product}")  # Log processed data

        # Check if any required fields are missing
        if not product.get('name') or not product.get('description') or not product.get('price') or not product.get('category'):
            raise ValueError('Missing required fields')

        # Convert price to a float if it’s not already
        if 'price' in product:
            product['price'] = float(product['price'])  # Ensure price is a number

        product_id = create_product(product)  # Pass the product data (image URL is generated automatically)
        return jsonify({"message": "Product added successfully!", "product_id": product_id}), 201
    except Exception as e:
        print(f"Error while adding product: {e}")  # Log the error message
        return jsonify({"message": "Failed to add product", "error": str(e)}), 500

# Update an existing product (No image upload required)
@product_routes.route('/api/products/<product_id>', methods=['PUT'])
def update_product_route(product_id):
    try:
        updated_product = request.get_json()
        modified = update_product_details(product_id, updated_product)

        if modified == 0:
            return jsonify({"message": "Product not found"}), 404

        return jsonify({"message": "Product updated successfully!"})
    except Exception as e:
        print(f"Error updating product: {e}")
        return jsonify({"message": "Failed to update product", "error": str(e)}), 500


# Delete a product
@product_routes.route('/api/products/<product_id>', methods=['DELETE'])
def delete_product_route(product_id):
    try:
        print(f"Deleting product with ID: {product_id}")  # Log the received ID
        delete_product(product_id)  # Delete product using the product ID
        return jsonify({"message": "Product deleted successfully!"})
    except Exception as e:
        print(f"Error deleting product: {e}")
        return jsonify({"message": "Failed to delete product", "error": str(e)}), 500

