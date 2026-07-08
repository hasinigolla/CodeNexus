# app/local_llm.py

import requests

def ask_local_llm(prompt):

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
    "model": "qwen2.5-coder:0.5b",
    "options":{
        "num_predict": 2048
    },
    "prompt": f"""
DO NOT STOP EARLY
You must return EXACTLY in this format:

EXPLANATION:
...

TIME COMPLEXITY:
...

SPACE COMPLEXITY:
...

CODE:
```python
...
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

{prompt}
""",
"stream": False
}
        )

        return response.json()["response"]

    except Exception as e:
        print("LOCAL LLM ERROR:", str(e))
        return None