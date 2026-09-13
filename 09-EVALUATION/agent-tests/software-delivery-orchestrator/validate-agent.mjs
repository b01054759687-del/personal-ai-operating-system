#!/usr/bin/env node
// DevPilot (software-delivery-orchestrator) activation validator.
// Node.js built-ins only (fs, path, url). No external dependencies.
// Exit code 0 = all assertions passed. Exit code 1 = at least one assertion failed.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..", "..");

const CANONICAL_NAME = "software-delivery-orchestrator";
const DISPLAY_NAME = "DevPilot";
const REQUIRED_ALIASES = ["dev-pilot", "software-delivery-orchestrator-agent"];
const FORBIDDEN_DIR_NAMES = ["dev-pilot", "devpilot", "software-delivery-orchestrator-agent"];

const AGENT_DIR = path.join(ROOT, "02-AI-ASSETS", "agents", "engineering", CANONICAL_NAME);
const MANAGER_DIR = path.join(ROOT, "02-AI-ASSETS", "agents", "system", "ai-workspace-manager");

const results = [];
let failures = 0;

function assert(id, description, fn) {
  let ok = false;
  let detail = "";
  try {
    const r = fn();
    ok = r === true || r === undefined ? !!r : !!r;
    if (r && typeof r === "object" && "ok" in r) {
      ok = r.ok;
      detail = r.detail || "";
    } else {
      ok = r === true;
    }
  } catch (err) {
    ok = false;
    detail = `threw: ${err.message}`;
  }
  if (!ok) failures++;
  results.push({ id, description, ok, detail });
}

function readJSON(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

// ---- Load core files up front (guarded) ----
let metadata, agentsRegistry, assetsRegistry, dependencyRegistry, publishingRegistry, versionsRegistry;
let agentMd = "", readmeMd = "", changelogMd = "", claudeMd = "";

function safeReadJSON(p) {
  try { return readJSON(p); } catch { return null; }
}
function safeReadText(p) {
  try { return readFileSync(p, "utf8"); } catch { return ""; }
}

metadata = safeReadJSON(path.join(AGENT_DIR, "metadata.json"));
agentsRegistry = safeReadJSON(path.join(ROOT, "04-REGISTRY", "agents-registry.json"));
assetsRegistry = safeReadJSON(path.join(ROOT, "04-REGISTRY", "assets-registry.json"));
dependencyRegistry = safeReadJSON(path.join(ROOT, "04-REGISTRY", "dependency-registry.json"));
publishingRegistry = safeReadJSON(path.join(ROOT, "04-REGISTRY", "publishing-registry.json"));
versionsRegistry = safeReadJSON(path.join(ROOT, "04-REGISTRY", "versions-registry.json"));
agentMd = safeReadText(path.join(AGENT_DIR, "AGENT.md"));
readmeMd = safeReadText(path.join(AGENT_DIR, "README.md"));
changelogMd = safeReadText(path.join(AGENT_DIR, "CHANGELOG.md"));
claudeMd = safeReadText(path.join(ROOT, "CLAUDE.md"));

const agentRegistryEntries = (agentsRegistry?.agents || []).filter((a) => a.name === CANONICAL_NAME);
const assetRegistryEntries = (assetsRegistry?.assets || []).filter((a) => a.name === CANONICAL_NAME && a.type === "agent");
const publishingEntries = (publishingRegistry?.publishedAssets || []).filter((a) => a.assetName === CANONICAL_NAME);
const dependencyEntry = (dependencyRegistry?.dependencies || []).find((d) => d.target === CANONICAL_NAME);

// 1. Mandatory package files/directories exist
assert("01", "Mandatory agent package files and directories exist", () => {
  const required = ["AGENT.md", "README.md", "metadata.json", "CHANGELOG.md", "workflows", "policies", "tests"];
  const missing = required.filter((f) => !existsSync(path.join(AGENT_DIR, f)));
  return { ok: missing.length === 0, detail: missing.length ? `missing: ${missing.join(", ")}` : "" };
});

// 2. Canonical name exact
assert("02", "Canonical name is exactly 'software-delivery-orchestrator'", () => {
  return { ok: metadata?.name === CANONICAL_NAME, detail: `metadata.name=${metadata?.name}` };
});

// 3. Display name exact
assert("03", "Display name is exactly 'DevPilot'", () => {
  return { ok: metadata?.displayName === DISPLAY_NAME, detail: `metadata.displayName=${metadata?.displayName}` };
});

// 4. Both required aliases exist
assert("04", "Both required aliases exist in metadata.json", () => {
  const aliases = metadata?.aliases || [];
  const missing = REQUIRED_ALIASES.filter((a) => !aliases.includes(a));
  return { ok: missing.length === 0, detail: missing.length ? `missing aliases: ${missing.join(", ")}` : "" };
});

// 5. No alias registered as another agent
assert("05", "No alias is registered as another agent's name", () => {
  const others = (agentsRegistry?.agents || []).filter((a) => a.name !== CANONICAL_NAME);
  const collisions = others.filter((a) => REQUIRED_ALIASES.includes(a.name) || (a.aliases || []).some((al) => REQUIRED_ALIASES.includes(al)));
  return { ok: collisions.length === 0, detail: collisions.map((c) => c.name).join(", ") };
});

// 6. No forbidden duplicate agent directory exists
assert("06", "No agent directory named dev-pilot, devpilot, or software-delivery-orchestrator-agent exists", () => {
  const agentsRoot = path.join(ROOT, "02-AI-ASSETS", "agents");
  const found = [];
  function scanForForbidden(dir) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (FORBIDDEN_DIR_NAMES.includes(entry.name)) found.push(path.join(dir, entry.name));
        scanForForbidden(path.join(dir, entry.name));
      }
    }
  }
  scanForForbidden(agentsRoot);
  return { ok: found.length === 0, detail: found.join(", ") };
});

