from pymongo import MongoClient
import bcrypt

client = MongoClient("mongodb://localhost:27017/")
db = client['ecommerce']
users_collection = db['users']

def create_user(username, password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {"username": username, "password": hashed_password}
    users_collection.insert_one(user)

def get_user_by_username(username):
    return users_collection.find_one({"username": username})
