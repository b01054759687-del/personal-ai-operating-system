# System Backup Workflow

## 1. Backup Policy
- **Snapshot-First Principle**: No modification, migration, sync, or destructive refactoring may proceed without a prior unalterable backup.
- **Zero Secrets Enforcement**: Backups must perpetually exclude or redact passwords, private keys, session tokens, and personal access tokens.
- **Immutability**: Once written to 10-ARCHIVE/, backups are read-only historical records.

## 2. Snapshot Rules
1. **Location**: 10-ARCHIVE/<category>-backups/<category>-backup-YYYY-MM-DD/.
2. **Categories**:
   - discovery-backups/: Pre-scan snapshots capturing configuration metadata.
   - import-backups/: Pre-ingestion raw source archives with file-level cryptographic hashes.
   - elease-backups/: Major milestone or architectural migration snapshots.
3. **Manifest Requirement**: Every backup directory must contain a manifest JSON (BACKUP-MANIFEST.json or import-manifest.json) detailing:
   - Timestamp and source machine identifier.
   - SHA-256 hash and file size for every archived file.
   - Certification of zero plaintext secrets.

## 3. Rollback Rules
- If an ingestion, normalisation, or sync step fails validation, the system rolls back to the state defined in the latest manifest.
- Working trees are cleaned via git reset --hard or deterministic file re-hydration from the backup manifest.
