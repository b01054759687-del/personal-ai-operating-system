# System Workflow: Rollback AI Asset Release

## 1. Purpose
Safely and deterministically roll back a deployed release following a detected runtime failure, adapter divergence, or security violation, restoring the prior verified system state without data loss.

## 2. Inputs
- `failedReleaseId`: Identifier of the release to roll back
- `targetPriorReleaseId`: Identifier of the stable release to restore
- `rollbackReason`: Documented technical rationale for the rollback

## 3. Preconditions
1. Rollback authorization granted by human operator.
2. Prior release snapshot verified and accessible in `10-ARCHIVE/releases/`.
3. Working tree free of uncommitted scratch modifications.

## 4. Execution Steps
1. **Emergency Freeze**: Immediately halt all scheduled or active adapter synchronization jobs.
2. **Snapshot Hydration**: Retrieve the verified prior release bundle from `10-ARCHIVE/releases/<targetPriorReleaseId>/`.
3. **Canonical State Reversion**: Revert files in working tree to match the prior stable release commit.
4. **Adapter Re-projection**: Trigger one-way adapters to overwrite downstream tool configurations with restored stable assets.
5. **Registry Update**: Mark `failedReleaseId` status as `ROLLED_BACK` in `04-REGISTRY/release-registry.json`.
6. **Incident Logging**: Record rollback telemetry and root cause in `07-KNOWLEDGE/learning/`.

## 5. Validation Checks
- Restored files match prior SHA-256 manifest digests.
- Zero secrets in restored working tree.
- Downstream adapters synchronized with rolled-back state.
- `release-registry.json` accurately reflects `ROLLED_BACK` state.

## 6. Approval Requirements
- `HUMAN_APPROVAL_MANDATORY`: Rollbacks require emergency human authorization.

## 7. Outputs
- Restored canonical state on GitHub `origin main`.
- Downstream tools reverted to stable configuration.
- Registry record updated to `ROLLED_BACK`.
- Incident report logged in `07-KNOWLEDGE/learning/`.
