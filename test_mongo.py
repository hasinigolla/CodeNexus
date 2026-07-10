from pymongo import MongoClient

uri = "mongodb+srv://codenexus:mongodbatlascodenexuspassword@codenexuscluster.akd5zt1.mongodb.net/?appName=CodeNexusCluster"

client = MongoClient(uri)

print(client.admin.command("ping"))