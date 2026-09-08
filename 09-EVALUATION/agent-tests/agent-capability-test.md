# Agent Evaluation Suite: Capability & Functional Test (gent-capability-test)

## Objective
Verify that all declared capabilities of an AI Agent are fully backed by documented workflows and operational specifications.

## Evaluation Criteria
1. **Capability-to-Workflow 1:1 Mapping**:
   - Every capability listed in metadata.json must have a corresponding markdown specification in workflows/<capability-name>.md.
2. **Pre-condition and Exit Criteria Completeness**:
   - Each workflow must define explicit inputs, execution steps, and exit criteria.
3. **Cross-Tool Portability Check**:
   - Workflows must rely on portable logic rather than vendor-locked, proprietary tool syntax.

## Pass Standard
- All declared capabilities have complete, valid workflow implementations.
