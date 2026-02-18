# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

Please report security vulnerabilities by opening a GitHub issue or contacting the maintainers directly. Do not disclose security issues in public repositories.

## Best Practices

- **API keys:** Never commit `ANTHROPIC_API_KEY` or any secrets. Use `.env.local` (gitignored) for local development.
- **Dependencies:** Run `npm audit` regularly. Dependabot will open PRs for known vulnerabilities.
- **Updates:** Keep dependencies up to date. Review Dependabot PRs promptly.
