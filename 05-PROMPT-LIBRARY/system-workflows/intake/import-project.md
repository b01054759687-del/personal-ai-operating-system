# System Workflow: Import Project into Knowledge Layer

## 1. Purpose
Safely ingest an approved project into the PAI-OS Knowledge Layer (07-KNOWLEDGE/projects/), establishing structured context, objectives, files index, decisions, and references.

## 2. Inputs
`intakeId`: Approved intake identifier
`projectName`: Canonical name of project
`projectContext`: Core background, domain, and architecture context

## 3. Preconditions
1. Item status in `04-REGISTRY/intake-registry.json` is `APPROVED`.
2. Human approval gate has been formally confirmed.
3. Target project directory does not collide with active projects.

## 4. Execution Steps
1. **Directory Provisioning**: Create directory `07-KNOWLEDGE/projects/<projectName>/`.
2. **Dossier Generation**: Author the 5 mandatory project documentation dossiers:
   - `PROJECT-CONTEXT.md`: Business context, domain, tech stack, and scope.
   - `OBJECTIVES.md`: Key milestones, deliverables, and success metrics.
   - `FILES-INDEX.md`: Inventory of codebase files, modules, and repositories.
   - `DECISIONS.md`: Architectural Decision Records (ADRs) and rationale.
   - `REFERENCES.md`: External docs, links, and environment variables.
3. **Processed Archive**: Move intake package from `validation/` to `11-INTAKE/processed/<intakeId>/`.
4. **Manifest Ledger**: Write intake manifest to `11-INTAKE/manifests/<intakeId>-manifest.json`.

## 5. Validation Checks
- All 5 mandatory project files exist in `07-KNOWLEDGE/projects/<projectName>/`.
- Zero secrets present in generated documentation files.
- Intake package safely archived in `11-INTAKE/processed/<intakeId>/`.

## 6. Approval Requirements
- `HUMAN_APPROVAL_MANDATORY`: Ingestion into the knowledge layer requires human sign-off.

## 7. Outputs
- Structured project dossier in `07-KNOWLEDGE/projects/<projectName>/`.
- Intake manifest in `11-INTAKE/manifests/<intakeId>-manifest.json`.
- Archived package in `11-INTAKE/processed/<intakeId>/`.
