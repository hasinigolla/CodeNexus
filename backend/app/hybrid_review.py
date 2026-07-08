import re
from app.llm import generate_response

from app.cache import get_cache, set_cache
import json

# =========================================================
# 🔥 AI RESPONSE PARSER (CLEAN + SAFE)
# =========================================================



def parse_ai_response(text: str):
    try:
        # Remove markdown code fences
        text = re.sub(r"^```json\s*", "", text.strip())
        text = re.sub(r"\s*```$", "", text.strip())

        data = json.loads(text)

        return {
            "nexus_score": int(data.get("nexus_score", 80)),
            "bugs": data.get("bugs", "No major issues found"),
            "suggestions": data.get("suggestions", "No suggestions"),
            "time_complexity": data.get("time_complexity", "O(n)"),
            "space_complexity": data.get("space_complexity", "O(1)"),
            "optimized_code": data.get("optimized_code", "")
        }

    except Exception as e:
        print("JSON PARSE ERROR:", e)
        return None



# =========================================================
# ⚡ FALLBACK ANALYZER (NO AI MODE)
# =========================================================

def fallback_analyzer(code: str, language: str):
    score = 100
    bugs = []
    suggestions = []

    code_lower = code.lower()

    # -------------------------
    # BASIC VALIDATION RULES
    # -------------------------
    if len(code.strip()) < 20:
        score -= 20
        bugs.append("Code is too short or incomplete")

    # -------------------------
    # LANGUAGE RULES (CLEAN STRUCTURE)
    # -------------------------

    if language == "Python":

        if "try" not in code_lower:
            score -= 10
            suggestions.append("Use try-except for error handling")

        if "print(" in code_lower:
            suggestions.append("Remove debug print statements")

    elif language == "Java":

        suggestions.append("Use try-catch for exception handling")

        if "system.out.println" in code_lower:
            suggestions.append("Use logging instead of print statements")

    elif language == "C":

        suggestions.append("Use return codes and errno for error handling (no try-catch in C)")

        if "malloc" in code_lower and "free" not in code_lower:
            score -= 15
            bugs.append("Possible memory leak (missing free)")

    elif language == "C++":

        suggestions.append("Use RAII or try-catch for exception safety")

        if "new " in code_lower and "delete" not in code_lower:
            score -= 15
            bugs.append("Possible memory leak (missing delete)")

    elif language == "JavaScript":

        if "var " in code_lower:
            score -= 5
            suggestions.append("Use let/const instead of var")

        if "==" in code_lower:
            suggestions.append("Use strict equality (===) instead of ==")

    # -------------------------
    # FINAL RESPONSE
    # -------------------------
    return {
        "nexus_score": max(score, 0),
        "bugs": " | ".join(bugs) if bugs else "No major issues found",
        "suggestions": " | ".join(suggestions) if suggestions else "Code looks clean",
        "time_complexity": "O(n) (estimated)",
        "space_complexity": "O(1) (estimated)",
        "optimized_code": code
    }


# =========================================================
# 🔥 HYBRID AI + FALLBACK ENGINE
# =========================================================

def hybrid_review(code: str, language: str):

    # 1. CHECK CACHE FIRST
    cached = get_cache(code, language)
    if cached:
        print("SOURCE = CACHE")
        return {
            "source": "cache",
            "result": cached
        }

    prompt = f"""
You are a strict AI code reviewer.

Return ONLY JSON.

{{
  "nexus_score": 0-100,
  "bugs": "...",
  "suggestions": "...",
  "time_complexity": "...",
  "space_complexity": "...",
  "optimized_code": "..."
}}

CODE:
{code}

LANGUAGE:
{language}
"""

    try:
        # ================= AI PATH =================
        response = generate_response(prompt)

        print("========== GEMINI RESPONSE ==========")
        print(response)
        print("====================================")
        parsed = parse_ai_response(response)

        if parsed is None:
            raise Exception("Invalid JSON")

        # cache AI result
        set_cache(code, language, parsed)
        print("SOURCE = AI")
        return {
            "source": "ai",
            "result": parsed
        }


    except Exception as e:
        print("AI REVIEW ERROR:", e)
        # ================= FALLBACK PATH =================
        fallback_result = fallback_analyzer(code, language)
        print("SOURCE = FALLBACK")
        # cache fallback too (IMPORTANT)
        set_cache(code, language, fallback_result)
        print("SOURCE = FALLBACK")
        return {
            "source": "fallback",
            "result": fallback_result
        }