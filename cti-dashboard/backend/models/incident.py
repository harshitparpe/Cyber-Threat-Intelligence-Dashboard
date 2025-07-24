# from flask import Blueprint, request, jsonify
# from pymongo import MongoClient
# from bson import ObjectId
# from datetime import datetime
# from app import mongo

# incident_bp = Blueprint("incidents", __name__)

# @incident_bp.route("/", methods=["POST"])
# def report_incident():
#     data = request.json
#     data["created_at"] = datetime.utcnow()
#     result = mongo.db.incidents.insert_one(data)
#     return jsonify({"id": str(result.inserted_id)}), 201

# @incident_bp.route("/", methods=["GET"])
# def get_incidents():
#     status_filter = request.args.get("status")
#     query = {"status": status_filter} if status_filter else {}
#     incidents = list(mongo.db.incidents.find(query))
#     for i in incidents:
#         i["_id"] = str(i["_id"])
#     return jsonify(incidents)

# @incident_bp.route("/<incident_id>", methods=["GET"])
# def get_incident_detail(incident_id):
#     incident = mongo.db.incidents.find_one({"_id": ObjectId(incident_id)})
#     if not incident:
#         return jsonify({"error": "Not found"}), 404
#     incident["_id"] = str(incident["_id"])
#     return jsonify(incident)

from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from datetime import datetime

incident_bp = Blueprint("incidents", __name__)

@incident_bp.route("/", methods=["POST"])
def report_incident():
    db = current_app.db
    data = request.json
    if not data.get("title") or not data.get("description"):
        return jsonify({"error": "Missing required fields"}), 400

    data["created_at"] = datetime.utcnow()
    db.incidents.insert_one(data)
    return jsonify({"msg": "Incident created"}), 201
