---
id: "kb-one-way-adapter-strategy"
title: "One-Way Adapter Synchronization Strategy"
category: "technical"
owner: "ai-workspace-manager"
version: "1.0.0"
lifecycle:
  stage: "ACTIVE"
  created: "2026-09-08"
  last_verified: "2026-09-08"
tags:
  - "technical"
  - "adapters"
  - "synchronization"
---

# One-Way Adapter Synchronization Strategy (Option A)

## 1. Executive Summary
PAI-OS implements **Option A: One-Way Synchronization Only**. The adapter layer (`03-ADAPTERS/`) projects canonical assets outward to Antigravity, Claude, Cursor, and Windsurf.

## 2. Architectural Rules
- **No Two-Way Sync**: Tools cannot write back into `02-AI-ASSETS/` autonomously.
- **No Automatic Ingestion**: Ingestion requires deliberate migration prompts and validation in sandbox.
- **Deterministic Projection**: Target configurations are overwritten cleanly from the canonical source.
- **Conflict Immunity**: Merge conflicts between tools are mathematically eliminated because sync is strictly one-way.