// 7. Exactly one canonical record in agents-registry.json
assert("07", "Exactly one canonical record exists in agents-registry.json", () => {
  return { ok: agentRegistryEntries.length === 1, detail: `found ${agentRegistryEntries.length}` };
});

// 8. Exactly one canonical agent record in assets-registry.json
assert("08", "Exactly one canonical agent record exists in assets-registry.json", () => {
  return { ok: assetRegistryEntries.length === 1, detail: `found ${assetRegistryEntries.length}` };
});

// 9. Exactly one canonical publishing record
assert("09", "Exactly one canonical publishing record exists", () => {
  return { ok: publishingEntries.length === 1, detail: `found ${publishingEntries.length}` };
});

// 10. ai-workspace-manager exists and is recorded as managing agent
assert("10", "ai-workspace-manager exists and is recorded as the managing agent", () => {
  const managerExists = existsSync(path.join(MANAGER_DIR, "AGENT.md")) && existsSync(path.join(MANAGER_DIR, "metadata.json"));
  const managedByOk = metadata?.managed_by === "ai-workspace-manager";
  return { ok: managerExists && managedByOk, detail: `managerExists=${managerExists}, metadata.managed_by=${metadata?.managed_by}` };
});

// 11. Management dependency resolves through dependency-registry.json
assert("11", "The management dependency resolves through dependency-registry.json", () => {
  return { ok: dependencyEntry?.managedBy === "ai-workspace-manager", detail: `dependencyEntry.managedBy=${dependencyEntry?.managedBy}` };
});

// 12. All declared dependencies resolve to real registered assets or registries
assert("12", "All declared dependencies resolve to real registered assets or registries", () => {
  const deps = metadata?.dependencies || [];
  const unresolved = deps.filter((dep) => {
    const registryPath = path.join(ROOT, "04-REGISTRY", `${dep}.json`);
    if (existsSync(registryPath)) return false;
    const skillPath = path.join(ROOT, "02-AI-ASSETS", "skills", dep);
    if (existsSync(skillPath)) return false;
    const inAssets = (assetsRegistry?.assets || []).some((a) => a.name === dep);
    if (inAssets) return false;
    return true;
  });
  return { ok: unresolved.length === 0, detail: unresolved.join(", ") };
});

