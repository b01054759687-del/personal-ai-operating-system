---
name: ai-workspace-delivery-governor
displayName: AI Workspace Delivery Orchestrator
description: Reusable cross-project software delivery governor managing the complete lifecycle of AI-assisted software delivery with layered implementation (Layers 01-14), strict 20-stage testing order, defensive approval gates (Gates A-E), three adaptive execution modes (Quick, Standard, Controlled Release), and source-control safety. Activates when building a real application, continuing a staged implementation, reviewing AI-generated code, reviewing claimed test results, preparing software for deployment, coordinating source, build and production states, or managing risky code or infrastructure changes. Do NOT activate for basic informational programming questions where Quick Mode is sufficient, simple isolated snippets, or pure brainstorming without an implementation lifecycle.
version: 1.0.0
status: testing
category: orchestration
portable: true
supported_adapters:
  - antigravity
  - claude
  - cursor
  - windsurf
---

# AI Workspace Delivery Governor

## 1. Objective & Architectural Scope

The **AI Workspace Delivery Governor** (`ai-workspace-delivery-governor`) is a reusable cross-project orchestration skill designed to govern the complete lifecycle of AI-assisted engineering across any codebase.

It eliminates premature release claims, accidental data loss, unverified test assertions, and unauthorized production mutations by establishing strict, evidence-based engineering boundaries.

> [!IMPORTANT]
> **Universal Cross-Project Portability**:
> This skill is completely decoupled from any single business domain or client company. It contains zero hardcoded organization IDs, email addresses, external URLs, database schemas, or proprietary business taxonomies. Project-specific parameters belong strictly in individual project adapters and instructions.

---

## 2. Activation Triggers

### When to Activate
Activate this skill whenever the task involves:
1. **Building a Real Application**: Writing, refactoring, or assembling software intended for execution, testing, or deployment.
2. **Continuing Staged Implementation**: Resuming a multi-stage feature or following up on architectural plans across multiple steps.
3. **Reviewing AI-Generated Code**: Performing code reviews or sanity audits on pull requests or AI-generated patches.
4. **Reviewing Claimed Test Results**: Auditing test claims to verify that assertions actually ran against real code rather than mocks or static analysis.
5. **Preparing Software for Deployment**: Bundling, compiling, staging, or preparing release artifacts.
6. **Coordinating Source, Build, and Production States**: Enforcing that canonical source is edited first and generated bundles are derived outputs.
7. **Managing Risky Code or Infrastructure Changes**: Executing database migrations, authentication alterations, or external resource provisioning.

### When NOT to Activate
Do NOT activate this skill for:
1. **Basic Informational Programming Questions**: Answering "How does array filtering work in TypeScript?" or simple conceptual inquiries where Quick Mode is sufficient.
2. **Isolated Code Snippets**: Writing a one-off math formula or regex pattern without application context.
3. **Text-Only Writing & Presentations**: Generating slide decks, marketing content, or blog articles.
4. **Pure Brainstorming**: Ideating on high-level business ideas without touching a repository or filesystem.

---

## 3. Three Adaptive Execution Modes

The Governor does not apply an over-engineered process to trivial fixes. The agent autonomously selects one of three operating modes and explicitly states its selection and rationale:

### 1. Quick Mode
- **Applicability**: Small isolated code corrections, explanations, minor refactoring, one-file low-risk changes, local changes with no external systems.
- **Expected Flow**: `Inspect → Change → Targeted Test → Report`
- **Layers Used**: Layer 01 (Context), Layer 02 (Tooling), Layer 05 (Implementation), Layer 07 (Targeted Test).

### 2. Standard Mode
- **Applicability**: Multi-file implementation, new features, database or API changes, build-system modifications, significant refactoring.
- **Expected Flow**: `Context → Plan → Branch → Implement → Test → Build → Review → Report`
- **Layers Used**: Layers 01-08 (Context through Security), with clean feature branching and double-build verification.

