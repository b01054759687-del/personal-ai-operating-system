# Claude Desktop & GitHub MCP Integration Guide
## Personal AI Operating System (PAI-OS)
### Version 1.0.0

---

## 1. Overview & Purpose

This guide outlines the architecture and procedure for integrating **Claude Desktop** into the **Personal AI Operating System (PAI-OS)** via the official **GitHub Model Context Protocol (MCP)** server.

By leveraging MCP, Claude Desktop gains native, real-time read access to the canonical PAI-OS repository (`personal-ai-operating-system`) on GitHub without relying on fragmented local file copies or cloud embedding databases.

```
+--------------------------------------------------------------+
|            GitHub Remote Repository (Source of Truth)        |
|                personal-ai-operating-system                  |
+--------------------------------------------------------------+
                               |
                               | (GitHub REST / GraphQL API)
                               v
+--------------------------------------------------------------+
|                   GitHub MCP Server                          |
|             @modelcontextprotocol/server-github              |
|                   (READ-ONLY PERMISSIONS)                    |
+--------------------------------------------------------------+
                               |
                               | (JSON-RPC / stdio)
                               v
+--------------------------------------------------------------+
|                     Claude Desktop                           |
|       (Consumes: Skills, Agents, Registries, Knowledge)      |
+--------------------------------------------------------------+
```

---

## 2. GitHub MCP Role

The GitHub MCP server provides tool endpoints for Claude to:
- `get_file_contents`: Read canonical markdown assets, registries, and configuration files.
- `search_repositories`: Search code, documentation, and issues across the repository.
- `list_directory_contents`: Navigate directories (`00-META` through `10-ARCHIVE`).
- `get_commit`: Review version history and audit trails.

---

## 3. Required Configuration

Claude Desktop reads MCP configuration from:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Configuration Snippet:
```json
{
  "mcpServers": {
    "github-pai-os": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

A sanitized template is maintained at:
`03-ADAPTERS/claude/mcp-config-template.json`

---

## 4. Authentication Approach

1. **GitHub Fine-Grained Personal Access Token (PAT)**:
   - Create a dedicated fine-grained PAT on GitHub.
   - **Repository Access**: Select `Only select repositories` ➔ `personal-ai-operating-system`.
   - **Permissions**:
     - `Contents`: **Read-only**
     - `Metadata`: **Read-only**
     - All write/admin permissions: **None**.
2. **Environment Variable Injection**:
   - Store the token in the user environment variable `GITHUB_TOKEN`.
   - Never paste the raw token into repository files or git-tracked configs.

---

## 5. Permission Model & Architectural Boundaries

| Operation | Permitted | Channel | Enforcement Mechanism |
|---|:---:|:---:|---|
| Read Canonical Assets | **YES** | MCP | GitHub PAT Read-only scope |
| Read Registries & State | **YES** | MCP | GitHub PAT Read-only scope |
| Query Knowledge & ADRs | **YES** | MCP | GitHub PAT Read-only scope |
| Commit / Push Changes | **NO** | Blocked | PAT lacks write permissions; Option A architecture |
| Delete Files / Assets | **NO** | Blocked | PAT lacks delete permissions; Constitution Rule 1 |
| Mutate Host Configurations | **NO** | Blocked | Confined strictly to repository scope |

---

## 6. Security Considerations

1. **Source of Truth Immutability**:
   - Claude Desktop cannot alter the canonical repository. Any suggestion, refinement, or new draft produced by Claude must be committed through governed workflows (such as via `ai-workspace-manager` or user review).
2. **Zero Plaintext Credentials**:
   - The repository strictly bans raw tokens. The MCP configuration template uses `${GITHUB_TOKEN}` placeholder exclusively.
3. **Audit Logging**:
   - Every file read via the GitHub API is logged under GitHub repository security audit logs.
