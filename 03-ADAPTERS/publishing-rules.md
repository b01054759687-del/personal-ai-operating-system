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

## 2. Target Path Resolution

Each tool adapter implements deterministic path mapping from the canonical PAI-OS repository paths to tool-specific runtimes:

### 2.1 Google Antigravity
- **Adapter Path**: `03-ADAPTERS/antigravity/`
- **Configuration Root**: `C:\Users\l\.gemini\config\`
- **Resolution Matrix**:
  | Canonical Source Path | Target Runtime Path | Projection Type |
  | :--- | :--- | :--- |
  | `02-AI-ASSETS/skills/{name}/` | `C:\Users\l\.gemini\config\skills\{name}\` | Direct directory mirror (`SKILL.md` + resources) |
  | `02-AI-ASSETS/agents/system/{name}/` | `C:\Users\l\.gemini\config\agents\{name}.md` | Markdown projection + prompt injection |
  | `02-AI-ASSETS/rules/{name}.md` | Global configuration rules | Wrapped `<RULE[user_global]>` blocks |
  | `05-PROMPT-LIBRARY/system-workflows/` | `C:\Users\l\.gemini\config\workflows\` | Workflow projection & slash commands |
  | `07-KNOWLEDGE/{category}/{name}.md` | `C:\Users\l\.gemini\config\knowledge/{category}/` | Structured context file mirror |

### 2.2 Claude Code & Claude Desktop
- **Adapter Path**: `03-ADAPTERS/claude/`
- **Integration Mode**: `GITHUB_MCP_READ_ONLY` & local instructions
- **Resolution Matrix**:
  | Canonical Source Path | Target Runtime Path | Projection Type |
  | :--- | :--- | :--- |
  | `00-META/` + `07-KNOWLEDGE/` | `03-ADAPTERS/claude/CLAUDE.md` | Compiled master instructions file |
  | `02-AI-ASSETS/skills/` | `.claude/skills/` | Markdown skill summaries + entrypoint catalog |
  | `05-PROMPT-LIBRARY/system-workflows/` | `.claude/commands/` | Custom slash command definitions |
  | Repository Root | GitHub MCP Server | Read-only remote tools (`get_file_contents`, `search`) |

### 2.3 Cursor IDE
- **Adapter Path**: `03-ADAPTERS/cursor/`
- **Resolution Matrix**:
  | Canonical Source Path | Target Runtime Path | Projection Type |
  | :--- | :--- | :--- |
  | `02-AI-ASSETS/rules/{name}.md` | `.cursor/rules/{name}.mdc` | MDC metadata rule files with glob filters |
  | Global Rules Aggregation | `.cursorrules` | Combined root project rules |
  | `07-KNOWLEDGE/` | `.cursor/context/` | Reference markdown context files |

### 2.4 Codeium Windsurf
- **Adapter Path**: `03-ADAPTERS/windsurf/`
- **Resolution Matrix**:
  | Canonical Source Path | Target Runtime Path | Projection Type |
  | :--- | :--- | :--- |
  | `02-AI-ASSETS/rules/` | `.windsurfrules` | Unified rules configuration |
  | `05-PROMPT-LIBRARY/system-workflows/` | `.windsurf/workflows/{name}.md` | Cascade workflow scripts |
  | `02-AI-ASSETS/skills/` | `.windsurf/skills/` | Read-only reference prompts |

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