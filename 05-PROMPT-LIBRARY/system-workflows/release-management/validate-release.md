# System Workflow: Validate AI Asset Release

## 1. Purpose
Execute an automated, multi-dimensional pre-flight validation audit on a staged release manifest to guarantee zero drift, schema validity, credential safety, and cross-tool runtime compatibility prior to publication.

## 2. Inputs
- `releaseId`: Staged release identifier (e.g., `REL-20260909-v1.0.0`)
- `manifestPath`: Path to staged manifest in `08-RELEASES/manifests/`

## 3. Preconditions
1. Release record exists in `04-REGISTRY/release-registry.json` with status `STAGED`.
2. Release manifest file exists and is accessible.
3. Compatibility matrix is current (`08-RELEASES/compatibility/compatibility-matrix.json`).

## 4. Execution Steps
1. **Schema Validation**: Parse and validate manifest JSON against official schema.
2. **Digest Verification**: Recalculate SHA-256 hashes of all bundled assets and compare with manifest entries.
3. **Security Audit**: Execute regex secret scanner (`\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b`) across all files in bundle.
4. **Tool Compatibility Audit**: Evaluate target adapters against `compatibility-matrix.json`.
5. **Sandbox Simulation**: Run sandbox simulation test suite in `09-EVALUATION/` to verify asset execution integrity.
6. **Status Promotion**: Upon 100% pass, update status to `READY_TO_PUBLISH` in `release-registry.json`.

## 5. Validation Checks
- JSON schema check: PASS
- SHA-256 hash match: 100%
- Secret scan: ZERO LEAKS
- Compatibility check: ALL TARGETS PASS
- Sandbox tests: 100% PASS

## 6. Approval Requirements
- Automated execution; promotion to `READY_TO_PUBLISH` occurs autonomously upon passing all verification gates.
- Failure on any gate aborts workflow and logs defect.

## 7. Outputs
- Validation audit report log.
- Certification of zero secrets.
- Status updated to `READY_TO_PUBLISH` in `04-REGISTRY/release-registry.json`.
