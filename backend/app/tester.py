from app.llm import generate_test_case_examples


def generate_test_cases(
    problem_statement: str,
    language: str = "Python"
) -> str:
    """
    Generate concise example-based test cases only.

    Example format:
    Example 1:
    Input:
    ...
    Output:
    ...

    Works for both:
    - Competitive programming problems
    - Real-life scenarios
    """

    return generate_test_case_examples(
        problem_statement,
        language
    )