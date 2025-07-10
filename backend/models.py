from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client.cti_dashboard
collection = db.lookups

# Save IOC result and return with stringified _id
def save_lookup(data):
    result = collection.insert_one(data)
    data['_id'] = str(result.inserted_id)
    return data

# Fetch recent lookups (optional: by type and date range)
def get_recent_lookups(ioc_type=None, from_date=None, to_date=None):
    query = {}
    if ioc_type:
        query['type'] = ioc_type
    if from_date and to_date:
        query['timestamp'] = {
            "$gte": from_date,
            "$lte": to_date
        }
    return list(collection.find(query).sort("timestamp", -1))
