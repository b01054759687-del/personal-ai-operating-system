# System Workflow: Unpublish AI Asset

## 1. Purpose
Safely retire, unpublish, or revoke an asset from downstream consumer tool environments following obsolescence, defect discovery, or deprecation, strictly preserving the canonical source in PAI-OS per the Zero Deletion Rule.

## 2. Inputs
- `publishingId`: Asset identifier to unpublish
- `targetTools`: Array of tool environments to remove asset from
- `unpublishReason`: Technical justification (`SUPERSEDED`, `DEFECT_DETECTED`, `SECURITY_ALERT`, `DEPRECATED`)

## 3. Preconditions
1. Asset exists in target consumer tool environments.
2. Unpublish authorization granted by human operator.
3. Backup snapshot of tool runtime state archived in `10-ARCHIVE/`.

## 4. Execution Steps
1. **Sync Pipeline Halt**: Immediately suspend automated adapter synchronization for this asset.
2. **Runtime Revocation**: Remove the deployed artifact from consumer tool paths (e.g. remove from `~/.gemini/config/skills/<name>/` or `.cursor/rules/<name>.mdc`).
3. **Tombstone Placement**: If required, replace target entrypoint with a deprecation notice pointing to the superseding asset.
4. **Source Preservation**: Confirm that canonical files in `02-AI-ASSETS/` are NOT deleted. Archive to `10-ARCHIVE/deprecated/` if fully retired.
5. **Registry Reconciliation**: Update `04-REGISTRY/publishing-registry.json` status to `ROLLED_BACK` (for defects) or `ARCHIVED` (for deprecation).
6. **Audit Trail Logging**: Record the unpublish event and reason in `07-KNOWLEDGE/learning/`.

## 5. Validation Checks
- Target tool runtime cleaned of deprecated files.
- Canonical Git repository untouched by deletion.
- `publishing-registry.json` accurately reflects revocation state.
- Zero broken dependencies in downstream agents.

## 6. Approval Requirements
- `HUMAN_APPROVAL_MANDATORY`: Unpublishing requires human operator confirmation.

## 7. Outputs
- Revocation receipt.
- Target tool directories cleaned.
- Status updated to `ROLLED_BACK` or `ARCHIVED` in `04-REGISTRY/publishing-registry.json`.
- Incident / deprecation log in `07-KNOWLEDGE/learning/`.
