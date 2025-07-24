from pymongo import MongoClient
from werkzeug.security import generate_password_hash

client = MongoClient("mongodb://localhost:27017/")
db = client["cti_dashboard"]

hashed_password = generate_password_hash("admin123")
db.users.insert_one({
    "username": "admin2",
    "password": hashed_password,
    "role": "admin"
})

print("User inserted successfully.")
