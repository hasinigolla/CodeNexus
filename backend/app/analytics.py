from datetime import datetime
from app.database import analytics_collection

def save_analytics(data: dict):
    data["created_at"] = datetime.now()
    analytics_collection.insert_one(data)