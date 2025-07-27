from flask import Blueprint, request, jsonify
import os, requests
from dotenv import load_dotenv

load_dotenv()
ioc_lookup_bp = Blueprint("ioc_lookup", __name__)

@ioc_lookup_bp.route("/api/ioc-lookup", methods=["GET"])
def lookup_ioc():
    print("🗝️ API KEY:", os.getenv("ABUSEIPDB_API_KEY"))
    ip = request.args.get("ip")
    if not ip:
        return jsonify({"error": "IP address is required"}), 400

    headers = {
        "Key": os.getenv("ABUSEIPDB_API_KEY"),
        "Accept": "application/json"
    }
    params = {
        "ipAddress": ip,
        "maxAgeInDays": 90,
        "verbose": True
    }

    try:
        response = requests.get("https://api.abuseipdb.com/api/v2/check", headers=headers, params=params)
        print("📡 Status Code:", response.status_code)
        print("🧾 Body:", response.text)

        if response.status_code != 200:
            return jsonify({"error": response.json()}), response.status_code

        return jsonify(response.json()["data"])
    except Exception as e:
        print("❌ Lookup Error:", e)
        return jsonify({"error": str(e)}), 500
