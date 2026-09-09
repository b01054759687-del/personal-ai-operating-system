# Project Intake & Structured Storage Guidelines

## 1. Scope & Objective

The **Knowledge Projects Layer** (`07-KNOWLEDGE/projects/`) provides a unified, structured knowledge base for all active, planned, and completed projects within the **Personal AI Operating System (PAI-OS)**. 

Every external codebase, client deliverable, or internal system introduced into PAI-OS must establish a canonical project dossier according to this standard. This allows any AI agent (Antigravity, Claude, Cursor, Windsurf) to instantly understand project scope, architecture, decisions, and constraints without re-reading extensive raw codebases.

---

## 2. Directory Structure & Naming Conventions

All projects are stored under:
```
07-KNOWLEDGE/projects/<project-name>/
```

### Naming Standard
- Format: Lowercase kebab-case (`[a-z0-9-]+`).
- Descriptive of business domain or core system (e.g., `amlaak-design-crm`, `sewbt-erp-portal`).
- No spaces, underscores, or special characters.

### Mandatory Core Dossier Structure
Every project directory must contain the following 5 canonical files:

```
07-KNOWLEDGE/projects/<project-name>/
├── PROJECT-CONTEXT.md   # Domain, business background, architecture, and tech stack
├── OBJECTIVES.md        # Deliverables, milestones, success criteria, and KPIs
├── FILES-INDEX.md       # Directory layout, entrypoints, and codebase inventory
├── DECISIONS.md         # Architectural Decision Records (ADRs) and trade-off rationales
└── REFERENCES.md        # External links, documentation, APIs, and env variable mappings
```

---

## 3. Specification of Mandatory Project Files

### 3.1 `PROJECT-CONTEXT.md` (Context)
- **Purpose**: Defines the purpose of the project, problem statement, business landscape, and technical boundaries.
- **Required Sections**:
  1. `Executive Summary`: 2-3 sentences explaining what the project is and why it exists.
  2. `Business Domain`: Business sector context (e.g., Interior Design & Finishing, ERP, BI).
  3. `Target Audience / Stakeholders`: End users and system consumers.
  4. `System Architecture`: Core architectural pattern (Monolith, Microservices, JAMstack, Serverless).
  5. `Technology Stack`: Languages, frameworks, databases, and deployment runtimes.
  6. `Constraints & Invariants`: Non-negotiable technical or operational boundaries.

### 3.2 `OBJECTIVES.md` (Objectives)
- **Purpose**: Outlines concrete goals, deliverables, phases, and success metrics.
- **Required Sections**:
  1. `Primary Objectives`: Core technical and business goals.
  2. `Deliverables & Milestones`: Ordered phase breakdown with expected delivery timelines.
  3. `Key Performance Indicators (KPIs)`: Quantitative success benchmarks (e.g., latency < 200ms, 100% test coverage).
  4. `Out of Scope`: Explicit list of items deliberately excluded from the current phase.

### 3.3 `FILES-INDEX.md` (Files Index)
- **Purpose**: A navigational map of code, directories, and assets for rapid agent context retrieval.
- **Required Sections**:
  1. `Repository Topology`: Tree view of top-level directories and their purposes.
  2. `Key Entrypoints`: Main initialization files, CLI endpoints, config roots, and API controllers.
  3. `Core Modules & Services`: Functionality summary per subpackage.
  4. `Data Models & Schemas`: Database migrations, JSON schemas, or TypeScript interfaces.
  5. `Build & Test Artifacts`: Build configuration, test suites, and CI/CD pipelines.

### 3.4 `DECISIONS.md` (Decisions)
- **Purpose**: Tracks Architectural Decision Records (ADRs) to preserve institutional memory and prevent regression.
- **Required Format**:
  - `ADR-XXX: [Title]`:
    - **Status**: [Proposed | Accepted | Superseded | Deprecated]
    - **Context**: Problem statement and forces at play.
    - **Decision**: Specific solution chosen.
    - **Consequences**: Positive and negative trade-offs.
    - **Date**: YYYY-MM-DD.

### 3.5 `REFERENCES.md` (References)
- **Purpose**: Central index for external links, design systems, API docs, and environment variables.
- **Required Sections**:
  1. `Documentation & Repositories`: Upstream Git URLs, documentation links, Figma/design files.
  2. `Third-Party APIs & Services`: Dependencies, endpoints, rate limits.
  3. `Environment Configuration`: List of required environment variables (`ENV_VAR_NAME`) with descriptions.
  4. `Zero-Secret Policy Notice`: Strict warning prohibiting storage of plaintext secrets or API tokens.

---

## 4. Project Intake Workflow Integration

1. **Intake Staging**:
   - New external project code is placed in `11-INTAKE/incoming/`.
   - `discover-incoming.md` stages and assigns an intake ID.
2. **Classification**:
   - `classify-incoming.md` identifies the bundle as a `project`.
3. **Validation**:
   - `validate-incoming.md` checks for secrets, licensing, and structural integrity.
4. **Knowledge Layer Import**:
   - `import-project.md` scaffolds the 5 dossier files under `07-KNOWLEDGE/projects/<project-name>/`.
5. **Registry Update**:
   - `register-import.md` records the project in `04-REGISTRY/knowledge-registry.json` and `04-REGISTRY/intake-registry.json`.
