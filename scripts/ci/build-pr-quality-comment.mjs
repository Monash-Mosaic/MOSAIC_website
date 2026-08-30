#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';

const HEAD_REPORT = process.argv[2] ?? 'report.json';
const BASE_REPORT = process.argv[3] || '';

function readReport(path) {
  if (!path) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function pctFromHits(hits) {
  const values = Object.values(hits ?? {});
  if (!values.length) return null;
  const covered = values.filter((value) => value > 0).length;
  return (covered / values.length) * 100;
}

function branchPct(branches) {
  const groups = Object.values(branches ?? {});
  if (!groups.length) return null;

  let total = 0;
  let covered = 0;
  for (const group of groups) {
    for (const hit of group) {
      total += 1;
      if (hit > 0) covered += 1;
    }
  }

  if (!total) return null;
  return (covered / total) * 100;
}

function fileMetrics(report, filePath) {
  const entry = report?.coverageMap?.[filePath];
  if (!entry) return null;

  return {
    statements: pctFromHits(entry.s),
    branches: branchPct(entry.b),
    functions: pctFromHits(entry.f),
  };
}

function aggregateMetrics(report) {
  const files = Object.keys(report?.coverageMap ?? {});
  if (!files.length) return null;

  const buckets = {
    statements: [],
    branches: [],
    functions: [],
  };

  for (const filePath of files) {
    const metrics = fileMetrics(report, filePath);
    if (!metrics) continue;
    if (metrics.statements != null) buckets.statements.push(metrics.statements);
    if (metrics.branches != null) buckets.branches.push(metrics.branches);
    if (metrics.functions != null) buckets.functions.push(metrics.functions);
  }

  const average = (values) =>
    values.length
      ? values.reduce((sum, value) => sum + value, 0) / values.length
      : null;

  return {
    statements: average(buckets.statements),
    branches: average(buckets.branches),
    functions: average(buckets.functions),
  };
}

function formatPct(value) {
  if (value == null || Number.isNaN(value)) return '—';
  return `${value.toFixed(1)}%`;
}

function formatDelta(head, base) {
  if (head == null || base == null) return '—';
  const delta = head - base;
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta.toFixed(1)}%`;
}

function formatDuration(report) {
  const durationMs =
    report?.endTime && report?.startTime
      ? report.endTime - report.startTime
      : (report?.testResults ?? [])
          .flatMap((suite) => suite.assertionResults ?? [])
          .reduce((sum, test) => sum + (test.duration ?? 0), 0);

  if (!durationMs) return '';
  return ` (${(durationMs / 1000).toFixed(1)}s)`;
}

function buildTestsLine(report) {
  if (!report) {
    return '❌ Test report unavailable';
  }

  const passed = report.numPassedTests ?? 0;
  const failed = report.numFailedTests ?? 0;
  const pending = report.numPendingTests ?? 0;
  const suffix = formatDuration(report);

  if (failed > 0) {
    let line = `❌ ${passed} passed, ${failed} failed`;
    if (pending > 0) line += `, ${pending} skipped`;
    return `${line}${suffix}`;
  }

  if (report.success !== true) {
    return '❌ Tests did not complete successfully';
  }

  let line = `✅ ${passed} passed`;
  if (pending > 0) line += `, ${pending} skipped`;
  return `${line}${suffix}`;
}

function buildCoverageSummaryLine(headMetrics, baseMetrics) {
  if (!headMetrics) {
    return '—';
  }

  const head = headMetrics?.statements;
  if (head == null) return '—';

  const base = baseMetrics?.statements;
  if (base == null) return formatPct(head);

  return `${formatPct(head)} (${formatDelta(head, base)} vs main)`;
}

function buildCoverageTable(headReport, baseReport) {
  const headMetrics = aggregateMetrics(headReport);
  const baseMetrics = baseReport ? aggregateMetrics(baseReport) : null;

  if (!headMetrics) {
    return {
      summaryLine: '—',
      details: '_Coverage data unavailable._',
    };
  }

  const rows = [
    ['Statements', headMetrics.statements, baseMetrics?.statements ?? null],
    ['Branches', headMetrics.branches, baseMetrics?.branches ?? null],
    ['Functions', headMetrics.functions, baseMetrics?.functions ?? null],
  ];

  const lines = [
    '### Coverage summary',
    '',
    '| Metric | This PR | Δ vs main |',
    '| --- | ---: | ---: |',
  ];

  for (const [label, head, base] of rows) {
    lines.push(`| ${label} | ${formatPct(head)} | ${formatDelta(head, base)} |`);
  }

  const fileRows = Object.keys(headReport.coverageMap ?? {})
    .map((filePath) => {
      const head = fileMetrics(headReport, filePath);
      const base = baseReport ? fileMetrics(baseReport, filePath) : null;
      if (!head || head.statements == null) return null;

      return {
        filePath: filePath.replace(/^\.\//, ''),
        statements: head.statements,
        delta:
          base?.statements != null ? head.statements - base.statements : null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.statements - b.statements || a.filePath.localeCompare(b.filePath))
    .slice(0, 20);

  if (fileRows.length) {
    lines.push('', '### Lowest-covered files', '', '| File | Statements | Δ vs main |', '| --- | ---: | ---: |');
    for (const row of fileRows) {
      const delta =
        row.delta == null ? '—' : `${row.delta > 0 ? '+' : ''}${row.delta.toFixed(1)}%`;
      lines.push(`| \`${row.filePath}\` | ${formatPct(row.statements)} | ${delta} |`);
    }

    const totalFiles = Object.keys(headReport.coverageMap ?? {}).length;
    if (totalFiles > fileRows.length) {
      lines.push('', `_Showing ${fileRows.length} of ${totalFiles} covered files._`);
    }
  }

  return {
    summaryLine: buildCoverageSummaryLine(headMetrics, baseMetrics),
    details: lines.join('\n'),
  };
}

const headReport = readReport(HEAD_REPORT);
const baseReport = BASE_REPORT ? readReport(BASE_REPORT) : null;
const coverage = buildCoverageTable(headReport, baseReport);

const body = [
  '<!-- pr-quality-report -->',
  '## PR Quality Report',
  '',
  '| Category | Status |',
  '| --- | --- |',
  `| Tests | ${buildTestsLine(headReport)} |`,
  `| Coverage | ${coverage.summaryLine} |`,
  '',
  coverage.details,
].join('\n');

writeFileSync('pr-quality-comment.md', `${body}\n`);
