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
