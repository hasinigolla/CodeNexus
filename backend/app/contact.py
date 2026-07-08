import os
from pymongo import MongoClient

MONGO_URL = os.getenv(
    "MONGO_URL",
    "mongodb://localhost:27017/"
)

#client = MongoClient("mongodb://localhost:27017/")
client = MongoClient(MONGO_URL)
db = client["codenexus"]

contact_collection = db["contact_messages"]
feedback_collection = db["feedbacks"]