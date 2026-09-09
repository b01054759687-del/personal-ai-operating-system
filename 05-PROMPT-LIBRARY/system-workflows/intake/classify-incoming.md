# System Workflow: Classify Incoming Asset

## 1. Purpose
Inspect staged items, determine their architectural archetype (Project, Skill, Agent, Rule, Workflow, or Knowledge dossier), and map their canonical destination path.

## 2. Inputs
`intakeId`: Target intake item identifier from `04-REGISTRY/intake-registry.json`
`overrideType`: Optional operator classification override

## 3. Preconditions
1. Candidate item exists in `11-INTAKE/staging/<intakeId>/`.
2. Item status in `04-REGISTRY/intake-registry.json` is `DISCOVERED`.

## 4. Execution Steps
1. **Descriptor Analysis**: Parse root files (`package.json`, `pyproject.toml`, `SKILL.md`, `AGENT.md`, markdown frontmatter).
2. **Archetype Determination**: Map structure to canonical PAI-OS categories: `project`, `skill`, `agent`, `rule`, `workflow`, or `knowledge`.
3. **Target Path Resolution**: Calculate target destination (`07-KNOWLEDGE/projects/`, `02-AI-ASSETS/`, `05-PROMPT-LIBRARY/`).
4. **Asset Normalization**: Enforce lowercase kebab-case naming convention and directory layout standards.
5. **Classification Dossier Generation**: Emit `classification-manifest.json` inside staged directory.
6. **Registry Update**: Update `04-REGISTRY/intake-registry.json` with resolved type and planned destination.

## 5. Validation Checks
- Resolved asset type matches one of the canonical PAI-OS archetypes.
- Target destination resolves within approved directory boundaries.
- Normalized naming conforms to kebab-case pattern.

## 6. Approval Requirements
- `AUTO_APPROVED_GATED`: Classification analysis runs autonomously.

## 7. Outputs
- `classification-manifest.json` in staging directory.
- Updated item record in `04-REGISTRY/intake-registry.json` with type and target path.
