# Testing Order Specification — AI Workspace Delivery Governor

## 1. Overview & Operating Principle

Testing in the Personal AI Operating System is **strictly sequential and evidence-based**. Agents must never leap ahead to downstream tests without completing and verifying upstream foundational tests.

> [!IMPORTANT]
> **Fundamental Testing Rules**:
> 1. Never claim a test passed unless it actually ran and returned a verified zero exit code or matching assertion.
> 2. Never treat a mock, regex check, or static analysis as a live functional test.
> 3. Never report mock data as a live integration verification.
> 4. Never use unit test-suite duration as application load-time or runtime performance.
> 5. Never invent improvement percentages or synthetic benchmarks.
> 6. Never claim production success before conducting live post-deployment verification.

---

## 2. Mandatory 18-Stage Testing Order

```
[01. Source Inspection] ➔ [02. Syntax/Static] ➔ [03. Unit Tests] ➔ [04. Schema/Contract]
         |
         v
[05. Integration Sims] ➔ [06. Build Verification] ➔ [07. Deterministic 2nd Build]
         |
         v
[08. Browser Functional] ➔ [09. Responsive & A11y] ➔ [10. Security & Permissions]
         |
         v
[11. Isolated Live Integration] ➔ [12. Auth & Unauth User Tests] ➔ [13. Test Deployment Smoke]
         |
         v
[14. User Acceptance Testing] ➔ [15. Prod Readiness Review] ➔ [16. Production Deployment]
         |
         v
[17. Post-Deploy Smoke Tests] ➔ [18. Handover & Recovery Verification]
```

### Stage 01: Source Inspection
- **Objective**: Direct visual and structural examination of changed source files.
- **Method**: View files on disk, check line boundaries, verify imports, and confirm absence of syntax anomalies or left-over scratch comments.

### Stage 02: Syntax and Static Validation
- **Objective**: Verify that code complies with language syntax rules and static type definitions.
- **Method**: Run linters and type-checkers (e.g., `tsc --noEmit`, `eslint`, `flake8`, `mypy`).

### Stage 03: Unit Tests
- **Objective**: Verify isolated pure functions, mathematical formulas, data parsers, and component logic.
- **Method**: Run unit test runners (e.g., `vitest`, `jest`, `pytest`, `cargo test`).

### Stage 04: Schema and Contract Tests
- **Objective**: Validate database schemas, API payload structures, serialization contracts, and data models.
- **Method**: Validate migrations, JSON schemas, Zod/Pydantic models against representative edge-case inputs.

### Stage 05: Integration Simulations
- **Objective**: Verify inter-module communications using local fixtures, controlled stubs, or in-memory databases.
- **Method**: Execute integration test suites simulating API routes, service calls, and state management.

### Stage 06: Build Verification
- **Objective**: Confirm that the code compiles, bundles, and tree-shakes into valid distributable artifacts without errors or warnings.
- **Method**: Execute official production build script (e.g., `npm run build`).

### Stage 07: Deterministic Second Build
- **Objective**: Guarantee reproducibility and eliminate non-deterministic build artifacts or timestamp drift.
- **Method**: Immediately trigger a second consecutive build and run `git status` or file diff to verify zero unstaged alterations.

### Stage 08: Local Browser Functional Tests
- **Objective**: Verify real DOM interactions, client routing, form submissions, and UI state changes in an actual browser environment.
- **Method**: Execute Playwright, Cypress, or interactive browser tools connected to a live local development server.
- *Strict Rule*: Static regex checks of HTML strings MUST NOT be claimed as browser functional tests.

### Stage 09: Responsive and Accessibility Checks
- **Objective**: Validate layout rendering across viewport breakpoints (mobile, tablet, desktop) and WCAG accessibility standards.
- **Method**: Inspect element contrast ratios, ARIA landmarks, keyboard tab navigation, and touch target sizes.

### Stage 10: Security and Permission Tests
- **Objective**: Verify server-side authorization gates, session timeouts, input sanitization, and secret screening.
- **Method**: Run automated secret scanners (`\b(ghp_|sk-)\b`), test invalid authorization tokens, and attempt unauthorized route access.

