# Reasoning Model (v0.1 - Rule-Based)

This document describes the initial rule-based approach used to extract legal reasoning structures from text.

## 1. Sentence Splitting
Text is split into sentences using a basic regular expression that looks for sentence terminators (`.`, `!`, `?`):
`/[^.!?]+[.!?]+/g`

## 2. Node Classification
Each sentence is analyzed for specific keywords to determine its type.

| Node Type | Keywords / Patterns |
| :--- | :--- |
| **Claim** | `argued`, `claimed`, `contended`, `submitted` |
| **Precedent** | `vs.`, `cited`, `relied on`, `referred to` |
| **Conclusion** | `held that`, `thus`, `therefore`, `concluded` |

*Note: Determining the "primary" type if multiple keywords exist is based on a simple priority: Conclusion > Claim > Precedent.*

## 3. Relationship Logic
Edges are created to link the identified nodes.

- **Supports** (`Claim` -> `Conclusion`): All claims are linked to all conclusions in the current context (Many-to-Many for MVP simplicity).
- **Cites** (`Conclusion` -> `Precedent`): Conclusions are linked to precedents they cite or rely upon.
