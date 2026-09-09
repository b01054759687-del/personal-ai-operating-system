# DEPRECATION NOTICE: 07-MEMORY

## Status: DEPRECATED & SUPERSEDED
- **Effective Milestone**: Phase 7 (Knowledge & Memory Layer v1.0.0)
- **Superseded By**: `07-KNOWLEDGE/`
- **Registry Authority**: `04-REGISTRY/knowledge-registry.json`
- **Governance Standard**: `06-DOCUMENTATION/memory-governance.md`

---

## 1. Architectural Context & Rationale

During Phase 1 (Foundation Setup), initial flat memory files were initialized in `07-MEMORY/` and domain references in `08-KNOWLEDGE-BASE/`. 

In Phase 7, the Personal AI Operating System formally established the **Structured Knowledge & Memory Layer** (`07-KNOWLEDGE/`) under **Option A (Structured Memory Only)**. This unified user personal context, architectural decision records (ADRs), project dossiers, technical standards, business benchmarks, and learning retrospectives into a single, standardized, and machine-indexed hierarchy.

---

## 2. Preservation Policy (Zero Deletion Rule)

In strict adherence to **Constitution Rule 1 (Absolute Prohibition Against Deletion)**:
- Existing files in `07-MEMORY/` (`personal-context.md`, `decisions-log.md`, `preferences.md`, `project-context/`) are **NOT deleted**.
- They are permanently preserved for historical audit trails and regression reference.
- However, `07-MEMORY/` is **read-only and frozen**. No new memory, decisions, or context may be authored or updated here.

---

## 3. Migration & Canonical Mapping Reference

| Legacy File / Folder | Canonical Replacement Path | Status |
|---|---|:---:|
| `07-MEMORY/personal-context.md` | `07-KNOWLEDGE/personal-context/user-profile-and-principles.md` | **Active** |
| `07-MEMORY/preferences.md` | `07-KNOWLEDGE/personal-context/user-profile-and-principles.md` | **Active** |
| `07-MEMORY/decisions-log.md` | `07-KNOWLEDGE/decisions/ADR-*.md` | **Active** |
| `07-MEMORY/project-context/` | `07-KNOWLEDGE/projects/` | **Active** |
| `08-KNOWLEDGE-BASE/*` | `07-KNOWLEDGE/{technical,business,learning}/` | **Active** |

All future memory queries and agent operations must target `07-KNOWLEDGE/`.
