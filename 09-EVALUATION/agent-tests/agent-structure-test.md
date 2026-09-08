# Agent Evaluation Suite: Structure & Schema Test (gent-structure-test)

## Objective
Verify that an AI Agent package conforms to the mandatory structural and metadata standards of the Personal AI Operating System.

## Evaluation Criteria
1. **Mandatory File Presence**:
   - AGENT.md: Identity, mission, responsibilities, restrictions.
   - README.md: Usage guide, supported operations, approval rules.
   - metadata.json: Machine-readable metadata matching Agent schema v2.0.0.
   - CHANGELOG.md: Version lineage and modifications.
2. **Subdirectory Scaffolding**:
   - workflows/: Contain documented operation specs.
   - policies/: Contain security and governance rules.
   - 	ests/: Contain local validation suites.
3. **Kebab-Case Naming**: Agent directory and technical identifier must be lowercase kebab-case.

## Pass Standard
- 100% compliance across all mandatory files and directory schemas.
