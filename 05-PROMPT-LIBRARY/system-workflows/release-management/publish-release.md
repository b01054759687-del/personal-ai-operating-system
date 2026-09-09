# System Workflow: Publish AI Asset Release

## 1. Purpose
Formally publish a validated release bundle by committing canonical state to GitHub (Single Source of Truth) and executing deterministic, one-way adapter projections to downstream AI consumer tools (Antigravity, Claude, Cursor, Windsurf).

## 2. Inputs
- `releaseId`: Release identifier with status `READY_TO_PUBLISH`
- `targetAdapters`: Array of tool adapters to project (`antigravity`, `claude`, `cursor`, `windsurf`)
- `approvalSignature`: Human approval confirmation token or flag

## 3. Preconditions
1. Release status is `READY_TO_PUBLISH` in `04-REGISTRY/release-registry.json`.
2. Explicit human approval gate has been satisfied.
3. Pre-release snapshot is archived in `10-ARCHIVE/releases/`.
4. GitHub remote connection is authenticated and reachable.

## 4. Execution Steps
1. **Verify Human Gate**: Confirm approval signature and check authorization policies.
2. **Snapshot Archival**: Archive a full snapshot of the release bundle to `10-ARCHIVE/releases/<releaseId>/`.
3. **Canonical Git Push**: Commit release artifacts and push to `origin main` on GitHub.
4. **Execute One-Way Projection**: Trigger tool adapters in `03-ADAPTERS/` to deploy assets to target environments.
5. **Registry Finalization**: Update `04-REGISTRY/release-registry.json` status to `PUBLISHED`.
6. **Publish Notification**: Emit release summary detailing commit hash and target adapter statuses.

## 5. Validation Checks
- Git push completes with exit code 0.
- Downstream adapter file timestamps updated.
- No reverse sync channels opened.
- `release-registry.json` reflects `PUBLISHED` status.

## 6. Approval Requirements
- `HUMAN_APPROVAL_MANDATORY`: Publishing can never trigger automatically without human authorization.

## 7. Outputs
- Git commit on `origin main`.
- Published release record in `04-REGISTRY/release-registry.json`.
- Projected assets in downstream tool runtimes.
- Immutable archive snapshot in `10-ARCHIVE/releases/`.
