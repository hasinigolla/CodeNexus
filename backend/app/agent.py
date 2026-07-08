import code
from tracemalloc import start

from app.hybrid_review import hybrid_review

from app.cache import get_cache, set_cache
from app.llm import generate_solution, generate_test_case_examples
from app.executor import run_python_code

import re

from app.executor import execute_code, run_python_code

from app.fallback_codegen import generic_fallback

from app.fallback_codegen import generic_fallback


import time
from app.analytics import save_analytics

from datetime import datetime


# -----------------------------------------------------------
# Extract sections from LLM response
# -----------------------------------------------------------
def extract_section(text: str, section_name: str) -> str:

    patterns = [
        rf"{section_name}:\s*(.*?)(?=\n[A-Z ]+:\n|\Z)",
        rf"###\s*{section_name.title()}:\s*(.*?)(?=\n###|\Z)"
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.DOTALL)
        if match:
            return match.group(1).strip()

    return ""


def extract_code(text: str) -> str:
    match = re.search(
        r"```(?:\w+)?\n([\s\S]*?)```",
        text
    )

    if match:
        return match.group(1).strip()

    return ""


# -----------------------------------------------------------
# Generate solution using LLM
# -----------------------------------------------------------
def solve_problem(problem_statement: str, language: str = "Python") -> dict:

    # =========================================================
    # 1. CHECK HYBRID CACHE (RAM → REDIS)
    # =========================================================
    start = time.time()

    cached_result = get_cache(problem_statement, language)

    if cached_result:
        cached_result["cache_hit"] = True
        cached_result["source"] = "cache"
        return cached_result

    # =========================================================
    # 2. CALL AI (GEMINI)
    # =========================================================
    solution_text = generate_solution(problem_statement, language)
    print("\n========== GEMINI RAW RESPONSE ==========")
    print(solution_text)
    print("=========================================\n")

    # =========================================================
    # 3. PARSE RESPONSE
    # =========================================================

    code = extract_code(solution_text)
    

    explanation = extract_section(
        solution_text,
        "EXPLANATION"
    )

    time_complexity = extract_section(
        solution_text,
        "TIME COMPLEXITY"
    )

    space_complexity = extract_section(
        solution_text,
        "SPACE COMPLEXITY"
    )

    test_cases = extract_section(
        solution_text,
        "TEST CASES"
    )

    print("CODE FOUND =", bool(code))
    print("EXPLANATION FOUND =", bool(explanation))
    print("TIME FOUND =", bool(time_complexity))
    print("SPACE FOUND =", bool(space_complexity))
    print("TEST CASES FOUND =", bool(test_cases))

    # =========================================================
    # FALLBACK IF GEMINI FAILED
    # =========================================================
    print("RAW RESPONSE LENGTH:", len(solution_text))
    if not code:
        fallback = generic_fallback(
            problem_statement,
            language
        )

        set_cache(
            problem_statement,
            language,
            fallback
        )

        return fallback


    optimized_code = code.strip()

    result = {
        "code": code,
        "explanation": explanation,
        "time_complexity": time_complexity,
        "space_complexity": space_complexity,
        "test_cases": test_cases,
        "optimized_code": optimized_code,
        "optimization_note":
            "No optimization required — code is already optimal.",
        "cache_hit": False,
        "source": "api"
    }

    # =========================================================
    # EXECUTE GENERATED CODE
    # =========================================================
    execution = None
    if code:
        execution = execute_code(
            code=code,
            language=language
        )
        result["execution"] = execution

    end = time.time()
    response_time = round(end-start,2)


    compiled = False
    executed = False

    if execution:

        # Interpreted languages
        if language in ["Python", "JavaScript", "SQL"]:

            # If the only error is EOFError (waiting for user input),
            # the code itself is valid.
            if "EOFError" in execution["stderr"]:
                compiled = True
                executed = False

            elif execution["return_code"] == 0:
                compiled = True
                executed = True

            else:
                compiled = False
                executed = False

        # Compiled languages
        else:

            if execution["return_code"] == 0:
                compiled = True
                executed = True

            else:
                compiled = False
                executed = False

    lines_of_code = len(code.splitlines())

    characters = len(code)

    print(execution)

    save_analytics({

    "feature": "Code Generation",

    "language": language,

    "response_time": response_time,

    "compiled": compiled,

    "executed": executed,

    "lines_of_code": lines_of_code,

    "characters": characters,

    "cache_hit": result["cache_hit"],

    "time_complexity": time_complexity,

    "space_complexity": space_complexity

})
    # =========================================================
    # SAVE CACHE
    # =========================================================

    set_cache(
        problem_statement,
        language,
        result
    )


    return result


# -----------------------------------------------------------
# Generate test cases
# -----------------------------------------------------------
def generate_test_cases(problem_statement: str, language: str = "Python"):
    return generate_test_case_examples(problem_statement)


# -----------------------------------------------------------
# Run generated code with custom input (ALL LANGUAGES)
# -----------------------------------------------------------
def run_with_custom_input(
    code: str,
    language: str = "Python",
    custom_input: str = ""
) -> dict:
    """
    Executes the generated code using the selected language and
    user-provided custom input.

    Supported languages:
    - Python
    - Java
    - C++
    - C
    - JavaScript
    - SQL (placeholder execution)

    Returns:
    {
        "success": True/False,
        "stdout": "...",
        "stderr": "...",
        "return_code": 0
    }
    """

    # Ensure code exists
    if not code or not code.strip():
        return {
            "success": False,
            "stdout": "",
            "stderr": "No code available to execute.",
            "return_code": 1,
        }

    # Execute code using the universal executor
    try:
        return execute_code(
            code=code,
            language=language,
            input_data=custom_input
        )
    except Exception as e:
        return {
            "success": False,
            "stdout": "",
            "stderr": str(e),
            "return_code": 1,
        }

def review_code(code: str, language: str):

    start = time.time()

    result = hybrid_review(code, language)

    end = time.time()

    response_time = round(end - start, 2)

    lines = len(code.splitlines())

    chars = len(code)

    review_text = str(result)

    review_lower = review_text.lower()

    bug_count = review_lower.count("bug")

    security_count = (
        review_lower.count("security")
        + review_lower.count("vulnerability")
    )

    optimization_count = (
        review_lower.count("optimization")
        + review_lower.count("optimize")
    )

    save_analytics({

        "feature": "Code Review",

        "language": language,

        "response_time": response_time,

        "compiled": None,

        "executed": None,

        "cache_hit": False,

        "lines_of_code": lines,

        "characters": chars,

        "bugs_found": bug_count,

        "security_issues": security_count,

        "optimization_suggestions": optimization_count,

        "created_at": datetime.utcnow()

    })

    return result