from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.product_routes import product_routes
from routes.auth_routes import auth_routes

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow Cross-Origin requests
app.config["JWT_SECRET_KEY"] = "SECRET123"  # Secret key for JWT
jwt = JWTManager(app)

# Register Routes
app.register_blueprint(product_routes)
app.register_blueprint(auth_routes)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
