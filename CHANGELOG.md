# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GIT_WORKFLOW.md — branch strategy, PR flow, release process
- PULL_REQUEST_TEMPLATE.md for GitHub PRs

## [1.1.0] - 2025-02-18

### Added

- Simulated curriculum output in dev mode when `ANTHROPIC_API_KEY` is not set — test the UI without an API key
- Optional `x-simulate: true` header to force mock response (for testing)

### Security

- Upgrade Next.js 14 → 15.5.12 (fixes DoS in Image Optimizer, RSC deserialization)
- Upgrade eslint-config-next to 15.x (fixes glob command injection)
- Add npm overrides for lodash (>=4.17.22) and tmp (>=0.2.4) to fix prototype pollution and arbitrary file write
- Require Node.js >=20.9.0

## [1.0.0] - 2025-02-18

### Added

- AI-assisted curriculum generation via Claude API
- Topic, audience, format, and duration inputs
- Expandable module cards with objectives, activities, assessments
- 4 preloaded example prompts
- OpenAPI 3.0 spec and Swagger UI at `/api-docs`
- ESLint, Prettier, TypeScript strict mode
- Husky pre-commit hooks (lint-staged)
- Commitizen + Commitlint for conventional commits
- Jest + React Testing Library with 8 tests
- GitHub Actions CI (lint, test, build) and security audit
- Dependabot for dependency updates
- TypeDoc for API documentation generation
- CONTRIBUTING.md, SECURITY.md
