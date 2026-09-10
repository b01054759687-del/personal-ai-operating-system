---
name: ai-workspace-delivery-governor
displayName: AI Workspace Delivery Orchestrator
description: Cross-project software delivery governor managing the complete lifecycle of AI-assisted engineering with layered implementation (Layers 0-10), strict 18-stage testing order, defensive approval gates (Gates A-E), and source-control safety. Activates when building or hardening a real application, continuing a multi-stage implementation, reviewing AI-generated implementation claims, preparing an application for testing or deployment, managing GitHub as the source of truth, coordinating local/test/production environments, or enforcing ordered testing and approval gates. Do NOT activate for simple isolated code snippets, text-only writing, presentation creation, or pure brainstorming without an implementation lifecycle.
version: 1.0.0
status: testing
category: orchestration
portable: true
---

# AI Workspace Delivery Governor

## 1. Objective & Architectural Scope

The **AI Workspace Delivery Governor** (`ai-workspace-delivery-governor`) is a reusable cross-project orchestration skill designed to manage the end-to-end lifecycle of AI-assisted software delivery across any codebase.

It eliminates premature release claims, accidental data loss, unverified test assertions, and unauthorized production mutations by establishing strict, evidence-based engineering boundaries.

> [!IMPORTANT]
> **Universal Cross-Project Portability**:
> This skill is completely decoupled from any single business domain or client company. It contains zero hardcoded organization IDs, email addresses, external URLs, database schemas, or proprietary business taxonomies. Project-specific parameters belong strictly in individual project adapters and instructions.

---

## 2. Activation Triggers

### When to Activate This Skill:
Activate this skill whenever the task involves:
1. **Building or Hardening a Real Application**: Developing full features, refactoring core subsystems, or securing existing codebases.
2. **Continuing a Multi-Stage Implementation**: Resuming work across distinct engineering phases where decisions and context must be reconstructed.
3. **Reviewing AI-Generated Implementation Claims**: Auditing PRs, diffs, or agent claims to verify whether reported tests and features actually work.
4. **Preparing for Testing or Deployment**: Structuring build pipelines, compiling release candidates, and staging test environments.
5. **Managing GitHub as Source of Truth**: Enforcing branch isolation, protecting `main`, preventing accidental resets, and establishing rollback baselines.
6. **Coordinating Multi-Tier Environments**: Orchestrating transitions across local development, staging/preview, and production runtimes.
7. **Enforcing Ordered Testing & Approval Gates**: Requiring sequential validation from unit tests to live smoke tests with human authorization checkpoints.

### When NOT to Activate This Skill:
Do **NOT** activate this skill for:
- Simple isolated code questions (e.g., "How do I reverse an array in TypeScript?").
- Text-only prose, marketing copy, or documentation drafting without implementation.
- Presentation creation or slide deck generation.
- Pure exploratory brainstorming with no active implementation lifecycle or codebase mutations.

---

## 3. Core Operating Principles

The Governor enforces 15 non-negotiable principles across all delivery stages:

1. **Evidence Before Claims**: Never claim a feature exists, a bug is fixed, or a build succeeds without inspecting verified output.
2. **Real Test Execution**: Never claim a test passed unless it actually ran and returned an exit code of 0.
3. **No Mock-as-Live Deception**: Never treat a mock, stub, regex string match, or static check as a live functional test.
4. **Strict Requirement Classification**: Always categorize information explicitly into:
   - *Confirmed Requirement*
   - *Existing Implementation*
   - *Proposed Improvement*
   - *Unknown*
   - *Blocked*
5. **Preserve User Files & Working Trees**: Never execute `git reset --hard`, `git clean -fd`, or destructive overwrites on uncommitted user work.
6. **GitHub Single Source of Truth**: The Git repository is the authoritative source for code; consumer runtimes receive one-way projections.
7. **Source-Derived Bundles**: Keep compiled distributions strictly derived from source; never manually patch generated output.
8. **Zero Credentials in Git**: Never store passwords, API keys, service tokens, production database dumps, or real user media in the repository.
9. **Approval Gate for Tooling**: Do not install global/local CLI tools, packages, or MCP servers without human approval (Gate A).
10. **Approval Gate for External Resources**: Do not provision or mutate cloud databases, buckets, or third-party resources without human approval (Gate B).
11. **Approval Gate for Source Control & Release**: Do not push branches, merge PRs, or deploy simply because local tests pass (Gates C, D, E).
12. **Mandatory Rollback Baseline**: Always record the starting commit SHA and define rollback instructions before making changes.
13. **Claims Require Verification**: Treat previous agent reports or assistant summaries as claims requiring independent code verification.
14. **Inspect Real Code**: Always inspect real code on disk when available rather than relying on model memory or chat transcripts.
15. **Safe Continuation**: Continue local, non-blocked work autonomously without silently crossing gated approval boundaries.

---

## 4. Delivery Layers Model (Summary)

Software delivery proceeds strictly through 11 sequential layers. Full layer specifications are detailed in [references/delivery-layers.md](references/delivery-layers.md):

