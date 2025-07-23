from datetime import datetime

def create_threat_doc(data):
    return {
        "type": data.get("type", "malware"),
        "source": data.get("source", "AlienVault OTX"),
        "ip": data.get("ip"),
        "domain": data.get("domain"),
        "hash": data.get("hash"),
        "country": data.get("country", "Unknown"),
        "severity": data.get("severity", "Medium"),
        "timestamp": data.get("timestamp", datetime.utcnow()),
        "mitre_tactic": data.get("mitre_tactic"),
        "mitre_technique": data.get("mitre_technique")
    }
