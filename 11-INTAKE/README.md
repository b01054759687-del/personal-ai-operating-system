# 11-INTAKE — AI Workspace Intake & Activation Layer

## 1. Scope & Objective

The **Intake Layer** (`11-INTAKE/`) serves as the official, secure gateway for introducing new external projects, skills, agents, prompts, and knowledge dossiers into the **Personal AI Operating System (PAI-OS)**. It establishes an immutable quarantine and validation staging environment before any external code or prompt enters the canonical system (`02-AI-ASSETS/`, `05-PROMPT-LIBRARY/`, or `07-KNOWLEDGE/`).

---

## 2. Directory Structure & Lifecycle Flow

```
11-INTAKE/
├── incoming/       # Dropzone for raw external projects and candidate assets
├── staging/        # Isolated area for extraction, normalization, and preparation
├── validation/     # Automated checks: secret scanning, schema, linting, compatibility
├── processed/      # Successfully ingested and registered items (archive copies)
├── rejected/       # Disqualified items retained with explicit rejection audit logs
└── manifests/      # Batch ingestion manifests and transaction receipts
```

### Ingestion Flow Diagram
```
External Source (Local / Git / Zip)
             |
             v
   [ 11-INTAKE/incoming/ ] ────────────> (Dropzone & Discovery)
             |
             v
   [ 11-INTAKE/staging/ ] ─────────────> (Extraction & Structure Normalization)
             |
             v
   [ 11-INTAKE/validation/ ] ──────────> (Zero-Secret Scan, SemVer, Linting)
            / \
           /   \
    (PASS)/     \(FAIL)
         v       v
[ processed/ ]   [ rejected/ ] (With REJECTION-REPORT.md)
       |
       +───────> Canonical System [ 02-AI-ASSETS / 07-KNOWLEDGE ]
```

---

## 3. Subdirectory Specifications

### 3.1 `incoming/`
- **Role**: Ingestion quarantine and initial dropzone.
- **Rules**: Untrusted, raw input files. No automated execution or tool loading directly from this directory.

### 3.2 `staging/`
- **Role**: Normalization and preparation workspace.
- **Rules**: Unpack archives, normalize filenames (kebab-case), ensure UTF-8 encoding without BOM, generate draft metadata.

### 3.3 `validation/`
- **Role**: Quality, security, and schema audit checkpoint.
- **Rules**: Enforces zero plaintext secrets (`ghp_`, `sk-`), YAML frontmatter validity, license checks, and cross-tool compatibility.

### 3.4 `processed/`
- **Role**: Archive of successfully imported packages.
- **Rules**: Stores snapshot of ingested assets alongside their import manifest for historical traceability.

### 3.5 `rejected/`
- **Role**: Quarantine archive for disqualified assets.
- **Rules**: Preserves rejected assets accompanied by a mandatory `rejection-reason.json` detailing failed validation gates. Never destructively deleted (Rule 1: Zero Deletion).

### 3.6 `manifests/`
- **Role**: Ledger of intake operations.
- **Rules**: Stores machine-readable JSON intake records tracking source provenance, operator signature, target path, and SHA-256 digests.
