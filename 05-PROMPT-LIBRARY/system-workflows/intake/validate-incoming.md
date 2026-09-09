# System Workflow: Validate Incoming Asset & Security Screening

## 1. Purpose
Execute rigorous security scanning, schema linting, and quality verification on classified assets in 11-INTAKE/validation/, promoting valid items to APPROVED or routing failures to rejected/.

## 2. Inputs
`intakeId`: Intake item identifier
`securityPolicy`: Reference to security standards (`00-META/SYSTEM-CONSTITUTION.md`)

## 3. Preconditions
1. Asset is classified in `11-INTAKE/staging/<intakeId>/`.
2. Status in `04-REGISTRY/intake-registry.json` is `DISCOVERED`.

## 4. Execution Steps
1. **Validation Staging**: Move asset from `staging/` to `11-INTAKE/validation/<intakeId>/`.
2. **Status Transition**: Update status in `intake-registry.json` to `VALIDATING`.
3. **Secret Screening**: Scan all files for API keys, tokens, or credentials using pattern `\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b`.
4. **Syntax & Schema Verification**: Lint YAML frontmatter, markdown header hierarchy, and JSON schemas.
5. **Path Traversal Audit**: Confirm zero relative path traversal (`../`) or unauthorized external symlinks.
6. **Evaluation Gate**: If all checks pass, mark `APPROVED`; if any check fails, route to `11-INTAKE/rejected/<intakeId>/` with `REJECTION-REPORT.md` and set status to `REJECTED`.

## 5. Validation Checks
- Zero plaintext secrets detected across all staged files.
- 100% valid YAML/Markdown syntax without schema errors.
- If rejected, comprehensive `REJECTION-REPORT.md` generated with root cause.

## 6. Approval Requirements
- `HUMAN_APPROVAL_MANDATORY`: Final promotion to `APPROVED` for production import strictly requires human sign-off.

## 7. Outputs
- Validation report in `11-INTAKE/validation/<intakeId>/`.
- Status updated to `APPROVED` or `REJECTED` in `04-REGISTRY/intake-registry.json`.
