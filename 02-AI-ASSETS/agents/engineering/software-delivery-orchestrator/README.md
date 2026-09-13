# DevPilot — Software Delivery Orchestrator Agent (`software-delivery-orchestrator`)

> **Display Name:** DevPilot (aliases: `dev-pilot`, `software-delivery-orchestrator-agent`)
> **Role:** Official Software Engineering & Delivery Governance Agent
> **Version:** 1.0.1
> **Status:** ACTIVE
> **Category:** Engineering
> **Managed By:** `ai-workspace-manager`
> **Main Skill:** `ai-workspace-delivery-governor`
> **Portability:** Antigravity, Claude Code, Cursor, Windsurf

---

## 1. Overview
**DevPilot** (canonical technical ID `software-delivery-orchestrator`) governs the end-to-end software delivery lifecycle across projects within the Personal AI Operating System. It ensures that AI-assisted code generation satisfies rigorous software engineering standards, evidence-based testing, source-control safety, and defensive human approval gates.

`DevPilot`, `dev-pilot`, and `software-delivery-orchestrator-agent` all resolve to this single canonical package. No separate agent exists under any of those names.

---

## 2. Adaptive Execution Modes
- **Quick Mode**: For simple one-file fixes and minor refactors. Lightweight, non-intrusive.
- **Standard Mode**: For multi-file features and internal architectural changes. Enforces branching, testing, and double-builds.
- **Controlled Release Mode**: For production-facing changes, migrations, cloud infrastructure, and external integrations. Enforces full 14 layers and approval gates (Gates A through E).

---

## 3. Directory Structure
```text
02-AI-ASSETS/agents/engineering/software-delivery-orchestrator/
├── AGENT.md                 # Core agent prompt and instructions
├── README.md                # Architectural documentation
├── metadata.json            # Machine-readable manifest (PAI-OS schema v2.0.0)
├── CHANGELOG.md             # Version history
├── workflows/               # Operational capability workflows
│   ├── adaptive-execution.md
│   ├── code-review-governance.md
│   ├── implementation-governance.md
│   ├── release-deployment-governance.md
│   ├── research-architecture-review.md        # research + architecture review (delegates to verify-claims-and-plans)
│   └── uiux-browser-qa-governance.md           # UI/UX governance + real browser QA (delegates to generative-ui)
├── policies/                # Governing security and safety policies
└── tests/                   # Package validation tests
```

---

## 4. Capability Audit
See `AGENT.md` Section 1.1 for the full DIRECT/DELEGATED/PARTIAL/MISSING capability matrix. All declared capabilities in `metadata.json` map one-to-one to a workflow file in `workflows/`; delegated capabilities are declared explicitly in `metadata.json.delegatedCapabilities`.

---

## 5. Managing Agent
This agent is managed by `ai-workspace-manager` (`02-AI-ASSETS/agents/system/ai-workspace-manager/`), which governs its registry entries (`04-REGISTRY/agents-registry.json`, `04-REGISTRY/assets-registry.json`, `04-REGISTRY/dependency-registry.json`), lifecycle transitions, and downstream adapter publishing. This agent does not publish itself into downstream tool directories.

---

## 6. Cross-Project Decoupling
This agent contains **zero client-specific or company-proprietary IDs, credentials, or links**. All repository-specific configurations (build commands, deployment targets, test suites) are loaded dynamically from project adapters or repository instructions.
