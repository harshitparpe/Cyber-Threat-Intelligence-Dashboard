# threat_map.py
from flask import Blueprint, jsonify, current_app
from bson.son import SON
from datetime import datetime, timedelta
import logging

map_bp = Blueprint("map", __name__)

@map_bp.route("/ioc/country-counts", methods=["GET"])
def get_country_counts():
    """
    Get IOC counts by country code
    """
    try:
        # Optional: filter only recent IOCs (e.g. last 30 days)
        recent_days = 30
        recent_date = datetime.utcnow() - timedelta(days=recent_days)

        pipeline = [
            {
                "$match": {
                    "countryCode": {"$exists": True, "$ne": None, "$ne": ""},
                    # "timestamp": {"$gte": recent_date}
                }
            },
            {
                "$group": {
                    "_id": "$countryCode",
                    "count": {"$sum": 1}
                }
            },
            {
                "$sort": SON([("count", -1)])
            }
        ]

        results = list(current_app.db.ioc_history.aggregate(pipeline))

        formatted = [
            {"country": r["_id"].upper(), "count": r["count"]}
            for r in results if r["_id"]
        ]

        logging.info(f"[ThreatMap] Fetched {len(formatted)} countries")
        return jsonify({
            "success": True,
            "data": formatted,
            "total_countries": len(formatted)
        }), 200

    except Exception as e:
        logging.error(f"Error fetching country counts: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to fetch country data",
            "message": str(e)
        }), 500
