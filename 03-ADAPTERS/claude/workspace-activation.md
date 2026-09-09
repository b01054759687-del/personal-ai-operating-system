# Claude Workspace Activation & Daily Operations Guide

## 1. Overview & Purpose

This guide defines the operational interaction model for **Claude Code** and **Claude Desktop** when interacting with the **Personal AI Operating System (PAI-OS)**. It establishes how Claude discovers the **AI Workspace Manager Agent**, ingests required repository context, parses system registries, triggers intake workflows, and enforces mandatory human approval gates.

---

## 2. How Claude Discovers AI Workspace Manager

Claude discovers the Workspace Manager and system orchestrator through a deterministic 3-tier resolution sequence:

1. **Initial Directive Entrypoint (`CLAUDE.md`)**:
   - Upon session initialization, Claude automatically reads `03-ADAPTERS/claude/CLAUDE.md` (or repository root `CLAUDE.md`).
   - The file directs Claude to `00-META/SYSTEM-CONSTITUTION.md` and declares the authoritative role of the AI Workspace Manager Agent.

2. **Agent Registry Lookup (`04-REGISTRY/agents-registry.json`)**:
   - Claude queries `04-REGISTRY/agents-registry.json` via MCP tool `get_file_contents`.
   - Locates the system agent record:
     ```json
     {
       "name": "ai-workspace-manager",
       "type": "agent",
       "category": "system",
       "status": "active",
       "path": "02-AI-ASSETS/agents/system/ai-workspace-manager",
       "prompt_file": "02-AI-ASSETS/agents/system/ai-workspace-manager/AGENT.md"
     }
     ```

3. **Persona & Capabilities Ingestion (`AGENT.md`)**:
   - Claude reads `02-AI-ASSETS/agents/system/ai-workspace-manager/AGENT.md` to ingest the operational persona, system rules, zero-deletion mandates, and available capabilities (`intake-management`, `project-import`, `asset-classification`, `publish-execution`).

---

## 3. Required Repository Context

To operate effectively without context drift or hallucinations, Claude must load and reference the following baseline repository context:

| Context Layer | Path | Purpose |
| :--- | :--- | :--- |
| **Constitutional Laws** | `00-META/SYSTEM-CONSTITUTION.md` | Fundamental rules: Zero Deletion, Single Source of Truth, Zero Secrets. |
| **System Topology** | `00-META/INDEX.md` | Directory map across all 11 operating layers. |
| **User Profile & Principles** | `07-KNOWLEDGE/personal-context/user-profile-and-principles.md` | User preferences, domain standards (Interior Design & Finishing), Egyptian Arabic dialect rules. |
| **Asset Registry** | `04-REGISTRY/assets-registry.json` | Current inventory of active skills, agents, prompts, and rules. |
| **Intake Registry** | `04-REGISTRY/intake-registry.json` | State of incoming, staged, validated, and processed assets. |
| **Project Guidelines** | `07-KNOWLEDGE/projects/project-intake-guidelines.md` | Standards for storing and structuring external projects. |

---

## 4. How Registries Are Read

Claude accesses machine-readable registries using the GitHub MCP server or local file read tools:

1. **Query Tool**: `get_file_contents(owner, repo, path)`.
2. **Schema Verification**:
   - Ensure `schemaVersion` matches current standard (`1.0.0` or `2.0.0`).
   - Check `lastUpdated` timestamp to verify state freshness.
3. **Data Extraction**:
   - Parse JSON payload into memory.
   - For asset lookups, filter `assets[]` in `assets-registry.json` by `status: "active"`.
   - For intake status, query `items[]` in `intake-registry.json` matching target `intakeId` or `itemName`.
   - For adapter mappings, inspect `adapters[]` in `adapter-registry.json`.

---

## 5. How Intake Workflows Are Triggered

When an external codebase, new skill, or prompt package is introduced into `11-INTAKE/incoming/`, Claude follows the operational procedures defined in `05-PROMPT-LIBRARY/system-workflows/intake/`:

```
   +-----------------------------------------------------------------+
   | 1. DISCOVER: discover-incoming.md                              |
   |    - Read 11-INTAKE/incoming/                                   |
   |    - Allocate INTAKE-ID and stage to 11-INTAKE/staging/<id>/    |
   +-------------------------------+---------------------------------+
                                   |
                                   v
   +-----------------------------------------------------------------+
   | 2. CLASSIFY: classify-incoming.md                              |
   |    - Parse package descriptors                                  |
   |    - Resolve type: project | skill | agent | rule | workflow    |
   +-------------------------------+---------------------------------+
                                   |
                                   v
   +-----------------------------------------------------------------+
   | 3. VALIDATE: validate-incoming.md                              |
   |    - Scan secrets (\b(ghp_|sk-)\b)                              |
   |    - Verify YAML frontmatter & markdown hierarchy               |
   |    - Pass -> APPROVED | Fail -> REJECTED                        |
   +-------------------------------+---------------------------------+
                                   |
                                   v
   +-----------------------------------------------------------------+
   | 4. IMPORT: import-project.md                                   |
   |    - Create 07-KNOWLEDGE/projects/<project-name>/               |
   |    - Scaffold Context, Objectives, Files, Decisions, References |
   +-------------------------------+---------------------------------+
                                   |
                                   v
   +-----------------------------------------------------------------+
   | 5. REGISTER: register-import.md                                |
   |    - Update 04-REGISTRY/intake-registry.json (status: IMPORTED) |
   |    - Sync 04-REGISTRY/knowledge-registry.json                   |
   +-------------------------------+---------------------------------+
```

---

## 6. Required Approval Behavior & Safety Gates

Claude must strictly observe the following human-in-the-loop approval protocol:

1. **Read-Only Autonomy**:
   - Claude may autonomously discover, inspect, classify, and validate candidate files.
   - Generating diagnostic reports and validation logs requires no approval.

2. **Mandatory Human Confirmation Gate**:
   - Before executing **Step 4 (Import)** or **Step 5 (Register)**, Claude must pause and present an **Intake Approval Dossier**:
     - **Asset Name & Type**: e.g., `project / sewbt-crm-dashboard`
     - **Target Destination**: e.g., `07-KNOWLEDGE/projects/sewbt-crm-dashboard/`
     - **Validation Results**: Zero secrets confirmed, 100% schema compliance.
     - **Planned Modifications**: List of files to be created and registries to update.
   - Claude must wait for explicit user confirmation before writing files or transitioning status to `IMPORTED`.

3. **Rejection & Zero-Deletion Handling**:
   - If secrets or fatal schema errors are detected during validation, Claude must reject the asset immediately without asking for bypass permission.
   - Rejected files are moved to `11-INTAKE/rejected/<intakeId>/` accompanied by a generated `REJECTION-REPORT.md`.
   - Never delete rejected files (Constitution Rule 1).