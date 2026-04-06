import { existsSync } from 'node:fs';
import {
  dirname,
  join
} from 'node:path/posix';
import process from 'node:process';

import type {
  CommandPart,
  ExecDetailedOptions,
  ExecOption,
  ExecResult,
  ExecSimpleOptions
} from './exec.ts';

import { exec } from './exec.ts';

export async function execFromRoot(command: CommandPart[] | string, options?: ExecSimpleOptions): Promise<string>;
export function execFromRoot(command: CommandPart[] | string, options: ExecDetailedOptions): Promise<ExecResult>;
export function execFromRoot(command: CommandPart[] | string, options: ExecOption = {}): Promise<ExecResult | string> {
  const root = getRootFolder(options.cwd);

  if (!root) {
    throw new Error('Could not find root folder');
  }

  if (options.shouldIncludeDetails) {
    return exec(command, { ...options, cwd: root, shouldIncludeDetails: true });
  }

  return exec(command, { ...options, cwd: root, shouldIncludeDetails: false });
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
