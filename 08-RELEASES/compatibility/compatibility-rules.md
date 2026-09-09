# AI Asset Compatibility & Publishing Rules
## Personal AI Operating System (PAI-OS)
### Version 1.0.0

---

## 1. Architectural Scope & Purpose

The **Compatibility & Publishing Decision Layer** guarantees that every canonical AI asset (Skill, Agent, Rule, Workflow, or Knowledge Dossier) released by PAI-OS can be safely projected, parsed, and executed across all supported consumer AI tools without runtime failures, schema incompatibilities, or security leaks.

---

## 2. Supported AI Tool Runtime Targets

| Tool Identifier | Minimum Supported Version | Primary Target Path | Integration Mechanism | Status |
|---|---|---|---|:---:|
| **`antigravity`** | `>= 2.12.0` | `~/.gemini/config/` | One-way direct filesystem mirror | **Active** |
| **`claude`** | `>= 2.1.0` | `~/.claude.json`, `.claude/` | GitHub MCP Server (Read-only) | **Active** |
| **`cursor`** | `>= 0.40.0` | `.cursorrules`, `.cursor/rules/*.mdc` | One-way rules & context projection | **Configured** |
| **`windsurf`** | `>= 1.0.0` | `.windsurfrules`, `.windsurf/workflows/` | One-way Cascade projection | **Configured** |

---

## 3. Asset Class Compatibility Standards

### 3.1 Skills (`02-AI-ASSETS/skills/`)
- **Mandatory 4-File Scaffold**: Must contain `SKILL.md`, `README.md`, `metadata.json`, and `CHANGELOG.md`.
- **Frontmatter Conformance**: `SKILL.md` must include YAML header with `name` and `description`.
- **Target Projection**:
  - `antigravity`: Full directory mirror preserving scripts and assets.
  - `claude`: Markdown skill guides in `.claude/skills/` or tool definitions.
  - `cursor` / `windsurf`: Contextual skill markdown for Composer/Cascade grounding.

### 3.2 Agents (`02-AI-ASSETS/agents/`)
- **Specification Conformance**: Must define `AGENT.md` with explicit identity, mission, and permissions.
- **Target Projection**:
  - `antigravity`: Native subagent definition and prompt.
  - `claude`: Subagent persona instructions in `.claude/agents/`.
  - `cursor` / `windsurf`: Persona prompt context.

### 3.3 Operational Rules (`02-AI-ASSETS/rules/`)
- **Dialect & RTL Standards**: Arabic content must use Egyptian Arabic dialect wrapped in `<div dir="rtl" style="text-align: right;">`.
- **Target Projection**:
  - `antigravity`: `<RULE[user_global]>` blocks.
  - `claude`: Compiled into `CLAUDE.md`.
  - `cursor`: MDC format with frontmatter (`alwaysApply: true`, `globs: "*"`).
  - `windsurf`: Compiled into `.windsurfrules`.

### 3.4 Workflows (`05-PROMPT-LIBRARY/system-workflows/`)
- **7-Section Requirement**: Purpose, Inputs, Preconditions, Execution Steps, Validation Checks, Approval Requirements, Outputs.
- **Target Projection**: Custom slash commands in Claude and Cascade multi-step procedures in Windsurf.

### 3.5 Knowledge & Memory (`07-KNOWLEDGE/`)
- **Option A Enforcement**: Structured Markdown only; vector DBs and cloud embedding storage prohibited.
- **Target Projection**: Read-only reference context across all 4 adapters.

---

## 4. Breaking Change & Compatibility Gates

A candidate release is designated **INCOMPATIBLE** if:
1. An asset removes or modifies mandatory frontmatter keys without a major version bump.
2. A tool adapter targets an unsupported schema version or missing entrypoint.
3. An asset introduces plaintext credentials or environment variables that cannot be resolved.
4. Downstream tool runtime version is below the minimum defined in `compatibility-matrix.json`.

---

## 5. Graceful Degradation Strategy

When an asset is partially compatible:
- **Core Rules**: Always deploy (plain text fallback).
- **Advanced Tools / Workflows**: If a consumer tool lacks support for interactive workflows, project as read-only documentation rather than failing the release.
