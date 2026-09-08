# Claude Code & Desktop Adapter Sync Rules

## 1. Architectural Principles
- **Sync Model**: Strictly **ONE-WAY (Source to Target)**:
  `GitHub Source of Truth ➔ Claude Environment`.
- **Target Environments**:
  - Global Configuration: `C:\Users\l\.claude.json`
  - Workspace Commands: `.claude/commands/`
  - Workspace Instructions: `CLAUDE.md`
- **No Automatic Imports / No Two-Way Sync**:
  - Changes or memory saved inside `CLAUDE.md` in individual projects do not automatically mutate the canonical repository.
  - New guidelines must be authored first in `02-AI-ASSETS/instructions/` and then deployed outward.

## 2. Asset Translation Specifications

### Skills (`skills/`)
- **Source**: `02-AI-ASSETS/skills/{name}/SKILL.md`
- **Target**: `.claude/skills/{name}.md`
- **Rule**: Retains operational instructions and tool usage guidelines.

### Agents (`agents/`)
- **Source**: `02-AI-ASSETS/agents/{category}/{name}/AGENT.md`
- **Target**: `.claude/agents/{name}.md`
- **Rule**: Translates system prompts and agent identities for task delegation.

### Commands (`commands/`)
- **Source**: `05-PROMPT-LIBRARY/system-workflows/{workflow}.md`
- **Target**: `.claude/commands/{workflow}.md`
- **Rule**: Enables executing system workflows via `/command` shortcuts in Claude Code CLI.

### Instructions (`instructions/`)
- **Source**: `02-AI-ASSETS/instructions/*.md`
- **Target**: Workspace `CLAUDE.md`
- **Rule**: Merges canonical behavioral instructions, dialect rules (Egyptian Arabic), and formatting guidelines.

## 3. Security & Integrity Rules
- Ensure zero tokens or credentials exist in exported `.claude/` artifacts.
- Target files are overwritten deterministically on synchronization.
