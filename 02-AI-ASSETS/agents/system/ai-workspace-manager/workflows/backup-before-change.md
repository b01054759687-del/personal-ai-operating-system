# Workflow: Backup Before Change (ackup-before-change)

## Purpose
Enforce the constitutional snapshot-first principle by creating an unalterable, cryptographically hashed backup before executing any migration, synchronization, or structural refactoring.

## Pre-Conditions
- Target files and directories identified.
- Destination folder initialized in 10-ARCHIVE/<type>-backups/<type>-backup-YYYY-MM-DD/.

## Execution Steps
1. **Hash Computation**: Calculate SHA-256 for every targeted source file.
2. **Sanitization Filter**: Verify that no unredacted tokens or secrets are copied into the backup archive.
3. **Manifest Compilation**: Generate *-MANIFEST.json documenting file paths, timestamps, sizes, and hashes.
4. **Archive Lock**: Mark backup as read-only historical archive.

## Output & Exit Criteria
- Immutable backup folder created.
- Complete rollback manifest available.
