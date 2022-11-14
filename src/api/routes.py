"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os, bcrypt
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
#from app.py import jwt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
    body = request.json
    salt_bytes = bcrypt.gensalt()
    salt = salt_bytes.decode()
    print(body)
    hashed_password = generate_password_hash(f'{body["password"]}{salt}')
    new_user = User(
                        email=body["email"], 
                        hashed_password=hashed_password,
                        salt=salt,
                        is_active=True
                    )
    db.session.add(new_user)
    db.session.commit()
    print("User: ", new_user)
    print("User serialized: ", new_user.serialize())
    return jsonify(body), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.json
    user = User.query.filter_by(email=body["email"]).one_or_none()
    if user is None:
        return jsonify({
            "message": "Invalid credentials, email"
        }), 400 

    password_is_valid = check_password_hash(user.hashed_password, f'{body["password"]}{user.salt}')
    if not password_is_valid:
        return jsonify({
            "message": "Invalid credentials, password"
        }), 400 
    print("Password is valid: ", password_is_valid)
    access_token = create_access_token(identity=user.id)
    print(access_token)
    return jsonify({
        "token": access_token,
        
    }), 201

@api.route("/user", methods=['GET'])
@jwt_required()
def get_user_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({
            "message": "Not found",
            "user_id": None
        }), 404
    return jsonify({
            "message": "Ruta protegida",
            "user": user.serialize()
        }), 200