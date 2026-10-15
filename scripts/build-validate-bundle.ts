import {
  CliTaskResult,
  wrapCliTask
} from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import { exec } from '@mnaoumov/typescript-dev-toolkit/exec';
import {
  execFromRoot,
  getRootFolder
} from '@mnaoumov/typescript-dev-toolkit/root';
import { toPosixPath } from '@mnaoumov/typescript-lib/path';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path/posix';

import {
  checkProjectTypes,
  parseTsConfig,
  toCanonical
} from './helpers/check-project-types.ts';

interface ScenarioResult {
  readonly error: string;
  readonly name: string;
  readonly passed: boolean;
}

const NODE_MODULES_SEGMENT = '/node_modules/';
const OBSIDIAN_SEGMENT = '/node_modules/obsidian/';
const OBSIDIAN_TYPINGS_SEGMENT = '/node_modules/obsidian-typings/';

async function main(): Promise<CliTaskResult> {
  const root = getRootFolder();

  if (!root) {
    throw new Error('Could not find root folder');
  }

  await execFromRoot('git fetch origin');
  await execFromRoot('git restore --source=origin/main -- tests');

  const rootCanonical = toCanonical(root);
  const bundleCompatDirectory = join(root, 'tests/bundle-compat');
  const results: ScenarioResult[] = [];

  const scenarios = await readdir(bundleCompatDirectory);
  for (const scenario of scenarios) {
    const scenarioDirectory = join(bundleCompatDirectory, scenario);
    const scenarioDirectoryNative = toPosixPath(scenarioDirectory);
    console.log(`\n=== ${scenario} ===`);

    try {
      await exec('npm install', { cwd: scenarioDirectoryNative, isQuiet: true });
    } catch (error_) {
      const error = error_ instanceof Error ? error_.message : String(error_);
      console.log(`  SKIP (npm install failed): ${error}`);
      results.push({ error, name: scenario, passed: false });
      continue;
    }

    try {
      const { fileNames, options } = parseTsConfig(join(scenarioDirectory, 'tsconfig.json'));
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
    } catch (error_) {
      const error = error_ instanceof Error ? error_.message : String(error_);
      console.log('  FAIL');
      console.log(error);
      results.push({ error, name: scenario, passed: false });
    }
  }

  console.log('\n=== Summary ===');
  for (const result of results) {
    console.log(`  ${result.passed ? 'PASS' : 'FAIL'} ${result.name}`);
  }

  return CliTaskResult.Success(results.every((r) => r.passed));
}

/**
 * In a bundle-compat scenario, keeps diagnostics for the scenario's own files, for our published
 * `obsidian-typings` types (resolved via the `file:` symlink to the repo root, or kept under
 * `node_modules/obsidian-typings` when symlinks are preserved), and for `obsidian` itself. The
 * `obsidian` package is kept because `obsidian-typings` augments it and is responsible for keeping
 * the augmented `obsidian.d.ts` internally consistent — e.g. a class declared `implements
 * HistoryHandler` that lacks the required method is a defect our augmentations must fix, and would
 * otherwise be silently ignored. Every other third-party library under `node_modules` is ignored.
 *
 * @param fileName - The diagnostic's source file, already passed through `toCanonical`.
 * @param rootCanonical - The repo root, already passed through `toCanonical`.
 * @returns `true` to report the diagnostic, `false` to ignore it.
 */
function shouldKeepScenarioFile(fileName: string, rootCanonical: string): boolean {
  return (fileName.startsWith(`${rootCanonical}/`) && !fileName.includes(NODE_MODULES_SEGMENT))
    || fileName.includes(OBSIDIAN_TYPINGS_SEGMENT)
    || fileName.includes(OBSIDIAN_SEGMENT);
}

await wrapCliTask(main);
