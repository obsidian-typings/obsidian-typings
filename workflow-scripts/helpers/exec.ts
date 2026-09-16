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
  /**
   * The arguments the command is batched over, quoted by {@link toCommandLine} exactly as the static parts
   * beside them are. They were interpolated **raw** until 2026-09-16, on every platform: a batched argument
   * bearing a space arrived as two arguments, and one bearing a quote, a metacharacter (`&`, `|`, `` ` ``,
   * `$`) or a glob was acted on by the shell. Nothing caught it because every caller in this repo passes
   * posix-normalized repo-relative paths, which need no quoting.
   *
   * The quoting has to happen **before** the length budget is measured rather than after, so that the string
   * counted against {@link getMaxCommandLength} and the string handed to the shell stay the same one. Quoting
   * is not the only layer between those two, though, which is why the budget is spent through
   * {@link getShellCommandLineLength} rather than against a raw `.length`.
   *
   * An argument bearing a **newline** is carried like any other, on both platforms. It threw on Windows until
   * 2026-09-16: `cmd.exe` cannot carry a newline, and the escape hatch for that -- spawning the program
   * directly from the argument array rather than through the shell -- was reachable only from a caller that
   * passed one, which the batched branch was alone in not doing. See the comment at that throw in
   * `spawnViaShell`.
   */
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
 * This is {@link toCommandLine}'s **Windows** arm only. `/bin/sh` obeys none of these rules -- it gets
 * {@link posixQuote}.
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
    const shellCommandLineLength = getShellCommandLineLength(commandLine);
    if (shellCommandLineLength > maxCommandLength) {
      return Promise.reject(
        new Error(
          `Command line is too long (${String(shellCommandLineLength)} chars as the shell receives it, max ${String(maxCommandLength)} on ${process.platform}). Consider using ExecArgument with batchedArguments.`
        )
      );
    }

    return execString(commandLine, options, $arguments);
  }

  const maxCommandLength = getMaxCommandLength();
  const shellCommandLineLength = getShellCommandLineLength(command);
  if (shellCommandLineLength > maxCommandLength) {
    return Promise.reject(
      new Error(
        `Command line is too long (${String(shellCommandLineLength)} chars as the shell receives it, max ${String(maxCommandLength)} on ${process.platform}). Consider using ExecArgument with batchedArguments.`
      )
    );
  }

  return execString(command, options);
}

/**
 * The longest command line this platform's shell accepts, which is what decides whether a batched command is
 * run in one go or split. On Windows this is `cmd.exe`'s own ceiling, and it is spent by everything `cmd.exe`
 * is handed -- the wrapper it is invoked with included -- so it is measured with
 * {@link getShellCommandLineLength} rather than against a quoted command line's raw `.length`.
 *
 * Exported for `scripts/check-exec-helpers.ts`, which sizes its batch-splitting case from it rather than
 * restating the constants. Not meant for callers; use {@link exec}.
 */
export function getMaxCommandLength(): number {
  const WINDOWS_MAX_COMMAND_LENGTH = 8191;
  const UNIX_MAX_COMMAND_LENGTH = 131_072;
  return process.platform === 'win32' ? WINDOWS_MAX_COMMAND_LENGTH : UNIX_MAX_COMMAND_LENGTH;
}

/**
 * The length a command line will have by the time this platform's shell parses it, which is the number the
 * budget in {@link getMaxCommandLength} has to be measured against.
 *
 * On Windows that is **not** the length of the quoted command line. Two layers still sit between
 * {@link toCommandLine} and `cmd.exe`, and both were applied *after* the budget until 2026-09-16:
 * {@link commandEscapeCommandLine} prefixes `^` to each of `()%!^"<>&|`, which can double the line, and
 * `spawn(..., { shell: true })` then wraps the result in `<ComSpec> /d /s /c "..."`. So an argument list that
 * measured at 8191 could still die with `The command line is too long.` -- which a repo or vault path bearing
 * `&` is enough to trigger, once the file list is long enough to batch. Measured on 2026-09-16: a
 * metacharacter-free command line is accepted up to 8152 chars, which is 8191 less the 39 of the wrapper.
 *
 * Everywhere else the command string is handed to `/bin/sh` as its own argv entry, with no escaping layer and
 * no wrapper sharing its budget, so the quoted length is already the real one.
 *
 * Deliberately conservative in one place: a Windows command line holding a newline is spawned directly
 * rather than through `cmd.exe` (see `spawnViaShell`), so neither layer applies to it and its real ceiling is
 * `CreateProcess`'s rather than `cmd.exe`'s. It is still measured as if it went through the shell, as it was
 * before -- refusing a command line that would have run is the safe direction, and no caller builds an 8 KB
 * one.
 *
 * Exported for `scripts/check-exec-helpers.ts`, as {@link argvQuote} is. Not meant for callers; use
 * {@link exec}.
 */
