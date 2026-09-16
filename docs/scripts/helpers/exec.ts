import type {
  PackageJson,
  Promisable,
  UndefinedOnPartialDeep
} from 'type-fest';

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import {
  readFile,
  writeFile
} from 'node:fs/promises';
import {
  dirname,
  join,
  resolve as posixResolve
} from 'node:path/posix';
import process from 'node:process';

export type CommandPart = ExecArgument | string;

/**
 * Options for {@link editJson}.
 */
export interface EditJsonOptions {
  /**
   * If `true`, skips editing if the file does not exist.
   */
  readonly shouldSkipIfMissing?: boolean;
}

export interface EditPackageJsonOptions {
  /**
   * A current working folder where `package.json` is located.
   */
  readonly cwd?: string;

  /**
   * If `true`, skips editing if the file does not exist.
   */
  readonly shouldSkipIfMissing?: boolean;
}
export interface ExecArgument {
  batchedArguments: string[];
}
export interface ExecOption {
  readonly cwd?: string;
  readonly isQuiet?: boolean;
  readonly shouldFailIfCalledFromOutsideRoot?: boolean;
  readonly shouldIgnoreExitCode?: boolean;
  readonly shouldIncludeDetails?: boolean;
  readonly stdin?: string;
}

export interface ExecResult {
  readonly exitCode: null | number;
  readonly exitSignal: NodeJS.Signals | null;
  readonly stderr: string;
  readonly stdout: string;
}

export interface PackageLockJson extends Partial<PackageJson> {
  /**
   * Packages in the `package-lock.json` file.
   */
  packages?: Record<string, PackageJson>;
}

/**
 * The overload discriminator MUST be the same property `execString` below branches on. It was
 * `withDetails` until 2026-09-15, and nothing could see the difference: both overloads compiled, both
 * were reachable, and each resolved to the other one's shape -- `{ withDetails: true }` was typed
 * `Promise<ExecResult>` and resolved to a bare string, while `{ shouldIncludeDetails: true }` selected
 * the SIMPLE overload (the base `ExecOption` declares that property as `boolean`, so it does not
 * discriminate) and resolved to an `ExecResult` typed as `string`. A caller reading `.exitCode` off the
 * first got `undefined`. No gate can catch this -- the code is type-*correct*, and the lie sits between
 * the declaration and the branch, which is why the two must stay one name.
 */
interface ExecDetailedOptions extends ExecOption {
  readonly shouldIncludeDetails: true;
}
interface ExecSimpleOptions extends ExecOption {
  readonly shouldIncludeDetails?: false;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- The generic type is better for the strong typing.
export async function editJson<T>(
  path: string,
  editFunction: (data: T) => Promisable<void>,
  options: EditJsonOptions = {}
): Promise<void> {
  const {
    shouldSkipIfMissing
  } = options;
  if (shouldSkipIfMissing && !existsSync(path)) {
    return;
  }
  const data = await readJson<T>(path);
  await editFunction(data);
  await writeJson(path, data);
}
export async function editPackageJson(
  editFunction: (packageJson: PackageJson) => Promisable<void>,
  options: EditPackageJsonOptions = {}
): Promise<void> {
  const {
    cwd,
    shouldSkipIfMissing
  } = options;
  await editJson<PackageJson>(getPackageJsonPath(cwd), editFunction, normalizeOptionalProperties<EditJsonOptions>({ shouldSkipIfMissing }));
}
export async function editPackageLockJson(
  editFunction: (packageLockJson: PackageLockJson) => Promisable<void>,
  options: EditPackageJsonOptions = {}
): Promise<void> {
  const {
    cwd,
    shouldSkipIfMissing
  } = options;
  await editJson<PackageJson>(getPackageLockJsonPath(cwd), editFunction, normalizeOptionalProperties<EditJsonOptions>({ shouldSkipIfMissing }));
}

export function ensureNonNullable<T>(value: null | T | undefined, errorMessage: string): T {
  if (value === null || value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}
export async function execFromRoot(command: CommandPart[] | string, options?: ExecSimpleOptions): Promise<string>;
export function execFromRoot(command: CommandPart[] | string, options: ExecDetailedOptions): Promise<ExecResult>;
export function execFromRoot(command: CommandPart[] | string, options: ExecOption = {}): Promise<ExecResult | string> {
  let root = getRootFolder(options.cwd);

  if (!root) {
    if (options.shouldFailIfCalledFromOutsideRoot ?? true) {
      throw new Error('Could not find root folder');
    }

    root = options.cwd ?? process.cwd();
  }

  if (options.shouldIncludeDetails) {
    return exec(command, { ...options, cwd: root, shouldIncludeDetails: true });
  }

  return exec(command, { ...options, cwd: root, shouldIncludeDetails: false });
}

export function getPackageJsonPath(cwd?: string): string {
  return ensureNonNullable(resolvePathFromRoot('package.json', cwd), 'Could not determine the package.json path');
}

export function getPackageLockJsonPath(cwd?: string): string {
  return ensureNonNullable(resolvePathFromRoot('package-lock.json', cwd), 'Could not determine the package-lock.json path');
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

export function normalizeOptionalProperties<T>(object: UndefinedOnPartialDeep<T>): T {
  return object as T;
}

export async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, 'utf-8')) as T;
}

