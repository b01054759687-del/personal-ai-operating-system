# System Workflow: Prepare AI Asset Publication

## 1. Purpose
Stage candidate AI assets for publication, verify prerequisite release manifest status, validate cross-tool compatibility against official standards, verify zero secrets, and transition publishing lifecycle state to `PREPARED`.

## 2. Inputs
- `releaseId`: Staged release identifier from `08-RELEASES/manifests/`
- `targetAssets`: List of canonical asset paths proposed for publishing
- `targetTools`: Array of target AI tools (`antigravity`, `claude`, `cursor`, `windsurf`)
- `operator`: Initiating agent (`ai-workspace-manager`)

## 3. Preconditions
1. Target assets are in `ACTIVE` lifecycle stage in `04-REGISTRY/assets-registry.json`.
2. Release bundle has passed compatibility checks (`08-RELEASES/compatibility/compatibility-matrix.json`).
3. Working tree is clean with zero uncommitted drift.
4. Pre-publishing backup snapshot has been archived in `10-ARCHIVE/`.

## 4. Execution Steps
1. **Manifest Inspection**: Read the approved release manifest from `08-RELEASES/manifests/`.
2. **Compatibility Clearance Check**: Confirm that all target tools report `FULLY_COMPATIBLE` or `COMPATIBLE`.
3. **Adapter Path Resolution**: Verify target projection paths for each selected adapter in `03-ADAPTERS/`.
4. **Pre-flight Secret Screening**: Execute regex scanner (`\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b`) across all candidate files.
5. **Staging Registration**: Create or update entry in `04-REGISTRY/publishing-registry.json` with status `PREPARED`.
6. **Emit Preparation Dossier**: Output deployment plan detailing target entrypoints and checksums.

## 5. Validation Checks
- 100% of target assets resolve to valid canonical files.
- Zero plaintext credentials detected.
- Target tool adapters are active and configured.
- State in `publishing-registry.json` set to `PREPARED`.

## 6. Approval Requirements
- `AUTO_APPROVED_GATED`: Preparation and staging execute autonomously; transitions to `APPROVED` require human sign-off.

## 7. Outputs
- Staged publishing plan.
- Entry registered with status `PREPARED` in `04-REGISTRY/publishing-registry.json`.
