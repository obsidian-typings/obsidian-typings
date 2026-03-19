import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import {
  dirname,
  join
} from 'node:path/posix';
import process from 'node:process';

export interface ExecOption {
  readonly cwd?: string;
  readonly isQuiet?: boolean;
  readonly shouldFailIfCalledFromOutsideRoot?: boolean;
  readonly shouldIgnoreExitCode?: boolean;
  readonly shouldIncludeDetails?: boolean;
  readonly stdin?: string;
  readonly stdout?: string;
}

export interface ExecResult {
  exitCode: null | number;
  exitSignal: NodeJS.Signals | null;
  stderr: string;
}

export async function exec(command: string | string[], options?: { withDetails?: false } & ExecOption): Promise<string>;
export function exec(command: string | string[], options: { withDetails: true } & ExecOption): Promise<ExecResult>;
export function exec(command: string | string[], options: ExecOption = {}): Promise<ExecResult | string> {
  const {
    cwd = process.cwd(),
    isQuiet: quiet = false,
    shouldIgnoreExitCode: ignoreExitCode = false,
    shouldIncludeDetails: withDetails = false,
    stdin = ''
  } = options;
  if (Array.isArray(command)) {
    command = toCommandLine(command);
  }

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

      if (!withDetails) {
        resolve(stdout);
        return;
      }
      resolve({
        exitCode,
        exitSignal,
        stderr,
        stdout
      } as ExecResult);
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
      } as ExecResult);
    });
  });
}

function trimEnd(str: string, suffix: string, shouldValidate?: boolean): string {
  if (str.endsWith(suffix)) {
    return str.slice(0, -suffix.length);
  }

  if (shouldValidate) {
    throw new Error(`String ${str} does not end with suffix ${suffix}`);
  }

  return str;
}

export function toCommandLine(args: string[]): string {
  return args
    .map((arg) => {
      if (/[\s"\n]/.test(arg)) {
        let escapedArg = arg;
        escapedArg = escapedArg.replaceAll(/"/g, '\\"');
        escapedArg = escapedArg.replaceAll(/\n/g, '\\n');
        return `"${escapedArg}"`;
      }
      return arg;
    })
    .join(' ');
}

export async function execFromRoot(command: string | string[], options?: { withDetails?: false } & ExecOption): Promise<string>;
export function execFromRoot(command: string | string[], options: { withDetails: true } & ExecOption): Promise<ExecResult>;
export function execFromRoot(command: string | string[], options: ExecOption = {}): Promise<ExecResult | string> {
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

function getRootFolder(cwd?: string): null | string {
  let currentFolder = toPosixPath(cwd ?? process.cwd());
  while (currentFolder !== '.' && currentFolder !== '/') {
    if (existsSync(join(currentFolder, 'package.json'))) {
      return toPosixPath(currentFolder);
    }
    currentFolder = dirname(currentFolder);
  }

  return null;
}

function toPosixPath(path: string): string {
  return path.replaceAll('\\', '/');
}