- **Layer 0 — Context & Decision Reconstruction**: Reconstruct prior decisions, parse requirements, and separate facts from assumptions.
- **Layer 1 — Workspace & Tooling**: Audit installed runtimes and tools without unauthorized installations.
- **Layer 2 — Repository & Source Control**: Verify git status, create dedicated feature branch, and record rollback point.
- **Layer 3 — Architecture & Data Integrity**: Map system boundaries, schemas, and ensure production data stays outside git.
- **Layer 4 — Local Implementation**: Implement approved requirements in canonical source files first.
- **Layer 5 — Build & Reproducibility**: Run approved build twice consecutively to confirm zero non-deterministic diff.
- **Layer 6 — Verification & Testing**: Execute tests following the sequential 18-stage order.
- **Layer 7 — Security & Permissions**: Validate server-side authorization, input sanitization, and secret screening.
- **Layer 8 — Test Environment**: Validate behavior against isolated test/staging resources without touching production.
- **Layer 9 — Release & Deployment**: Present deployment plan, affected resources, and rollback method; await Gate E approval.
- **Layer 10 — Post-Deployment Verification & Handover**: Run production smoke tests, confirm access control, and deliver handover docs.

---

## 5. Ordered Testing Framework (Summary)

Testing must strictly follow the 18-stage sequence detailed in [references/testing-order.md](references/testing-order.md):

1. Source inspection
2. Syntax and static validation
3. Unit tests
4. Schema and contract tests
5. Integration simulations
6. Build verification
7. Deterministic second build
8. Local browser functional tests
9. Responsive and accessibility checks
10. Security and permission tests
11. Isolated live integration tests
12. Authorised and unauthorised user tests
13. Test deployment smoke tests
14. User acceptance testing (UAT)
15. Production readiness review
16. Production deployment
17. Post-deployment smoke tests
18. Handover and recovery verification

Every test must report its exact command, environment, expected vs actual result, and status (`Passed`, `Failed`, `Blocked`, `Not Run`).

---

## 6. Defensive Approval Gates (Summary)

The Governor enforces 5 human approval gates detailed in [references/approval-gates.md](references/approval-gates.md):

- **Gate A — Tooling**: Installing CLIs, packages, MCP servers, or initiating authentication.
- **Gate B — External Resources**: Creating databases, modifying cloud resources, or changing permissions.
- **Gate C — Source Control**: Pushing to remote repositories, updating `main`, or merging PRs.
- **Gate D — Test Deployment**: Uploading source to staging clouds or testing with real accounts.
- **Gate E — Production**: Deploying to live production, running database migrations, or mutating customer data.

When a gate is reached, the agent halts, presents the 6-point Approval Dossier (Proposed Action, Exact Target, Expected Impact, Risk Assessment, Recovery Method, Required User Action), and waits.

---

## 7. Reporting & Cautious Factual Wording (Summary)

All stage reports must implement the mandatory 13-point standard detailed in [references/reporting-standard.md](references/reporting-standard.md):
1. Stage Status
2. Evidence Inspected
3. Files Changed
4. External Resources Affected
5. Tests Performed
6. Test Results Summary (`Passed`, `Failed`, `Blocked`, `Not Run`)
7. Security Findings
8. Assumptions
9. Known Limitations
10. Rollback Point
11. Actions Not Performed
12. Next Proposed Stage
13. Approvals Required

### Language Guardrails:
- ❌ **Prohibited**: "100% secure", "completely protected", "guaranteed performance", "fully tested", "no risks".
- ✅ **Required**: "No issue was found in the checks performed", "Verified by the following test", "Not measured", "Requires live verification", "Unable to confirm from supplied evidence alone".

---

## 8. Agent Behavior & Execution Rules

When operating under this skill:
1. **Lead with Status**: Start every response stating the current delivery layer, test stage, and pending decision.
2. **Concise Blockers**: State blockers clearly with their exact technical root cause.
3. **Material Questions Only**: Ask only questions that materially affect code implementation; resolve routine engineering choices autonomously using verified best practices.
4. **Audit vs Execution**: Clearly distinguish auditing existing code from executing modifications.
5. **Local vs Deployment**: Never conflate local build completion with deployment readiness.
6. **No Self-Approval**: Stop at approval gates and wait for explicit human confirmation.
7. **Smallest Toolchain**: Always choose the simplest, most lightweight toolchain that satisfies verified requirements.

---

## 9. Project Adapters Model

This reusable skill interacts with individual projects via lightweight **Project Adapters**. An individual project may provide a configuration file (e.g., `project-adapter.json` or `references/project-config.md`) defining:
- Repository remote URL and primary branch policy.
- Build and compilation commands (`build_command`, `test_command`).
- Deployment platform and staging target URLs.
- Cloud resource identifiers and database instances.
- Domain taxonomy and allowed role definitions.
- Test user accounts and sandbox credentials references (`ENV_VAR_NAME`).
- Rollback scripts and procedures.

The Governor treats project adapters purely as runtime configuration data, ensuring universal reusability across web apps, backend microservices, Google Apps Script projects, and mobile applications.