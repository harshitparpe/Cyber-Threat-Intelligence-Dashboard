from flask import Blueprint, jsonify, current_app
from bson.son import SON

map_bp = Blueprint("map", __name__)

@map_bp.route("/ioc/country-counts", methods=["GET"])
def get_country_counts():
    try:
        pipeline = [
            {"$group": {"_id": "$countryCode", "count": {"$sum": 1}}},
            {"$sort": SON([("count", -1)])}
        ]
        results = list(current_app.db.ioc_history.aggregate(pipeline))
        formatted = [{"country": r["_id"], "count": r["count"]} for r in results if r["_id"]]
        return jsonify(formatted), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
