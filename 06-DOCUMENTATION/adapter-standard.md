# Personal AI Operating System (PAI-OS)
## AI Tool Adapter Layer Standard
### Version 1.0.0 — Architectural Specification

---

## 1. Adapter Purpose & Architecture

The **AI Tool Adapter Layer** (`03-ADAPTERS/`) bridges canonical, portable AI assets stored within the Personal AI Operating System with tool-specific environments, configurations, and runtime engines.

### Supported Tools
1. **Google Antigravity** (`03-ADAPTERS/antigravity/`)
2. **Claude Code / Desktop** (`03-ADAPTERS/claude/`)
3. **Cursor IDE** (`03-ADAPTERS/cursor/`)
4. **Windsurf IDE** (`03-ADAPTERS/windsurf/`)

```
+-----------------------------------------------------------+
|          GitHub Repository (Source of Truth)              |
|   02-AI-ASSETS/ (skills, agents, rules, instructions)     |
|   05-PROMPT-LIBRARY/ (system-workflows)                   |
+-----------------------------------------------------------+
                             |
                   [ONE-WAY ADAPTER LAYER]
                             |
         +-------------------+-------------------+
         |                   |                   |
         v                   v                   v
   Antigravity             Claude          Cursor / Windsurf
(.gemini/config)    (~/.claude.json,       (.cursorrules,
                     CLAUDE.md)             .windsurfrules)
```

---

## 2. Source of Truth Rules

1. **Exclusive Authority**: The GitHub repository `personal-ai-operating-system` is the **exclusive, immutable source of truth** for all AI assets, agent definitions, system workflows, and policies.
2. **Zero External Mutation**: Direct edits performed inside individual AI tools (e.g., modifying `.cursorrules` in a client project, or tweaking a prompt in Claude) are strictly local overrides and are **never** treated as canonical.
3. **Upstream Authoring**: Any asset creation, modification, or deprecation MUST originate inside `02-AI-ASSETS/` through governed commits and Semantic Version increments before being projected outwards.

---

## 3. One-Way Synchronization Model (Option A)

The operating system strictly implements **Option A: One-Way Synchronization Only**:

```
GitHub Source of Truth  ======>>  AI Tool Target Environments
```

### Strict Boundaries:
- **No Two-Way Sync**: The adapter never scans downstream tool directories to merge diffs back into Git.
- **No Automatic Ingestion**: Tools cannot autonomously register new skills or alter registries without an explicit OS migration workflow.
- **No Conflict Resolution Engine**: Because sync is unidirectional, conflicts are impossible. The canonical source always overwrites target deployments deterministically.
- **Deterministic Overwrite**: When an adapter deploys an asset, it mirrors the canonical state onto the target, replacing outdated or drifted configurations.

---

## 4. Asset Mapping Rules

Each adapter contains a declarative `mapping.json` that translates canonical assets into vendor-specific schemas:

| Canonical Asset Type | Source Location | Antigravity Target | Claude Target | Cursor Target | Windsurf Target |
|---|---|---|---|---|---|
| **Skills** | `02-AI-ASSETS/skills/{name}/` | `~/.gemini/config/skills/{name}/` | `.claude/skills/{name}.md` | `.cursor/context/skills/{name}.md` | `.windsurf/skills/{name}.md` |
| **Agents** | `02-AI-ASSETS/agents/{cat}/{name}/` | Subagent Definition / System Prompt | `.claude/agents/{name}.md` | Cursor Persona Context | Cascade Agent Context |
| **Rules** | `02-AI-ASSETS/rules/{name}.md` | `<RULE[user_global]>` tags | `CLAUDE.md` sections | `.cursor/rules/{name}.mdc` | `.windsurfrules` |
| **Instructions** | `02-AI-ASSETS/instructions/` | System Guidelines | `CLAUDE.md` | `.cursorrules` | `.windsurfrules` |
| **Workflows** | `05-PROMPT-LIBRARY/system-workflows/` | Custom slash commands | `.claude/commands/{name}.md` | Cursor Composer prompts | `.windsurf/workflows/{name}.md` |

---

## 5. Security & Isolation Restrictions

1. **Credential Screening**:
   - Adapters must execute regex token scanning (`\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b`) prior to projecting any file to external tools.
   - If a plaintext secret is detected, the deployment is aborted immediately.
2. **Authorized Write Paths Only**:
   - Adapters are prohibited from writing outside defined tool configuration directories.
   - Core operating system system folders (`C:\Windows`, `C:\Program Files`, root user profile directories) are strictly off-limits.
3. **Audit Trail**:
   - Every projection event must log the source commit SHA, timestamp, and target tool version.
