/**
 * @file
 *
 * Shared environment-variable off switches for the npm scripts.
 *
 * Every npm script can be skipped by setting an environment variable named after it - the script name
 * uppercased, with every non-alphanumeric character replaced by `_`:
 *
 * | Script         | Switch           |
 * |----------------|------------------|
 * | `lint`         | `LINT=0`         |
 * | `lint:md:fix`  | `LINT_MD_FIX=0`  |
 * | `format:check` | `FORMAT_CHECK=0` |
 *
 * This mirrors the pre-existing `NANO_STAGED=0` / `HUSKY=0` escape hatches, and reuses their notion of an
 * "off" value, so there is a single answer to what counts as off across the whole tool set.
 */

import { existsSync } from 'node:fs';
import process from 'node:process';

/*
 * The values that switch a variable off. Anything else - including an unset variable - leaves it on, so the
 * default is always "run the script".
 */
const OFF_VALUES: ReadonlySet<string> = new Set(['0', 'false', 'no', 'off']);

/*
 * The optional per-developer environment file. Loaded via Node's own `process.loadEnvFile`, so it behaves
 * the same on every platform and shell.
 */
const ENV_FILE_PATH = '.env';

/* Matches every run of characters that cannot appear in an environment variable name. */
const NON_ALPHANUMERIC_REG_EXP = /[^a-z0-9]+/gi;

/* The environment variable npm sets to the name of the script it is currently running. */
const NPM_SCRIPT_NAME_ENV_VARIABLE = 'npm_lifecycle_event';

/**
 * Exits the process successfully when the npm script that is currently running has been switched off.
 *
 * Called as the first statement of every `scripts/*.ts` entry point, so a script never has to declare its
 * own switch, and each `npm run` sub-step of a composite script carries its own.
 */
export function exitIfScriptDisabled(): void {
  const disabledScriptEnvVariableName = getDisabledScriptEnvVariableName();
  if (disabledScriptEnvVariableName === null) {
    return;
  }

  process.stdout.write(`Skipped (${disabledScriptEnvVariableName} is off).\n`);
  process.exit(0);
}

/**
 * Resolves the off switch for the npm script that is currently running, loading the `.env` file first.
 *
 * The script name comes from npm itself, so no script has to declare its own switch. When the script was
 * started directly rather than through npm, there is no name to derive from and nothing is ever skipped.
 *
 * Returns the name of the environment variable that switched the current script off, or `null` when the
 * script should run.
 */
export function getDisabledScriptEnvVariableName(): null | string {
  loadEnvFileIfExists();
  const scriptName = process.env[NPM_SCRIPT_NAME_ENV_VARIABLE];
  if (!scriptName) {
    return null;
  }

  const envVariableName = toEnvVariableName(scriptName);
  return isEnvVariableOff(envVariableName) ? envVariableName : null;
}

/**
 * Determines whether the environment variable is set to an off value (`0`, `false`, `no`, or `off`,
 * case-insensitively and ignoring surrounding whitespace).
 */
export function isEnvVariableOff(envVariableName: string): boolean {
  return OFF_VALUES.has((process.env[envVariableName] ?? '').trim().toLowerCase());
}

/**
 * Loads the optional `.env` file into `process.env` when it exists, so a developer can park a switch such as
 * `LINT_MD=0` there instead of prefixing every command.
 */
export function loadEnvFileIfExists(): void {
  if (existsSync(ENV_FILE_PATH)) {
    process.loadEnvFile(ENV_FILE_PATH);
  }
}

function toEnvVariableName(scriptName: string): string {
  return scriptName.replaceAll(NON_ALPHANUMERIC_REG_EXP, '_').toUpperCase();
}
