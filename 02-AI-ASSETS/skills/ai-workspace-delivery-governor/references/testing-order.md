# Testing Order Specification — AI Workspace Delivery Governor

## 1. Overview & Operating Principle

Testing within the AI Workspace Delivery Governor framework must execute in a strictly defined, ascending sequence across 20 distinct verification stages.

> [!CAUTION]
> **Prohibited Testing Practices**:
> 1. Never call a regular expression check or syntax pass a functional test.
> 2. Never treat mock data, simulated responses, or MSW interceptions as live integration verification.
> 3. Never quote test runner execution duration (e.g., "Jest ran in 140ms") as application load-time or runtime performance.
> 4. Never report "100% tested" or "fully tested" when downstream stages remain Blocked or Not Run.

---

## 2. Test Classification Taxonomy

Every test result must be classified into one of the following 4 canonical states:
- **Passed**: The test executed against real assertions and exited with code 0 / expected outputs.
- **Failed**: The test executed and triggered an assertion failure or unexpected exception.
- **Blocked**: The test could not execute because an upstream prerequisite stage or environment dependency is incomplete.
- **Not Run**: The test is defined for the target architecture but has not yet been triggered in the current execution cycle.

Furthermore, agents must explicitly distinguish the nature of each test:
- **Static Check**: Linting, type-checking, AST analysis, regex scans (non-runtime).
- **Unit Test**: Isolated function/component logic executing in memory with stubbed dependencies.
- **Simulation**: In-memory end-to-end flow with simulated network/database fixtures.
- **Browser Test**: Headless or headed DOM rendering testing real user interactions.
- **Integration Test**: Testing actual network requests against running sandbox or staging backend services.
- **Live Production Test**: Non-destructive synthetic transactions validating live production health.

---

## 3. Mandatory 20-Stage Testing Order

### Stage 01: Source Inspection
- **Type**: Static Check.
- **Focus**: Review raw source code, line counts, imports, formatting, and file locations.
- **Tools**: `git diff`, tree inspection, source code review.

### Stage 02: Syntax and Static Checks
- **Type**: Static Check.
- **Focus**: Language syntax, AST parsing, linting, strict type-checking.
- **Tools**: `tsc --noEmit`, `eslint`, `ruff`, compiler dry-runs.

### Stage 03: Unit Tests
- **Type**: Unit Test.
- **Focus**: Individual isolated functions, algorithmic correctness, edge cases.
- **Tools**: `vitest`, `jest`, `pytest`, `go test`.

### Stage 04: Contract and Schema Tests
- **Type**: Unit / Contract Test.
- **Focus**: API contract validation, JSON Schema, Zod models, OpenAPI specs, database migration definitions.
- **Tools**: Schema validators, contract test runners.

### Stage 05: Integration Simulations
- **Type**: Simulation.
- **Focus**: Multi-component interaction with in-memory SQLite, MSW handlers, mock servers.
- **Rule**: Simulations verify wiring only; must never be claimed as live external integration.

### Stage 06: Build Verification
- **Type**: Build Test.
- **Focus**: First complete compilation of source into production bundle (`npm run build`).
- **Tools**: Webpack, Vite, Rollup, Next.js build.

### Stage 07: Deterministic Second Build
- **Type**: Build Test.
- **Focus**: Second identical build run immediately following Stage 06.
- **Exit Criteria**: Zero unintended file diff between consecutive builds (byte-for-byte / content hash match).

### Stage 08: Local Browser Functional Tests
- **Type**: Browser Test.
- **Focus**: Component rendering, local DOM state, button clicks, client-side routing.
- **Tools**: Playwright (local webserver), Cypress, Puppeteer.

### Stage 09: Responsive Tests
- **Type**: Browser Test.
- **Focus**: Visual layout stability across viewports: Mobile (375px), Tablet (768px), Desktop (1440px).
- **Tools**: Viewport emulators, screenshot comparison.

### Stage 10: Accessibility Checks
- **Type**: Browser / Static Check.
- **Focus**: WCAG 2.1 AA compliance, ARIA attributes, color contrast, keyboard navigability.
- **Tools**: Axe-core, Lighthouse a11y audit.

### Stage 11: Security Tests
- **Type**: Security Check.
- **Focus**: Secret scan regex (`ghp_*`, `sk-*`), dependency vulnerability audit (`npm audit`), sanitization checks.
- **Exit Criteria**: 0 hardcoded secrets, 0 critical unpatched CVEs.

### Stage 12: Isolated Live Integration Tests
- **Type**: Integration Test.
- **Focus**: Real HTTP requests against isolated sandbox APIs or ephemeral containerized backends.
- **Rule**: Real network packets must be sent and received.

### Stage 13: Authorised-User Tests
- **Type**: Integration / Browser Test.
- **Focus**: User flows executed with valid authentication tokens and authorized roles.
- **Focus**: Verification of expected read/write permissions.

### Stage 14: Unauthorised-User Tests
- **Type**: Integration / Security Test.
- **Focus**: Negative security testing: unauthenticated requests, expired tokens, tampered signatures, privilege escalation attempts.
- **Exit Criteria**: Explicit HTTP 401 Unauthorized or 403 Forbidden responses.

### Stage 15: Test-Deployment Smoke Tests
- **Type**: Live Smoke Test (Staging).
- **Focus**: High-level sanity check on remote staging or preview environment after Gate D approval.
- **Exit Criteria**: HTTP 200 on healthcheck endpoint, CSS/JS assets load cleanly.

### Stage 16: User Acceptance Testing (UAT)
- **Type**: Acceptance Verification.
- **Focus**: Human operator validation of business workflows against real acceptance criteria.
- **Exit Criteria**: Formal operator sign-off.

### Stage 17: Production-Readiness Review
- **Type**: Governance Audit.
- **Focus**: Pre-flight verification of Gate E dossier, rollback runbook, and environment variables.
- **Exit Criteria**: Gate E clearance granted.

### Stage 18: Production Deployment
- **Type**: Release Execution.
- **Focus**: Controlled rollout of the verified release bundle to live production infrastructure.
- **Exit Criteria**: Deployment pipeline finishes cleanly with exit code 0.

### Stage 19: Post-Deployment Smoke Tests
- **Type**: Live Production Test.
- **Focus**: Read-only synthetic transactions against live production endpoints.
- **Exit Criteria**: Production endpoints return 200 OK; error rate remains zero.

### Stage 20: Rollback Verification and Handover
- **Type**: Handover Verification.
- **Focus**: Confirmation that the active rollback commit is valid, release tags pushed, and handover documentation completed.
- **Exit Criteria**: Final handover dossier approved by human operator.
