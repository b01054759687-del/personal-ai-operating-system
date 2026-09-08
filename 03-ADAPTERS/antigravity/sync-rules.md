# Google Antigravity Adapter Sync Rules

## 1. Architectural Principles
- **Sync Model**: Strictly **ONE-WAY (Source to Target)**:
  `GitHub Source of Truth (02-AI-ASSETS/ & 05-PROMPT-LIBRARY/) ➔ Antigravity Environment`.
- **Target Environments**:
  - Global Configuration: `C:\Users\l\.gemini\config\`
  - Core / Custom Skills: `C:\Users\l\.gemini\config\skills\`
- **No Ingestion / No Two-Way Sync**:
  - Changes made directly in the Antigravity local config are never merged back automatically.
  - The Git repository remains the single immutable source of truth.

## 2. Asset Translation Specifications

### Skills (`skills/`)
- **Source**: `02-AI-ASSETS/skills/{skill-name}/`
- **Target**: `C:\Users\l\.gemini\config\skills\{skill-name}/`
- **Validation**:
  - Source must have `SKILL.md` with valid YAML frontmatter (`name`, `description`).
  - Target deployment mirrors folder structure exactly.
  - Any local file modified outside Git is overwritten upon sync.

### Agents (`agents/`)
- **Source**: `02-AI-ASSETS/agents/system/{agent-name}/AGENT.md`
- **Target**: Subagent prompts and persona configuration.
- **Validation**:
  - Identity, mission, and tool constraints are preserved.

### Rules (`rules/`)
- **Source**: `02-AI-ASSETS/rules/{rule-name}.md`
- **Target**: Antigravity global rules block.
- **Wrapping**:
  - Wrapped inside `<RULE[user_global]>` blocks.
  - Arabic text rules must maintain Egyptian Arabic dialect and `<div dir="rtl">` styling tags.

### Prompts & Workflows (`prompts/`)
- **Source**: `05-PROMPT-LIBRARY/system-workflows/{workflow-name}.md`
- **Target**: Custom slash commands and workflow scripts.

## 3. Operational Safeguards
1. **Pre-Sync Verification**: All canonical assets must pass schema validation before triggering a sync.
2. **Secret Screening**: Scan for `\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b` prior to copy.
3. **Immutability Guarantee**: This adapter only writes to authorized Antigravity target paths and never touches OS system directories.

### Knowledge & Memory (`knowledge/`)
- **Source**: `07-KNOWLEDGE/{category}/{name}.md`
- **Target**: `C:\Users\l\.gemini\config\knowledge\{category}\`
- **Access Rules**:
  - Antigravity queries `07-KNOWLEDGE/` directly via file view tools or via mirrored config path.
  - Read-only consumption: Antigravity cannot mutate source knowledge files directly during chat sessions.
  - Personal context (`personal-context/`) and decisions (`decisions/`) take precedence in query resolution.
