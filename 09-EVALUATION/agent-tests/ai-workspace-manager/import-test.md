# Simulation Test 02: Asset Import & Normalisation Test (import-test)

## Scenario Objective
Test the agent's ability to validate incoming asset structure, convert uppercase or underscore names to canonical kebab-case, and verify the mandatory 4-file structure (SKILL.md, README.md, metadata.json, CHANGELOG.md).

## Input Mock Fixture
Sandbox path: `09-EVALUATION/sandbox/ai-workspace-manager-test-environment/mock-assets/RAW_CUSTOMER_INSIGHTS/`
- Contains: `SKILL.md` (unformatted)

## Expected Result
- Normalizes identifier to `raw-customer-insights`.
- Detects missing `README.md`, `metadata.json`, `CHANGELOG.md` and generates scaffold templates.
- Verifies zero data loss during normalization.
