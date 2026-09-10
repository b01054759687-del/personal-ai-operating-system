# Reporting Standard & Cautious Factual Language — AI Workspace Delivery Governor

## 1. Overview & Operating Principle

Reports produced under the Delivery Governor framework must be strictly objective, factual, and free of unsubstantiated claims or marketing fluff. The purpose of every report is to provide the human operator with unambiguous, verifiable evidence to make informed engineering and release decisions.

---

## 2. Mandatory 13-Point Stage Report Structure

Every delivery stage report must contain the following 13 sections in order:

### 1. Stage Status
- Current delivery layer (e.g., `Layer 4: Local Implementation`) and execution state (`In Progress`, `Completed`, `Blocked at Gate`).

### 2. Evidence Inspected
- Explicit list of files, git diffs, schemas, or specs physically viewed and verified before taking action.

### 3. Files Changed
- Complete list of repository files created, modified, or deleted with line counts or brief diff summaries.

### 4. External Resources Affected
- Enumerate any cloud resources, databases, external APIs, or remotes touched. If none, state explicitly: `None. All operations were local.`

### 5. Tests Performed
- Specific test suites executed with verbatim CLI commands and parameters.

### 6. Test Results Summary
- Breakdown into the 4 mandatory categories:
  - **Passed**: Count and list of passed assertions.
  - **Failed**: Count, exact error output, and root cause.
  - **Blocked**: Tests halted by upstream failures.
  - **Not Run**: Planned or inapplicable tests with documented justification.

### 7. Security Findings
- Results of secret screening, input validation reviews, and permission audits.

### 8. Assumptions
- Any operational or architectural assumptions made during execution that require user confirmation.

### 9. Known Limitations
- Explicit declaration of edge cases, untested viewports, or deferred scope.

### 10. Rollback Point
- Clean Git commit SHA or backup archive path providing immediate restoration capability.

### 11. Actions Not Performed
- Explicit enumeration of operations intentionally omitted (e.g., `Did not push to remote`, `Did not execute live database seeder`).

### 12. Next Proposed Stage
- The immediate next layer or test stage recommended for execution.

### 13. Approvals Required
- Identify if any approval gates (Gate A through Gate E) must be cleared before the next stage can begin.

---

## 3. Cautious Factual Language Rules

Agents must adhere strictly to defensive, evidence-based phrasing. Hyperbole, absolute claims, and speculative marketing language are strictly prohibited.

### Prohibited vs Required Phrases

| ❌ Prohibited Absolutes | ✅ Required Cautious Factual Phrasing |
| :--- | :--- |
| "The application is 100% secure." | "No issue was found in the static security checks and secret scans performed." |
| "Completely protected against all vulnerabilities." | "Server-side authorization tests passed for the defined user roles; external penetration testing has not been performed." |
| "Guaranteed performance under load." | "Not measured under concurrent live traffic; local unit test execution was verified." |
| "There are no possible risks with this deployment." | "Low risk based on verified rollback commit, but temporary service disruption remains possible if environment variables mismatch." |
| "The code is fully tested." | "Verified by unit and static tests covering the core parser; browser UI workflows are currently Not Run." |
| "The database migration is flawless." | "Migration executed cleanly against local SQLite; production PostgreSQL has not been migrated." |
| "Zero chance of regression." | "Regression tests for existing modules passed; manual user verification is recommended." |
| "All external services are working perfectly." | "Requires live verification; mock responses succeeded in the local test environment." |
| "I am confident this fixes the problem." | "Unable to confirm resolution from supplied evidence alone until local browser test is executed." |

---

## 4. Example Compliant Stage Report

```markdown
# Stage Report: Layer 5 Build Verification

1. **Stage Status**: Completed cleanly. Ready for Layer 6 Testing.
2. **Evidence Inspected**: `src/auth/jwt.ts`, `package.json`, `tsconfig.json`.
3. **Files Changed**: `src/auth/jwt.ts` (+12 lines, -4 lines).
4. **External Resources Affected**: None. All operations were local.
5. **Tests Performed**: `npm run build` executed twice consecutively.
6. **Test Results**:
   - Passed: 2 build runs exited with code 0.
   - Failed: 0.
   - Blocked: 0.
   - Not Run: Stages 08-18 (pending testing layer).
7. **Security Findings**: Secret scan clean; no hardcoded secrets found in `jwt.ts`.
8. **Assumptions**: Assumed Node runtime on production is v20+ matching local environment.
9. **Known Limitations**: Token expiry behavior was verified by static type check, not live clock simulation.
10. **Rollback Point**: Commit `a1b2c3d` on branch `feat/jwt-auth`.
11. **Actions Not Performed**: Did not push branch to remote origin.
12. **Next Proposed Stage**: Stage 03 Unit Tests (`npm test`).
13. **Approvals Required**: None for local unit testing. Gate C will be required before remote push.
```