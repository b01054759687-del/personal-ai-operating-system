# Claude Desktop Activation Layer
## Personal AI Operating System (PAI-OS)
### Version 1.0.0 — Operational Deployment Protocol

---

## 1. Overview & Architectural Role

The **Claude Desktop Activation Layer** defines the exact protocol for initializing, configuring, and verifying the connection between **Claude Desktop** and the **Personal AI Operating System (PAI-OS)** via the official **GitHub Model Context Protocol (MCP)** server (`@modelcontextprotocol/server-github`).

### Architectural Invariant:
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

Claude Desktop acts strictly as an **analytical and operational consumer interface**. The GitHub repository remains the **single authoritative source of truth**.

---

## 2. Prerequisites

1. **Claude Desktop Application**: Installed and operational on the host machine.
2. **Node.js & npx**: Node.js v18+ runtime with `npx` available in system `PATH`.
3. **GitHub Fine-Grained Personal Access Token (PAT)**:
   - Target repository: `personal-ai-operating-system`
   - Permissions:
     - `Contents`: **Read-only**
     - `Metadata`: **Read-only**
     - All other scopes: **None**
4. **Environment Variable**: `GITHUB_TOKEN` defined in the user environment (never committed to repository).

---

## 3. Step-by-Step Activation Workflow

### Step 1: Configure Host Environment Variable
Set the read-only token in the user environment via PowerShell:
```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "your_read_only_github_pat_here", "User")
```

### Step 2: Deploy MCP Server Configuration
Copy the configuration snippet from `03-ADAPTERS/claude/mcp-config-template.json` to the Claude Desktop configuration file:

**Target File Location:**
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Configuration Payload:**
```json
{
  "mcpServers": {
    "github-personal-ai-os": {
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

### Step 3: Launch & Initialize Claude Desktop
Restart the Claude Desktop application to reload the configuration and spawn the MCP stdio daemon.

---

## 4. Activation Verification Checklist

| Checkpoint | Expected Indicator | Validation Method |
|---|---|---|
| **MCP Daemon Online** | Hammer icon visible in Claude chat input | Inspect UI bottom bar in Claude Desktop |
| **Tool Availability** | `get_file_contents`, `list_directory_contents` | Check installed tools panel |
| **Repository Visibility** | Successful retrieval of root directories | Run prompt: "List files in 00-META" |
| **Registry Parsing** | Successful reading of `agents-registry.json` | Run prompt: "What capabilities does ai-workspace-manager have?" |
| **Knowledge Retrieval** | Correct ADR and personal context citations | Run prompt: "Summarize ADR-001 from 07-KNOWLEDGE" |

---

## 5. Runtime Governance & Boundaries

1. **Option A Enforcement**:
   - Claude Desktop cannot commit, push, or mutate files in the repository.
   - Any refactoring suggestions or assets drafted by Claude must be routed to `ai-workspace-manager` or user review.
2. **Constitutional Alignment**:
   - Claude must adhere to the instructions defined in `03-ADAPTERS/claude/CLAUDE.md`.
   - Communication in Arabic must strictly utilize the Egyptian Arabic dialect with `<div dir="rtl" style="text-align: right;">` container tags.
   - User professional context is strictly anchored in Interior Design & Finishing (NOT Real Estate).
3. **Zero-Leakage Security**:
   - Token values are never passed in prompt text or returned in assistant messages.
