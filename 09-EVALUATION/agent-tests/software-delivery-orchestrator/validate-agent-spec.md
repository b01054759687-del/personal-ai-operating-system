# Test Specification: DevPilot (`software-delivery-orchestrator`) Activation Validator

Companion specification for `validate-agent.mjs`. Run with:

```
node 09-EVALUATION/agent-tests/software-delivery-orchestrator/validate-agent.mjs
```

Exit code `0` means every assertion below passed. Exit code `1` means at least one failed — the console output lists exactly which one(s) and why.

| # | Assertion | What it actually checks |
|---|---|---|
| 01 | Package structure | `AGENT.md`, `README.md`, `metadata.json`, `CHANGELOG.md`, `workflows/`, `policies/`, `tests/` all exist under the canonical directory. |
| 02 | Canonical name | `metadata.json.name === "software-delivery-orchestrator"`. |
| 03 | Display name | `metadata.json.displayName === "DevPilot"`. |
| 04 | Alias presence | `metadata.json.aliases` contains both `dev-pilot` and `software-delivery-orchestrator-agent`. |
| 05 | Alias uniqueness | No *other* agent record in `agents-registry.json` uses either alias as its own name or alias. |
| 06 | No duplicate package | No directory literally named `dev-pilot`, `devpilot`, or `software-delivery-orchestrator-agent` exists anywhere under `02-AI-ASSETS/agents/`. |
| 07 | Single registry record (agents) | Exactly one entry named `software-delivery-orchestrator` in `agents-registry.json`. |
| 08 | Single registry record (assets) | Exactly one `type: agent` entry named `software-delivery-orchestrator` in `assets-registry.json`. |
| 09 | Single publishing record | Exactly one entry for `software-delivery-orchestrator` in `publishing-registry.json`. |
| 10 | Managing agent exists | `ai-workspace-manager`'s `AGENT.md` and `metadata.json` exist, and this agent's `metadata.json.managed_by === "ai-workspace-manager"`. |
| 11 | Management dependency recorded | `dependency-registry.json` has an entry for `software-delivery-orchestrator` with `managedBy === "ai-workspace-manager"`. |
| 12 | Dependencies resolve | Every string in `metadata.json.dependencies` is a real `04-REGISTRY/<name>.json` file, a real `02-AI-ASSETS/skills/<name>/` directory, or a registered entry in `assets-registry.json`. |
| 13 | Capability↔workflow mapping | Every capability in `metadata.json.capabilities` has a matching `workflows/<capability>.md` file — no decorative capability names. |
| 14 | Version synchronization | The same version string appears in `metadata.json`, `AGENT.md` frontmatter, `README.md`, the latest `CHANGELOG.md` entry heading, `agents-registry.json`, `assets-registry.json`, and `publishing-registry.json`. |
| 15 | Canonical path integrity | `metadata.json.identity.prompt_file` and the `path` fields in both registries all point at the real, existing canonical directory. |
| 16 | JSON validity | Every JSON file touched by this activation (`metadata.json` and the five `04-REGISTRY/*.json` files) parses without error. |
| 17 | Activation sync | `status`/`lifecycle.stage` read the same (`active` / `ACTIVE`) in `metadata.json`, `agents-registry.json`, and `assets-registry.json` — no drift between canonical metadata and registries. |
| 18 | Publishing honesty | The publishing record is not marked `PUBLISHED`/`SYNCED` while `lastPublished` is `null` — canonical activation is never confused with downstream adapter publication. |
| 19 | Root `CLAUDE.md` hygiene | The file exists, contains no secret-shaped strings (`ghp_*`, `sk-*`, private key headers) and no machine-specific absolute paths, and references the constitution, `AGENTS.md`, the registry directory, the canonical agent path, and the managing agent. |
| 20 | Root `CLAUDE.md` alias resolution | The file mentions `DevPilot`, `dev-pilot`, `software-delivery-orchestrator-agent`, and `software-delivery-orchestrator` as one resolved identity, and explicitly addresses Cowork/secondary-clone state as non-authoritative. |

## Notes on methodology
- All checks are filesystem- and JSON-based; nothing here executes the agent itself or simulates a conversation, so this validator proves *structural and registry* activation readiness, not runtime behavior.
- A `Not Run` classification is used elsewhere in DevPilot's own evidence-integrity rules (e.g. for a live cold-start context test); this script itself only ever reports pass/fail per assertion, printed with full detail on failure.
