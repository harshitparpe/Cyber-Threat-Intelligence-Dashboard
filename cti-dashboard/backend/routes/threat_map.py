from flask import Blueprint, jsonify
from datetime import datetime

map_bp = Blueprint("map", __name__)

@map_bp.route("/data", methods=["GET"])
def get_threat_map_data():
    threats = [
        {
            "id": 1,
            "location": "New York, USA",
            "coordinates": [-74.006, 40.7128],
            "severity": "High",
            "timestamp": datetime.utcnow().isoformat()
        },
        {
            "id": 2,
            "location": "London, UK",
            "coordinates": [-0.1276, 51.5072],
            "severity": "Medium",
            "timestamp": datetime.utcnow().isoformat()
        },
        {
            "id": 3,
            "location": "Mumbai, India",
            "coordinates": [72.8777, 19.076],
            "severity": "Low",
            "timestamp": datetime.utcnow().isoformat()
        }
    ]
    return jsonify(threats), 200
