# routes/dashboard_stats.py

from flask import Blueprint, jsonify, current_app
from datetime import datetime, timedelta

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/api/dashboard/stats")
def get_dashboard_stats():
    db = current_app.db
    ioc_collection = db["ioc_history"]

    total_iocs = ioc_collection.count_documents({})
    high_risk_ips = ioc_collection.count_documents({ "abuseConfidenceScore": { "$gt": 50 } })
    unique_countries = len(ioc_collection.distinct("countryCode"))
    
    today = datetime.utcnow().date()
    lookups_today = ioc_collection.count_documents({
        "lookedUpAt": {
            "$gte": datetime(today.year, today.month, today.day),
            "$lt": datetime(today.year, today.month, today.day + 1)
        }
    })

    return jsonify({
        "totalIocs": total_iocs,
        "highRiskIps": high_risk_ips,
        "uniqueCountries": unique_countries,
        "lookupsToday": lookups_today
    })


@dashboard_bp.route("/api/dashboard/recent-iocs")
def get_recent_iocs():
    db = current_app.db
    ioc_collection = db["ioc_history"]

    # Fetch 5 most recent lookups
    recent = ioc_collection.find().sort("lookedUpAt", -1).limit(5)

    recent_list = []
    for ioc in recent:
        recent_list.append({
            "query": ioc.get("ipAddress"),
            "type": ioc.get("isp", "Unknown"),
            "abuseConfidenceScore": ioc.get("abuseConfidenceScore", None),
            "country": ioc.get("countryCode", "N/A"),
            "timestamp": ioc.get("lookedUpAt", ioc.get("_id").generation_time)
        })

    return jsonify(recent_list)
