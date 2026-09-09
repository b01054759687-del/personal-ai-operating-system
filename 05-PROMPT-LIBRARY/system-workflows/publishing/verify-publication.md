# System Workflow: Verify AI Asset Publication

## 1. Purpose
Conduct post-publishing verification, syntax linting, and runtime discovery audits across consumer tool environments to confirm that published assets are discoverable, readable, and functional without regressions.

## 2. Inputs
- `publishingId`: Published asset identifier
- `targetTool`: AI tool environment to audit (`antigravity`, `claude`, `cursor`, `windsurf`)

## 3. Preconditions
1. Asset status in `04-REGISTRY/publishing-registry.json` is `PUBLISHED`.
2. Target tool runtime files are accessible.

## 4. Execution Steps
1. **Target Entrypoint Check**: Assert that the main entrypoint file (`SKILL.md`, `CLAUDE.md`, `.cursorrules`, `.windsurfrules`) is accessible and non-empty.
2. **Syntax & Frontmatter Linting**: Verify valid YAML/Markdown syntax without unescaped variables or broken references.
3. **Secret Scan**: Scan target deployment directory for any inadvertently exposed credentials.
4. **Tool Discovery Simulation**: Test whether the host tool recognizes the asset:
   - Antigravity: Verify skill directory indexed.
   - Claude: Test MCP file retrieval endpoint.
   - Cursor: Verify rule glob matches.
   - Windsurf: Verify workflow cataloged in Cascade.
5. **Audit Record Generation**: Document verification results in the publishing registry.

## 5. Validation Checks
- 100% discoverability across target tools.
- Zero syntax or schema errors.
- Zero secret leaks.
- Zero drift between canonical source and deployed target.

## 6. Approval Requirements
- `AUTO_APPROVED`: Verification executes autonomously as part of post-deployment validation.

## 7. Outputs
- Verification audit log.
- Deployment health status updated to `VERIFIED_ACTIVE` in `publishing-registry.json`.
