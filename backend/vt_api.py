import os
import requests
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()

def query_virustotal(ioc):
    api_key = os.getenv("VIRUSTOTAL_API_KEY")  # ✅ Correct way to load API key
    url = f"https://www.virustotal.com/api/v3/search?query={ioc}"
    headers = {"x-apikey": api_key}
    response = requests.get(url, headers=headers)
    data = response.json()
    return normalize_vt_response(data, ioc)

def normalize_vt_response(data, ioc):
    try:
        results = data['data'][0]['attributes']
        return {
            "ioc": ioc,
            "type": results.get('type_description'),
            "score": results.get('last_analysis_stats', {}),
            "reputation": results.get('reputation'),
            "tags": results.get('tags', []),
            "source": "VirusTotal"
        }
    except:
        return {"error": "Could not parse response"}
