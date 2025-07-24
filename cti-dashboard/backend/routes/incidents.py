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
    if identity["role"] != "analyst":
        return jsonify({"error": "Unauthorized. Analyst role required."}), 403

    data = request.get_json()
    incident = {
        "title": data.get("title"),
        "description": data.get("description"),
        "severity": data.get("severity"),
        "status": data.get("status", "Open"),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "analyst_id": identity["username"]
    }

    incidents_col.insert_one(incident)
    return jsonify({"msg": "Incident created"}), 201

@incident_bp.route("/", methods=["GET"])
@jwt_required()
def get_all_incidents():
    incidents = list(incidents_col.find())
    for incident in incidents:
        incident["_id"] = str(incident["_id"])
    return jsonify(incidents)

@incident_bp.route("/<incident_id>", methods=["GET"])
@jwt_required()
def get_single_incident(incident_id):
    try:
        incident = incidents_col.find_one({"_id": ObjectId(incident_id)})
        if incident:
            incident["_id"] = str(incident["_id"])
            return jsonify(incident)
        return jsonify({"error": "Incident not found"}), 404
    except Exception:
        return jsonify({"error": "Invalid ID format"}), 400

@incident_bp.route("/stats", methods=["GET"])
def get_incident_stats():
    severity_counts = {
        "low": incidents_col.count_documents({"severity": "Low"}),
        "medium": incidents_col.count_documents({"severity": "Medium"}),
        "high": incidents_col.count_documents({"severity": "High"}),
    }

    status_counts = {
        "open": incidents_col.count_documents({"status": "Open"}),
        "investigating": incidents_col.count_documents({"status": "Investigating"}),
        "resolved": incidents_col.count_documents({"status": "Resolved"}),
    }

    return jsonify({**severity_counts, **status_counts}), 200