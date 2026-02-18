# Contributing to Curriculum Builder

## Development Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Start development server
npm run dev
```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with [Commitlint](https://commitlint.js.org/) and [Commitizen](https://commitizen.github.io/cz-cli/).

### Commit with Commitizen (recommended)

```bash
npm run commit
```

### Manual commit format

```
<type>(<scope>): <subject>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Scopes (optional):** `api`, `ui`, `deps`, `config`, `docs`, `ci`, `auth`

**Examples:**

- `feat(api): add streaming support for curriculum generation`
- `fix(ui): correct module card expand animation`
- `docs: update deployment instructions`

## Pre-commit Hooks

Husky runs automatically on `git commit`:

- **pre-commit:** lint-staged (ESLint + Prettier on staged files)
- **commit-msg:** Commitlint validates message format

## Quality Gates

Before pushing, ensure:

```bash
npm run validate
```

This runs: typecheck → lint → format check → tests

## API Documentation

- **Swagger UI:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (when dev server is running)
- **OpenAPI spec:** `/api/openapi` (JSON)
