/**
 * @file
 *
 * Runs a child process and collects its output.
 *
 * This file is one of **three byte-identical copies** - `scripts/helpers/exec.ts`,
 * `workflow-scripts/helpers/exec.ts` and `docs/scripts/helpers/exec.ts`. The copies are deliberate: each of
 * those trees is a self-contained island with its own `package.json`, `tsconfig.json` and dependency tree
 * (`workflow-scripts` is additionally synced into a release branch's working copy with
 * `git restore --source=main --worktree -- ./workflow-scripts`), so reaching into a sibling tree would tie it
 * to whichever `scripts/` the host branch happens to carry.
 *
 * `npm run check:exec-helpers` asserts the three are identical, so edit one and copy it over the other two
 * rather than patching them apart. The same holds for `helpers/root.ts` beside it.
 */

import type { ChildProcessWithoutNullStreams } from 'node:child_process';

import { spawn } from 'node:child_process';
import process from 'node:process';

export type CommandPart = ExecArgument | string;

export interface ExecArgument {
  readonly batchedArguments: readonly string[];
}

/**
 * The overload discriminator MUST be the same property `execString` below branches on. It was `withDetails`
 * until 2026-09-15, and nothing could see the difference: both overloads compiled, both were reachable, and
 * each resolved to the other one's shape -- `{ withDetails: true }` was typed `Promise<ExecResult>` and
 * resolved to a bare string, while `{ shouldIncludeDetails: true }` selected the SIMPLE overload (the base
 * {@link ExecOption} declares that property as `boolean`, so it does not discriminate) and resolved to an
 * {@link ExecResult} typed as `string`. A caller reading `.exitCode` off the first got `undefined`. No gate
 * can catch this -- the code is type-*correct*, and the lie sits between the declaration and the branch,
 * which is why the two must stay one name.
 */
export interface ExecDetailedOptions extends ExecOption {
  readonly shouldIncludeDetails: true;
}

export interface ExecOption {
  readonly cwd?: string;

