# Roadmap

## Phase 1 (Completed – 40%)
- [x] Basic Project Structure (Frontend/Backend separation)
- [x] Rule-Based Reasoning Engine (regex-based)
- [x] API for text processing (`POST /api/process`)  
- [x] Basic Frontend Interface (Input + Output panels)
- [x] React Flow visualization with Dagre auto-layout
- [x] JSON / Graph view toggle

## Phase 2 (Completed – ~70%)
- [x] **Database Integration**: PostgreSQL `cases` table, connection pool, migration script
- [x] **Case Persistence API**: `GET/POST/DELETE /api/cases` with graceful DB fallback
- [x] **Case History UI**: Sidebar panel with saved cases, load and delete actions
- [x] **Save Case Workflow**: Title dialog, save → persists to DB → appears in sidebar
- [x] **Enhanced NLP**: 4 node types (added `reasoning`), smarter sentence splitting
- [x] **Graph Builder v2**: Two new edge types – `raises` (claim→reasoning), `leads_to` (reasoning→conclusion)
- [x] **UI/UX Overhaul**: Dark navy theme, glassmorphism, Google Fonts (Inter), CSS design system
- [x] **Custom Graph Nodes**: Color-coded per type with type badge, tooltip, glow effects
- [x] **MiniMap + Dot Background**: Enhanced React Flow canvas
- [x] **Node Stats Bar**: Chip counters for node types and edge count
- [x] **Copy JSON**: One-click clipboard copy in JSON view
- [x] **Toast Notifications**: Success/error feedback on actions
- [x] **Phase 2 Badge**: Header indicator showing completion progress

## Phase 3 (Planned – ~100%)
- [ ] **Authentication**: User login and personal graph history
- [ ] **Case Management**: Upload and parse PDF case files
- [ ] **Export**: Download reasoning graphs as PDF or image
- [ ] **Advanced NLP**: ML-based or external NLP microservice integration
- [ ] **Case Comparison**: Side-by-side view of two reasoning graphs
