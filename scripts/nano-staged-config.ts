/**
 * @file
 *
 * Nano-staged configuration for pre-commit hooks.
 */

import process from 'node:process';

import {
  isEnvVariableOff,
  loadEnvFileIfExists
} from './helpers/env-toggle.ts';
import { getPackageManagerRunCommand } from './helpers/package-manager.ts';

interface NanoStagedContext {
  filenames: string[];
}

type NanoStagedHandler = (context: NanoStagedContext) => string[];

const BATCH_SIZE = 30;

const NANO_STAGED_ENV_VARIABLE = 'NANO_STAGED';

/**
 * The `<manager> run` prefix every task below is built on, resolved once for the process.
 *
 * Detection is a handful of `existsSync` calls and at most one `package.json` read - no `.env` read and
 * no `process.exit`, which is what lets it sit at module scope beside the tasks it prefixes.
 */
const PACKAGE_MANAGER_RUN_COMMAND = getPackageManagerRunCommand().join(' ');

const tasks: Record<string, NanoStagedHandler> = {
  '*': ({ filenames }) => batch(filenames).map((b) => `${PACKAGE_MANAGER_RUN_COMMAND} spellcheck -- ${join(b)}`),
  '*.{ts,tsx,mts}': ({ filenames }) =>
    batch(filenames).flatMap((b) => [
      `${PACKAGE_MANAGER_RUN_COMMAND} lint:fix -- ${join(b)}`,
      `${PACKAGE_MANAGER_RUN_COMMAND} format -- ${join(b)}`
    ]),
  /*
   * Lint only, with no `format` step beside it: dprint loads a TypeScript, a JSON and a markdown plugin, and none
   * of them formats Astro, so pointing `format` at a `.astro` file would be a no-op at best. ESLint is the whole
   * of what this repo can run over these 14 files, and the pre-commit hook is the only place any gate runs.
   */
  '*.astro': ({ filenames }) => batch(filenames).map((b) => `${PACKAGE_MANAGER_RUN_COMMAND} lint:fix -- ${join(b)}`),
  '*.md': ({ filenames }) => batch(filenames).map((b) => `${PACKAGE_MANAGER_RUN_COMMAND} lint:md:fix -- ${join(b)}`),
  /*
   * The vendored ESLint rule sources, which are hand-copies of `obsidian-dev-utils`' and are supposed to be
   * the same bytes. Running last is what makes this useful rather than merely present: `lint:fix` and
   * `format` above rewrite a staged copy in place, which is one of the ways these files drift, so the check
   * has to read what is about to be committed rather than what was staged. The key sorts to last here on its
   * own - perfectionist puts a recursive glob after the single-segment ones - so that order is enforced
   * rather than merely typed in.
   *
   * It is the one task here that takes no filenames, because it compares whole trees rather than the files
   * that happen to be staged. The glob is only what decides whether it runs at all, so an ordinary commit
   * touching no vendored file fetches nothing.
   */
  '**/eslint-rules/*.ts': () => [`${PACKAGE_MANAGER_RUN_COMMAND} check:vendored-eslint-rules`]
};

/**
 * The nano-staged task configuration, resolved with a per-developer opt-out.
 *
 * Loads a gitignored `.env` if present, then - when `NANO_STAGED` is set to an off value (`0`, `false`,
 * `off`, or `no`) - prints a notice and exits the process successfully so the pre-commit checks are skipped.
 * This mirrors husky's own `HUSKY=0` switch, but scoped to the nano-staged step (so the commit-msg hook
 * still runs). Otherwise it resolves to {@link tasks}.
 */
export const config = getNanoStagedConfig();

function batch(filenames: string[]): string[][] {
  const result: string[][] = [];
  for (let index = 0; index < filenames.length; index += BATCH_SIZE) {
    result.push(filenames.slice(index, index + BATCH_SIZE));
  }
  return result;
}

function getNanoStagedConfig(): Record<string, NanoStagedHandler> {
  loadEnvFileIfExists();

  if (isEnvVariableOff(NANO_STAGED_ENV_VARIABLE)) {
    process.stdout.write(`nano-staged: skipped (${NANO_STAGED_ENV_VARIABLE} is off).\n`);
    process.exit(0);
  }

  return tasks;
}

function join(filenames: string[]): string {
  return filenames.join(' ');
}
