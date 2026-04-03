# Legal Case Reasoning Explorer

A full-stack platform that converts unstructured legal judgment text into an interactive reasoning graph.

The system helps users move from passive reading to active legal reasoning analysis by identifying key argumentative units (claims, precedents, conclusions) and showing how they connect.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Value Proposition (USP)](#core-value-proposition-usp)
- [Key Features](#key-features)
- [Current Completion Status](#current-completion-status)
- [Major Milestones Completed](#major-milestones-completed)
- [Major Milestones Pending](#major-milestones-pending)
- [System Architecture](#system-architecture)
- [Reasoning Model (MVP)](#reasoning-model-mvp)
- [Data Contract](#data-contract)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [API Reference](#api-reference)
- [Local Setup and Run Instructions](#local-setup-and-run-instructions)
- [How to Use](#how-to-use)
- [Known Limitations (Current Version)](#known-limitations-current-version)
- [Roadmap](#roadmap)
- [Testing and Validation Status](#testing-and-validation-status)
- [Scope](#scope)
- [Documentation](#documentation)
- [Future Vision](#future-vision)
- [License](#license)

## Project Overview

Legal judgments are usually long, dense, and difficult to decode quickly. While most legal platforms provide document retrieval and keyword search, they do not expose the chain of reasoning in a visual and structured way.

Legal Case Reasoning Explorer addresses this gap by:
- Taking raw judgment text as input.
- Extracting reasoning units through a rule-based engine.
- Building a graph model of argumentative relations.
- Rendering the result as both JSON and an interactive visual graph.

## Core Value Proposition (USP)

### 1. Reasoning-first legal exploration
Instead of only reading final outcomes, users can inspect the logic that leads to those outcomes.

### 2. Text-to-graph transformation
The system converts plain legal text directly into a structured graph representation usable for learning, analysis, and comparison.

### 3. Dual interpretation modes
Users can switch between:
- JSON mode (for technical inspection and debugging)
- Graph mode (for intuitive visual understanding)

### 4. Educational and practical utility
Useful for:
- Law students understanding judicial logic
- Researchers analyzing argument patterns
- Early-stage legal-tech prototyping

## Key Features

### Implemented Features
- Text input interface for legal judgment content.
- Backend API endpoint for processing legal text.
- Rule-based sentence classification into:
  - claim
  - precedent
  - conclusion
- Graph construction logic with typed edges:
  - supports (claim -> conclusion)
  - cites (conclusion -> precedent)
- Interactive graph visualization using React Flow.
- Automatic node layout using Dagre.
- JSON output view for full graph payload.
- Basic error handling for invalid input and server failures.

### Planned Features
- Persistent database storage (PostgreSQL).
- Authentication and user history.
- Case file upload (PDF).
- Graph export as image/PDF.
- Enhanced NLP-based extraction.

## Current Completion Status

Overall project status is approximately 40% complete (MVP foundation complete).

- Phase 1: Core foundation implemented
- Phase 2: In progress/planned
- Phase 3: Advanced capabilities pending

## Major Milestones Completed

1. Monorepo-level separation of frontend and backend services.
2. Express server with CORS and JSON request parsing.
3. Processing API route: POST /api/process.
4. Reasoning engine (regex/rule-based) for sentence-level extraction.
5. Graph builder that maps extracted nodes into a case graph structure.
6. Basic models for Node, Edge, and CaseGraph.
7. React + Vite frontend scaffold with TypeScript.
8. User input panel and process trigger workflow.
9. JSON graph output panel.
10. React Flow visualization with Dagre auto-layout.
11. View toggle between JSON and Graph visualization.

## Major Milestones Pending

1. Database integration and schema design (PostgreSQL).
2. Case persistence and retrieval APIs.
3. Authentication and user-specific graph history.
4. PDF upload and parsing pipeline.
5. More advanced NLP (beyond keyword regex).
6. Smarter relation extraction (context-aware, not full layer linking).
7. Export features (PDF/Image snapshots of graph).
8. Test suite coverage (unit + integration + UI tests).
9. Deployment and environment hardening.

## System Architecture

### High-Level Components
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Visualization: React Flow + Dagre
- Database: Planned (PostgreSQL)

### Data Flow
1. User pastes legal judgment text in frontend.
2. Frontend sends POST request to backend endpoint.
3. Backend reasoning engine extracts typed nodes.
4. Graph builder creates edges and returns graph JSON.
5. Frontend renders output in JSON or Graph mode.

## Reasoning Model (MVP)

### Sentence Splitting
Current splitting pattern:
- /[^.!?]+[.!?]+/g

### Classification Logic
A sentence is classified by keyword matching with priority:
- conclusion > claim > precedent

Patterns currently used:
- claim: argued, claimed, contended, submitted
- precedent: vs., cited, relied on, referred to
- conclusion: held that, thus, therefore, concluded

### Edge Construction Rules
- supports: each claim connects to each conclusion
- cites: each conclusion connects to each precedent

This is intentionally simple for MVP demonstration and will be refined in future phases.

## Data Contract

Backend response format:

```json
{
  "nodes": [
    {
      "id": "node-0",
      "type": "claim",
      "text": "The appellant argued that ...",
      "metadata": {}
    }
  ],
  "edges": [
    {
      "source": "node-0",
      "target": "node-3",
      "relation": "supports"
    }
  ]
}
```

## Project Structure

```text
legal-reasoning-explorer/
  backend/
    models/
    routes/
    services/
    server.js
    package.json
  frontend/
    src/
      components/
      services/
      App.tsx
    package.json
  docs/
    architecture.md
    project_synopsis.md
    reasoning-model.md
    roadmap.md
```

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Axios
- React Flow
- Dagre

### Backend
- Node.js
- Express
- CORS
- body-parser

### Planned
- PostgreSQL
- Advanced NLP stack (library/service based)

## API Reference

### Endpoint
- Method: POST
- URL: http://localhost:5000/api/process

### Request Body

```json
{
  "text": "Full legal judgment text here..."
}
```

### Success Response
- HTTP 200 with graph JSON object (nodes, edges).

### Error Responses
- HTTP 400 if text is missing.
- HTTP 500 for internal processing failure.

## Local Setup and Run Instructions

### Prerequisites
- Node.js (LTS recommended)
- npm

### 1. Clone repository

```bash
git clone <your-repository-url>
cd legal-reasoning-explorer
```

### 2. Start backend

```bash
cd backend
npm install
npm start
```

Backend runs at:
- http://localhost:5000

### 3. Start frontend
Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at Vite default URL (typically):
- http://localhost:5173

## How to Use

1. Launch backend and frontend servers.
2. Open frontend in browser.
3. Paste or type legal judgment text in the input area.
4. Click Process Text.
5. Explore output:
   - Graph View for visual reasoning map
   - JSON View for raw structured result

## Known Limitations (Current Version)

- Rule-based extraction can miss nuanced legal language.
- Sentence splitting is basic and may not handle all legal abbreviations perfectly.
- Relation mapping is currently many-to-many by type group, not context-sensitive.
- No persistent storage yet (results are session-only).
- No authentication or role-based access.
- No automated tests committed yet.

## Roadmap

### Phase 1 (Completed foundation)
- Basic architecture and API
- Rule-based extraction engine
- Frontend input/output workflow

### Phase 2 (Current target)
- PostgreSQL integration
- Improved visualization and interaction
- Enhanced NLP extraction quality

### Phase 3 (Advanced target)
- Authentication and user profiles
- PDF case upload and management
- Export and reporting functionality

## Testing and Validation Status

Current validation is primarily manual:
- API behavior tested through frontend integration.
- Graph rendering validated using sample legal text.

Pending:
- Unit tests for reasoning engine and graph builder.
- API integration tests for route-level reliability.
- Frontend component tests for input and render behavior.

## Scope

### In Scope
- Structured reasoning extraction from input text.
- Graph-based legal reasoning visualization.
- Interactive frontend for exploration.

### Out of Scope (Current Project Boundary)
- Legal outcome prediction/advice automation.
- Nationwide legal corpus crawling.
- Real-time legal consultation systems.

## Documentation

Detailed internal documents are available in the docs folder:
- architecture.md
- project_synopsis.md
- reasoning-model.md
- roadmap.md

## Future Vision

The long-term vision is to evolve this MVP into a robust legal informatics platform that can ingest real case documents, generate high-quality reasoning maps, and support comparison across cases for education and research.

## License

No license file is currently configured.
Add a LICENSE file (for example, MIT) before public/open-source distribution.