  /**
   * Extra environment variables for the child, merged over the inherited `process.env`.
   */
  readonly env?: Readonly<Record<string, string>>;
  readonly isQuiet?: boolean;
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

export interface ExecSimpleOptions extends ExecOption {
  readonly shouldIncludeDetails?: false;
}

/**
 * Quotes one argument by the MSVCRT rules `cmd.exe` and the C runtime agree on: a run of backslashes is
 * doubled only when a quote follows it or it ends the argument, and an embedded quote is escaped with one
 * more backslash.
 *
 * Exported for `scripts/check-exec-helpers.ts`, which asserts the cases nothing else in the repo exercises --
 * a trailing backslash, an embedded quote, an embedded newline. Not meant for callers; use {@link exec}.
 */
export function argvQuote(argument: string): string {
  if (argument.length > 0 && !/[\s\t\n\v"]/.test(argument)) {
    return argument;
  }

  const BACKSLASH_ESCAPE_FACTOR = 2;
  let result = '"';
  for (let index = 0; index < argument.length; index++) {
    let numberBackslashes = 0;
    while (index < argument.length && argument[index] === '\\') {
      index++;
      numberBackslashes++;
    }

    if (index === argument.length) {
      result += '\\'.repeat(numberBackslashes * BACKSLASH_ESCAPE_FACTOR);
      break;
    }

    const ch = argument.charAt(index);
    result += ch === '"' ? `${'\\'.repeat(numberBackslashes * BACKSLASH_ESCAPE_FACTOR + 1)}"` : '\\'.repeat(numberBackslashes) + ch;
  }

  result += '"';
  return result;
}

/**
 * Escapes the characters `cmd.exe` acts on before a command line reaches it, so an argument holding `&` or
 * `|` is passed to the program rather than read as shell syntax.
 *
 * Exported for `scripts/check-exec-helpers.ts`, as {@link argvQuote} is. Not meant for callers.
 */
export function commandEscapeCommandLine(commandLine: string): string {
  return commandLine.replaceAll(CMD_META_RE, '^$&');
}

export async function exec(command: CommandPart[] | string, options?: ExecSimpleOptions): Promise<string>;
export function exec(command: CommandPart[] | string, options: ExecDetailedOptions): Promise<ExecResult>;
export function exec(command: CommandPart[] | string, options: ExecOption = {}): Promise<ExecResult | string> {
  if (Array.isArray(command)) {
    const batchResult = handleBatchedCommand(command, options);
    if (batchResult) {
      return batchResult;
    }
    const $arguments = command.filter((part): part is string => typeof part === 'string');
    const commandLine = toCommandLine($arguments);

    const maxCommandLength = getMaxCommandLength();
    if (commandLine.length > maxCommandLength) {
      return Promise.reject(
        new Error(
          `Command line is too long (${String(commandLine.length)} chars, max ${String(maxCommandLength)} on ${process.platform}). Consider using ExecArgument with batchedArguments.`
        )
      );
    }

    return execString(commandLine, options, $arguments);
  }

  const maxCommandLength = getMaxCommandLength();
  if (command.length > maxCommandLength) {
    return Promise.reject(
      new Error(
        `Command line is too long (${String(command.length)} chars, max ${String(maxCommandLength)} on ${process.platform}). Consider using ExecArgument with batchedArguments.`
      )
    );
  }

  return execString(command, options);
}

/**
 * Joins already-quoted arguments into one `cmd.exe` command line.
 *
 * Exported for `scripts/check-exec-helpers.ts`, as {@link argvQuote} is. Not meant for callers.
 */
export function toCommandLine($arguments: string[]): string {
  return $arguments.map((argument) => argvQuote(argument)).join(' ');
}

const CMD_META_RE = /[()%!^"<>&|]/g;

const CHILD_ENV = {
  DEBUG_COLORS: '1',
  ...process.env
};

function execString(command: string, options: ExecOption = {}, rawArguments?: string[]): Promise<ExecResult | string> {
  const {
    cwd = process.cwd(),
    env = {},
    isQuiet: quiet = false,
    shouldIgnoreExitCode: ignoreExitCode = false,
    shouldIncludeDetails = false,
    stdin = ''
  } = options;

  return new Promise((resolve, reject) => {
    const child = spawnViaShell(command, cwd, env, rawArguments);

    let stdout = '';
    let stderr = '';

    // A child that exits before reading its stdin makes this write fail with EPIPE.
    // With no listener that is an unhandled 'error' event, which tears down the whole process instead of settling this promise.
    // Swallow it: the 'close'/'error' handlers below report the command's actual outcome, which is the failure worth surfacing.
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
        reject(new Error(`Command failed with exit code ${exitCode ? String(exitCode) : '(null)'}\n${stderr}`));
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

  const execArgument = execArguments[0];
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

function spawnViaShell(
  command: string,
  cwd: string,
  env: Readonly<Record<string, string>>,
  rawArguments?: string[]
): ChildProcessWithoutNullStreams {
  const childEnv = { ...CHILD_ENV, ...env };

  if (process.platform === 'win32' && command.includes('\n')) {
    if (!rawArguments) {
      throw new Error('Commands containing newlines cannot be executed through cmd.exe on Windows. Pass an argument array instead of a string.');
    }
    const [program, ...$arguments] = rawArguments;
    if (!program) {
      throw new Error('Command array must not be empty');
    }
    return spawn(program, $arguments, {
      cwd,
      env: childEnv,
      stdio: 'pipe'
    });
  }

  const shellCommand = process.platform === 'win32' ? commandEscapeCommandLine(command) : command;
  return spawn(shellCommand, [], {
    cwd,
    env: childEnv,
    shell: true,
    stdio: 'pipe'
  });
}

function trimEnd($string: string, suffix: string): string {
  if ($string.endsWith(suffix)) {
    return $string.slice(0, -suffix.length);
  }
  return $string;
}
