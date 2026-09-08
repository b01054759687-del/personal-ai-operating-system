---
id: "ADR-002"
title: "Agent Governance, Permissions, and Lifecycle Principles"
category: "decisions"
owner: "ai-workspace-manager"
version: "1.0.0"
lifecycle:
  stage: "ACTIVE"
  status: "ACCEPTED"
  created: "2026-09-08"
  last_verified: "2026-09-08"
tags:
  - "adr"
  - "agents"
  - "governance"
---

# ADR-002: Agent Governance, Permissions, and Lifecycle Principles

## Status
ACCEPTED

## Context & Problem Statement
Autonomous AI agents can cause unintended drift, modify sensitive system files, or introduce security vulnerabilities without strict permission boundaries and lifecycle management.

## Decision Outcome
Enforce the PAI-OS Agent Governance Model:
1. **6-Stage Lifecycle**: DISCOVERED ➔ IMPORTED ➔ TESTING ➔ ACTIVE ➔ DEPRECATED ➔ ARCHIVED.
2. **Explicit Permission Schema**: Every agent defines granular `read`, `write`, `delete` (prohibited/archive only), and `external_tools_mutation` boundaries.
3. **Approval Gates**: Sensitive actions (file mutations outside repo, archiving, secret handling) require human approval.
4. **Autonomous Turbo Mode**: Safe read and structured authoring within governed directories run autonomously without interruption.
