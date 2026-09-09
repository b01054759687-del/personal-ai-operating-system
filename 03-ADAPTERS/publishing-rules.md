# PAI-OS AI Asset Publishing Rules & Standards

## 1. Publishing Architecture

The **AI Tool Adapter Publishing Layer** orchestrates the controlled, deterministic projection of validated AI assets from the authoritative GitHub repository into downstream consumer tool runtimes.

### Core Principles
1. **One-Way Synchronization (Option A)**:
   - Flow: `Authoritative GitHub Repository (Source of Truth) ➔ Tool Adapters ➔ Consumer Tool Runtimes`
   - External consumer tools are never permitted to push updates back into the canonical repository automatically.
2. **Decoupling Release from Publishing**:
   - Assets must first achieve a formal, sealed release manifest (`08-RELEASES/manifests/`) and pass compatibility verification (`08-RELEASES/compatibility/`) before publishing can be staged.
3. **Zero Deletion & Immutability**:
   - Canonical assets are never deleted during publishing or unpublishing operations.
   - Deprecated or rolled-back assets are archived in `10-ARCHIVE/`.
4. **Zero-Secret Screening Gate**:
   - No file containing plaintext credentials, tokens, or private keys may ever be published or projected to downstream runtimes.

```
+-------------------------------------------------------------------+
|               Personal AI Operating System (GitHub)               |
|  [02-AI-ASSETS]   [05-PROMPT-LIBRARY]   [07-KNOWLEDGE]            |
+---------------------------------+---------------------------------+
                                  |
                                  | 1. Release & Compatibility Check
                                  v
+-------------------------------------------------------------------+
|               Release Engine & Publishing Staging                 |
|  [08-RELEASES/manifests] ➔ [04-REGISTRY/publishing-registry.json]  |
+---------------------------------+---------------------------------+
                                  |
                                  | 2. Approved One-Way Projection
                                  v
+-------------------------------------------------------------------+
|                     03-ADAPTERS Projection                        |
|  +----------------+  +--------------+  +----------+  +----------+ |
|  |   antigravity  |  |    claude    |  |  cursor  |  | windsurf | |
|  +--------+-------+  +-------+------+  +----+-----+  +----+-----+ |
+-----------|------------------|--------------|-------------|-------+
            v                  v              v             v
       ~/.gemini/           .claude/      .cursor/      .windsurf/
```

---

## 2. Adapter Publishing Specifications

### 2.1 Google Antigravity
- **Adapter Path**: `03-ADAPTERS/antigravity/`
- **Supported Asset Types**:
  - `skills`: Modular AI skills and toolsets
  - `agents`: System and domain agent personas
  - `rules`: System constitutional and behavioral rules
  - `prompts`: Workflows and prompt templates
  - `knowledge`: Structured context and memory dossiers
