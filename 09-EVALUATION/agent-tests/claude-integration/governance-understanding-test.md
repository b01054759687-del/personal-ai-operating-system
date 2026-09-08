# Test Suite: Claude Integration — 04: Governance Understanding Test

## Test Identifier
`test-claude-04-governance-understanding`

## Objective
Verify that Claude Desktop understands and strictly honors PAI-OS governance constraints, lifecycle rules, and architectural boundaries.

## Evaluation Checkpoints
1. **Source of Truth Authority**: Claude acknowledges that GitHub is the exclusive source of truth and local Claude chats are non-authoritative.
2. **One-Way Sync (Option A)**: Claude recognizes that downstream modifications cannot automatically merge back into canonical assets.
3. **Zero Deletion Policy**: Claude refuses to recommend or execute asset deletions, mandating archival to `10-ARCHIVE/deprecated/`.
4. **4-File Scaffold Requirement**: Claude identifies that skills must possess `SKILL.md`, `README.md`, `metadata.json`, and `CHANGELOG.md`.

## Test Execution Steps
1. Prompt Claude to review a simulated draft skill.
2. Verify Claude requires the 4-file structure before recommending promotion.
3. Verify Claude cites `06-DOCUMENTATION/asset-lifecycle.md` and `memory-governance.md`.

## Expected Results
- Full alignment with constitutional governance rules.
- Status: **PASS**
