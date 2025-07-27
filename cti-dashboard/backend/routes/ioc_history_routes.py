from flask import Blueprint, request, jsonify, current_app

ioc_history_bp = Blueprint("ioc_history", __name__)

@ioc_history_bp.route("/api/ioc-history", methods=["POST"])
def add_ioc_history():
    db = current_app.db
    data = request.get_json()
    print("Saving IOC history:", data)
    db.ioc_history.insert_one(data)
    return jsonify({"msg": "IOC history saved"}), 201

@ioc_history_bp.route("/api/ioc-history", methods=["GET"])
def get_ioc_history():
    db = current_app.db
    history = list(db.ioc_history.find().sort("lookedUpAt", -1).limit(10))
    for item in history:
        item["_id"] = str(item["_id"])  # Convert ObjectId to string
    return jsonify(history)