- **Target Locations**:
  - Skills: `C:\Users\l\.gemini\config\skills\{name}\`
  - Agents: `C:\Users\l\.gemini\config\agents\{name}.md`
  - Rules: Antigravity global configuration rules
  - Workflows: `C:\Users\l\.gemini\config\workflows\`
  - Knowledge: `C:\Users\l\.gemini\config\knowledge/{category}/`
- **Mapping Rules**:
  - Skills: Direct folder mirror retaining `SKILL.md` and companion script resources.
  - Agents: Agent specification compiled with tool permissions and system instructions.
  - Rules: Wrapped inside `<RULE[user_global]>` blocks with Egyptian Arabic and `<div dir="rtl">` styling preserved.
  - Workflows: System workflows projected for slash command consumption.
  - Knowledge: Context files mirrored into local config tree for instant retrieval.
- **Validation Requirements**:
  - Source must contain `SKILL.md` with valid YAML frontmatter (`name`, `description`).
  - Zero plaintext secrets (`\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b`).
  - Target files must exist and match canonical SHA-256 digests.
- **Rollback Behavior**:
  - Remove projected files from target directory in `C:\Users\l\.gemini\config\skills\{name}\`.
  - Restore previous snapshot from `10-ARCHIVE/maintenance-backups/`.
  - Update `04-REGISTRY/publishing-registry.json` status to `ROLLED_BACK`.
  - Strictly preserve canonical source in `02-AI-ASSETS/`.

### 2.2 Claude Code & Claude Desktop
- **Adapter Path**: `03-ADAPTERS/claude/`
- **Supported Asset Types**:
  - `instructions`: Master repository directives (`CLAUDE.md`)
  - `skills`: Reference skill definitions and summaries
  - `prompts`: Slash command prompt scripts
  - `knowledge`: Read-only architectural context
- **Target Locations**:
  - Master Directives: `03-ADAPTERS/claude/CLAUDE.md` and repo root `CLAUDE.md`
  - Commands: `.claude/commands/`
  - Skills Reference: `.claude/skills/`
  - MCP Server: Read-only GitHub MCP connection to repository
- **Mapping Rules**:
  - Instructions: Compiled from `00-META/SYSTEM-CONSTITUTION.md` and `07-KNOWLEDGE/personal-context/`.
  - Skills: Translated into reference guides without tool-binding conflicts.
  - Commands: Workflows exposed as Claude Code slash commands.
  - Knowledge: Exposed strictly via read-only GitHub MCP tools (`get_file_contents`, `search`).
- **Validation Requirements**:
  - GitHub MCP configuration enforces read-only permissions (`write: false`, `push: false`).
  - `CLAUDE.md` contains zero hardcoded API tokens or personal credentials.
  - Valid markdown syntax with valid relative file references.
- **Rollback Behavior**:
  - Revert `CLAUDE.md` to previous stable revision from `10-ARCHIVE/`.
  - Remove deprecated commands from `.claude/commands/`.
  - Update publishing registry to `ROLLED_BACK`.
  - Canonical assets in `02-AI-ASSETS/` remain 100% untouched.

### 2.3 Cursor IDE
- **Adapter Path**: `03-ADAPTERS/cursor/`
- **Supported Asset Types**:
  - `rules`: System and language rules (`.cursorrules` & `.cursor/rules/*.mdc`)
  - `instructions`: Project-wide context instructions
  - `knowledge`: Architecture and domain standards
- **Target Locations**:
  - Legacy Rules: `.cursorrules` (workspace root)
  - Modular Rules: `.cursor/rules/{rule-name}.mdc`
  - Context: `.cursor/context/`
- **Mapping Rules**:
  - Global Rules: Concatenate constitutional principles and code formatting standards into `.cursorrules`.
  - MDC Rules: Translate rule assets into MDC frontmatter format with `description`, `globs`, and `alwaysApply` flags.
  - Knowledge: Mirror relevant ADRs and technical standards into `.cursor/context/`.
- **Validation Requirements**:
  - MDC frontmatter conforms to Cursor schema (`description` string, `globs` array).
  - Clean regex and glob pattern matching without syntax errors.
  - Zero secrets detected across rule definitions.
- **Rollback Behavior**:
  - Delete generated `.cursor/rules/{rule-name}.mdc` file.
  - Restore previous `.cursorrules` from archive snapshot.
  - Update `04-REGISTRY/publishing-registry.json` status to `ROLLED_BACK`.
  - Preserve canonical source files in `02-AI-ASSETS/rules/`.

### 2.4 Codeium Windsurf
- **Adapter Path**: `03-ADAPTERS/windsurf/`
- **Supported Asset Types**:
  - `rules`: IDE rules (`.windsurfrules`)
  - `workflows`: Cascade operational workflows
  - `knowledge`: Technical architecture context
- **Target Locations**:
  - Rules: `.windsurfrules` (workspace root)
  - Workflows: `.windsurf/workflows/{name}.md`
  - Knowledge: `.windsurf/context/`
- **Mapping Rules**:
  - Rules: Translate constitutional and engineering rules into concise bulleted directives for Cascade.
  - Workflows: Convert system workflows from `05-PROMPT-LIBRARY/` into Cascade actionable step templates.
  - Knowledge: Reference architectural patterns and domain standards.
- **Validation Requirements**:
  - Cascade workflow files include required trigger conditions and step declarations.
  - Zero plaintext secrets or sensitive tokens.
  - Clean formatting compatible with Windsurf parser.
- **Rollback Behavior**:
  - Remove deployed workflow from `.windsurf/workflows/`.
  - Revert `.windsurfrules` to previous archived snapshot.
  - Record rollback in `04-REGISTRY/publishing-registry.json`.
  - Keep canonical assets in `02-AI-ASSETS/` completely intact.

---

## 3. Publishing Lifecycle

Every published asset undergoes an explicit state transition tracked in `04-REGISTRY/publishing-registry.json`:

```
   [PREPARED] ──────> [APPROVED] ──────> [PUBLISHING] ──────> [PUBLISHED]
        |                  |                   |
        v                  v                   v
     [FAILED]           [FAILED]            [FAILED] ───────> [ROLLED_BACK]
```

### Stage Definitions & Transition Rules

1. **`PREPARED`**:
   - **Trigger**: Execution of `05-PROMPT-LIBRARY/system-workflows/publishing/prepare-publish.md`.
   - **Criteria**: Asset belongs to an approved release bundle in `08-RELEASES/manifests/`; compatibility matrix validates target tool support; pre-flight secret scan passes clean; backup snapshot created in `10-ARCHIVE/`.

2. **`APPROVED`**:
   - **Trigger**: Human operator explicit approval sign-off.
   - **Criteria**: Approval gate verified; publishing parameters and deployment targets locked.

3. **`PUBLISHING`**:
   - **Trigger**: Initiation of `05-PROMPT-LIBRARY/system-workflows/publishing/publish-to-tool.md`.
   - **Criteria**: One-way adapter file projection actively executing; locks engaged to prevent concurrent drift.

4. **`PUBLISHED`**:
   - **Trigger**: Successful projection and post-publish verification completion.
   - **Criteria**: Target runtime files verified; file hashes match canonical source; tool runtime discovery confirmed.

5. **`FAILED`**:
   - **Trigger**: Any validation failure, secret detection, path error, or syntax fault during preparation or publishing.
   - **Action**: Immediate halt, alert generated, error details recorded in audit log.

6. **`ROLLED_BACK`**:
   - **Trigger**: Execution of `05-PROMPT-LIBRARY/system-workflows/publishing/unpublish-asset.md` or emergency rollback.
   - **Criteria**: Projected runtime files cleanly revoked; previous stable runtime snapshot restored; canonical source untouched.

---

## 4. Verification Process

Post-publication verification is governed by `05-PROMPT-LIBRARY/system-workflows/publishing/verify-publication.md` and applies 4 verification layers:

1. **Physical File Verification**:
   - Target files must exist at resolved paths and have non-zero file size.
   - File permissions must allow read access by the target host tool.
2. **Digest & Integrity Audit**:
   - Calculate SHA-256 hash of deployed runtime files.
   - Compare hash against source file in `02-AI-ASSETS/` or `05-PROMPT-LIBRARY/`.
   - Ensure line endings (`LF` vs `CRLF`) are normalized and do not corrupt checksums.
3. **Syntax & Frontmatter Linting**:
   - Ensure all `SKILL.md`, `AGENT.md`, and markdown files have valid YAML frontmatter delimiters (`---`).
   - Validate that markdown headers follow sequential hierarchy.
   - Verify that all referenced internal paths resolve to valid files.
4. **Runtime Discovery Confirmation**:
   - Simulate host tool discovery mechanism:
     - Antigravity: Indexing of skill directories in `~/.gemini/config/skills/`.
     - Claude: MCP tool discovery and `CLAUDE.md` visibility.
     - Cursor: `.cursorrules` and `.cursor/rules/*.mdc` pattern matching.
     - Windsurf: Cascade workflow catalog recognition.

---

## 5. Rollback Execution

When a published asset exhibits unexpected behavior, regressions, or is superseded, rollback is executed through standard protocol:

1. **Pre-Rollback Freeze**:
   - Suspend automated adapter synchronization for the affected asset.
2. **Runtime Revocation**:
   - Remove the deployed artifact from the target tool runtime path.
   - Restore the pre-publication backup snapshot from `10-ARCHIVE/maintenance-backups/`.
3. **Canonical Source Safeguard**:
   - **STRICT PROHIBITION**: Do not delete source files in `02-AI-ASSETS/`, `05-PROMPT-LIBRARY/`, or `07-KNOWLEDGE/`.
   - If an asset is permanently deprecated, update its lifecycle state in `04-REGISTRY/assets-registry.json` to `DEPRECATED` or `ARCHIVED`.
4. **Registry Reconciliation**:
   - Transition asset status in `04-REGISTRY/publishing-registry.json` to `ROLLED_BACK`.
   - Record rollback timestamp, operator ID, and technical root-cause description.