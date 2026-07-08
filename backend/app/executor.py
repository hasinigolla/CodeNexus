# app/executor.py
import re
import subprocess
import tempfile
import os
from typing import Dict


def _run_command(command, input_data: str = "", timeout: int = 10) -> Dict:
    """
    Run a subprocess command and return stdout/stderr.
    """
    try:
        result = subprocess.run(
            command,
            input=input_data,
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        return {
            "success": result.returncode == 0,
            "stdout": result.stdout,
            "stderr": result.stderr,
            "return_code": result.returncode,
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "stdout": "",
            "stderr": f"Execution timed out after {timeout} seconds.",
            "return_code": -1,
        }

    except Exception as e:
        return {
            "success": False,
            "stdout": "",
            "stderr": str(e),
            "return_code": -1,
        }


# =========================================================
# PYTHON
# =========================================================
def run_python_code(code: str, input_data: str = "") -> Dict:
    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".py",
        delete=False,
        encoding="utf-8"
    ) as temp_file:
        temp_file.write(code)
        temp_path = temp_file.name

    try:
        return _run_command(
            ["python", temp_path],
            input_data
        )
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


def run_python_code_with_input(code: str, user_input: str) -> Dict:
    """
    Backward-compatible wrapper used by older code.
    """
    return run_python_code(code, user_input)


# =========================================================
# JAVASCRIPT
# =========================================================
def run_javascript_code(code: str, input_data: str = "") -> Dict:
    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".js",
        delete=False,
        encoding="utf-8",
    ) as temp_file:
        temp_file.write(code)
        temp_path = temp_file.name

    try:
        return _run_command(["node", temp_path], input_data)
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


# =========================================================
# C
# =========================================================
def run_c_code(code: str, input_data: str = "") -> Dict:
    with tempfile.TemporaryDirectory() as temp_dir:
        source_path = os.path.join(temp_dir, "main.c")
        executable_path = os.path.join(
            temp_dir,
            "program.exe" if os.name == "nt" else "program"
        )

        with open(source_path, "w", encoding="utf-8") as f:
            f.write(code)

        compile_result = _run_command(
            ["gcc", source_path, "-o", executable_path]
        )

        if not compile_result["success"]:
            return compile_result

        result = _run_command(
            [executable_path],
            input_data
        )

        import time
        time.sleep(1)

        return result


# =========================================================
# C++
# =========================================================
def run_cpp_code(code: str, input_data: str = "") -> Dict:
    """
    Compiles and runs C++ code.

    This version ALWAYS prepends the required headers:
        #include <iostream>
        #include <iomanip>
        #include <bits/stdc++.h>

    So these symbols will always be available:
        std::cin
        std::cout
        std::endl
        std::fixed
        std::setprecision
        std::ios_base

    This completely fixes errors such as:
        'cin' is not a member of 'std'
        'cout' is not a member of 'std'
        'fixed' is not a member of 'std'
        'setprecision' is not a member of 'std'
    """

    # Remove all existing include directives
    lines = code.splitlines()
    cleaned_lines = []

    for line in lines:
        if line.strip().startswith("#include"):
            continue
        cleaned_lines.append(line)

    # Remove duplicate 'using namespace std;'
    final_body = []
    seen_using = False

    for line in cleaned_lines:
        if line.strip() == "using namespace std;":
            if seen_using:
                continue
            seen_using = True
        final_body.append(line)

    # Build final code with guaranteed headers
    final_code = (
        "#include <iostream>\n"
        "#include <iomanip>\n"
        "#include <bits/stdc++.h>\n"
        "using namespace std;\n\n"
        + "\n".join(final_body)
    )

    with tempfile.TemporaryDirectory() as temp_dir:
        source_path = os.path.join(temp_dir, "main.cpp")
        executable_path = os.path.join(
            temp_dir,
            "program.exe" if os.name == "nt" else "program"
        )

        # Write corrected source code
        with open(source_path, "w", encoding="utf-8") as f:
            f.write(final_code)

        # Compile with C++17 support
        compile_result = _run_command(
            ["g++", "-std=c++17", source_path, "-o", executable_path]
        )

        # Return compilation errors if any
        if not compile_result["success"]:
            return compile_result

        # Run compiled executable with custom input
        result = _run_command(
            [executable_path],
            input_data
        )

        import time
        time.sleep(1)

        return result


# =========================================================
# JAVA
# =========================================================
def run_java_code(code: str, input_data: str = "") -> dict:
    """
    Compiles and runs Java code.
    Automatically renames:
        public class Solution
        public class MyClass
        public class Anything
    to:
        public class Main
    so that it matches Main.java.
    """

    # Replace any public class name with Main
    code = re.sub(
        r'public\s+class\s+\w+',
        'public class Main',
        code
    )

    with tempfile.TemporaryDirectory() as temp_dir:
        source_path = os.path.join(temp_dir, "Main.java")

        # Write code to Main.java
        with open(source_path, "w", encoding="utf-8") as f:
            f.write(code)

        # Compile
        compile_result = _run_command(
            ["javac", source_path]
        )

        if not compile_result["success"]:
            return compile_result

        # Run
        return _run_command(
            ["java", "-cp", temp_dir, "Main"],
            input_data
        )


# =========================================================
# SQL
# =========================================================
def run_sql_code(code: str, input_data: str = "") -> Dict:
    """
    SQL execution is not implemented.
    """
    return {
        "success": True,
        "stdout": "SQL code generated successfully. Execution is not enabled.",
        "stderr": "",
        "return_code": 0,
    }


# =========================================================
# MAIN EXECUTION FUNCTION
# =========================================================
def execute_code(
    code: str,
    language: str = "Python",
    input_data: str = "",
) -> Dict:
    """
    Execute code in the selected language.
    """

    if not code or code.strip() == "Code not found.":
        return {
            "success": False,
            "stdout": "",
            "stderr": "No executable code found.",
            "return_code": -1,
        }

    language = language.strip()

    if language == "Python":
        return run_python_code(code, input_data)

    if language == "JavaScript":
        return run_javascript_code(code, input_data)

    if language == "C":
        return run_c_code(code, input_data)

    if language == "C++":
        return run_cpp_code(code, input_data)

    if language == "Java":
        return run_java_code(code, input_data)

    if language == "SQL":
        return run_sql_code(code, input_data)

    return {
        "success": False,
        "stdout": "",
        "stderr": f"Language '{language}' is not supported.",
        "return_code": -1,
    }