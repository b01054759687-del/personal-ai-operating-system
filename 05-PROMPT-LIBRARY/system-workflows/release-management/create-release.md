# System Workflow: Create AI Asset Release

## 1. Purpose
Assemble a candidate release bundle from canonical assets, calculate the appropriate Semantic Version increment, generate cryptographic asset hashes, and produce a staged release manifest and release notes.

## 2. Inputs
- `releaseType`: `MAJOR` | `MINOR` | `PATCH`
- `releaseTitle`: Human-readable title of the release
- `releaseSummary`: High-level summary of included changes
- `targetAssets`: List of canonical asset paths (`02-AI-ASSETS/`, `05-PROMPT-LIBRARY/`, `07-KNOWLEDGE/`)
- `author`: Initiating agent or user (`ai-workspace-manager`)

## 3. Preconditions
1. Working tree is clean with zero uncommitted git drift.
2. Target assets are in `ACTIVE` lifecycle stage and conform to the 4-file mandatory scaffold.
3. Pre-change backup snapshot has been archived in `10-ARCHIVE/`.
4. Git branch is `main` and synced with `origin/main`.

## 4. Execution Steps
1. **Asset Delta Analysis**: Compare candidate assets against the latest published release in `04-REGISTRY/release-registry.json`.
2. **SemVer Evaluation**: Enforce Semantic Versioning 2.0.0 (breaking changes = MAJOR, additions = MINOR, fixes = PATCH).
3. **Cryptographic Hashing**: Calculate SHA-256 digests for all bundled files.
4. **Manifest Assembly**: Draft release manifest under `08-RELEASES/manifests/` using `release-manifest-template.json`.
5. **Release Notes Drafting**: Draft markdown release notes under `08-RELEASES/release-notes/`.
6. **Registry Registration**: Add release record to `04-REGISTRY/release-registry.json` with status `STAGED`.

## 5. Validation Checks
- Manifest validates against JSON schema.
- All target files exist on disk and SHA-256 hashes match.
- Zero plaintext credentials detected across candidate assets.
- SemVer increment matches architectural impact.

## 6. Approval Requirements
- `PATCH`: Pre-flight automated linting pass (`AUTO_APPROVED_GATED`).
- `MINOR`: Architecture review recommendation.
- `MAJOR`: Explicit human approval gate required before staging.

## 7. Outputs
- Staged release manifest: `08-RELEASES/manifests/REL-<DATE>-<VERSION>-manifest.json`
- Draft release notes: `08-RELEASES/release-notes/<VERSION>.md`
- Staged registry record in `04-REGISTRY/release-registry.json`
