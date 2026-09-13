# Changelog — DevPilot (Software Delivery Orchestrator Agent)

All notable changes to the DevPilot / Software Delivery Orchestrator Agent framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-09-13

### Added
- Adopted **DevPilot** as the memorable `displayName` and invocation alias for the existing canonical `software-delivery-orchestrator` agent. No new agent package was created.
- Registered machine-readable `aliases`: `dev-pilot`, `software-delivery-orchestrator-agent`.
- Registered explicit `managed_by: ai-workspace-manager` relationship in `metadata.json`, mirrored in `04-REGISTRY/agents-registry.json`, `04-REGISTRY/assets-registry.json`, and `04-REGISTRY/dependency-registry.json`.
- Closed a genuine capability gap: added `workflows/research-architecture-review.md` (technical research + architecture/data-model review, delegating fact-checking to the existing `verify-claims-and-plans` skill).
- Closed a genuine capability gap: added `workflows/uiux-browser-qa-governance.md` (UI/UX design governance + real browser functional/responsive/accessibility testing, delegating interactive prototyping to the existing `generative-ui` skill).
- Declared `delegatedCapabilities` in `metadata.json` for research fact-checking, rich UI rendering, and GitHub permission recovery, routing to existing registered skills instead of duplicating them.
- Added `09-EVALUATION/agent-tests/software-delivery-orchestrator/validate-agent.mjs`, an executable Node.js validator enforcing 20 mandatory activation assertions (identity, alias integrity, registry synchronization, capability-to-workflow mapping, dependency resolution, version sync, and root `CLAUDE.md` presence).
- Added the durable Claude Code project entrypoint `CLAUDE.md` at the repository root.

### Changed
- Promoted lifecycle stage from `TESTING` to `ACTIVE` after all mandatory structure, schema, identity, capability, dependency, registry, security, and portability checks passed with no unresolved Critical or High finding.
- Reconciled a pre-existing inconsistency where `metadata.json.evaluation.status` read `pending_testing_completion` while the registry already read `passed`; both now read `passed` and are backed by the new validator script.

## [1.0.0] - 2026-09-10

### Added
- Initialized official Software Delivery Orchestrator Agent (`software-delivery-orchestrator`).
- Integrated main skill: `ai-workspace-delivery-governor`.
- Implemented 3 adaptive execution modes: Quick Mode, Standard Mode, and Controlled Release Mode.
- Established 4 operational capability workflows in `workflows/`.
- Codified 3 core governance policies in `policies/` (Approval Gates, Git Safety, Testing Order).
- Created local validation test suites in `tests/`.
- Registered agent in `04-REGISTRY/agents-registry.json` and `04-REGISTRY/assets-registry.json`.
- Configured cross-tool adapter projections for Antigravity, Claude Code, Cursor, and Windsurf.
