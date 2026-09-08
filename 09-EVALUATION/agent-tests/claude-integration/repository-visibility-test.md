# Test Suite: Claude Integration — 01: Repository Visibility Test

## Test Identifier
`test-claude-01-repo-visibility`

## Objective
Validate that Claude Desktop, connecting via GitHub MCP Server (`@modelcontextprotocol/server-github`), can traverse the PAI-OS directory hierarchy and read canonical documents.

## Scope & Preconditions
- Connection: GitHub MCP Server configured with read-only PAT.
- Target: `personal-ai-operating-system` on GitHub.
- Inspected Paths: `00-META/`, `02-AI-ASSETS/`, `03-ADAPTERS/`, `04-REGISTRY/`, `07-KNOWLEDGE/`.

## Test Execution Steps
1. Execute MCP `list_directory_contents` on root `/`.
2. Verify all standard numbered directories (`00-META` through `10-ARCHIVE`) are returned.
3. Call `get_file_contents` for `00-META/SYSTEM-CONSTITUTION.md` and `README.md`.

## Expected Results
- Full repository tree is visible.
- File contents are returned with zero truncation or access errors.
- Status: **PASS**
