---
id: "kb-security-principles"
title: "System Security and Zero-Leakage Principles"
category: "technical"
owner: "ai-workspace-manager"
version: "1.0.0"
lifecycle:
  stage: "ACTIVE"
  created: "2026-09-08"
  last_verified: "2026-09-08"
tags:
  - "security"
  - "zero-leakage"
  - "credential-hygiene"
---

# System Security and Zero-Leakage Principles

## 1. Executive Summary
PAI-OS enforces strict security rules across all assets, registries, and runtime operations to prevent token exposure and unauthorized actions.

## 2. Core Security Pillars
1. **Zero Hardcoded Secrets**: Absolute ban on plaintext API keys (`ghp_*`, `sk-*`, bearer tokens) anywhere in the repository.
2. **Regex Defense Gate**: Pre-commit and pre-sync scanning using `\b(ghp_[a-zA-Z0-9_]{20,}|sk-[a-zA-Z0-9]{20,})\b`.
3. **Isolated Sandboxing**: Testing untrusted or external prompts must occur inside `09-EVALUATION/sandbox/`.
4. **Write Boundary Confinement**: Agents are confined to authorized repository paths and cannot write to root system directories.
