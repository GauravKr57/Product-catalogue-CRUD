from models.user import create_user, get_user_by_username
from flask_jwt_extended import create_access_token
import bcrypt

def register_user(username, password):
    if get_user_by_username(username):
        return {"message": "User already exists!"}, 400
    create_user(username, password)
    return {"message": "User registered successfully!"}, 201

def login_user(username, password):
    user = get_user_by_username(username)
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return {"message": "Invalid credentials!"}, 401
    access_token = create_access_token(identity=username)
    return {"message": "Login successful!", "access_token": access_token}, 200
