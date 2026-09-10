# Delivery Layers Model — AI Workspace Delivery Governor

## Overview

The **Delivery Layers Model** defines the sequential, 11-stage delivery framework (Layers 0 through 10) for AI-assisted software engineering. Every stage builds strictly on verified evidence from the previous stage. Agents must execute implementation within this structured framework and must never skip layers or cross into downstream layers without completing earlier validations.

```
+-------------------------------------------------------------------------------+
| Layer 0: Context & Decision Reconstruction                                    |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 1: Workspace & Tooling Inspection                                       |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 2: Repository & Source Control Safety                                   |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 3: Architecture & Data Integrity Mapping                                |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 4: Local Implementation (Source First)                                  |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 5: Build Verification & Deterministic Reproducibility                   |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 6: Verification & Ordered Testing (Stages 1-18)                         |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 7: Security, Input Validation & Permissions Review                      |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 8: Test Environment & Integration Validation                            |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 9: Release & Deployment Readiness (Approval Gate E)                     |
+-------------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------------+
| Layer 10: Post-Deployment Smoke Tests, Verification & Handover                |
+-------------------------------------------------------------------------------+
```

---

## Layer 0 — Context and Decision Reconstruction

### Objectives & Operating Protocol
Before generating or modifying any code, the agent must reconstruct the verified project reality and establish decision boundaries.

### Actions
1. **Read Current Request**: Parse the exact user prompt, objectives, constraints, and non-negotiables.
2. **Read Applicable Project Instructions**: Inspect repository guidelines, project-specific adapters, ADRs, and framework rules.
3. **Recover Prior Confirmed Decisions**: Review commit history, existing documentation, and prior session transcripts to identify locked technical choices.
4. **Separate Confirmed Facts from Assumptions**:
   - *Confirmed Requirement*: Explicitly requested or evidenced in code/spec.
   - *Existing Implementation*: Inspected and verified in current codebase.
   - *Proposed Improvement*: Agent suggestions requiring confirmation.
   - *Unknown*: Information missing from evidence.
   - *Blocked*: Dependency or approval boundary halting progress.
5. **Identify Unresolved Decisions**: Flag any open architectural questions that materially affect implementation before coding.

---

## Layer 1 — Workspace and Tooling

### Objectives & Operating Protocol
Audit available environment capabilities, tools, and configurations without making unauthorized mutations.

### Actions
1. **Inspect Available Capabilities**: Check available CLI tools, Node/Python runtimes, MCP servers, Skills, adapters, and registries.
2. **Reuse Existing Approved Capabilities First**: Prefer the smallest existing toolchain covering verified requirements over introducing new dependencies.
3. **Identify Missing Tools Without Installing Them**: Document missing CLI binaries or packages and report them; never run silent background package installations.
4. **Confirm Authentication State**: Check if git remotes or CLI sessions are authenticated without printing, logging, or exposing tokens, keys, or credentials.
5. **Gate Check**: Trigger **Gate A (Tooling)** if any new package, tool, or MCP installation is required.

---

## Layer 2 — Repository and Source Control

### Objectives & Operating Protocol
Protect user work, isolate modifications on dedicated branches, and establish rollback points before making changes.

### Actions
1. **Confirm Repository State**: Verify current repository path, remote URLs, active branch, and HEAD commit hash.
2. **Inspect Working-Tree State**: Run `git status` to detect untracked or modified files.
3. **Preserve User Files and Dirty Working Trees**: Never reset (`git reset --hard`), clean (`git clean -fd`), overwrite, or discard uncommitted user changes. If unrelated changes exist, halt and report them.
4. **Fetch Safely**: If remote tracking is configured and authentication exists, fetch remote state without force-pulling.
5. **Create Development Branch**: Branch off current HEAD using a descriptive prefix (e.g., `feat/<feature-name>` or `fix/<fix-name>`).
6. **Record Rollback Commit**: Log the starting commit SHA as the emergency rollback baseline.

---

## Layer 3 — Architecture and Data Integrity

### Objectives & Operating Protocol
Establish structural boundaries, data schemas, and lifecycle guarantees before writing implementation logic.

### Actions
1. **Map System Topology**: Identify frontend components, backend services, persistence layers, external APIs, and integration adapters.
2. **Distinguish Source from Generated Files**: Identify canonical source files versus build outputs (e.g., `dist/`, `build/`, compiled bundles, minified JS). Never manually edit generated bundles.
3. **Confirm Schemas and Data Models**: Review database migrations, JSON schemas, entity relationships, and field ownership.
4. **Define Concurrency and Integrity Rules**: Establish idempotency, transaction boundaries, uniqueness constraints, and error recovery policies.
5. **Protect Production Data**: Strictly verify that no production data, customer records, database dumps, or media assets are stored inside the Git repository.

---

## Layer 4 — Local Implementation

### Objectives & Operating Protocol
Execute code changes strictly aligned with confirmed requirements, updating canonical source first.

