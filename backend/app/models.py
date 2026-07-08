from pydantic import BaseModel


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str



# =========================================================
# REQUEST MODELS
# =========================================================

class SolveRequest(BaseModel):
    problem_statement: str
    language: str = "Python"


class ProblemRequest(BaseModel):
    # Kept for backward compatibility
    problem_statement: str
    language: str = "Python"


class TestCaseRequest(BaseModel):
    problem_statement: str
    language: str = "Python"


class RunRequest(BaseModel):
    code: str
    language: str = "Python"
    custom_input: str = ""


# =========================================================
# RESPONSE MODELS (Optional)
# =========================================================

class ExecutionResult(BaseModel):
    success: bool
    stdout: str = ""
    stderr: str = ""
    return_code: int


class SolveResponse(BaseModel):
    code: str
    explanation: str
    time_complexity: str
    space_complexity: str
    test_cases: str
    execution: dict | None = None
    auto_fix: dict | None = None