# Security Policy: Zero Secrets & Credential Quarantine

## 1. Absolute Invariant
The AI Workspace Manager Agent is strictly prohibited from storing, committing, transmitting, or generating plaintext credentials, secrets, tokens, or private keys.

## 2. Enforced Rules
- **Environment Variable Abstraction**: All configuration parameters requiring authentication must utilize variable interpolation (e.g. \, \).
- **Automated Scan Gate**: Before every commit, an automated regex scan (\b(ghp_[a-zA-Z0-9]{20,}|sk-[a-zA-Z0-9]{20,})\b) must be executed. Any detection aborts the operation immediately.
- **Gitignore Maintenance**: .gitignore must perpetually exclude .env*, *.key, *.pem, 	okens/, credentials/, secrets/, and local run caches.
- **Quarantine Protocol**: If an external asset containing hardcoded keys is discovered, it must receive the BLOCKED classification and remain unimported until sanitized.
