# Test Suite: Claude Integration — 02: Registry Readability Test

## Test Identifier
`test-claude-02-registry-readability`

## Objective
Verify that Claude Desktop accurately reads and parses machine-readable JSON registries via GitHub MCP without schema errors.

## Scope & Inspected Registries
- `04-REGISTRY/assets-registry.json`
- `04-REGISTRY/agents-registry.json`
- `04-REGISTRY/tools-registry.json`
- `04-REGISTRY/knowledge-registry.json`

## Test Execution Steps
1. Fetch and parse `04-REGISTRY/agents-registry.json`.
2. Assert `totalAgents >= 1` and `agents[0].name == "ai-workspace-manager"`.
3. Assert `capabilities` includes `"claude-integration-management"` and `"knowledge-management"`.
4. Fetch `04-REGISTRY/knowledge-registry.json` and assert `totalEntries >= 6`.

## Expected Results
- All JSON registries parsed cleanly without syntax exceptions.
- Accurate inventory numbers reported.
- Status: **PASS**
