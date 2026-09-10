# Reporting Standard — AI Workspace Delivery Governor

## 1. Overview & Operating Principle

Reports produced under the Delivery Governor framework must be strictly objective, factual, and free of unsubstantiated claims, speculative optimism, or marketing fluff. The purpose of every report is to provide the human operator with unambiguous, verifiable evidence to make informed engineering and release decisions.

---

## 2. Mandatory Stage Report Schema

Every stage transition or task completion report must contain the following 14 structured fields:

1. **Stage & Execution Mode**: The current delivery layer (e.g., `Layer 05: Local Implementation`) and the active execution mode (`Quick Mode`, `Standard Mode`, or `Controlled Release Mode`) with mode selection rationale.
2. **Status**: `In Progress`, `Completed`, `Blocked`, or `Halted at Approval Gate`.
3. **Evidence Inspected**: Specific files, CLI outputs, diffs, or commits examined (e.g., `git status`, `package.json`, `src/index.ts`).
4. **Files Changed**: Exact paths of all modified, created, or deleted files with line counts (+ / -).
5. **Tests Performed**: Specific test commands executed (e.g., `npm test -- -t auth`, `tsc --noEmit`).
6. **Test Results Breakdown**:
   - **Passed**: Count and list of passed assertions.
   - **Failed**: Count and stack traces of any failed tests.
   - **Blocked**: Count and prerequisite blockers.
   - **Not Run**: Count of downstream test stages deliberately deferred.
7. **Security Findings**: Summary of secret scanning, static vulnerability analysis, and permission verification.
8. **Assumptions**: Environmental or technical assumptions made during implementation.
9. **Known Limitations**: Explicit identification of edge cases, non-simulated load conditions, or unverified browsers.
10. **Rollback Point**: Exact commit hash, branch name, or backup snapshot URI to restore previous state if needed.
11. **External Actions Performed**: Any real external network calls, file creation, or infrastructure mutations executed.
12. **External Actions Not Performed**: Explicitly list potential external operations that were skipped or halted (e.g., "Did not push to remote origin; did not upload to cloud storage").
13. **Next Recommended Stage**: The immediate next delivery layer or testing stage recommended.
14. **Required Approvals**: State if any approval gate (Gate A through Gate E) is required before proceeding.

---

## 3. Cautious Factual Language Rules

Agents must adhere strictly to defensive, evidence-based phrasing. Hyperbole, absolute claims, and speculative marketing language are strictly prohibited.

### Banned Absolute Claims vs Required Cautious Wording

| ❌ Prohibited Absolutes | ✅ Required Cautious Factual Phrasing |
| :--- | :--- |
| "The application is 100% secure." / "Fully secure" | "No issue was found in the static security checks and secret scans performed." |
| "Completely protected against all vulnerabilities." | "Server-side authorization tests passed for the defined user roles; external penetration testing has not been performed." |
| "Guaranteed performance under load." | "Not measured under concurrent live traffic; local unit test execution was verified." |
| "There are no possible risks with this deployment." / "Zero possible risk" | "Low risk based on verified rollback commit, but temporary service disruption remains possible if environment variables mismatch." |
| "The code is fully tested." / "100% tested" | "Verified by unit and static tests covering the core module; browser UI workflows are currently Not Run." |
| "100% production ready" | "Local verification complete; staging and production readiness review remain pending." |
| "All external services are working perfectly." | "Requires live verification; mock responses succeeded in the local test environment." |
| "I am confident this fixes the problem." | "Unable to confirm resolution from supplied evidence alone until local functional test is executed." |
| Claiming remote upload without live execution | "Refused to claim remote upload or integration without live execution and response code verification." |

---

## 4. Example Compliant Stage Report

```markdown
# Stage Report: Layer 06 Build & Reproducibility Verification

1. **Stage & Execution Mode**: Layer 06: Build & Reproducibility | Mode: Standard Mode (multi-file component refactor).
2. **Status**: Completed cleanly. Ready for Layer 07 Testing.
3. **Evidence Inspected**: `src/auth/jwt.ts`, `package.json`, `tsconfig.json`.
4. **Files Changed**: `src/auth/jwt.ts` (+12 lines, -4 lines).
5. **Tests Performed**: `npm run build` executed twice consecutively.
6. **Test Results Breakdown**:
   - Passed: 2 build runs exited with code 0.
   - Failed: 0.
   - Blocked: 0.
   - Not Run: Stages 08-20 (pending testing layer).
7. **Security Findings**: Secret scan clean; no hardcoded secrets found in `jwt.ts`.
8. **Assumptions**: Assumed Node runtime on production is v20+ matching local environment.
9. **Known Limitations**: Token expiry behavior was verified by static type check, not live clock simulation.
10. **Rollback Point**: Commit `a1b2c3d` on branch `feat/jwt-auth`.
11. **External Actions Performed**: None. All operations were local.
12. **External Actions Not Performed**: Did not push branch to remote origin; did not deploy to test environment.
13. **Next Recommended Stage**: Stage 03 Unit Tests (`npm test`).
14. **Required Approvals**: None for local unit testing. Gate C will be required before remote push.
```
