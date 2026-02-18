# Git Workflow

## Required

**All changes must follow this workflow.** No direct commits to `main` or `develop`.

- Branch from `develop` → work on `feat/*` or `fix/*` → PR into `develop` → merge
- Releases: merge `develop` → `main` → update CHANGELOG, bump version, tag

## Branch Strategy

| Branch       | Purpose                                      |
| ------------ | -------------------------------------------- |
| **main**     | Production. Tagged releases only.            |
| **develop**  | Integration. All features merge here first.  |
| **feat/\***  | New features (e.g. `feat/streaming`)         |
| **fix/\***   | Bug fixes (e.g. `fix/audit-vulnerabilities`) |
| **docs/\***  | Documentation only                           |
| **chore/\*** | Maintenance (deps, config)                   |

## Flow

```
main ──────────────────────────────────────● (v1.1.0)
     \                                   /
      \    develop ─────●────●────●─────/
                        \   /
                         feat/xyz
```

1. Branch from **develop**
2. Work, commit (conventional commits)
3. Open PR into **develop**
4. CI passes → merge
5. When ready to release: merge **develop** → **main**
6. Update CHANGELOG, bump version, tag

## Step-by-Step

### Starting Work

```bash
git checkout develop
git pull origin develop
git checkout -b feat/add-export-button
```

### Committing

```bash
# Use Commitizen (recommended)
npm run commit

# Or manual (must pass commitlint)
git add .
git commit -m "feat(ui): add export to PDF button"
```

Pre-commit runs: ESLint, Prettier on staged files. Commit-msg validates format.

### Before Pushing

```bash
npm run validate
```

### Opening a PR

1. Push: `git push -u origin feat/add-export-button`
2. Open PR: **base** = `develop`, **compare** = your branch
3. CI must pass (typecheck, lint, format, test, build)
4. Request review if required
5. Squash or merge per team preference

### Releasing to Main

```bash
git checkout main
git pull origin main
git merge develop

# Update release
# 1. Edit CHANGELOG.md: move [Unreleased] → [1.x.0] - YYYY-MM-DD
# 2. Bump package.json version
npm run format   # if needed

git add CHANGELOG.md package.json
git commit -m "chore(release): 1.x.0"
git tag v1.x.0
git push origin main --tags
```

### Syncing Develop

```bash
git checkout develop
git merge main
git push origin develop
```

## Conventions

- **Commits:** Conventional Commits (enforced by Commitlint)
- **Branches:** `type/short-description` (lowercase, hyphens)
- **Tags:** `v1.2.3` (semver)
- **PRs:** Reference issues with `Closes #123`

## CI

- **Push/PR to main or develop:** typecheck, lint, format check, test, build
- **Security:** weekly `npm audit` on main

## Recommended Branch Protection (GitHub)

- **main:** Require PR, require status checks (CI), no direct push
- **develop:** Require PR, require status checks (optional)
