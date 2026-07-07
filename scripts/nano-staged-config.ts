/**
 * @file
 *
 * Nano-staged configuration for pre-commit hooks.
 */

import { existsSync } from 'node:fs';
import process from 'node:process';

interface NanoStagedContext {
  filenames: string[];
}

type NanoStagedHandler = (ctx: NanoStagedContext) => string[];

const BATCH_SIZE = 30;

const tasks: Record<string, NanoStagedHandler> = {
  '*': ({ filenames }) => batch(filenames).map((b) => `npm run spellcheck -- ${join(b)}`),
  '*.md': ({ filenames }) => batch(filenames).map((b) => `npm run lint:md:fix -- ${join(b)}`),
  '*.{ts,tsx,mts}': ({ filenames }) =>
    batch(filenames).flatMap((b) => [
      `npm run lint:fix -- ${join(b)}`,
      `npm run format -- ${join(b)}`
    ])
};

const NANO_STAGED_OFF_VALUES: ReadonlySet<string> = new Set(['0', 'false', 'no', 'off']);

/**
 * The nano-staged task configuration, resolved with a per-developer opt-out.
 *
 * Loads a gitignored `.env` if present (via Node's own `process.loadEnvFile`, so it behaves the same
 * on every platform and shell), then — when `NANO_STAGED` is set to an off value (`0`, `false`, `off`,
 * or `no`) — prints a notice and exits the process successfully so the pre-commit checks are skipped.
 * This mirrors husky's own `HUSKY=0` switch, but scoped to the nano-staged step (so the commit-msg
 * hook still runs). Otherwise it resolves to {@link tasks}.
 */
export const config = getNanoStagedConfig();

function getNanoStagedConfig(): Record<string, NanoStagedHandler> {
  if (existsSync('.env')) {
    process.loadEnvFile('.env');
  }

  if (isNanoStagedDisabled(process.env['NANO_STAGED'])) {
    process.stdout.write('nano-staged: skipped (NANO_STAGED is off).\n');
    process.exit(0);
  }

  return tasks;
}

function isNanoStagedDisabled(value: string | undefined): boolean {
  return NANO_STAGED_OFF_VALUES.has((value ?? '').trim().toLowerCase());
}

function batch(filenames: string[]): string[][] {
  const result: string[][] = [];
  for (let i = 0; i < filenames.length; i += BATCH_SIZE) {
    result.push(filenames.slice(i, i + BATCH_SIZE));
  }
  return result;
}

function join(filenames: string[]): string {
  return filenames.join(' ');
}
