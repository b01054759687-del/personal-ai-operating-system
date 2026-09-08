---
id: "kb-github-source-of-truth"
title: "GitHub as Exclusive Source of Truth"
category: "technical"
owner: "ai-workspace-manager"
version: "1.0.0"
lifecycle:
  stage: "ACTIVE"
  created: "2026-09-08"
  last_verified: "2026-09-08"
tags:
  - "technical"
  - "source-of-truth"
  - "git"
---

# GitHub as Exclusive Source of Truth

## 1. Executive Summary
In the Personal AI Operating System, the GitHub remote repository `personal-ai-operating-system` is the sole, authoritative source of truth. No AI tool or local cache has permission to overwrite canonical definitions without committing through the governed OS repository.

## 2. Core Principles
1. **Unidirectional Authority**: Truth flows downstream: `GitHub ➔ PAI-OS Local ➔ Adapters ➔ AI Tools`.
2. **Commit Immutability**: Every asset change is registered via semantic git commits and validated with SHA-256 hashes.
3. **Zero Phantom State**: Uncommitted changes in external tool folders are considered ephemeral scratch until explicitly authored and approved in PAI-OS.

## 3. Best Practices
- Author all changes in `02-AI-ASSETS/`, `05-PROMPT-LIBRARY/`, or `07-KNOWLEDGE/`.
- Validate registries (`04-REGISTRY/*.json`) before pushing.
