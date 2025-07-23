from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth_bp = Blueprint("auth", __name__)

# Dummy login (replace with DB validation later)
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    if data["username"] == "admin" and data["password"] == "admin":
        token = create_access_token(identity="admin", expires_delta=timedelta(hours=1))
        return jsonify(access_token=token)
    return jsonify({"msg": "Invalid credentials"}), 401
