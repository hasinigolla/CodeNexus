import os
from click import prompt
#import google.generativeai as genai
from dotenv import load_dotenv

from app.local_llm import ask_local_llm

load_dotenv()

from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))



# Configure Gemini API
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# print("API KEY:", os.getenv("GEMINI_API_KEY"))

# Load model
#model = genai.GenerativeModel("gemini-2.5-flash")


def generate_response(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            #model="groq",
            contents=prompt
        )
        return response.text

    except Exception as e:
        print("GEMINI ERROR:", e)

        print("Trying Local AI...")

        local_response = ask_local_llm(prompt)

        if local_response:
            print("LOCAL AI SUCCESS")
            return local_response

        print("LOCAL AI FAILED")
        return "LOCAL_AI_FAILED"

def safe_generate(prompt: str, retries: int = 2):
    for i in range(retries):
        try:
            return generate_response(prompt)
        except:
            continue
    return "ERROR: AI service failed after retries"



def generate_solution(problem_statement: str, language: str) -> str:

    prompt = f"""
    You are an expert competitive programmer.

    IMPORTANT:
    Generate COMPLETE EXECUTABLE code.

    Rules:
    - Python must use input() and print()
    - C++ must contain int main()
    - Java must contain public class Main
    - JavaScript must print output using console.log()
    - C must contain main()
    - Do NOT generate only functions
    - Code must run directly with stdin/stdout

    Generate the response EXACTLY in this format:

    EXPLANATION:
    Explain the approach.

    TIME COMPLEXITY:
    O(...)

    SPACE COMPLEXITY:
    O(...)

    CODE:
    ```{language.lower()}
    solution code here

    TEST CASES:
    Example 1:
    Input:
    ...
    Output:
    ...

    Example 2:
    Input:
    ...
    Output:
    ...

    Problem:
    {problem_statement}

    Language:
    {language}
    """
   
    return generate_response(prompt)


def generate_test_case_examples(problem_statement: str) -> str:
    prompt = (
        "Generate exactly 5 test cases in this format:\n\n"
        "Example 1:\n"
        "Input:\n"
        "...\n"
        "Output:\n"
        "...\n\n"
        "Example 2:\n"
        "Input:\n"
        "...\n"
        "Output:\n"
        "...\n\n"
        "Example 3:\n"
        "Input:\n"
        "...\n"
        "Output:\n"
        "...\n\n"
        "Example 4:\n"
        "Input:\n"
        "...\n"
        "Output:\n"
        "...\n\n"
        "Example 5:\n"
        "Input:\n"
        "...\n"
        "Output:\n"
        "...\n\n"
        "Do not include explanations.\n\n"
        "Problem Statement:\n"
        + problem_statement
    )

    return generate_response(prompt)


