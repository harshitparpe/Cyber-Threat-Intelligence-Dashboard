# routes/threat_routes.py
from flask import Blueprint, jsonify, current_app
from datetime import datetime

threat_bp = Blueprint("threats", __name__)

@threat_bp.route("/stats", methods=["GET"])
def get_threat_stats():
    db = current_app.db
    incidents = db.incidents

    total = incidents.count_documents({})
    high = incidents.count_documents({"severity": "High"})
    medium = incidents.count_documents({"severity": "Medium"})
    low = incidents.count_documents({"severity": "Low"})

    open_ = incidents.count_documents({"status": "Open"})
    investigating = incidents.count_documents({"status": "Investigating"})
    resolved = incidents.count_documents({"status": "Resolved"})

    return jsonify({
        "total": total,
        "severity": {
            "high": high,
            "medium": medium,
            "low": low
        },
        "status": {
            "open": open_,
            "investigating": investigating,
            "resolved": resolved
        }
    })

@threat_bp.route("/feed", methods=["GET"])
def get_threat_feed():
    mock_feed = [
        {
            "id": 1,
            "title": "Suspicious login attempt detected",
            "severity": "High",
            "timestamp": datetime.utcnow().isoformat()
        },
        {
            "id": 2,
            "title": "Multiple failed login attempts",
            "severity": "Medium",
            "timestamp": datetime.utcnow().isoformat()
        },
        {
            "id": 3,
            "title": "Malware signature match",
            "severity": "Low",
            "timestamp": datetime.utcnow().isoformat()
        }
    ]
    return jsonify(mock_feed), 200
