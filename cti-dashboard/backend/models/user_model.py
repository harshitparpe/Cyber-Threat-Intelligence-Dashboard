# backend/models/user_model.py
from werkzeug.security import generate_password_hash, check_password_hash

def create_user_doc(username, password, role="analyst"):
    return {
        "username": username,
        "password_hash": generate_password_hash(password),
        "role": role
    }

def verify_password(password, hash_):
    return check_password_hash(hash_, password)
