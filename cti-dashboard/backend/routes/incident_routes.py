from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

incident_bp = Blueprint("incidents", __name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["cti_dashboard"]
incidents_col = db["incidents"]

@incident_bp.route("/", methods=["POST"])
@jwt_required()
def create_incident():
    identity = get_jwt_identity()
    if identity.get("role") != "analyst":
        return jsonify({"error": "Unauthorized. Analyst role required."}), 403

    data = request.get_json()
    incident = {
        "title": data.get("title"),
        "description": data.get("description"),
        "severity": data.get("severity", "Low"),
        "status": data.get("status", "Open"),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "analyst_id": identity.get("username")
    }

    result = incidents_col.insert_one(incident)
    incident["_id"] = str(result.inserted_id)
    return jsonify(incident), 201

@incident_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_incidents():
    incidents = list(incidents_col.find())
    for i in incidents:
        i["_id"] = str(i["_id"])
    return jsonify(incidents), 200

@incident_bp.route("/stats", methods=["GET"])
@jwt_required()
def get_stats():
    stats = {
        "low": incidents_col.count_documents({"severity": "Low"}),
        "medium": incidents_col.count_documents({"severity": "Medium"}),
        "high": incidents_col.count_documents({"severity": "High"}),
        "open": incidents_col.count_documents({"status": "Open"}),
        "investigating": incidents_col.count_documents({"status": "Investigating"}),
        "resolved": incidents_col.count_documents({"status": "Resolved"}),
        "total": incidents_col.count_documents({}),
        "lastReportedAt": incidents_col.find_one(sort=[("created_at", -1)])["created_at"] if incidents_col.count_documents({}) else None
    }
    return jsonify(stats), 200