### Actions
1. **Implement Approved Scope Only**: Write only the minimum necessary code to fulfill confirmed requirements. Do not introduce unrequested features or unsolicited refactors.
2. **Preserve Separation of Concerns**: Maintain existing modularity, architectural layering, and naming conventions.
3. **Maintain Backwards Compatibility**: Ensure existing interfaces, schemas, and consumer integrations continue functioning unless breaking changes were explicitly approved.
4. **Update Source First**: Apply all modifications to authoritative source files.
5. **Prohibit Direct Edits to Build Artifacts**: Never touch bundled, transpiled, or auto-generated files directly.

---

## Layer 5 — Build and Reproducibility

### Objectives & Operating Protocol
Ensure the build process is fully deterministic, repeatable, and generates clean artifacts.

### Actions
1. **Run Approved Build**: Execute the official project build command (e.g., `npm run build`, `pnpm build`, `cargo build`).
2. **Rebuild a Second Time**: Trigger an immediate consecutive rebuild under identical conditions.
3. **Confirm Zero Unintended Second-Build Diff**: Verify that re-running the build produces no unexpected file diffs, timestamps, or unstaged mutations.
4. **Confirm Output Matches Source**: Verify that output assets accurately reflect the changes made in source files.
5. **Record Commands and Outputs**: Document exact build commands, tool versions, exit codes, and output bundle metrics.

---

## Layer 6 — Verification and Testing

### Objectives & Operating Protocol
Execute ordered testing following the strict 18-stage testing sequence.

### Actions
1. **Follow Testing Order**: Strictly adhere to `references/testing-order.md`.
2. **No Layer Skipping**: Do not jump to integration or browser tests without first passing static analysis and unit tests.
3. **Document Deviations**: If a testing stage is inapplicable (e.g., project has no frontend), mark it explicitly as `Not Run` with clear technical rationale.
4. **Evidence-Based Reporting**: Log command line inputs, outputs, exit codes, and timestamps for every executed test.

---

## Layer 7 — Security and Permissions

### Objectives & Operating Protocol
Conduct defensive security audits across access controls, input boundaries, and credential safeguards.

### Actions
1. **Validate Server-Side Authorization**: Ensure permission checks execute on server/backend runtimes, not solely on client UI guards.
2. **Enforce Least Privilege**: Verify that API scopes, database roles, and process tokens have the minimum access required.
3. **Inspect Secrets and Logging**: Scan all changed files for hardcoded API keys, tokens, passwords, or PII. Verify that sensitive data is masked in application logs.
4. **Validate External Inputs**: Ensure sanitization, type enforcement, and boundary checks exist for all query params, request bodies, and external webhooks.
5. **Review Destructive Operations**: Inspect deletion endpoints, bulk updates, and table migrations for safeguards against accidental data loss.
6. **Confirm Administrative Controls**: Restrict destructive and administrative capabilities to verified owner roles.

---

## Layer 8 — Test Environment

### Objectives & Operating Protocol
Validate application behavior in isolated staging/test environments without risking production assets.

### Actions
1. **Use Isolated Test Resources**: Run tests against sandbox databases, test sheets, mock cloud buckets, or staging instances.
2. **Zero Production Contamination**: Never execute test scripts, seeders, or load tests against live production databases or real customer records.
3. **Validate Integration Behavior**: Test real network handshakes, identity providers, and third-party webhook payloads in the staging environment.
4. **Record Test Data & Cleanup Method**: Maintain an audit of created test records and verify that automated cleanup scripts restore the test environment.

---

## Layer 9 — Release and Deployment

### Objectives & Operating Protocol
Prepare the production deployment package and enforce human approval before publishing.

### Actions
1. **Present Deployment Plan**: Document target release version, target environment, affected infrastructure, and deployment steps.
2. **Present Affected Resources**: Explicitly enumerate cloud services, database tables, or config files subject to change.
3. **Present Rollback Method**: Detail the exact command or procedure to restore the previous stable production state within 5 minutes.
4. **Obtain Explicit Human Approval**: Trigger **Gate E (Production)**. Halt and await user sign-off.
5. **Deploy Approved Version Only**: Execute deployment of the verified Git commit SHA.
6. **Record Deployment Identifiers**: Log deployment IDs, release tags, and execution timestamps.

---

## Layer 10 — Post-Deployment Verification and Handover

### Objectives & Operating Protocol
Verify live production health, confirm critical operational paths, and deliver complete operational documentation.

### Actions
1. **Run Production Smoke Tests**: Execute non-destructive live checks verifying HTTP 200 responses, asset delivery, and basic database read connectivity.
2. **Confirm Access Control**: Verify that unauthenticated requests cannot access protected routes or administration panels.
3. **Confirm Critical Workflows**: Validate that primary business user flows function correctly end-to-end.
4. **Document Known Limitations**: Record any unresolved edge cases, deferred optimizations, or operational constraints.
5. **Provide Handover Instructions**: Deliver maintenance procedures, monitoring guidelines, and emergency rollback commands.
6. **Record Final Deployment Baseline**: Log final production commit SHA, release tag, and audit closure timestamp.