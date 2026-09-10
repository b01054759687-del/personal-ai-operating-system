# Approval Gates Protocol — AI Workspace Delivery Governor

## 1. Overview & Operating Principle

Approval gates are non-negotiable human authorization checkpoints embedded into the AI Workspace Delivery Governor framework.

An AI Agent must **immediately halt execution** and present a formal Gate Dossier whenever an impending operation triggers any of the conditions defined below. The agent is strictly prohibited from proceeding with the gated operation until explicit human authorization is received.

---

## 2. Gate Definitions

### Gate A: Tooling and Authentication
Mandatory human approval is required before:
- Installing new CLI utilities, runtimes, or system-level tools.
- Installing packages outside pre-approved project dependencies (e.g., adding unvetted npm/pip libraries).
- Adding or reconfiguring Model Context Protocol (MCP) servers.
- Connecting external third-party accounts or cloud provider CLIs.
- Starting authentication handshakes, OAuth flows, or requesting long-lived developer tokens.

### Gate B: External Resources
Mandatory human approval is required before:
- Creating, modifying, or deleting cloud resources (e.g., Google Drive folders, S3 buckets, Cloud Run instances).
- Running database migrations (DDL/DML operations against remote or persistent stores).
- Changing access permissions, IAM roles, or authorization policies.
- Writing to real external data stores, production tables, or third-party webhooks.

### Gate C: Source Control
Mandatory human approval is required before:
- Pushing code to any remote git repository (`git push`).
- Opening, approving, or merging a Pull Request.
- Updating or committing directly to protected branches (`main`, `master`, `production`).
- Creating or deleting remote git tags or release markers.

### Gate D: Test Deployment
Mandatory human approval is required before:
- Uploading code to a cloud application container or staging environment (e.g., clasp push, preview deploy).
- Creating an ephemeral or persistent remote test deployment.
- Utilizing real test accounts, non-mock API credentials, or remote test data fixtures.

### Gate E: Production
Mandatory human approval is required before:
- Production deployment or cutover to live infrastructure.
- Executing production database migrations or schema alterations.
- Making public-access changes (DNS updates, CDN routing, CORS policies).
- Any destructive operation that modifies or deletes existing production infrastructure.
- Modifying, migrating, or touching real customer data.

---

## 3. Mandatory Gate Dossier Schema

Whenever an approval gate is encountered, the agent must output a structured Gate Dossier containing the following 5 mandatory elements:

```markdown
### 🛑 APPROVAL GATE REQUIRED: [Gate Identifier - e.g., Gate C: Source Control]

1. **Exact Action**: Explicit shell command, API invocation, or file mutation proposed (e.g., `git push origin feat/new-feature`).
2. **Exact Target**: Target repository, cloud resource ID, database table, or deployment environment (e.g., remote branch `origin/feat/new-feature`).
3. **Expected Effect**: Direct outcome and consequence of executing the proposed action.
4. **Risk Assessment**: Potential hazards, data loss risks, concurrency issues, or service disruption factors.
5. **Rollback Method**: Verifiable, step-by-step procedure to undo the action if failure occurs (e.g., git commit SHA, database down-migration script, snapshot ID).
```

> [!WARNING]
> **Zero Guessing & Zero Bypass**:
> If a rollback method cannot be identified, the gate must be marked as **BLOCKED** and execution must pause immediately. An agent must never propose a gated action without a viable, documented recovery path.
