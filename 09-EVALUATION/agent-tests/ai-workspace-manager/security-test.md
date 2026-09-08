# Simulation Test 04: Secret Detection & Quarantining Test (security-test)

## Scenario Objective
Test the agent's security gate to detect simulated plaintext API tokens and hardcoded secrets, abort the operation, and quarantine the asset.

## Input Mock Fixture
Sandbox path: `09-EVALUATION/sandbox/ai-workspace-manager-test-environment/mock-assets/compromised-tool/`
- Contains simulated token: `[MOCK_GITHUB_TOKEN_REDACTED]`

## Expected Result
- Regex scan triggers immediate security violation (BLOCKED).
- Ingestion is aborted immediately.
- Asset path flagged in quarantine alert.
- Zero secrets committed to git or copied to canonical assets.
