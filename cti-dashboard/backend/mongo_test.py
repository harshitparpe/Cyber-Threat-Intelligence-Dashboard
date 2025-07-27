from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client["cti_dashboard"]
incidents_col = db["incidents"]

test_incident = {
    "title": "Test Incident",
    "description": "Just testing insertion",
    "severity": "Low",
    "status": "Open",
    "created_at": datetime.utcnow(),
    "updated_at": datetime.utcnow(),
    "analyst_id": "tester"
}

result = incidents_col.insert_one(test_incident)
print("Inserted ID:", result.inserted_id)
