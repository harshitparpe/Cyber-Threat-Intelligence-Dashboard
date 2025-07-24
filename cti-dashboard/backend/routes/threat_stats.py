from flask import Blueprint, jsonify, current_app
from bson import ObjectId

threat_stats_bp = Blueprint("threat_stats", __name__)

@threat_stats_bp.route("/summary", methods=["GET"])
def get_threat_summary():
    db = current_app.db

    # Group by severity
    severity_pipeline = [
        {"$group": {"_id": "$severity", "count": {"$sum": 1}}}
    ]
    severity_results = db.incidents.aggregate(severity_pipeline)
    severity_summary = {doc["_id"]: doc["count"] for doc in severity_results}

    # Group by status
    status_pipeline = [
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ]
    status_results = db.incidents.aggregate(status_pipeline)
    status_summary = {doc["_id"]: doc["count"] for doc in status_results}

    return jsonify({
        "severity_counts": severity_summary,
        "status_counts": status_summary
    })
