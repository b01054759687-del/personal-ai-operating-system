# Approval Gates Protocol — AI Workspace Delivery Governor

## 1. Overview & Operating Principle

Approval gates provide absolute safety boundaries across the delivery lifecycle. When an agent reaches an approval gate, it must **halt immediately**, present a structured gate dossier, and await explicit human operator sign-off before proceeding.

> [!CAUTION]
> **Zero Self-Approval Rule**:
> No AI agent or subagent may ever approve its own gated action. Passing local automated tests never grants permission to bypass an approval gate.

---

## 2. Gate Definitions

```
[Local Dev / Audit] ───(Gate A: Tooling)───> [Tool Installation]
         |
         +─────────────(Gate B: External Resources)───> [Cloud / DB Mutation]
         |
         +─────────────(Gate C: Source Control)───────> [Git Push / Merge]
         |
         +─────────────(Gate D: Test Deployment)──────> [Staging Upload]
         |
         +─────────────(Gate E: Production)───────────> [Live Release / Migration]
```

### Gate A — Tooling
**Trigger Conditions**:
Approval is strictly required before:
- Installing a global or local CLI tool.
- Adding or upgrading an npm, pip, or cargo package.
- Registering or starting a new MCP (Model Context Protocol) server.
- Connecting an external API, plugin, or cloud extension.
- Initiating an interactive login or authentication handshake.

### Gate B — External Resources
**Trigger Conditions**:
Approval is strictly required before:
- Creating or provisioning Google Sheets, cloud databases, S3 buckets, or storage folders.
- Changing security policies, access control lists (ACLs), or IAM permissions.
- Writing to, updating, or deleting records in live external resources.
- Executing database schema migrations, table seeders, or cloud setup scripts.

### Gate C — Source Control
**Trigger Conditions**:
Approval is strictly required before:
- Pushing any local Git branch to a remote repository (`git push`).
- Opening, approving, or merging a Pull Request / Merge Request.
- Updating or committing directly to the repository's `main` / `master` branch.
- Creating, modifying, or deleting remote Git tags or release markers.

### Gate D — Test Deployment
**Trigger Conditions**:
Approval is strictly required before:
- Uploading code bundles to a cloud application, staging server, or preview environment.
- Creating a test release or preview deployment URL.
- Using real user accounts, live sandbox environments, or customer-representative test files.

### Gate E — Production
**Trigger Conditions**:
Approval is strictly required before:
- Triggering a production deployment or activating production traffic.
- Executing live production database migrations or schema alterations.
- Running destructive operations (bulk deletes, record drops, service restarts).
- Altering public access, CORS origins, domain DNS, or SSL configurations.
- Reading, exporting, or modifying real customer data or PII.

---

## 3. Mandatory Gate Dossier Schema

Whenever an approval gate is triggered, the agent must present the following 6-point dossier to the user:

```markdown
### 🛑 APPROVAL GATE REQUIRED: [Gate Identifier - e.g., Gate C: Source Control]

1. **Proposed Action**:
   Exact description of what the agent plans to execute.
   
2. **Exact Target**:
   Specific URL, branch name, file path, cloud resource, or database instance affected.
   
3. **Expected Impact**:
   Positive technical or business consequence of executing this action.
   
4. **Risk Assessment**:
   Potential side effects, downtime risk, data loss hazard, or unintended consequences.
   
5. **Recovery Method**:
   Concrete, step-by-step rollback procedure to restore the previous state if failure occurs.
   
6. **Required User Action**:
   Explicit decision prompt requesting user confirmation (e.g., "Please reply 'Approved' to push branch `feat/xyz` to origin, or provide alternative instructions.").
```

---

## 4. Gate Behavior Standards

1. **Safe Continuation of Non-Blocked Work**:
   If an agent is executing multiple tasks and one task hits an approval gate while others are purely local and non-gated, the agent may complete local non-blocked work, but must NEVER cross the gated boundary.
2. **Refusal on Ambiguity**:
   If user response is vague (e.g., "looks good", "continue"), the agent must clarify whether explicit approval for the gated action was granted before executing.
3. **Audit Trail Logging**:
   Every granted gate approval must be recorded in the stage audit log with the user's confirmation timestamp.