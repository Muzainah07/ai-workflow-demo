# AI Workflow Comparison

## Overview

This exercise compared two AI-assisted development workflows for implementing a Settings form in a React + Vite application. The objective was to observe how prompt quality affects implementation quality, verification, and the overall review process.

## Round 1 – Vague Prompt

The first implementation used a single, intentionally vague prompt:

> "Build a settings form with validation."

No additional context, project structure, constraints, or expected behavior was provided. The AI independently selected its own implementation strategy, introducing libraries such as React Hook Form, Zod, React Router, and Hook Form Resolvers. It produced a functional settings page with validation, routing, accessibility attributes, and inline error handling.

Although the generated feature worked correctly, much of the implementation required manual inspection because the architectural decisions were made without any guidance. Since the prompt contained no verification requirements, I had to review dependencies, project structure, and behavior manually before accepting the implementation.

## Round 2 – Precise Prompt

The second implementation followed a structured workflow. The prompt required the AI to first generate an implementation plan before writing code. It specified project constraints, file organization, component responsibilities, accessibility requirements, validation behavior, edge cases, and a verification phase.

Instead of relying on additional libraries, the implementation separated validation logic into a dedicated schema file while keeping the form component focused on presentation and state management. Accessibility was explicitly addressed through labels, fieldsets, legends, `aria-invalid`, and `aria-describedby` attributes.

The AI also performed a verification loop by running ESLint, identifying an issue, correcting it, and rerunning the linter until the project passed successfully.

## Comparison

The primary difference between both workflows was not feature completeness but development methodology. The vague prompt produced working code quickly but required more manual review because implementation decisions were implicit. The precise prompt produced a more structured implementation with explicit planning, clearer separation of concerns, accessibility considerations, validation rules, and built-in verification.

The review effort was significantly lower in the second workflow because architectural decisions, validation strategy, and verification steps were documented before implementation.

## AI Mistake Identified

During the second implementation, the AI introduced an ESLint issue while refactoring the form logic. The issue was detected during the verification phase, corrected, and verified by rerunning ESLint. This reinforced the importance of including automated verification as part of the prompting workflow rather than assuming generated code is immediately production-ready.

## Conclusion

This exercise demonstrated that effective AI-assisted development depends more on prompt engineering and verification than on code generation alone. Although the vague prompt generated functional code, the structured workflow produced a more maintainable implementation with reduced review effort, improved traceability, and a higher level of confidence in correctness.