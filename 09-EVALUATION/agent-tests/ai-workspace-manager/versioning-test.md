# Simulation Test 05: SemVer Recommendation Test (versioning-test)

## Scenario Objective
Test the agent's logic to analyze a set of changes and recommend the correct Semantic Version bump (MAJOR, MINOR, or PATCH).

## Test Scenarios
1. Change A: Typo fix in prompt description -> Expected: PATCH (e.g., 1.0.0 -> 1.0.1).
2. Change B: Added new optional capability / example template -> Expected: MINOR (e.g., 1.0.0 -> 1.1.0).
3. Change C: Incompatible prompt rewrite altering output format -> Expected: MAJOR (e.g., 1.0.0 -> 2.0.0).

## Expected Result
- Emits correct SemVer recommendation for each scenario.
- Flags breaking changes as requiring an Architecture Decision Record (ADR).
