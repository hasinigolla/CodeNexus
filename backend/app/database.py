from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)

db = client["codenexus"]

users_collection = db["users"]


# NEW
analytics_collection = db["analytics"]