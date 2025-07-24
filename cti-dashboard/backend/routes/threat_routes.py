# routes/threat_routes.py
from flask import Blueprint, jsonify, current_app

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
    db = current_app.db
    incidents = db.incidents.find().sort("created_at", -1).limit(10)
    feed = []
    for incident in incidents:
        feed.append({
            "id": str(incident["_id"]),
            "title": incident["title"],
            "severity": incident["severity"],
            "created_at": incident["created_at"].isoformat(),
        })
    return jsonify(feed)
