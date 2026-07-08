import bcrypt
from app.database import users_collection


def update_profile(email, name):
    
    users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "name": name
            }
        }
    )

    return {
        "success": True,
        "message": "Profile updated successfully"
    }

def signup_user(name,email,password,fav_lang,passkey):

    existing = users_collection.find_one(
        {"email": email}
    )

    if existing:
        return {
            "success": False,
            "message": "Email already exists"
        }

    hashed_password = bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    )

    users_collection.insert_one({
    "name":name,
    "email":email,
    "password":hashed_password,
    "fav_lang":fav_lang,
    "passkey":passkey,
    "reviews_count":0,
    "solutions_count":0
    })

    return {
        "success": True,
        "message": "Account created"
    }


def login_user(email, password):

    user = users_collection.find_one(
        {"email": email}
    )

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    if bcrypt.checkpw(
        password.encode(),
        user["password"]
    ):
        return {
            "success": True,
            "message": "Login successful",
            "name": user["name"],
            "email": user["email"]
        }

    return {
        "success": False,
        "message": "Wrong password"
    }

def verify_user(email, fav_lang, passkey):

    user = users_collection.find_one({

        "email": email,
        "fav_lang": fav_lang,
        "passkey": passkey

    })

    if not user:

        return {

            "success": False,
            "message": "Verification Failed"

        }

    return {

        "success": True,
        "message": "Verified"

    }


def reset_password(email,password):

    hashed=bcrypt.hashpw(

        password.encode(),

        bcrypt.gensalt()

    )

    users_collection.update_one(

        {"email":email},

        {

            "$set":{

                "password":hashed

            }

        }

    )

    return{

        "success":True,

        "message":"Password Updated"

    }