import os
import requests
from dotenv import load_dotenv

load_dotenv()

def query_virustotal(ioc):
    api_key = os.getenv("f6f342e76abe30004c0a11326608d2b2b2192e770f2c8d4708f701c1f75476fb")
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
