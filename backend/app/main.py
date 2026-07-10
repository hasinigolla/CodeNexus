from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.agent import review_code

from app.agent import solve_problem, generate_test_cases, run_with_custom_input

from app.auth import signup_user, login_user, update_profile, verify_user, reset_password

from pydantic import BaseModel

from app.contact import (
    contact_collection,
    feedback_collection
)

from app.analytics_routes import router as analytics_router

from app.export import export_csv

app = FastAPI()
app.include_router(analytics_router)

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://codenexus-production-ee84.up.railway.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    fav_lang:str
    passkey:str


class LoginRequest(BaseModel):
    email: str
    password: str

class UpdateProfileRequest(BaseModel):
    email: str
    name: str

class VerifyRequest(BaseModel):
    email: str
    fav_lang: str
    passkey: str
    
class ResetPasswordRequest(BaseModel):
    email:str
    password:str

@app.post("/signup")
def signup(request: SignupRequest):

    return signup_user(
        request.name,
        request.email,
        request.password,
        request.fav_lang,
        request.passkey
    )


@app.post("/login")
def login(request: LoginRequest):

    return login_user(
        request.email,
        request.password
    )

@app.post("/update-profile")
def update_profile_api(request: UpdateProfileRequest):

    return update_profile(
        request.email,
        request.name
    )

@app.post("/verify-user")
def verify(request: VerifyRequest):

    return verify_user(

        request.email,
        request.fav_lang,
        request.passkey

    )

@app.post("/reset-password")
def reset(request:ResetPasswordRequest):

    return reset_password(

        request.email,

        request.password

    )








# =========================
# Request Models
# =========================

class SolveRequest(BaseModel):
    problem_statement: str
    language: str = "Python"


class TestCaseRequest(BaseModel):
    problem_statement: str
    language: str = "Python"


class RunRequest(BaseModel):
    code: str
    language: str = "Python"
    custom_input: str = ""

class ContactRequest(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class FeedbackRequest(BaseModel):
    rating: int
    feedback: str


# =========================
# Root Endpoint
# =========================

@app.get("/")
def root():
    return {
        "message": "CodeNexus API is running",
        "supported_languages": [
            "Python",
            "Java",
            "C++",
            "C",
            "JavaScript",
            "SQL",
        ],
    }


# =========================
# Solve Problem Endpoint
# =========================

@app.post("/solve")
def solve(request: SolveRequest):
    return solve_problem(
        request.problem_statement,
        request.language
    )


# =========================
# Generate Test Cases Endpoint
# =========================

@app.post("/generate-testcases")
def generate_testcases(request: TestCaseRequest):
    return {
        "test_cases": generate_test_cases(
            request.problem_statement,
            request.language
        )
    }


# =========================
# Run Code with Custom Input
# =========================

@app.post("/run-with-input")
def run_code_with_input(request: RunRequest):
    return run_with_custom_input(
        request.code,
        request.language,
        request.custom_input
    )



class ReviewRequest(BaseModel):
    code: str
    language: str = "Python"


@app.post("/review-code")
def review_code_api(request: ReviewRequest):
    return review_code(request.code, request.language)

@app.post("/contact")
def save_contact(request: ContactRequest):

    contact_collection.insert_one({
        "name": request.name,
        "email": request.email,
        "subject": request.subject,
        "message": request.message
    })

    return {"message": "Message sent successfully"}


@app.post("/feedback")
def save_feedback(request: FeedbackRequest):

    feedback_collection.insert_one({
        "rating": request.rating,
        "feedback": request.feedback
    })

    return {"message": "Feedback submitted successfully"}


@app.get("/analytics/export")
def export():
    return export_csv()