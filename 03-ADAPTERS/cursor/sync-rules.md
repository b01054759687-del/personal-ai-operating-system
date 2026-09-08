# Cursor IDE Adapter Sync Rules

## 1. Architectural Principles
- **Sync Model**: Strictly **ONE-WAY (Source to Target)**:
  `GitHub Source of Truth ➔ Cursor Project Configuration`.
- **Target Environments**:
  - Legacy Rule File: `.cursorrules` in repository root.
  - Modern Rule Files: `.cursor/rules/*.mdc`.
  - Skill Context: `.cursor/context/skills/`.
- **No Ingestion / No Two-Way Sync**:
  - Local edits inside `.cursorrules` or `.cursor/rules/` are not ingested into PAI-OS.
  - PAI-OS canonical assets in `02-AI-ASSETS/` override local Cursor configs on deployment.

## 2. Asset Translation Specifications

### Rules (`rules/`)
- **Source**: `02-AI-ASSETS/rules/{name}.md`
- **Target**: `.cursor/rules/{name}.mdc`
- **Rule**:
  - Formats with YAML header containing `description`, `globs: "*"`, and `alwaysApply: true`.
  - Preserves Egyptian Arabic guidelines, Turbo Mode directives, and evidence integrity rules.

### Instructions (`instructions/`)
- **Source**: `02-AI-ASSETS/instructions/*.md`
- **Target**: `.cursorrules`
- **Rule**:
  - Concatenates system-wide rules into a unified prompt context.

### AI Assets (`ai_assets/`)
- **Source**: `02-AI-ASSETS/skills/{name}/SKILL.md`
- **Target**: `.cursor/context/skills/{name}.md`
- **Rule**:
  - Exports skills as reference context files so Cursor Agent can consult domain workflows.

## 3. Security & Safety
- Exclude internal OS files (e.g., `00-META/`, `04-REGISTRY/`) from direct Cursor export.
- Overwrite target files deterministically without prompting.
