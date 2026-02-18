# Curriculum Builder — AI-Assisted Instructional Design

Generate structured training curricula with learning objectives, module breakdowns, activities, and assessments. Powered by Claude.

**[Repository](https://github.com/garthpuckerin/curriculum-builder)** · **Deploy on [Vercel](https://vercel.com/new?filter=next.js&repository=https://github.com/garthpuckerin/curriculum-builder)**

**Targets:** Docebo · Workday Learning · SuccessFactors · SCORM 2004 / xAPI

## Features

- Topic + audience + format + duration inputs
- Claude generates full curriculum with modules, objectives, activities, assessments
- Expandable module cards
- LMS-ready output framing
- 4 example prompts preloaded
- Server-side API route — API key never exposed to client
- **Simulated output in dev** — try the app without an API key
- **OpenAPI/Swagger UI** at `/api-docs`
- **Quality gates:** ESLint, Prettier, TypeScript, Jest
- **Pre-commit hooks:** Husky + lint-staged + Commitlint
- **Commitizen** for conventional commits

## Quick Start

```bash
# Install dependencies
npm install

# Run development server (works without API key — uses simulated output)
npm run dev
# → http://localhost:3000
```

For real Claude-powered generation, add your API key:

```bash
cp .env.example .env.local
# Edit .env.local: ANTHROPIC_API_KEY=sk-ant-...
```

## API Documentation

- **Swagger UI:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **OpenAPI JSON:** `GET /api/openapi`

## Development Standards

| Tool               | Purpose                                  |
| ------------------ | ---------------------------------------- |
| **ESLint**         | Code quality, Next.js rules              |
| **Prettier**       | Code formatting                          |
| **TypeScript**     | Type safety                              |
| **Jest + RTL**     | Unit & integration tests                 |
| **Husky**          | Git hooks                                |
| **lint-staged**    | Run lint/format on staged files only     |
| **Commitlint**     | Enforce conventional commits             |
| **Commitizen**     | Interactive commit (`npm run commit`)    |
| **TypeDoc**        | Auto-generated API docs (`npm run docs`) |
| **Dependabot**     | Automated dependency updates             |
| **GitHub Actions** | CI (lint, test, build) + security audit  |

### Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier format all
npm run format:check # Prettier check only
npm run typecheck    # TypeScript check
npm run test         # Run tests
npm run test:watch   # Tests in watch mode
npm run test:coverage # Tests with coverage
npm run commit       # Commitizen (conventional commit)
npm run docs         # Generate TypeDoc
npm run validate     # Full check (typecheck + lint + format + test)
```

### Pre-commit

On `git commit`, Husky runs:

1. **pre-commit:** `lint-staged` (ESLint + Prettier on staged files)
2. **commit-msg:** `commitlint` validates message format

## Deploy (Vercel)

1. [Import from GitHub](https://vercel.com/new?filter=next.js&repository=https://github.com/garthpuckerin/curriculum-builder)
2. Add environment variable: `ANTHROPIC_API_KEY` = your API key
3. Deploy

Vercel will build from `main` and deploy on each push.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── generate/     # POST /api/generate
│   │   └── openapi/     # GET /api/openapi (OpenAPI spec)
│   ├── api-docs/        # Swagger UI at /api-docs
│   ├── CurriculumBuilder.jsx
│   ├── layout.tsx
│   └── page.tsx
├── openapi.json         # OpenAPI 3.0 spec
├── .husky/              # Git hooks
├── .github/
│   ├── workflows/       # CI, security
│   └── dependabot.yml
└── ...
```

## Contributing

- [CONTRIBUTING.md](CONTRIBUTING.md) — setup, commit conventions
- [GIT_WORKFLOW.md](GIT_WORKFLOW.md) — branch strategy, PR flow, release process

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting and best practices.
