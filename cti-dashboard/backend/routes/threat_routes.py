from flask import Blueprint, request, jsonify, current_app
from models.threat_model import create_threat_doc
from datetime import datetime
import random

threat_bp = Blueprint("threats", __name__)

@threat_bp.route("/", methods=["GET"])
def get_threats():
    db = current_app.db
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    skip = (page - 1) * limit

    threats = list(db.threats.find().sort("timestamp", -1).skip(skip).limit(limit))
    for threat in threats:
        threat["_id"] = str(threat["_id"])
    return jsonify(threats)

@threat_bp.route("/", methods=["POST"])
def add_threat():
    db = current_app.db
    data = request.json
    threat_doc = create_threat_doc(data)
    db.threats.insert_one(threat_doc)
    return jsonify({"msg": "Threat added successfully"}), 201

@threat_bp.route("/feed", methods=["GET"])
def get_threat_feed():
    sample_threats = [
        {
            "type": "Ransomware Threat",
            "severity": "HIGH",
            "country": "Germany",
            "timestamp": datetime.utcnow().strftime("%I:%M:%S %p")
        },
        {
            "type": "Phishing Threat",
            "severity": "MEDIUM",
            "country": "France",
            "timestamp": datetime.utcnow().strftime("%I:%M:%S %p")
        },
        {
            "type": "Malware Detected",
            "severity": "LOW",
            "country": "India",
            "timestamp": datetime.utcnow().strftime("%I:%M:%S %p")
        }
    ]

    # Return 5 shuffled mock entries
    return jsonify(random.sample(sample_threats * 2, 5))

@threat_bp.route("/map", methods=["GET"])
def get_threat_map_data():
    db = current_app.db
    pipeline = [
        {"$group": {"_id": "$country", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(db.threats.aggregate(pipeline))
    return jsonify(result)

