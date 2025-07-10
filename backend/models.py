from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client.cti_dashboard
collection = db.lookups

def save_lookup(data):
    collection.insert_one(data)
    
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
