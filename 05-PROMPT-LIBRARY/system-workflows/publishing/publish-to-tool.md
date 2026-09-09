# System Workflow: Publish AI Asset to Tool

## 1. Purpose
Execute the deterministic one-way projection of an approved AI asset to downstream consumer tool environments, transitioning the lifecycle state from `APPROVED` through `PUBLISHING` to `PUBLISHED`.

## 2. Inputs
- `publishingId`: Asset publishing identifier from `04-REGISTRY/publishing-registry.json`
- `targetTool`: Tool adapter identifier (`antigravity`, `claude`, `cursor`, `windsurf`)
- `approvalToken`: Cryptographic or human confirmation token

## 3. Preconditions
1. Asset status in `04-REGISTRY/publishing-registry.json` is `APPROVED`.
2. Explicit human approval gate has been confirmed.
3. Pre-sync backup verified in `10-ARCHIVE/`.
4. GitHub remote state is clean and up to date.

## 4. Execution Steps
1. **State Transition**: Set status to `PUBLISHING` in `04-REGISTRY/publishing-registry.json`.
2. **Adapter Execution**: Invoke the target adapter in `03-ADAPTERS/<targetTool>/`:
   - `antigravity`: Mirror directory to `~/.gemini/config/skills/<name>/`.
   - `claude`: Update `.claude/` or verify MCP read endpoints.
   - `cursor`: Project `.cursor/rules/<name>.mdc` and update `.cursorrules`.
   - `windsurf`: Project `.windsurf/workflows/` and update `.windsurfrules`.
3. **Integrity Audit**: Verify target file byte sizes and timestamps match source manifest.
4. **State Finalization**: Upon successful transfer, update status to `PUBLISHED`. If an error occurs, update status to `FAILED`.
5. **Receipt Emission**: Output deployment receipt recording timestamp, target path, and SHA-256 digest.

## 5. Validation Checks
- Target file exists on disk and is readable.
- SHA-256 digest of target matches canonical source.
- Zero two-way sync channels opened.
- Registry status updated to `PUBLISHED`.

## 6. Approval Requirements
- `HUMAN_APPROVAL_MANDATORY`: Publication to external tool runtimes strictly requires explicit human sign-off.

## 7. Outputs
- Deployed runtime asset in target AI tool environment.
- Status updated to `PUBLISHED` in `04-REGISTRY/publishing-registry.json`.
- Publication deployment receipt.
