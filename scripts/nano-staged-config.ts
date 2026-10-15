/**
 * @file
 *
 * Nano-staged configuration for pre-commit hooks.
 */

import {
  isEnvVariableOff,
  loadEnvFileIfExists
} from '@mnaoumov/typescript-dev-toolkit/env-toggle';
import { getPackageManagerRunCommand } from '@mnaoumov/typescript-dev-toolkit/package-manager';
import process from 'node:process';

interface NanoStagedContext {
  filenames: string[];
}

type NanoStagedHandler = (ctx: NanoStagedContext) => string[];

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
  '*.md': ({ filenames }) => batch(filenames).map((b) => `${PACKAGE_MANAGER_RUN_COMMAND} lint:md:fix -- ${join(b)}`)
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
  for (let i = 0; i < filenames.length; i += BATCH_SIZE) {
    result.push(filenames.slice(i, i + BATCH_SIZE));
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