### Stage 11: Isolated Live Integration Tests
- **Objective**: Test live communication against real external sandbox APIs, test databases, or staging services.
- **Method**: Issue real network requests against isolated test environments using dedicated sandbox credentials.
- *Strict Rule*: Mocked HTTP responses MUST NOT be reported as live integration tests.

### Stage 12: Authorised and Unauthorised User Tests
- **Objective**: Confirm that authenticated roles have access to appropriate capabilities while unauthenticated or low-privilege actors are blocked.
- **Method**: Execute requests as unauthenticated user, standard user, and administrator; verify exact HTTP 401/403 responses.

### Stage 13: Test Deployment Smoke Tests
- **Objective**: Confirm that code uploaded to the staging or preview cloud environment boots and serves traffic cleanly.
- **Method**: Execute automated HTTP health-check queries against the staging preview URL.

### Stage 14: User Acceptance Testing (UAT)
- **Objective**: Provide human operator with staging links, test cases, and verification checkpoints for sign-off.
- **Method**: Await explicit user feedback confirming that business requirements are satisfied in the test deployment.

### Stage 15: Production Readiness Review
- **Objective**: Final audit of deployment plans, rollback procedures, database migration readiness, and emergency contacts.
- **Method**: Complete **Gate E (Production)** checklist and verify recovery rollback instructions.

### Stage 16: Production Deployment
- **Objective**: Push verified release commit to production environment following the approved deployment pipeline.
- **Method**: Execute production deployment script or automated CI/CD tag release.

### Stage 17: Post-Deployment Smoke Tests
- **Objective**: Immediate live sanity verification of the production environment.
- **Method**: Run non-destructive production health checks (ping endpoints, verify CDN cache headers, verify login page load).
- *Strict Rule*: Never claim production success until post-deployment smoke tests execute cleanly.

### Stage 18: Handover and Recovery Verification
- **Objective**: Document production deployment identifiers, verify rollback availability, and archive release manifest.
- **Method**: Record production commit SHA, release tag, deployment timestamp, and deliver operating instructions to user.

---

## 3. Test Reporting Schema

Every executed or evaluated test stage must be categorized into one of four mandatory statuses:

| Status | Definition |
| :--- | :--- |
| **`Passed`** | Test was actually executed, assertions succeeded, and exit code was 0. |
| **`Failed`** | Test was executed and returned errors, unhandled exceptions, or non-zero exit code. |
| **`Blocked`** | Test could not run due to an upstream dependency, failed build, or ungranted approval gate. |
| **`Not Run`** | Test is planned for a later stage or was deemed inapplicable with explicit documented rationale. |

### Mandatory Result Entry Fields
For every reported test, the report must record:
1. **Test Type**: Stage number and category (e.g., `Stage 03: Unit Test`).
2. **Exact Command / Action**: The verbatim command executed (e.g., `npm test -- --filter=auth`).
3. **Environment**: Where the test executed (`Node v20.10.0 on Windows x64`, `Local Browser`, `Staging Cloud`).
4. **Expected Result**: Specific assertion or status code expected.
5. **Actual Result**: Exact output snippet, assertion count, and exit code.
6. **Evidence**: File path to test log, test output summary, or screenshot.
7. **Limitation**: Any aspect of functionality that this specific test did *not* cover.

---

## 4. Prohibited Testing Practices (Zero-Tolerance Violations)

The agent must strictly avoid and immediately reject:
1. **Regex Substitution Fraud**: Claiming a page renders correctly because a regex matched a string in an HTML template without mounting it in a browser.
2. **Mock-as-Live Deception**: Claiming third-party API integration works when requests were intercepted by MSW, nock, or mock functions.
3. **Performance Fabrication**: Quoting the duration of a Jest unit test suite as proof that the web application loads in under 200ms.
4. **Synthetic Percentage Claims**: Stating "Performance improved by 35%" without before-and-after benchmark traces from real hardware.
5. **Premature Release Victory**: Claiming "Application successfully released to production" when deployment files were pushed but live smoke tests have not run.