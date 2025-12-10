from flask import Blueprint, request, jsonify
from controllers.auth_controller import register_user, login_user

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/api/signup', methods=['POST'])
def signup():
    username = request.json.get('username')
    password = request.json.get('password')
    response, status = register_user(username, password)
    return jsonify(response), status

@auth_routes.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    response, status = login_user(username, password)
    return jsonify(response), status
