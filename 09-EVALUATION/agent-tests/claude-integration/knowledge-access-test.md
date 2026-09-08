# Test Suite: Claude Integration — 03: Knowledge Access Test

## Test Identifier
`test-claude-03-knowledge-access`

## Objective
Verify that Claude Desktop can query structured memory across all 6 knowledge domains in `07-KNOWLEDGE/` and apply retrieved context to its responses.

## Scope & Knowledge Domains
- `personal-context/user-profile-and-principles.md` (Interior design sector, Egyptian Arabic dialect, RTL container rules).
- `decisions/ADR-001-ai-operating-system-architecture.md` (Core Git-backed architecture).
- `decisions/ADR-002-agent-governance-principles.md` (Lifecycle & permissions).
- `technical/github-source-of-truth.md` (Single source of truth).
- `technical/one-way-adapter-strategy.md` (Option A sync rules).
- `technical/security-principles.md` (Zero secret policy).

## Test Execution Steps
1. Retrieve `07-KNOWLEDGE/personal-context/user-profile-and-principles.md`.
2. Confirm user sector is identified as Interior Design & Finishing (NOT Real Estate).
3. Confirm Arabic dialect requirement is identified as Egyptian Arabic with `<div dir="rtl">` wrapper.
4. Retrieve ADR-001 and verify architectural rationale is understood.

## Expected Results
- Complete contextual grounding across all 6 domains.
- Zero reliance on external vector or embedding services.
- Status: **PASS**
