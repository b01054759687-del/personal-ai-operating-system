# Simulation Test 01: Asset Discovery Test (discovery-test)

## Scenario Objective
Test the agent's ability to scan an unindexed mock directory, identify uncataloged assets, extract metadata, and assign correct classifications (SAFE, REVIEW_REQUIRED, BLOCKED).

## Input Mock Fixture
Sandbox path: `09-EVALUATION/sandbox/ai-workspace-manager-test-environment/mock-assets/`
- Mock Asset 1: `unregistered-analysis-tool` (Markdown prompt + README) -> Expected: SAFE
- Mock Asset 2: `dynamic-webhook-agent` (Dynamic agent script) -> Expected: REVIEW_REQUIRED
- Mock Asset 3: `compromised-tool` (File containing simulated token) -> Expected: BLOCKED

## Expected Result
- Discovers exactly 3 items.
- Classifies each item with 100% accuracy.
- Emits discovery record without mutating original files.
