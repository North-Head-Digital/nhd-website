---
mode: agent
---
---
description: Perform a general scan and debug of the entire codebase.
mode: agent
tools: ["file", "search"]
---

# Codebase Scan and Debug

Act as an expert software engineer. Your task is to perform a comprehensive scan of the entire codebase located in `${workspaceFolder}`.

Analyze the code and identify the following:
1.  **Bugs & Logical Errors**: Find any potential runtime errors, logical flaws, or incorrect implementations.
2.  **Performance Bottlenecks**: Identify inefficient code, memory leaks, or areas that could be optimized.
3.  **Security Vulnerabilities**: Look for common vulnerabilities (e.g., XSS, SQL injection, insecure configurations).
4.  **Code Quality Issues**: Pinpoint code smells, overly complex functions, and areas needing refactoring for better readability and maintainability.
5.  **Best Practices**: Check for deviations from established coding standards, outdated dependencies, or deprecated API usage.

Provide a detailed report summarizing your findings. For each issue, include:
- A clear description of the problem.
- The file path (`${file}`) and relevant line numbers.
- A suggested solution or refactoring approach.
- The severity (Critical, High, Medium, Low).