// 13. Every directly declared capability has a corresponding valid workflow
assert("13", "Every directly declared capability maps to a valid workflow file", () => {
  const caps = metadata?.capabilities || [];
  const missing = caps.filter((c) => !existsSync(path.join(AGENT_DIR, "workflows", `${c}.md`)));
  return { ok: missing.length === 0, detail: missing.join(", ") };
});

// 14. Versions match across all canonical/registry surfaces
assert("14", "Versions match across metadata.json, AGENT.md, README.md, CHANGELOG.md, and registries", () => {
  const v = metadata?.version;
  const checks = {
    "AGENT.md frontmatter": new RegExp(`version:\\s*${v}\\b`).test(agentMd),
    "README.md mention": readmeMd.includes(v),
    "CHANGELOG.md top entry": changelogMd.includes(`[${v}]`),
    "agents-registry.json": agentRegistryEntries[0]?.version === v,
    "assets-registry.json": assetRegistryEntries[0]?.version === v,
    "publishing-registry.json": publishingEntries[0]?.canonicalVersion === v && publishingEntries[0]?.version === v,
  };
  const failing = Object.entries(checks).filter(([, ok]) => !ok).map(([k]) => k);
  return { ok: failing.length === 0, detail: failing.join(", ") };
});

// 15. Canonical paths match and exist
assert("15", "Canonical paths match and exist", () => {
  const expectedPath = "02-AI-ASSETS/agents/engineering/software-delivery-orchestrator";
  const promptFileOk = metadata?.identity?.prompt_file === `${expectedPath}/AGENT.md` && existsSync(path.join(ROOT, metadata.identity.prompt_file));
  const registryPathOk = agentRegistryEntries[0]?.path === expectedPath && existsSync(path.join(ROOT, agentRegistryEntries[0].path));
  const assetPathOk = assetRegistryEntries[0]?.path === expectedPath && existsSync(path.join(ROOT, assetRegistryEntries[0].path));
  return { ok: promptFileOk && registryPathOk && assetPathOk, detail: `prompt_file=${promptFileOk}, registryPath=${registryPathOk}, assetPath=${assetPathOk}` };
});

// 16. All modified JSON files parse successfully
assert("16", "All modified JSON files parse successfully", () => {
  const jsonFiles = [
    path.join(AGENT_DIR, "metadata.json"),
    path.join(ROOT, "04-REGISTRY", "agents-registry.json"),
    path.join(ROOT, "04-REGISTRY", "assets-registry.json"),
    path.join(ROOT, "04-REGISTRY", "dependency-registry.json"),
    path.join(ROOT, "04-REGISTRY", "publishing-registry.json"),
    path.join(ROOT, "04-REGISTRY", "versions-registry.json"),
  ];
  const bad = [];
  for (const f of jsonFiles) {
    try {
      readJSON(f);
    } catch (err) {
      bad.push(`${path.relative(ROOT, f)}: ${err.message}`);
    }
  }
  return { ok: bad.length === 0, detail: bad.join("; ") };
});

// 17. Activation status synchronized across canonical metadata and registries
assert("17", "Activation status is synchronized across canonical metadata and central registries", () => {
  const checks = {
    "metadata.status": metadata?.status === "active",
    "metadata.lifecycle.stage": metadata?.lifecycle?.stage === "ACTIVE",
    "agents-registry.status": agentRegistryEntries[0]?.status === "active",
    "agents-registry.lifecycle.stage": agentRegistryEntries[0]?.lifecycle?.stage === "ACTIVE",
    "assets-registry.status": assetRegistryEntries[0]?.status === "active",
    "assets-registry.lifecycle.stage": assetRegistryEntries[0]?.lifecycle?.stage === "ACTIVE",
  };
  const failing = Object.entries(checks).filter(([, ok]) => !ok).map(([k]) => k);
  return { ok: failing.length === 0, detail: failing.join(", ") };
});

