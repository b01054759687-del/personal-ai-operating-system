# PAI-OS Release Rollback Protocol
## Version 1.0.0

### 1. Purpose
Defines the operational steps required to cleanly roll back a deployed AI asset release without data loss or registry divergence.

### 2. Rollback Triggers
- **Registry Drift**: Divergence between filesystem state and `release-registry.json`.
- **Security Breach / Secret Leak**: Any detection of credentials in released assets.
- **Consumer Incompatibility**: Fatal parsing error in downstream adapters (Antigravity, Claude, Cursor, Windsurf).
- **Execution Regression**: Failure in core automated tests after deployment.

### 3. Execution Workflow
1. **Halt Downstream Sync**: Freeze one-way adapter sync jobs immediately.
2. **Retrieve Archive Snapshot**: Locate the prior verified release snapshot in `10-ARCHIVE/releases/`.
3. **Restore Canonical State**: Revert files to match the pre-release commit SHA.
4. **Reconcile Registries**: Update `04-REGISTRY/release-registry.json` status to `ROLLED_BACK`.
5. **Post-Rollback Audit**: Execute full validation suite (JSON syntax, zero secrets, git clean).
