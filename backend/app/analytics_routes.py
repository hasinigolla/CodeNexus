from fastapi import APIRouter
from app.database import analytics_collection

router = APIRouter()


@router.get("/analytics")
def get_analytics():

    docs = list(analytics_collection.find())

    total_generation = 0
    total_review = 0

    total_response = 0

    compiled_success = 0
    executed_success = 0

    total_lines = 0

    cache_hits = 0

    language_count = {}

    for doc in docs:

        if doc["feature"] == "Code Generation":
            total_generation += 1

        elif doc["feature"] == "Code Review":
            total_review += 1

        total_response += doc.get("response_time", 0)

        if doc.get("compiled"):
            compiled_success += 1

        if doc.get("executed"):
            executed_success += 1

        total_lines += doc.get("lines_of_code", 0)

        if doc.get("cache_hit"):
            cache_hits += 1

        lang = doc.get("language", "Unknown")
        language_count[lang] = language_count.get(lang, 0) + 1

    total = len(docs)

    avg_response = round(total_response / total, 2) if total else 0

    avg_lines = round(total_lines / total, 2) if total else 0

    compilation_rate = round((compiled_success / total) * 100, 2) if total else 0

    execution_rate = round((executed_success / total) * 100, 2) if total else 0

    cache_rate = round((cache_hits / total) * 100, 2) if total else 0

    most_used = max(language_count, key=language_count.get) if language_count else "None"


    # -----------------------------
    # Code Review Analytics
    # -----------------------------

    review_docs = [
        d for d in docs
        if d.get("feature") == "Code Review"
    ]

    avg_bugs = round(
        sum(d.get("bugs_found", 0) for d in review_docs)
        / len(review_docs),
        2
    ) if review_docs else 0

    avg_security = round(
        sum(d.get("security_issues", 0) for d in review_docs)
        / len(review_docs),
        2
    ) if review_docs else 0

    avg_optimization = round(
        sum(d.get("optimization_suggestions", 0) for d in review_docs)
        / len(review_docs),
        2
    ) if review_docs else 0

    recent = list(
        analytics_collection.find(
            {},
            {"_id": 0}
        )
        .sort("created_at", -1)
        .limit(10)
    )

    summary = {

    "total_requests": total,

    "code_generation": total_generation,

    "code_review": total_review,

    "average_response_time": avg_response,

    "average_lines": avg_lines,

    "compilation_rate": compilation_rate,

    "execution_rate": execution_rate,

    "cache_hit_rate": cache_rate,

    "most_used_language": most_used,

    "language_distribution": language_count,

    "average_bugs": avg_bugs,

    "average_security": avg_security,

    "average_optimization": avg_optimization

}

    return {

        "summary": summary,

        "recent_activity": recent

    }