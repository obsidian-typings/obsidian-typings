/**
 * @file
 *
 * Resolves the project root and runs commands from it.
 *
 * This file is one of **three byte-identical copies** - `scripts/helpers/root.ts`,
 * `workflow-scripts/helpers/root.ts` and `docs/scripts/helpers/root.ts` - for the reason `helpers/exec.ts`
 * beside it spells out. `npm run check:exec-helpers` asserts the three are identical.
 */

import { existsSync } from 'node:fs';
import {
  dirname,
  join
} from 'node:path/posix';
import process from 'node:process';

import type {
  CommandPart,
  ExecOption,
  ExecResult
} from './exec.ts';

import { exec } from './exec.ts';

export interface ExecFromRootDetailedOptions extends ExecFromRootOption {
  readonly shouldIncludeDetails: true;
}

export interface ExecFromRootOption extends ExecOption {
  /**
   * Whether a command run from a folder with no `package.json` ancestor is an error.
   *
   * Defaults to `true`, which is the behavior a caller wants when "the root" means this project. Pass
   * `false` to run from {@link ExecOption.cwd} (or `process.cwd()`) instead - `docs/scripts/setup.ts` does,
   * because it builds a throwaway package in a temp folder that has no ancestor `package.json` of its own.
   *
   * This option belongs to {@link execFromRoot} and not to {@link ExecOption}: `exec` never reads it, so
   * declaring it there would put a root-only flag on the exec surface.
   */
  readonly shouldFailIfCalledFromOutsideRoot?: boolean;
}

export interface ExecFromRootSimpleOptions extends ExecFromRootOption {
  readonly shouldIncludeDetails?: false;
}

export async function execFromRoot(command: CommandPart[] | string, options?: ExecFromRootSimpleOptions): Promise<string>;
export function execFromRoot(command: CommandPart[] | string, options: ExecFromRootDetailedOptions): Promise<ExecResult>;
export function execFromRoot(command: CommandPart[] | string, options: ExecFromRootOption = {}): Promise<ExecResult | string> {
  let root = getRootFolder(options.cwd);

  if (!root) {
    if (options.shouldFailIfCalledFromOutsideRoot ?? true) {
      throw new Error('Could not find root folder');
    }

    root = toPosixPath(options.cwd ?? process.cwd());
  }

  /*
   * Both branches spell `shouldIncludeDetails` out as a literal because `exec`'s overloads are selected by
   * that literal (`ExecDetailedOptions` requires `true`, `ExecSimpleOptions` allows only `false`), while
   * `ExecOption` declares it `boolean` -- so spreading `...options` widens it and matches neither overload.
   * That makes `unicorn/prefer-minimal-ternary` unsatisfiable here, and the if/return form it asks for trips
   * `unicorn/prefer-ternary` instead; `scripts/eslint-config.ts` turns the first off for this file alone.
   */
  return options.shouldIncludeDetails ? exec(command, { ...options, cwd: root, shouldIncludeDetails: true }) : exec(command, { ...options, cwd: root, shouldIncludeDetails: false });
}

export function getRootFolder(cwd?: string): null | string {
  let currentFolder = toPosixPath(cwd ?? process.cwd());
  while (currentFolder !== '.' && currentFolder !== '/') {
    if (existsSync(join(currentFolder, 'package.json'))) {
      return toPosixPath(currentFolder);
    }
    currentFolder = dirname(currentFolder);
  }

  return null;
}

export function toPosixPath(path: string): string {
  return path.replaceAll('\\', '/');
}