export async function readPackageJson(cwd?: string): Promise<PackageJson> {
  return await readJson<PackageJson>(getPackageJsonPath(cwd));
}

export function resolvePathFromRoot(path: string, cwd?: string): null | string {
  const rootFolder = getRootFolder(cwd);
  if (!rootFolder) {
    return null;
  }

  return resolveSafe(rootFolder, path);
}

export function toCommandLine(arguments_: string[]): string {
  return arguments_
    .map((argument) => {
      if (/[\s"\n]/.test(argument)) {
        let escapedArgument = argument;
        escapedArgument = escapedArgument.replaceAll('"', String.raw`\"`);
        escapedArgument = escapedArgument.replaceAll('\n', String.raw`\n`);
        return `"${escapedArgument}"`;
      }
      return argument;
    })
    .join(' ');
}

export function toPosixPath(path: string): string {
  return path.replaceAll('\\', '/');
}

export async function writeJson(path: string, data: unknown): Promise<void> {
  await writeFile(path, `${toJson(data)}\n`);
}
async function exec(command: CommandPart[] | string, options?: ExecSimpleOptions): Promise<string>;
async function exec(command: CommandPart[] | string, options: ExecDetailedOptions): Promise<ExecResult>;
async function exec(command: CommandPart[] | string, options: ExecOption = {}): Promise<ExecResult | string> {
  if (Array.isArray(command)) {
    const batchResult = handleBatchedCommand(command, options);
    if (batchResult) {
      return batchResult;
    }
    command = toCommandLine(command.filter((part): part is string => typeof part === 'string'));
  }

  const maxCommandLength = getMaxCommandLength();
  if (command.length > maxCommandLength) {
    throw new Error(
      `Command line is too long (${String(command.length)} chars, max ${String(maxCommandLength)} on ${process.platform}). Consider using ExecArgument with batchedArguments.`
    );
  }

  return execString(command, options);
}

function execString(command: string, options: ExecOption = {}): Promise<ExecResult | string> {
  const {
    cwd = process.cwd(),
    isQuiet: quiet = false,
    shouldIgnoreExitCode: ignoreExitCode = false,
    shouldIncludeDetails = false,
    stdin = ''
  } = options;

  return new Promise((resolve, reject) => {
    const child = spawn(command, [], {
      cwd,
      env: {
        DEBUG_COLORS: '1',
        ...process.env
      },
      shell: true,
      stdio: 'pipe'
    });

    let stdout = '';
    let stderr = '';

    // A child that exits before reading its stdin makes this write fail with EPIPE. With no
    // listener that is an unhandled 'error' event, which tears down the whole process instead of
    // settling this promise. Swallow it: the 'close'/'error' handlers below report the command's
    // actual outcome, which is the failure worth surfacing.
    child.stdin.on('error', () => {
      // Deliberately ignored -- see above.
    });
    child.stdin.write(stdin);
    child.stdin.end();

    child.stdout.on('data', (data: Buffer) => {
      if (!quiet) {
        process.stdout.write(data);
      }
      stdout += data.toString('utf-8');
    });

    child.stdout.on('end', () => {
      stdout = trimEnd(stdout, '\n');
    });

    child.stderr.on('data', (data: Buffer) => {
      if (!quiet) {
        process.stderr.write(data);
      }
      stderr += data.toString('utf-8');
    });

    child.stderr.on('end', () => {
      stderr = trimEnd(stderr, '\n');
    });

    child.on('close', (exitCode, exitSignal) => {
      if (exitCode !== 0 && !ignoreExitCode) {
        reject(new Error(`Command failed with exit code ${exitCode ? String(exitCode) : '(null)'}`));
        return;
      }

      if (!shouldIncludeDetails) {
        resolve(stdout);
        return;
      }
      resolve({
        exitCode,
        exitSignal,
        stderr,
        stdout
      });
    });

    child.on('error', (error) => {
      if (!ignoreExitCode) {
        reject(error);
        return;
      }

      if (!shouldIncludeDetails) {
        resolve(stdout);
        return;
      }

      resolve({
        exitCode: null,
        exitSignal: null,
        stderr,
        stdout
      });
    });
  });
}

async function executeBatches(baseCommand: string, batches: string[][], options: ExecOption): Promise<ExecResult | string> {
  const results: string[] = [];

  for (const batch of batches) {
    const batchCommand = `${baseCommand} ${batch.join(' ')}`;
    const result = await execString(batchCommand, options);
    if (typeof result === 'string') {
      results.push(result);
    }
  }

  if (options.shouldIncludeDetails) {
    return { exitCode: 0, exitSignal: null, stderr: '', stdout: results.join('\n') };
  }

  return results.join('\n');
}

function getMaxCommandLength(): number {
  const WINDOWS_MAX_COMMAND_LENGTH = 8191;
  const UNIX_MAX_COMMAND_LENGTH = 131_072;
  return process.platform === 'win32' ? WINDOWS_MAX_COMMAND_LENGTH : UNIX_MAX_COMMAND_LENGTH;
}

function handleBatchedCommand(parts: CommandPart[], options: ExecOption): Promise<ExecResult | string> | undefined {
  const execArguments = parts.filter(isExecArgument);
  if (execArguments.length === 0) {
    return undefined;
  }
  if (execArguments.length > 1) {
    return Promise.reject(new Error('Only one ExecArgument with batchedArguments is allowed per command'));
  }

  const [execArgument] = execArguments;
  if (!execArgument) {
    return undefined;
  }
  const staticParts = parts.filter((part): part is string => typeof part === 'string');
  const baseCommand = toCommandLine(staticParts);
  const maxCommandLength = getMaxCommandLength();

  const fullCommand = `${baseCommand} ${execArgument.batchedArguments.join(' ')}`;
  if (fullCommand.length <= maxCommandLength) {
    return execString(fullCommand, options);
  }

  const batches: string[][] = [];
  let currentBatch: string[] = [];

  for (const argument of execArgument.batchedArguments) {
    const tentative = `${baseCommand} ${[...currentBatch, argument].join(' ')}`;
    if (tentative.length > maxCommandLength) {
      if (currentBatch.length === 0) {
        return Promise.reject(
          new Error(
            `Cannot split command into batches: a single argument (${String(argument.length)} chars) plus the base command (${String(baseCommand.length)} chars) exceeds the max command length (${String(maxCommandLength)}).`
          )
        );
      }
      batches.push(currentBatch);
      currentBatch = [argument];
    } else {
      currentBatch.push(argument);
    }
  }
  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  return executeBatches(baseCommand, batches, options);
}

function isExecArgument(part: CommandPart): part is ExecArgument {
  return typeof part === 'object' && 'batchedArguments' in part;
}

function resolveSafe(...pathSegments: string[]): string {
  let path = posixResolve(...pathSegments);
  path = toPosixPath(path);
  const WINDOWS_POSIX_LIKE_PATH_REG_EXP = /[a-zA-Z]:\/[^:]*$/;
  const match = WINDOWS_POSIX_LIKE_PATH_REG_EXP.exec(path);
  return match?.[0] ?? path;
}

function toJson(data: unknown): string {
  const INDENT = 2;
  return JSON.stringify(data, null, INDENT);
}

function trimEnd(string_: string, suffix: string, shouldValidate?: boolean): string {
  if (string_.endsWith(suffix)) {
    return string_.slice(0, -suffix.length);
  }

  if (shouldValidate) {
    throw new Error(`String ${string_} does not end with suffix ${suffix}`);
  }

  return string_;
}