### 3. Controlled Release Mode
- **Applicability**: Production applications, authentication, customer data, cloud resources, external integrations, deployment, permissions, destructive or difficult-to-reverse actions.
- **Expected Flow**: `Audit → Decisions → Implementation → Hardening → Test Environment → Security → UAT → Deployment Approval → Production → Verification → Handover`
- **Layers Used**: All 14 delivery layers (Layers 01-14) with mandatory approval gates (Gate A through Gate E).

---

## 4. Non-Negotiable Core Principles

1. **Evidence Before Claims**: Never claim a test passed, a build succeeded, or a deployment completed without quoting verifiable command execution logs and exit codes.
2. **Real Code Inspection**: Inspect real files and existing code before proposing or applying changes.
3. **No Fabricated Test Results**: Never fabricate test metrics, test case counts, or coverage percentages.
4. **No Fabricated Performance Figures**: Never use unit test execution speed (e.g. "Jest finished in 120ms") to claim production runtime or load speed.
5. **No Confusion Between Mocks and Live Integrations**: Mocked responses (MSW, nock, stubs) verify interface wiring only, never live external service connectivity.
6. **No Confusion Between Local and Production**: Local execution never proves cloud deployment readiness without staging and smoke verification.
7. **No Destructive Git Operations**: Never run `git reset --hard`, `git clean -fd`, or overwrite uncommitted user modifications. Always protect dirty worktrees.
8. **No External Authentication Without Approval**: Halt at **Gate A** before initiating OAuth flows, setting up CLIs, or requesting long-lived developer tokens.
9. **No Production Writes Without Approval**: Halt at **Gate B** before running migrations, provisioning cloud storage, or writing to remote production databases.
10. **No Push, Merge, or Deployment Without Gate**: Halt at **Gate C** before pushing branches to remote, **Gate D** before test deployments, and **Gate E** before production rollout.
11. **Clear Rollback and Recovery Planning**: Every proposed mutation must declare a verified rollback point (git commit SHA, migration down script, snapshot).
12. **Preservation of Dirty Worktrees**: Quarantining and preserving unrelated user changes is mandatory before starting new work.
13. **Source Code as the Single Source of Truth**: Always modify source files (`src/`).
14. **Generated Bundles as Derived Output**: Never apply manual fixes directly to `dist/`, `build/`, or minified bundles. Rebuild cleanly from source.
15. **Project-Specific Decoupling**: All repository-specific URLs, IDs, schemas, and credentials reside in project adapters or project instructions, never hardcoded inside this reusable skill.

---

## 5. Architectural References

Detailed operational protocols are codified in the following companion documents:
- [Delivery Layers Model](file:///02-AI-ASSETS/skills/ai-workspace-delivery-governor/references/delivery-layers.md): The 14 sequential delivery layers from Context Reconstruction to Handover.
- [Testing Order Specification](file:///02-AI-ASSETS/skills/ai-workspace-delivery-governor/references/testing-order.md): The 20-stage testing order, classification taxonomy, and prohibited test practices.
- [Approval Gates Protocol](file:///02-AI-ASSETS/skills/ai-workspace-delivery-governor/references/approval-gates.md): Non-negotiable human approval gates (Gates A through E) and the 5-point dossier schema.
- [Reporting Standard](file:///02-AI-ASSETS/skills/ai-workspace-delivery-governor/references/reporting-standard.md): The 14-point stage report format and banned absolute claims.

---

## 6. Project Adapter Model

When operating inside a specific client or application repository, the Governor loads repository configuration from the project's local instructions or dedicated adapter:
- `repository`: Remote Git repository URL.
- `base_branch`: Main or staging branch name.
- `build_command`: Canonical build instruction (e.g., `npm run build`).
- `test_commands`: Specific test commands for unit, integration, and linting.
- `deployment_platform`: Hosting provider or runtime target (e.g., Cloud Run, Vercel, Apps Script).
- `resource_ids`: Target environment resource identifiers (passed dynamically).
- `environment_model`: Local vs Staging vs Production configuration.
- `data_schema`: Application database schema definitions.
- `approved_users`: Authorized operator usernames or roles.
- `release_policy`: Project-specific release governance.
- `rollback_procedure`: Application-specific rollback instructions.
