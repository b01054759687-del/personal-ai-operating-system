# Codeium Windsurf IDE Adapter Sync Rules

## 1. Architectural Principles
- **Sync Model**: Strictly **ONE-WAY (Source to Target)**:
  `GitHub Source of Truth ➔ Windsurf Project Environment`.
- **Target Environments**:
  - Project Rules: `.windsurfrules` in workspace root.
  - Cascade Workflows: `.windsurf/workflows/*.md`.
  - Skill Context: `.windsurf/skills/*.md`.
- **No Ingestion / No Two-Way Sync**:
  - Local scratch edits in Windsurf do not sync backward to PAI-OS.
  - PAI-OS repository represents the authoritative definition.

## 2. Asset Translation Specifications

### Rules (`rules/`)
- **Source**: `02-AI-ASSETS/rules/{name}.md`
- **Target**: `.windsurfrules`
- **Rule**:
  - Aggregates operational guidelines, Egyptian Arabic communication standards, and evidence integrity rules.

### Workflows (`workflows/`)
- **Source**: `05-PROMPT-LIBRARY/system-workflows/{name}.md`
- **Target**: `.windsurf/workflows/{name}.md`
- **Rule**:
  - Converts PAI-OS structured workflows into Windsurf Cascade-compatible multi-step execution guides.

### AI Assets (`ai_assets/`)
- **Source**: `02-AI-ASSETS/skills/{name}/SKILL.md`
- **Target**: `.windsurf/skills/{name}.md`
- **Rule**:
  - Mirrors canonical skill instructions for quick lookup in Windsurf Cascade.

## 3. Operational Integrity
- Strict one-way synchronization overwrites local Windsurf configurations upon deployment.
- Zero credentials or internal system tokens allowed in exported files.
