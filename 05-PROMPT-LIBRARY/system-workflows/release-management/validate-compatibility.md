# System Workflow: Validate AI Asset Compatibility

## 1. Purpose
Evaluate candidate AI assets against the official cross-tool compatibility matrix (`08-RELEASES/compatibility/compatibility-matrix.json`) to confirm that all schemas, entrypoints, frontmatter conventions, and projection mechanisms function correctly across Antigravity, Claude, Cursor, and Windsurf prior to publishing.

## 2. Inputs
- `candidateAssets`: List of asset paths proposed for release
- `targetTools`: Array of target AI tools (`antigravity`, `claude`, `cursor`, `windsurf`)
- `compatibilityMatrixPath`: Path to matrix JSON (defaults to `08-RELEASES/compatibility/compatibility-matrix.json`)

## 3. Preconditions
1. Candidate assets exist in canonical locations (`02-AI-ASSETS/`, `05-PROMPT-LIBRARY/`, `07-KNOWLEDGE/`).
2. Candidate assets conform to structural standards (e.g., 4-file scaffold for skills, 7 sections for workflows).
3. `compatibility-matrix.json` validates against `compatibility-schema.json`.

## 4. Execution Steps
1. **Matrix Ingestion**: Load the compatibility matrix and target tool runtime version constraints.
2. **Schema & Frontmatter Audit**:
   - For skills: Validate YAML frontmatter (`name`, `description`) in `SKILL.md`.
   - For rules: Validate dialect guidelines and RTL wrapper `<div dir="rtl">`.
   - For workflows: Validate all 7 operational sections.
3. **Adapter Entrypoint Check**: Verify target projection paths exist in each tool adapter (`03-ADAPTERS/`).
4. **Credential & Secret Scan**: Execute regex secret screening (`\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b`).
5. **Compatibility Classification**:
   - Assign status: `FULLY_COMPATIBLE`, `COMPATIBLE`, `PARTIALLY_COMPATIBLE`, or `INCOMPATIBLE`.
6. **Decision Log Emission**: Record verification results in the release staging manifest.

## 5. Validation Checks
- 0 incompatible frontmatter violations.
- 100% resolution of target entrypoint paths across all configured adapters.
- 0 plaintext credentials detected.
- Compatibility score >= 100% for tier-1 tools (Antigravity, Claude).

## 6. Approval Requirements
- `AUTO_APPROVED_GATED`: Fully compatible assets automatically proceed to release staging.
- `HUMAN_APPROVAL_REQUIRED`: Any asset triggering `PARTIALLY_COMPATIBLE` or requiring degraded projection requires explicit architectural sign-off.

## 7. Outputs
- Compatibility verification report.
- Updated candidate release manifest with compatibility endorsement.
- Decision record logged for `04-REGISTRY/publishing-registry.json`.
