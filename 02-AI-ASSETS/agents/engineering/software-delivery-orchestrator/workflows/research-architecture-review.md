# Workflow: Research & Architecture Review (`research-architecture-review`)

## Purpose
Ground implementation decisions in verified, authoritative information and review architectural/data-model impact before code is written, instead of relying on unverified assumptions or stale training knowledge.

## Inputs
- Requirement or feature description.
- Existing architecture documentation, schemas, and data models in the target repository.
- External authoritative sources (official docs, RFCs, changelogs) when current or version-specific information is required.

## Execution Steps
1. **Identify Knowledge Gaps**: Determine which parts of the requirement depend on current external facts (library versions, API contracts, pricing, security advisories) versus stable internal architecture knowledge.
2. **Delegate Fact-Checking**: When authoritative external verification is required, delegate to the `verify-claims-and-plans` skill rather than asserting unverified claims. Never present an unverified guess as a confirmed fact.
3. **Review Architecture & Data Model**: Inspect existing architecture documents, schemas, and module boundaries for the affected area. Identify breaking changes, migration needs, and cross-module impact before proposing an implementation plan.
4. **Reconcile Findings**: Merge verified research and architecture findings into the implementation plan handed to `workflows/implementation-governance.md`.

## Outputs
- A requirements/architecture brief that distinguishes verified facts from assumptions, with sources cited for anything time-sensitive or external.
- Identified architectural risks and data-model impacts to carry into implementation and testing.

## Delegation Rule
This workflow does not duplicate `verify-claims-and-plans`; it invokes it for fact-checking and folds the result back into delivery governance. If the skill is unavailable, state that research is `Not Run` rather than fabricating verification.
