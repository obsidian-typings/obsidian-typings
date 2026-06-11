import { join } from 'node:path/posix';
import process from 'node:process';

import {
  checkProjectTypes,
  parseTsConfig,
  toCanonical
} from './helpers/check-project-types.ts';
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

const NODE_MODULES_SEGMENT = '/node_modules/';
const OBSIDIAN_TYPINGS_SEGMENT = '/node_modules/obsidian-typings/';

async function main(): Promise<void> {
  const root = getRootFolder();

  if (!root) {
    throw new Error('Could not find root folder');
  }

  const rootCanonical = toCanonical(root);
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
      const { fileNames, options } = parseTsConfig(join(scenarioDir, 'tsconfig.json'));
      const isOk = checkProjectTypes({
        options,
        rootNames: fileNames,
        shouldKeepFile: (fileName) => shouldKeepScenarioFile(fileName, rootCanonical)
      });

      if (isOk) {
        console.log('  PASS');
        results.push({ error: '', name: scenario, passed: true });
      } else {
        console.log('  FAIL');
        results.push({ error: 'Type errors in scenario files', name: scenario, passed: false });
      }
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      console.log('  FAIL');
      console.log(error);
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

/**
 * In a bundle-compat scenario, keeps diagnostics for the scenario's own files and for our
 * published `obsidian-typings` types (resolved via the `file:` symlink to the repo root, or kept
 * under `node_modules/obsidian-typings` when symlinks are preserved). Everything else under
 * `node_modules` — obsidian and any other third-party library — is ignored.
 *
 * @param fileName - The diagnostic's source file, already passed through `toCanonical`.
 * @param rootCanonical - The repo root, already passed through `toCanonical`.
 * @returns `true` to report the diagnostic, `false` to ignore it.
 */
function shouldKeepScenarioFile(fileName: string, rootCanonical: string): boolean {
  if (fileName.startsWith(`${rootCanonical}/`) && !fileName.includes(NODE_MODULES_SEGMENT)) {
    return true;
  }

  return fileName.includes(OBSIDIAN_TYPINGS_SEGMENT);
}

await main();
