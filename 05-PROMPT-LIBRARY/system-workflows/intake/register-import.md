# System Workflow: Register Imported Asset in System Registries

## 1. Purpose
Officially register the imported project, skill, or asset into system-level registries, update inventory counts, and transition intake status to IMPORTED.

## 2. Inputs
`intakeId`: Processed intake identifier
`assetName`: Registered canonical name
`assetType`: Registered archetype (`project`, `skill`, `agent`, `rule`, `workflow`)
`destinationPath`: Canonical destination path within repository

## 3. Preconditions
1. Asset successfully placed in destination directory.
2. Validation and import steps completed without error.

## 4. Execution Steps
1. **Intake Registry Finalization**: Update `04-REGISTRY/intake-registry.json` status to `IMPORTED`, logging destination path and timestamp.
2. **Asset Registry Sync**: If asset is a Skill, Agent, Rule, or Workflow, append entry to `04-REGISTRY/assets-registry.json` and increment `totalActiveAssets`.
3. **Knowledge Registry Sync**: If asset is a Project or Knowledge dossier, register entry in `04-REGISTRY/knowledge-registry.json`.
4. **Receipt Generation**: Output finalized intake and registration receipt.

## 5. Validation Checks
- Status in `intake-registry.json` updated to `IMPORTED`.
- Machine-readable registries remain 100% valid JSON matching standard schemas.
- Zero drift between registry entries and filesystem paths.

## 6. Approval Requirements
- `AUTO_APPROVED`: Final registry update executes autonomously following approved import.

## 7. Outputs
- Finalized record in `04-REGISTRY/intake-registry.json`.
- Synchronized entry in `04-REGISTRY/assets-registry.json` or `knowledge-registry.json`.
- Official intake registration receipt.
