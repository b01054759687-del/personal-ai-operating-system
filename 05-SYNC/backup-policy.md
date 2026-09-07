# Backup Policy

## 1. Pre-Migration Backups
- Any import from an external tool or previous workspace must create an unalterable snapshot.
- Staged backups are stored with timestamps and hashes.

## 2. Git Tagging & GitHub Backups
- Every release or major milestone must be tagged (git tag -a vX.Y.Z).
- Remote GitHub backups must be synced to origin on main branch.
