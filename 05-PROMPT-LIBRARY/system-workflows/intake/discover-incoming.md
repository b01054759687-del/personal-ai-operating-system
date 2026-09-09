# System Workflow: Discover Incoming Assets & Projects

## 1. Purpose
Scan the incoming dropzone (11-INTAKE/incoming/) for external projects, skill bundles, or prompt packages, generate candidate identifiers, and stage them for classification with status DISCOVERED.

## 2. Inputs
`sourcePath`: Path to incoming asset directory (defaults to `11-INTAKE/incoming/`)
`operator`: Initiating agent (`ai-workspace-manager`)
`batchId`: Optional batch processing identifier

## 3. Preconditions
1. Working tree is clean with zero uncommitted drift.
2. Dropzone `11-INTAKE/incoming/` contains candidate directories or files.
3. Pre-change backup snapshot verified in `10-ARCHIVE/`.

## 4. Execution Steps
1. **Dropzone Inspection**: Enumerate all files and directories located in `11-INTAKE/incoming/`.
2. **Fingerprint Calculation**: Compute initial file count, total byte size, and root-level hash signatures.
3. **Intake ID Generation**: Allocate unique machine-readable identifier (`INTAKE-<YYYYMMDD>-<HEX8>`).
4. **Staging Migration**: Relocate candidate directory from `incoming/` to `11-INTAKE/staging/<intakeId>/`.
5. **Registry Staging**: Create new record in `04-REGISTRY/intake-registry.json` with status `DISCOVERED`.

## 5. Validation Checks
- Candidate files are readable with non-zero byte size.
- Unique intake identifier successfully generated without collision.
- Item registered in `intake-registry.json` with status `DISCOVERED`.

## 6. Approval Requirements
- `AUTO_APPROVED_GATED`: Discovery and staging execute autonomously; downstream production promotion remains gated.

## 7. Outputs
- Staged candidate directory in `11-INTAKE/staging/<intakeId>/`.
- Initial intake registration in `04-REGISTRY/intake-registry.json` with status `DISCOVERED`.
