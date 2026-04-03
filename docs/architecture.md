# Architecture Overview

## Components
- **Frontend**: React (Vite) + TypeScript
- **Backend**: Node.js + Express
- **Database**: Planned PostgreSQL (not implemented yet)

## Data Flow
1. **Input**: User enters legal judgment text in the frontend interface.
2. **Transmission**: Arguments are sent via HTTP POST request to the `/api/process` endpoint.
3. **Processing**:
    - The backend receives the text.
    - `ReasoningEngine` splits the text into sentences and classifies them into nodes (Claims, Precedents, Conclusions).
    - `GraphBuilder` links these nodes based on predefined rules to form a graph.
4. **Output**: The structured graph JSON (nodes + edges) is returned to the frontend for display.