export function getShellCommandLineLength(commandLine: string): number {
  if (process.platform !== 'win32') {
    return commandLine.length;
  }

  return commandEscapeCommandLine(commandLine).length + getShellWrapperLength();
}

/**
 * Quotes one argument for `/bin/sh`. An argument built only of characters the shell never acts on is passed
 * through; anything else is wrapped in **single** quotes, inside which `sh` treats every character literally
 * -- backslashes, metacharacters and newlines alike -- with each embedded `'` spliced out as `'\''`. The
 * empty argument becomes `''`, which is the only way to hand `sh` a zero-length word.
 *
 * There is deliberately no POSIX counterpart to {@link commandEscapeCommandLine}: `cmd.exe` needs a second
 * escaping layer because it re-reads its metacharacters after the CRT quoting, and `sh` does not -- a
 * single-quoted word is already inert.
 *
 * Exported for `scripts/check-exec-helpers.ts`, as {@link argvQuote} is. Not meant for callers; use
 * {@link exec}.
 */
export function posixQuote(argument: string): string {
  if (argument.length > 0 && !POSIX_UNSAFE_RE.test(argument)) {
    return argument;
  }

  return `'${argument.replaceAll('\'', String.raw`'\''`)}'`;
}

/**
 * Quotes each argument for the shell of the host platform and joins them into one command line: `cmd.exe`
 * rules on Windows ({@link argvQuote}), `/bin/sh` rules everywhere else ({@link posixQuote}). Quoting every
 * platform's command line by the Windows rules is how `sh` came to eat the backslashes of a whitespace-free
 * path and to act on an embedded `&`.
 *
 * Exported for `scripts/check-exec-helpers.ts`, as {@link argvQuote} is. Not meant for callers.
 */
export function toCommandLine($arguments: readonly string[]): string {
  const quote = process.platform === 'win32' ? argvQuote : posixQuote;
  return $arguments.map((argument) => quote(argument)).join(' ');
}

