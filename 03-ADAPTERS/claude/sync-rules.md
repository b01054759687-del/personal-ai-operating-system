# Claude Code & Desktop Adapter Sync Rules
## Version 1.1.0 — GitHub MCP & Structured Memory Integration

## 1. Architectural Principles
- **Sync Model**: Strictly **ONE-WAY (Source to Target)**:
  `GitHub Source of Truth ➔ GitHub MCP ➔ Claude Desktop Environment`.
- **Target Environments**:
  - Global Configuration: `C:\Users\l\.claude.json`
  - Claude Desktop Config: `%APPDATA%\Claude\claude_desktop_config.json`
  - Workspace Commands: `.claude/commands/`
  - Workspace Instructions: `CLAUDE.md`
- **Zero Reverse Mutation / No Two-Way Sync**:
  - Claude Desktop operates as a read-only consumer via GitHub MCP.
  - Ephemeral chat logs or local scratch files in Claude never write back into `personal-ai-operating-system`.
  - All asset modifications must be committed through the OS Git repository.

---

## 2. Asset Translation Specifications

### Skills (`skills/`)
- **Source**: `02-AI-ASSETS/skills/{name}/SKILL.md`
- **Target**: `.claude/skills/{name}.md` or GitHub MCP `get_file_contents`
- **Rule**: Retains operational instructions, triggers, and tool parameters.

### Agents (`agents/`)
- **Source**: `02-AI-ASSETS/agents/{category}/{name}/AGENT.md`
- **Target**: `.claude/agents/{name}.md`
- **Rule**: Translates system prompts, agent personas, and capability constraints.

### Rules (`rules/`)
- **Source**: `02-AI-ASSETS/rules/{name}.md`
- **Target**: `.claude/rules/{name}.md` and consolidated into `CLAUDE.md`
- **Rule**: Enforces Egyptian Arabic dialect, RTL formatting, and evidence integrity.

### Prompts & Commands (`prompts/`)
- **Source**: `05-PROMPT-LIBRARY/system-workflows/{workflow}.md`
- **Target**: `.claude/commands/{workflow}.md`
- **Rule**: Enables executing system workflows via custom commands.

### Registries (`registries/`)
- **Source**: `04-REGISTRY/*.json`
- **Target**: Read-only inspection via GitHub MCP
- **Rule**: Claude inspects `assets-registry.json`, `agents-registry.json`, `tools-registry.json`, and `knowledge-registry.json` for live state.

---

## 3. Knowledge Layer Access Specifications (`07-KNOWLEDGE/`)

Claude Desktop accesses the structured memory layer via GitHub MCP tool calls (`get_file_contents`):

| Knowledge Domain | Path | Access Method | Consumption Purpose |
|---|---|---|---|
| **Personal Context** | `07-KNOWLEDGE/personal-context/` | MCP Read | Grounds tone in Egyptian Arabic, interior design sector, and Turbo Mode |
| **Decisions (ADRs)** | `07-KNOWLEDGE/decisions/` | MCP Read | Informs architectural rationale and prevents regressions |
| **Projects** | `07-KNOWLEDGE/projects/` | MCP Read | Aligns execution with active milestones, OKRs, and roadmaps |
| **Technical** | `07-KNOWLEDGE/technical/` | MCP Read | Enforces GitHub single source of truth, one-way sync, and security |
| **Business** | `07-KNOWLEDGE/business/` | MCP Read | Informs CRM metrics, lead qualification standards, and CPM formulas |
| **Learning** | `07-KNOWLEDGE/learning/` | MCP Read | Informs behavioral corrections and historical lessons learned |

---

## 4. Security & Isolation Safeguards
- **Read-Only Enforced**: MCP server token scoped strictly to read permissions on `personal-ai-operating-system`.
- **Zero Credentials**: Use `${GITHUB_TOKEN}` environment variable exclusively; zero plaintext tokens allowed.
- **Pre-flight Regex Scan**: Reject files matching token regex `\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b`.
