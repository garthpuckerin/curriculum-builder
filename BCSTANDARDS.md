# BCSTANDARDS — vercel-curriculum-builder

> AI agents: read this before writing code. This is the AI Context Contract for this repo.

## Governance

- Authority: **Blurred Concepts Engineering Constitution v2.0** — `github.com/garthpuckerin/blurred-concepts-engineering` (local: `D:\BlurredConcepts\blurred-concepts-engineering`).
- Standards library: `blurred-concepts-engineering/standards/`.
- Precedence (Constitution §1): direct owner instruction → this `BCSTANDARDS.md` → Constitution → topic standards → supporting docs.
- This file was seeded fleet-wide on 2026-07-17; tailor repo-specific sections (product class, CI, context) as the repo is worked on.
- **Product class (Product Class Standard):** `P` — seeded 2026-09-05 by heuristic (no multi-tenant, regulated or billing language in README); confirm or raise, never lower.

## Code Comprehension (Comprehension Ladder Standard)

<!-- bcstd:managed comprehension v1 -->

- Graph repo_id: `github.com/garthpuckerin/curriculum-builder`
- Ladder-first: query the mimir2-graph MCP ladder (`map` / `find` / `explain` /
`neighbors` / `read`) with the repo_id above BEFORE raw file reads or grep
for structure/behavior/relationship questions. Raw reads remain correct for
editing, ungraphed repos, non-code content, and exact-line verification.
Canonical text: `standards/Comprehension_Ladder_Standard.md` in
blurred-concepts-engineering — it governs on any conflict.
<!-- /bcstd:managed -->

## Institutional Memory

<!-- bcstd:managed memory v1 -->

- The comprehension and memory habits are active client bindings, not passive
  repository guidance. Each client must use the highest enforcement tier it
  supports under the Comprehension Ladder Standard.
- Recall Ogham with `hybrid_search` when starting work on a system that may
  have prior context. Before ending, store decisions with rationale, gotchas,
  and cross-session operational context with source, controlled tags, and a
  deliberate TTL. Never store secrets or code-structure facts.
- Canonical memory policy: `standards/Memory_Standard.md` in
blurred-concepts-engineering — it governs on any conflict.
<!-- /bcstd:managed -->

## Agent Orchestration (Landing Cost)

<!-- bcstd:managed orchestration v1 -->

- CRITICAL for any agent that delegates, spawns sub-agents or lands changes:
  plan by LANDINGS (one merge plus one deploy), not items. Before a list,
  state landings, gate-minutes and agent count. Small and medium items in
  one area share one branch, one gate, one deploy; small settled work is
  done inline with a one-line `Deviation:` entry; a brief over about 250
  words or 3+ status turns on one small item is the tripwire.
- One authoritative full suite per landing; never skip hooks. No status
  chatter while a gate or session runs (report at launch and at end). One
  approval covers a sequence the owner has named; a deploy is its own go.
  Report landings done vs planned and gate runs, failures and retries.
- Canonical text: `standards/Agent_Orchestration_Standard.md` section 11.4
in blurred-concepts-engineering. It governs on any conflict.
<!-- /bcstd:managed -->

## Performance in Every Build

<!-- bcstd:managed performance v1 -->

- CRITICAL for any agent that specifies, builds or lands a change: state its
  cost at production size in the spec (size, time, CPU, background load, what
  it blocks, growth, headroom) and set a threshold before measuring. A landing
  that cannot change cost says `Cost: none - <reason>`.
- Measure before merge at or above production size, through the real path, on
  the configuration production runs. Other hardware is a labelled stand-in,
  re-measured at deploy-verify. A miss blocks the merge; "not measured" is not
  a pass. Only the owner changes a threshold.
- Background work shows rate times size against what the resource can serve,
  measures idle cost, and keeps defaults safe at production size. A test on a
  small fixture is not proof. Once a threshold is met, stop.
- Canonical text: `standards/Performance_Standard.md` in
blurred-concepts-engineering. It governs on any conflict.
<!-- /bcstd:managed -->