const CMD_META_RE = /[()%!^"<>&|]/g;

/*
 * What `spawn(..., { shell: true })` wraps a command line in on Windows: node invokes `<ComSpec> /d /s /c
 * "<command line>"` verbatim, and every byte of that -- not just the part inside the quotes -- is spent
 * against the ceiling `cmd.exe` enforces.
 */
const CMD_SHELL_WRAPPER = ' /d /s /c ""';

/*
 * The complement of `shlex.quote`'s safe set: every other character either is shell syntax or can become it
 * (`~` expands, a space splits, a newline ends the command), so an argument holding one gets single-quoted.
 */
const POSIX_UNSAFE_RE = /[^\w@%+=:,./-]/;

const CHILD_ENV = {
  DEBUG_COLORS: '1',
  ...process.env
};

/*
 * The same two-overload shape `exec` and `execFromRoot` carry, and for the same reason one layer down:
 * `executeBatches` asks for details whatever its caller asked for, and without this it would be handed back
 * `ExecResult | string` and have to narrow it with a branch that can never be taken. That branch is exactly
 * what dropped every batch's output until 2026-09-16 -- it read `typeof result === 'string'`, which a
 * detailed call never satisfies -- so the narrowing is removed rather than corrected.
 *
 * The discriminator is the one property the implementation branches on, per the note on
 * {@link ExecDetailedOptions}.
 */
function execString(command: string, options: ExecDetailedOptions, rawArguments?: string[]): Promise<ExecResult>;
function execString(command: string, options?: ExecOption, rawArguments?: string[]): Promise<ExecResult | string>;
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

/*
 * Runs one command line per batch. It is handed the static parts rather than the base command line they quote
 * into, which buys two things: it derives that line itself, so the two cannot drift apart, and it can hand
 * `execString` the raw argument array beside the string -- which is what lets a batch holding a newline be
 * spawned directly instead of throwing. Both are decided per batch, so a run splits into a mix of
 * directly-spawned and shell-run batches without either noticing the other.
 *
 * Every batch is run **detailed** whatever the caller asked for, and the caller's own flag then shapes the
 * return. Until 2026-09-16 the caller's options went straight through and the results were collected with a
 * `typeof result === 'string'` test, so a detailed call collected nothing: every batch's stdout and stderr
 * were dropped and the hand-built result asserted `exitCode: 0`, which -- paired with
 * `shouldIgnoreExitCode` -- reported a failed batch as a success. Only the split path was affected; the
 * unsplit one returns `execString`'s own result and always has.
 */
async function executeBatches(staticParts: string[], batches: string[][], options: ExecOption): Promise<ExecResult | string> {
  const baseCommand = toCommandLine(staticParts);
  const stdoutParts: string[] = [];
  const stderrParts: string[] = [];

  /*
   * The first batch that ended abnormally is the one reported, and `null` counts: it is what `execString`
   * resolves to when the child could not be spawned at all under `shouldIgnoreExitCode`, which is no more a
   * success than a non-zero code is.
   */
  let exitCode: null | number = 0;
  let exitSignal: NodeJS.Signals | null = null;

  for (const batch of batches) {
    const batchCommand = `${baseCommand} ${toCommandLine(batch)}`;
    const result = await execString(batchCommand, { ...options, shouldIncludeDetails: true }, [...staticParts, ...batch]);
    stdoutParts.push(result.stdout);
    stderrParts.push(result.stderr);
    if (exitCode === 0 && result.exitCode !== 0) {
      exitCode = result.exitCode;
      exitSignal = result.exitSignal;
    }
  }

  const stdout = stdoutParts.join('\n');
  if (!options.shouldIncludeDetails) {
    return stdout;
  }

  return {
    exitCode,
    exitSignal,
    stderr: stderrParts.join('\n'),
    stdout
  };
}

/*
 * Node picks the shell out of `ComSpec` and falls back to `cmd.exe`, so the wrapper is only as long as
 * whatever this machine has there -- 39 chars with the usual `C:\Windows\system32\cmd.exe`.
 */
function getShellWrapperLength(): number {
  const DEFAULT_COMSPEC = 'cmd.exe';
  return (process.env['ComSpec'] ?? DEFAULT_COMSPEC).length + CMD_SHELL_WRAPPER.length;
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

  const fullCommand = `${baseCommand} ${toCommandLine(execArgument.batchedArguments)}`;
  if (getShellCommandLineLength(fullCommand) <= maxCommandLength) {
    return execString(fullCommand, options, [...staticParts, ...execArgument.batchedArguments]);
  }

  const batches: string[][] = [];
  let currentBatch: string[] = [];

  for (const argument of execArgument.batchedArguments) {
    const tentative = `${baseCommand} ${toCommandLine([...currentBatch, argument])}`;
    const tentativeLength = getShellCommandLineLength(tentative);
    if (tentativeLength > maxCommandLength) {
      if (currentBatch.length === 0) {
        /*
         * Both numbers are the shell's, not the quoter's, and the difference between them is exact: the
         * escape applies per character and the wrapper is the same on both sides, so it cancels.
         */
        return Promise.reject(
          new Error(
            `Cannot split command into batches: a single argument (${String(tentativeLength - getShellCommandLineLength(baseCommand))} chars once quoted and escaped) plus the base command brings the command line to ${String(tentativeLength)} chars as the shell receives it, over the max command length (${String(maxCommandLength)}).`
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

  return executeBatches(staticParts, batches, options);
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
    /*
     * The advice in this throw is only reachable by the one caller it fits, and keeping it that way is a
     * constraint on anything new that calls `execString`. Every ARRAY-shaped call threads `rawArguments` --
     * `exec`'s array branch, and since 2026-09-16 the batched branch and `executeBatches` too -- so what is
     * left here is exactly `exec(command: string)`, where passing an array really is the fix. Until that date
     * the batched path omitted the argument, and a batched argument bearing a newline was told to pass an
     * array it had already passed: the newline was in `batchedArguments`, and nothing doable from that
     * surface would have helped. A new call site that drops the array does not merely lose the hatch -- it
     * re-opens that misdirection.
     */
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
