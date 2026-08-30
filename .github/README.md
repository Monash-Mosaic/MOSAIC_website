# GitHub Actions — CI Architecture

This repository uses a single orchestration workflow (`ci.yml`) that defines jobs and mostly delegates step logic to composite actions under `.github/actions/`.

## Folder structure

```
.github/
├── README.md                          # This document
├── actions/
│   ├── setup-node-environment/        # Checkout + Node.js + npm cache
│   ├── install-dependencies/          # node_modules cache + npm ci
│   ├── restore-next-cache/            # .next/cache restore
│   ├── restore-jest-cache/            # Jest transform cache restore
│   ├── save-next-cache/               # .next/cache save (after build)
│   ├── cleanup-ci-workspace/          # Runner workspace cleanup profiles
│   ├── dependency-review/             # Dependency Review action
│   ├── post-pr-quality-placeholder/   # Initial PR quality sticky comment
│   ├── run-ci-check/                  # lint | test | build matrix leg
│   ├── post-coverage-report/          # Coverage delta + sticky PR comment
│   ├── write-ci-summary/              # Workflow step summary table
│   └── cleanup-workflow-artifacts/    # Delete workflow run artifacts
└── workflows/
    ├── ci.yml                         # Orchestrator (entry point)
    ├── deploy-preview.yml             # Preview deploy (separate from CI)
    ├── deploy-staging.yml
    ├── deploy.yml
    └── codeql.yml
```

## Orchestration (`ci.yml`)

`ci.yml` defines triggers, concurrency, permissions, job dependencies, and the lint/test/build matrix. Step logic lives in composite actions.

Jobs that call local composite actions run `actions/checkout` first so action files are present on the runner workspace. The workflow also uses a YAML anchor for the shared path filters so pull request and push triggers stay aligned.

### Job graph

```
dependency_review ──┐
osv_scan_pr/main ───┼──► security_gates ──► ci_summary ──► cleanup
ci-checks ──────────┘         ▲
    │                         │
    └──► coverage_report ─────┘ (PR only)
base_coverage ──────► coverage_report (PR only)
```

### Triggers

- **pull_request** (`opened`, `synchronize`, `reopened`) with path filters
- **push** to `main` with the same path filters

### Concurrency

- Group: `ci-${{ github.ref }}`
- `cancel-in-progress: true`

## Composite actions

| Action | Used by job |
| --- | --- |
| `dependency-review` | `dependency_review` |
| `run-ci-check` | `ci-checks` (matrix: lint, test, build) |
| `post-pr-quality-placeholder` | `pr_quality_placeholder` |
| `post-coverage-report` | `coverage_report` |
| `write-ci-summary` | `ci_summary` |
| `cleanup-workflow-artifacts` | `cleanup` |
| `setup-node-environment` | `run-ci-check` |
| `install-dependencies` | `run-ci-check` |
| `restore-next-cache` | `run-ci-check` |
| `restore-jest-cache` | `run-ci-check` |
| `save-next-cache` | `run-ci-check` (build leg) |
| `cleanup-ci-workspace` | `run-ci-check`, `post-coverage-report` |

OSV scanning (`osv_scan_pr` / `osv_scan_main`) calls Google's reusable workflows directly from `ci.yml` — that cannot be moved into a composite action.

`dependency_review` only runs for pull requests, and write permissions are scoped down to the jobs that actually need them.

`base_coverage` is also inlined in `ci.yml` because it checks out the PR base SHA; if it used a local composite action, that action would disappear from the workspace during post-run on branches where the base commit does not contain the new action files. It also caches the generated baseline `report.json` by base SHA so repeated PR updates can reuse the coverage baseline while the target branch is unchanged.

### Caching strategy

| Cache | Key | Restore keys |
| --- | --- | --- |
| npm (via setup-node) | Managed by `actions/setup-node` | — |
| `node_modules` | `node-modules-${{ runner.os }}-${{ hashFiles('package-lock.json') }}` | `node-modules-${{ runner.os }}-` |
| `.next/cache` | `next-${{ runner.os }}-${{ hashFiles('package-lock.json') }}` | `next-${{ runner.os }}-` |
| Jest | `jest-${{ runner.os }}-${{ hashFiles('package-lock.json', 'jest.config.js') }}` | `jest-${{ runner.os }}-` |

`install-dependencies` explicitly restores and saves the `node_modules` cache, and `run-ci-check` saves the Jest cache after the test leg. Build saves `.next/cache` after the build matrix leg completes.

### Dependabot

When `github.actor` is `dependabot[bot]`, `install-dependencies` runs `npm install --package-lock-only` before `npm ci`.

## Artifacts

| Name | Producer | Consumer | Retention |
| --- | --- | --- | --- |
| `test-report` | `ci-checks` (test) | `coverage_report` | 7 days |
| `base-coverage-report` | `base_coverage` | `coverage_report` | 1 day |

`cleanup` deletes all artifacts for the workflow run after `ci_summary` completes.

## Reporting

| Output | Where |
| --- | --- |
| Jest GitHub Check | `dorny/test-reporter` in `run-ci-check` (test leg) |
| Test step summary | `GITHUB_STEP_SUMMARY` in `run-ci-check` (test leg) |
| CI timing summary | `write-ci-summary` composite action |
| PR sticky comment | `post-coverage-report` (`header: pr-quality-report`) |

Preview deployment comments are handled by `deploy-preview.yml` (separate workflow).

## Adding a new CI job

1. Add a composite action under `.github/actions/<name>/action.yml` if the logic is reusable.
2. Add a job (or matrix leg) in `ci.yml` with correct `needs` / `if`.
3. Reuse existing setup, cache, and cleanup actions where possible.
4. Update this README.

## Branch protection

The merge gate check is **`CI / security_gates`**.

Matrix checks appear as **`CI / ci-checks / ci-checks (lint|test|build)`**.

## Related workflows

- **`deploy-preview.yml`** — Cloudflare preview deploy (runs in parallel with CI on PRs; not part of `ci.yml`).
- **`deploy-staging.yml`** — Staging deploy on release publish.
- **`deploy.yml`** — Manual production deploy.
- **`codeql.yml`** — CodeQL security scanning.
