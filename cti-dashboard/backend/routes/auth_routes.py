from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    db = current_app.db
    data = request.json
    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "user")

    if db.users.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 409

    hashed_pw = generate_password_hash(password)
    db.users.insert_one({
        "username": username,
        "password": hashed_pw,
        "role": role
    })

    return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    db = current_app.db
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = db.users.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(
        identity={"username": user["username"], "role": user["role"]},
        expires_delta=timedelta(hours=1)
    )

    return jsonify({"token": token}), 200
