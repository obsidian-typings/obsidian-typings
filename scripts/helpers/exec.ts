import type { ChildProcessWithoutNullStreams } from 'node:child_process';

import { spawn } from 'node:child_process';
import process from 'node:process';

export type CommandPart = ExecArg | string;

export interface ExecArg {
  batchedArgs: string[];
}

export interface ExecDetailedOptions extends ExecOption {
  shouldIncludeDetails: true;
}

export interface ExecOption {
  readonly cwd?: string;
  readonly isQuiet?: boolean;
  readonly shouldIgnoreExitCode?: boolean;
  readonly shouldIncludeDetails?: boolean;
  readonly stdin?: string;
}

export interface ExecResult {
  exitCode: null | number;
  exitSignal: NodeJS.Signals | null;
  stderr: string;
  stdout: string;
}

export interface ExecSimpleOptions extends ExecOption {
  shouldIncludeDetails?: false;
}

export async function exec(command: CommandPart[] | string, options?: ExecSimpleOptions): Promise<string>;
export function exec(command: CommandPart[] | string, options: ExecDetailedOptions): Promise<ExecResult>;
export function exec(command: CommandPart[] | string, options: ExecOption = {}): Promise<ExecResult | string> {
  if (Array.isArray(command)) {
    const batchResult = handleBatchedCommand(command, options);
    if (batchResult) {
      return batchResult;
    }
    const args = command.filter((part): part is string => typeof part === 'string');
    const commandLine = toCommandLine(args);

    const maxCommandLength = getMaxCommandLength();
    if (commandLine.length > maxCommandLength) {
      return Promise.reject(
        new Error(
          `Command line is too long (${String(commandLine.length)} chars, max ${
            String(maxCommandLength)
          } on ${process.platform}). Consider using ExecArg with batchedArgs.`
        )
      );
    }

    return execString(commandLine, options, args);
  }

  const maxCommandLength = getMaxCommandLength();
  if (command.length > maxCommandLength) {
    return Promise.reject(
      new Error(
        `Command line is too long (${String(command.length)} chars, max ${
          String(maxCommandLength)
        } on ${process.platform}). Consider using ExecArg with batchedArgs.`
      )
    );
  }

  return execString(command, options);
}

function argvQuote(arg: string): string {
  if (arg.length > 0 && !/[\s\t\n\v"]/.test(arg)) {
    return arg;
  }

  const BACKSLASH_ESCAPE_FACTOR = 2;
  let result = '"';
  for (let i = 0; i < arg.length; i++) {
    let numBackslashes = 0;
    while (i < arg.length && arg[i] === '\\') {
      i++;
      numBackslashes++;
    }

    if (i === arg.length) {
      result += '\\'.repeat(numBackslashes * BACKSLASH_ESCAPE_FACTOR);
      break;
    }

    const ch = arg.charAt(i);
    if (ch === '"') {
      result += `${'\\'.repeat(numBackslashes * BACKSLASH_ESCAPE_FACTOR + 1)}"`;
    } else {
      result += '\\'.repeat(numBackslashes) + ch;
    }
  }

  result += '"';
  return result;
}

function toCommandLine(args: string[]): string {
  return args.map((arg) => argvQuote(arg)).join(' ');
}

const CMD_META_RE = /[()%!^"<>&|]/g;

const CHILD_ENV = {
  DEBUG_COLORS: '1',
  ...process.env
};

function cmdEscapeCommandLine(commandLine: string): string {
  return commandLine.replace(CMD_META_RE, '^$&');
}

function execString(command: string, options: ExecOption = {}, rawArgs?: string[]): Promise<ExecResult | string> {
  const {
    cwd = process.cwd(),
    isQuiet: quiet = false,
    shouldIgnoreExitCode: ignoreExitCode = false,
    shouldIncludeDetails: withDetails = false,
    stdin = ''
  } = options;

  return new Promise((resolve, reject) => {
    const child = spawnViaShell(command, cwd, rawArgs);

    let stdout = '';
    let stderr = '';

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

      if (!withDetails) {
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

    child.on('error', (err) => {
      if (!ignoreExitCode) {
        reject(err);
        return;
      }

      if (!withDetails) {
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
  const UNIX_MAX_COMMAND_LENGTH = 131072;
  return process.platform === 'win32' ? WINDOWS_MAX_COMMAND_LENGTH : UNIX_MAX_COMMAND_LENGTH;
}

function handleBatchedCommand(parts: CommandPart[], options: ExecOption): Promise<ExecResult | string> | undefined {
  const execArgs = parts.filter(isExecArg);
  if (execArgs.length === 0) {
    return undefined;
  }
  if (execArgs.length > 1) {
    return Promise.reject(new Error('Only one ExecArg with batchedArgs is allowed per command'));
  }

  const execArg = execArgs[0];
  if (!execArg) {
    return undefined;
  }

  const staticParts = parts.filter((part): part is string => typeof part === 'string');
  const baseCommand = toCommandLine(staticParts);
  const maxCommandLength = getMaxCommandLength();

  const fullCommand = `${baseCommand} ${execArg.batchedArgs.join(' ')}`;
  if (fullCommand.length <= maxCommandLength) {
    return execString(fullCommand, options);
  }

  const batches: string[][] = [];
  let currentBatch: string[] = [];

  for (const arg of execArg.batchedArgs) {
    const tentative = `${baseCommand} ${[...currentBatch, arg].join(' ')}`;
    if (tentative.length > maxCommandLength) {
      if (currentBatch.length === 0) {
        return Promise.reject(
          new Error(
            `Cannot split command into batches: a single argument (${String(arg.length)} chars) plus the base command (${
              String(baseCommand.length)
            } chars) exceeds the max command length (${String(maxCommandLength)}).`
          )
        );
      }
      batches.push(currentBatch);
      currentBatch = [arg];
    } else {
      currentBatch.push(arg);
    }
  }
  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  return executeBatches(baseCommand, batches, options);
}

function isExecArg(part: CommandPart): part is ExecArg {
  return typeof part === 'object' && 'batchedArgs' in part;
}

function spawnViaShell(command: string, cwd: string, rawArgs?: string[]): ChildProcessWithoutNullStreams {
  if (process.platform === 'win32' && command.includes('\n')) {
    if (!rawArgs) {
      throw new Error('Commands containing newlines cannot be executed through cmd.exe on Windows. Pass an argument array instead of a string.');
    }
    const [program, ...args] = rawArgs;
    if (!program) {
      throw new Error('Command array must not be empty');
    }
    return spawn(program, args, {
      cwd,
      env: CHILD_ENV,
      stdio: 'pipe'
    });
  }

  const shellCommand = process.platform === 'win32' ? cmdEscapeCommandLine(command) : command;
  return spawn(shellCommand, [], {
    cwd,
    env: CHILD_ENV,
    shell: true,
    stdio: 'pipe'
  });
}

function trimEnd(str: string, suffix: string): string {
  if (str.endsWith(suffix)) {
    return str.slice(0, -suffix.length);
  }
  return str;
}
