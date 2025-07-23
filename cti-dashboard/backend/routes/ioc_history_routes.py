from flask import Blueprint, request, jsonify, current_app

ioc_bp = Blueprint("ioc_history", __name__)

@ioc_bp.route("/api/ioc-history", methods=["POST"])
def add_ioc_history():
    db = current_app.db
    data = request.get_json()
    db.ioc_history.insert_one(data)
    return jsonify({"msg": "IOC history saved"}), 201