// 18. Publishing records not falsely marked as published/synced
assert("18", "Publishing records are not falsely marked as published or synced", () => {
  const entry = publishingEntries[0];
  if (!entry) return { ok: false, detail: "no publishing entry found" };
  const statusVsTimestamp = entry.publishingStatus === "PUBLISHED" ? entry.lastPublished !== null : entry.lastPublished === null || entry.publishingStatus !== "PREPARED" ? true : entry.lastPublished === null;
  const noFalseSync = !(entry.targetDeployments || []).some((d) => (d.status === "SYNCED" || d.status === "PUBLISHED") && !entry.lastPublished);
  return { ok: statusVsTimestamp && noFalseSync, detail: `publishingStatus=${entry.publishingStatus}, lastPublished=${entry.lastPublished}` };
});

// 19. Root CLAUDE.md exists, no secrets/absolute paths, resolves canonical files
assert("19", "Root CLAUDE.md exists, has no secrets or absolute machine paths, and resolves required canonical files", () => {
  if (!claudeMd) return { ok: false, detail: "CLAUDE.md missing or empty" };
  const secretPattern = /\bghp_[a-zA-Z0-9_]{20,}\b|\bsk-[a-zA-Z0-9]{20,}\b|-----BEGIN (RSA|OPENSSH|PGP) PRIVATE KEY-----/;
  const absolutePathPattern = /[A-Za-z]:\\\\|[A-Za-z]:\\(?!<)|\/home\/[a-zA-Z0-9_-]+|\/Users\/[a-zA-Z0-9_-]+/;
  const hasSecret = secretPattern.test(claudeMd);
  const hasAbsPath = absolutePathPattern.test(claudeMd);
  const requiredRefs = [
    "00-META/SYSTEM-CONSTITUTION.md",
    "02-AI-ASSETS/instructions/AGENTS.md",
    "04-REGISTRY",
    "02-AI-ASSETS/agents/engineering/software-delivery-orchestrator",
    "ai-workspace-manager",
  ];
  const missingRefs = requiredRefs.filter((r) => !claudeMd.includes(r));
  return {
    ok: !hasSecret && !hasAbsPath && missingRefs.length === 0,
    detail: `hasSecret=${hasSecret}, hasAbsPath=${hasAbsPath}, missingRefs=${missingRefs.join(", ")}`,
  };
});

// 20. Root CLAUDE.md maps all DevPilot aliases and rejects Cowork/secondary-clone authority
assert("20", "Root CLAUDE.md maps all DevPilot aliases to the canonical agent and rejects Cowork/secondary-clone state as authoritative", () => {
  const names = [DISPLAY_NAME, ...REQUIRED_ALIASES, CANONICAL_NAME];
  const missingNames = names.filter((n) => !claudeMd.includes(n));
  const mentionsCowork = /cowork/i.test(claudeMd);
  return { ok: missingNames.length === 0 && mentionsCowork, detail: `missingNames=${missingNames.join(", ")}, mentionsCowork=${mentionsCowork}` };
});

// ---- Report ----
console.log("DevPilot (software-delivery-orchestrator) Activation Validator");
console.log(`Repo root: ${ROOT}`);
console.log("");
for (const r of results) {
  const status = r.ok ? "PASS" : "FAIL";
  console.log(`[${status}] ${r.id} ${r.description}${r.detail ? ` — ${r.detail}` : ""}`);
}
console.log("");
console.log(`${results.length - failures}/${results.length} assertions passed.`);

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed.`);
  process.exit(1);
} else {
  console.log("\nAll mandatory activation assertions passed.");
  process.exit(0);
}
