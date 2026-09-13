# PAI-OS — Claude Code Project Entrypoint

This file is the durable boot instruction for any Claude Code session opened at the root of the **Personal AI Operating System (PAI-OS)** repository. It is intentionally concise; it points to canonical sources rather than duplicating them.

## 1. Before editing anything

Run and read the output of:
```
git remote -v
git branch --show-current
git status --short --branch
git rev-parse --show-toplevel
git rev-parse HEAD
git fetch origin <branch>
git rev-parse origin/<branch>
```
Confirm: the remote is the approved PAI-OS repository, the branch is the one you intend to work on, the local HEAD and the fetched remote SHA for that branch, and whether the worktree is clean. Never assume a local commit is visible anywhere else until a remote check (`git ls-remote` or `git rev-parse origin/<branch>`) proves it.

## 2. Source of truth

- **GitHub is the single source of truth.** The current git clone you are running in is the local execution workspace, not an independent source of truth.
- Never treat a Cowork workspace, a transient task directory, or any other isolated/secondary clone as authoritative. If such a directory is discovered, do not read state from it or assume it is shared with anyone else.
- A local commit is a private draft until its SHA is confirmed present on the relevant `origin/<branch>`.

## 3. Read in this order

1. `00-META/SYSTEM-CONSTITUTION.md` — supreme governing rules (GitHub as source of truth, zero secrets, no destructive deletion, versioning, backups, validation-driven sync).
2. `02-AI-ASSETS/instructions/AGENTS.md` — active custom rules for this workspace.
3. The relevant registry under `04-REGISTRY/` (`agents-registry.json`, `assets-registry.json`, `dependency-registry.json`, `publishing-registry.json`, `versions-registry.json`) before locating or changing any AI asset — the registry, not a guess, tells you what currently exists and its version/lifecycle stage.
4. `06-DOCUMENTATION/agent-governance.md`, `06-DOCUMENTATION/release-governance.md`, and `06-DOCUMENTATION/adapter-standard.md` for lifecycle, release, and cross-tool adapter rules.

## 4. Agent name resolution

`DevPilot`, `dev-pilot`, and `software-delivery-orchestrator-agent` are aliases that all resolve to the **single canonical agent**:
- Canonical technical ID: `software-delivery-orchestrator`
- Canonical package path: `02-AI-ASSETS/agents/engineering/software-delivery-orchestrator/`
- Main skill: `ai-workspace-delivery-governor` (`02-AI-ASSETS/skills/ai-workspace-delivery-governor/`)
- Managed by: `ai-workspace-manager` (`02-AI-ASSETS/agents/system/ai-workspace-manager/`)

Never create a second package for any of these names. Use **DevPilot** for implementation, code review, automated testing, real browser QA, security review, git/release work, and deployment governance. Use `ai-workspace-manager` for workspace lifecycle, registry integrity, intake, compatibility, and publishing governance — DevPilot does not publish itself into downstream tool directories.

## 5. Execution modes and approval gates

DevPilot selects one of three modes based on risk — **Quick**, **Standard**, or **Controlled Release** — and states the selection and rationale before acting (full definitions in the agent's `AGENT.md` and the `ai-workspace-delivery-governor` skill).

It halts and produces a formal gate dossier before:
- **Gate A** — installing tools, configuring MCP servers, starting OAuth/CLI auth.
- **Gate B** — creating/modifying external/cloud resources, database migrations, IAM changes.
- **Gate C** — pushing code, opening/merging PRs, modifying protected branches, creating tags.
- **Gate D** — test/staging deployments, real test accounts.
- **Gate E** — production deployment, production migrations, customer-data changes.

These gates are never bypassed, including for destructive or external-mutation actions.

## 6. Non-negotiable rules

- Modify canonical source in `02-AI-ASSETS/` first; adapter projections in `03-ADAPTERS/` and downstream tool configs are derived, never edited directly as the source of truth.
- Classify every test or evidence claim truthfully as `Passed`, `Failed`, `Blocked`, or `Not Run`. Never report a mock as a live integration, and never report unit-test runtime as application performance.
- Never commit or output plaintext secrets, tokens, or credentials. Use environment-variable placeholders.
- Never hardcode a machine-specific absolute path in a committed file.
- No destructive git operations (`git reset --hard`, `git clean -fd`, force-push) and no direct edits to `main` without explicit user instruction.

For the full rationale and detailed workflows behind these rules, read the referenced files above rather than duplicating them here.
