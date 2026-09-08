# Personal AI Operating System (PAI-OS)
## Memory & Knowledge Governance Standard
### Version 1.0.0

---

## 1. Objective & Scope

The **Structured Knowledge & Memory Layer** (`07-KNOWLEDGE/`) acts as the persistent, human-readable, and machine-parsable cognitive base of the Personal AI Operating System. 

Per Architectural Decision **Option A (Structured Memory Only)**:
- Memory is managed via portable Markdown files and declarative JSON registries.
- Vector databases, external embedding clouds, and proprietary memory services are prohibited to guarantee 100% portability, privacy, and zero vendor lock-in.

---

## 2. What Qualifies as Memory

Memory is structured into 6 authoritative domains:

1. **Personal Context (`07-KNOWLEDGE/personal-context/`)**:
   - Professional profile and domain context (e.g., Interior Design & Finishing sector focus, not Real Estate).
   - Core linguistic standards (Egyptian Arabic dialect, `<div dir="rtl">` styling).
   - User workflow principles (Autonomous Turbo Mode, evidence integrity, zero fluff).
2. **Decisions (`07-KNOWLEDGE/decisions/`)**:
   - Architecture Decision Records (ADRs) capturing problem statements, options evaluated, rationale, and consequences.
3. **Projects (`07-KNOWLEDGE/projects/`)**:
   - Long-term initiatives, scope boundaries, milestones, and deliverables.
4. **Technical Knowledge (`07-KNOWLEDGE/technical/`)**:
   - System architectures, adapter specifications, GitHub Source of Truth rules, API integration boundaries.
5. **Business Knowledge (`07-KNOWLEDGE/business/`)**:
   - Domain-specific metrics (CRM qualification benchmarks, cost-per-meeting standards, full-funnel closed-loop attribution).
6. **Learning & Feedback (`07-KNOWLEDGE/learning/`)**:
   - Discovered patterns, lessons learned, corrected agent behaviors, and process refinements.

---

## 3. What Must NEVER Be Stored (Prohibited Content)

Strict security and hygiene boundaries:
1. **Secrets & Credentials**:
   - Plaintext API keys, GitHub PATs (`ghp_*`), OpenAI/Anthropic keys (`sk-*`), passwords, certificates, or tokens.
   - Use environment variables (`${VAR_NAME}`) and secure system keychains exclusively.
2. **Raw Ephemeral Data**:
   - Temporary test logs, transient scrape dumps, scratch session transcripts, or unparsed bulky CSV/JSON feeds.
3. **Unverified Assumptions or Hallucinations**:
   - Facts must be confirmed per Evidence Integrity rules before persisting to knowledge.
4. **Redundant Copies of Code**:
   - Complete repositories or source code packages belong in dedicated workspaces, not in memory.

---

## 4. Memory Update Rules

1. **GitHub Exclusive Source of Truth**:
   - Knowledge updates must be committed directly to `personal-ai-operating-system`.
   - Downstream AI tool memories (e.g., Cursor Composer memory, Windsurf Cascade memories, Antigravity session cache) are non-authoritative local caches.
2. **Scaffold Completeness**:
   - Every knowledge entry must use an official template from `07-KNOWLEDGE/templates/` and be indexed in `04-REGISTRY/knowledge-registry.json`.
3. **Immutability of Decisions**:
   - Architecture Decision Records (ADRs) are immutable once approved. If a decision changes, create a new ADR superseding the previous one.

---

## 5. Versioning Rules

- Knowledge assets follow Semantic Versioning (`MAJOR.MINOR.PATCH`):
  - **MAJOR**: Fundamental paradigm shift, structural schema redesign, or deprecation of legacy frameworks.
  - **MINOR**: Addition of new decision records, project dossiers, or domain methodologies.
  - **PATCH**: Typo corrections, link updates, or minor clarifications.

---

## 6. Approval & Gate Requirements

| Action | Gate Policy | Description |
|---|---|:---:|
| **Read Knowledge** | `AUTO_APPROVED` | Any agent can read and query `07-KNOWLEDGE/`. |
| **Add New Entry** | `AUTO_APPROVED_STRUCTURED` | Allowed if valid template is used and registered. |
| **Modify Personal Profile** | `APPROVAL_REQUIRED` | Changes to user identity or core preferences require sign-off. |
| **Supersede Decision (ADR)** | `APPROVAL_REQUIRED` | Overturning architectural decisions requires human review. |
| **Retire / Archive Knowledge** | `APPROVAL_REQUIRED` | Moving knowledge to `10-ARCHIVE/` requires explicit approval. |
