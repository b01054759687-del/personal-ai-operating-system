# Personal AI Operating System (PAI-OS)
## Enterprise AI Asset Release Governance Standard
### Version 1.0.0

---

## 1. Scope & Objective

The **Release Management Layer** (`08-RELEASES/`) establishes an enterprise-grade release and publishing lifecycle for all AI assets (Skills, Agents, Rules, Workflows, Adapters, and Knowledge Dossiers) within the Personal AI Operating System.

All releases are governed under the core principle:
**GitHub is the single Source of Truth, and deployment to downstream tools is strictly one-way and immutable.**

---

## 2. Release Lifecycle

Every release transitions through 5 formal stages:

```
+-----------+      +-----------+      +-----------+      +-----------+      +-------------+
|  1. DRAFT | ===> | 2. REVIEW | ===> | 3. STAGED | ===> | 4. ACTIVE | ===> | 5. ARCHIVED |
+-----------+      +-----------+      +-----------+      +-----------+      +-------------+
```

1. **DRAFT**:
   - Changes are authored in canonical folders (`02-AI-ASSETS/`, `05-PROMPT-LIBRARY/`, `07-KNOWLEDGE/`).
   - Manifest draft compiled under `08-RELEASES/manifests/`.
2. **REVIEW**:
   - Automated linting, JSON schema validation, and secret detection.
   - Compatibility verified against `08-RELEASES/compatibility/compatibility-matrix.json`.
3. **STAGED**:
   - Pre-release snapshot archived in `10-ARCHIVE/releases/`.
   - Release notes drafted in `08-RELEASES/release-notes/`.
4. **ACTIVE (PUBLISHED)**:
   - Canonical git commit pushed to `origin main`.
   - `04-REGISTRY/release-registry.json` updated with status `PUBLISHED`.
   - One-way adapters triggered to project updates to configured AI tools.
5. **ARCHIVED (SUPERSEDED)**:
   - When a major version supersedes a release, prior manifests are frozen.
   - Assets adhere to Constitution Rule 1 (Zero Deletion Rule; archive instead).

---

## 3. Human Approval Gates

| Release Class | Trigger Condition | Required Gate | Approval Mechanism |
|---|---|:---:|---|
| **PATCH** | Bug fixes, typos, prompt phrasing clarifications | `AUTO_APPROVED_GATED` | Passes automated pre-flight checks (clean git, 0 secrets). |
| **MINOR** | New skills, added agent capabilities, new ADRs | `HUMAN_APPROVAL_RECOMMENDED` | Review of release notes and manifest summary. |
| **MAJOR** | Breaking schema changes, directory re-architecture | `HUMAN_APPROVAL_MANDATORY` | Explicit user confirmation + Architecture Decision Record (ADR). |
| **ROLLBACK** | Production defect, drift, or compatibility failure | `HUMAN_APPROVAL_MANDATORY` | Reversion authorization from user. |

---

## 4. Semantic Versioning Rules (SemVer 2.0.0)

All releases and canonical assets must strictly adhere to Semantic Versioning (`MAJOR.MINOR.PATCH`):
- **MAJOR (`X.0.0`)**: Incompatible changes in registry schemas, constitutional rule updates, or breaking prompt interface refactors.
- **MINOR (`0.X.0`)**: Backwards-compatible additions (e.g., adding a new tool adapter, new skill, or new knowledge category).
- **PATCH (`0.0.X`)**: Backwards-compatible bug fixes, typo corrections, or documentation touch-ups.

---

## 5. Rollback Process

In the event of runtime regression, adapter failure, or security defect:
1. **Immediate Execution Freeze**: Halt downstream adapter sync jobs.
2. **Snapshot Invocation**: Read the pre-release manifest and restore files from `10-ARCHIVE/releases/`.
3. **Registry Reconciliation**: Update `04-REGISTRY/release-registry.json` marking the failed release as `ROLLED_BACK`.
4. **Post-Rollback Audit**: Re-run validation test suites to verify system integrity.
5. **Incident Recording**: Document root cause in `07-KNOWLEDGE/learning/` for future prevention.

---

## 6. Publishing Principles

1. **Unidirectional Deployment**:
   - Publishing flows exclusively from GitHub to AI tools (`03-ADAPTERS/`).
   - Consumer AI tools (Antigravity, Claude, Cursor, Windsurf) can never deploy back into PAI-OS.
2. **Zero-Secret Guarantee**:
   - Plaintext credentials (`ghp_*`, `sk-*`, bearer tokens) are strictly prohibited from release bundles.
3. **Cryptographic Traceability**:
   - Every release manifest records the exact Git commit SHA and SHA-256 digests of all bundled assets.
