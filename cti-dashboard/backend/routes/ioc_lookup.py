# backend/routes/ioc_lookup.py

import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()

ioc_bp = Blueprint("ioc_lookup", __name__)

ABUSEIPDB_API_KEY = os.getenv("ABUSEIPDB_API_KEY")
ABUSEIPDB_API_URL = "https://api.abuseipdb.com/api/v2/check"

@ioc_bp.route("/api/ioc-lookup", methods=["GET"])
def lookup_ioc():
    ip = request.args.get("ip")
    if not ip:
        return jsonify({"error": "IP address is required"}), 400

    print("Looking up IP:", ip)

    headers = {
        "Key": ABUSEIPDB_API_KEY,
        "Accept": "application/json"
    }
    params = {
        "ipAddress": ip,
        "maxAgeInDays": 90,
        "verbose": True
    }

    try:
        response = requests.get(ABUSEIPDB_API_URL, headers=headers, params=params)
        print("Status Code:", response.status_code)
        print("Raw Response:", response.text)

        if response.status_code != 200:
            return jsonify({"error": response.json()}), response.status_code

        return jsonify(response.json()["data"])
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

