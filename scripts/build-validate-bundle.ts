import { join } from 'node:path/posix';
import process from 'node:process';

import { exec } from './helpers/exec.ts';
import {
  getRootFolder,
  toPosixPath
} from './helpers/root.ts';

interface ScenarioResult {
  readonly error: string;
  readonly name: string;
  readonly passed: boolean;
}

const SCENARIOS = [
  'scenario-1-standalone',
  'scenario-2-obsidian',
  'scenario-3-codemirror',
  'scenario-4-full'
];

async function main(): Promise<void> {
  const root = getRootFolder();

  if (!root) {
    throw new Error('Could not find root folder');
  }

  const bundleCompatDir = join(root, 'tests/bundle-compat');
  const results: ScenarioResult[] = [];

  for (const scenario of SCENARIOS) {
    const scenarioDir = join(bundleCompatDir, scenario);
    const scenarioDirNative = toPosixPath(scenarioDir);
    console.log(`\n=== ${scenario} ===`);

    try {
      await exec('npm install', { cwd: scenarioDirNative, isQuiet: true });
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      console.log(`  SKIP (npm install failed): ${error}`);
      results.push({ error, name: scenario, passed: false });
      continue;
    }

    try {
      await exec('npx tsc --noEmit', { cwd: scenarioDirNative, isQuiet: true });
      console.log('  PASS');
      results.push({ error: '', name: scenario, passed: true });
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      const lines = error.split('\n');
      const MAX_ERROR_LINES = 20;
      const preview = lines.length > MAX_ERROR_LINES
        ? [...lines.slice(0, MAX_ERROR_LINES), `  ... (${String(lines.length - MAX_ERROR_LINES)} more lines)`]
        : lines;
      console.log('  FAIL');
      console.log(preview.join('\n'));
      results.push({ error, name: scenario, passed: false });
    }
  }

  console.log('\n=== Summary ===');
  for (const result of results) {
    console.log(`  ${result.passed ? 'PASS' : 'FAIL'} ${result.name}`);
  }

  const hasFailures = results.some((r) => !r.passed);
  if (hasFailures) {
    process.exitCode = 1;
  }
}

await main();
