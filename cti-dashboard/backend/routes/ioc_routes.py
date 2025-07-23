from flask import Blueprint, request, jsonify
from datetime import datetime

ioc_bp = Blueprint("ioc", __name__)

@ioc_bp.route("/lookup", methods=["POST"])
def lookup_ioc():
    data = request.get_json()
    indicator = data.get("indicator")

    # Fake threat detection logic (replace with real APIs later)
    if indicator.startswith("1") or "mal" in indicator:
        threat_level = "High"
    elif indicator.startswith("2") or "phish" in indicator:
        threat_level = "Medium"
    else:
        threat_level = "Low"

    return jsonify({
        "indicator": indicator,
        "threat_level": threat_level,
        "last_checked": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "sources": ["VirusTotal", "AbuseIPDB", "AlienVault OTX"]
    })
