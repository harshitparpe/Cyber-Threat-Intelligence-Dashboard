from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from datetime import datetime

incident_bp = Blueprint("incidents", __name__)
client = MongoClient("mongodb://localhost:27017/")
db = client["cti_dashboard"]
incidents_col = db["incidents"]

@incident_bp.route("/", methods=["POST"])
def create_incident():
    data = request.get_json()

    incident = {
        "title": data.get("title"),
        "description": data.get("description"),
        "severity": data.get("severity"),
        "status": "Open",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "analyst_id": None
    }

    incidents_col.insert_one(incident)
    return jsonify({"msg": "Incident created"}), 201

@incident_bp.route("/", methods=["GET"])
def get_all_incidents():
    incidents = list(incidents_col.find())
    for incident in incidents:
        incident["_id"] = str(incident["_id"])
    return jsonify(incidents)

@incident_bp.route("/<incident_id>", methods=["GET"])
def get_single_incident(incident_id):
    incident = incidents_col.find_one({"_id": ObjectId(incident_id)})
    if incident:
        incident["_id"] = str(incident["_id"])
        return jsonify(incident)
    return jsonify({"error": "Incident not found"}), 404
