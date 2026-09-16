/**
 * @file
 *
 * Gate for the `helpers/exec.ts` + `helpers/root.ts` pair that `scripts/`, `workflow-scripts/` and
 * `docs/scripts/` each carry a copy of.
 *
 * It checks two things nothing else does:
 *
 * 1. **The copies have not drifted.** The three trees are self-contained islands on purpose (see the header
 *    of `helpers/exec.ts`), so the files cannot be deduplicated into one import - which leaves byte-identity
 *    as the only thing that keeps them from aging apart, as they had.
 * 2. **The quoting behaves, on both shells.** `argvQuote` plus the `cmd.exe` metacharacter escape carry the
 *    rules that make an argument survive `cmd.exe`; `posixQuote` carries the ones that make it survive
 *    `/bin/sh`. Nothing in this repo exercised either: a trailing backslash on a path with a space, an
 *    embedded quote, an embedded newline, a metacharacter. All three quoters are asserted here as pure
 *    functions, so every case runs on every platform rather than only on the one whose shell it describes.
 * 3. **The budget is spent by what the shell is handed.** On Windows that is neither the quoted command line
 *    nor the whole of it: `commandEscapeCommandLine` can double the line and `cmd.exe /d /s /c "..."` takes
 *    a fixed bite out of the same ceiling, both of them after the budget was measured until 2026-09-16. So a
 *    batch sized at 8191 died with `The command line is too long.` The split round trip is run a second
 *    time over padding built of `&` to cover it, and an over-budget command line is asserted to be refused
 *    here rather than by the shell.
 *
 * The end-to-end round trip below - actually spawning a child and reading its `process.argv` back - runs
 * everywhere. It was Windows-only until 2026-09-16, when `toCommandLine` gained its POSIX arm: before that
 * `exec` applied the Windows rules on every platform and escaped nothing for `/bin/sh`, so a backslash-bearing
 * argument did not survive the shell and asserting the round trip there would have asserted the bug.
 *
 * It round-trips the **batched** command shape too, in both its forms - under the length budget and split
 * across batches. Until 2026-09-16 `exec` quoted a batched command's static parts and interpolated its
 * batched ones raw, so a batched argument bearing a space became two arguments; the split form needs its own
 * case because two of the three sites that built those command lines run only once the budget is exceeded.
 */

import {
  readFile,
  writeFile
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path/posix';
import process from 'node:process';

import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import {
  argvQuote,
  commandEscapeCommandLine,
  getMaxCommandLength,
  getShellCommandLineLength,
  posixQuote,
  toCommandLine
} from './helpers/exec.ts';
import {
  execFromRoot,
  getRootFolder,
  toPosixPath
} from './helpers/root.ts';

/*
 * Each group is a set of paths whose contents must be identical. Relative to the repository root.
 */
const IDENTICAL_FILE_GROUPS: readonly (readonly string[])[] = [
  [
    'scripts/helpers/exec.ts',
    'workflow-scripts/helpers/exec.ts',
    'docs/scripts/helpers/exec.ts'
  ],
  [
    'scripts/helpers/root.ts',
    'workflow-scripts/helpers/root.ts',
    'docs/scripts/helpers/root.ts'
  ]
];

const failures: string[] = [];

exitIfScriptDisabled();

/*
 * The split round trip again over padding built of the one character `cmd.exe` charges twice for. This is
 * the case the budget got wrong: the splitter sized each batch by the quoted command line, then
 * `commandEscapeCommandLine` doubled it and `cmd.exe /d /s /c "..."` added its own bytes, so every batch
 * built here arrived over the ceiling and the run died with `The command line is too long.` It is cheap
 * beside {@link assertBatchedSplitRoundTrip} - the padding is the whole argument list rather than a filler
 * between two tricky ends, because what is under test is the sizing and not the quoting.
 */
async function assertBatchedEscapedSplitRoundTrip(echoScriptPath: string): Promise<void> {
  await assertSplitRoundTrip(
    echoScriptPath,
    buildEscapePaddingArguments(),
    'the split batched argv round trip over padding the shell escape doubles'
  );
}

/*
 * The batched command shape under the length budget, which is the one site of the three that runs without the
 * command line having to exceed it. Its arguments used to be interpolated raw while the static parts beside
 * them were quoted, so `two words` arrived as two arguments and `a & b | c` was read as shell syntax.
 */
async function assertBatchedRoundTrip(echoScriptPath: string): Promise<void> {
  const expectedArguments = getBatchedTrickyArguments();

  const batchArgumentLists = await execBatchedEchoArgv(echoScriptPath, expectedArguments);

  assertEqual(
    String(batchArgumentLists.length),
    '1',
    'a batched command inside the length budget runs as a single command'
  );
  assertEqual(
    JSON.stringify(batchArgumentLists.flat()),
    JSON.stringify(expectedArguments),
    `the batched argv round trip through ${process.platform === 'win32' ? 'cmd.exe' : '/bin/sh'}`
  );
}

/*
 * The same round trip forced over the budget, so the batches are actually built and spawned. The other two
 * sites that interpolated batched arguments raw - the tentative command the splitter measures, and the one
 * `executeBatches` runs - are reachable only this way, which is why padding this out is worth the extra
 * spawns. The padding arguments are distinct and quoting-free, so the order check in
 * {@link assertSplitRoundTrip} proves the batches come back in the order they were split into.
 */
async function assertBatchedSplitRoundTrip(echoScriptPath: string): Promise<void> {
  const trickyArguments = getBatchedTrickyArguments();

  await assertSplitRoundTrip(
    echoScriptPath,
    [...trickyArguments, ...buildPaddingArguments(), ...trickyArguments],
    'the split batched argv round trip'
  );
}

async function assertCopiesAreIdentical(): Promise<void> {
  const root = getRootFolder();
  if (root === null) {
    failures.push('Could not find the repository root, so the copies could not be compared.');
    return;
  }

  for (const group of IDENTICAL_FILE_GROUPS) {
    const [canonicalPath, ...otherPaths] = group;
    if (canonicalPath === undefined) {
      continue;
    }

    const canonicalContent = await readFile(join(root, canonicalPath), 'utf-8');

    for (const otherPath of otherPaths) {
      const otherContent = await readFile(join(root, otherPath), 'utf-8');
      if (otherContent !== canonicalContent) {
        failures.push(
          `${otherPath} differs from ${canonicalPath}. These files are copies of one another; run \`git diff --no-index ${canonicalPath} ${otherPath}\` to see how, then copy the corrected file over the others.`
        );
      }
    }
  }
}

/*
 * A template literal cannot end in a lone backslash -- it would escape the closing backtick -- and half the
 * cases below are about exactly that character, so the two are spelled out and concatenated. Every expected
 * value carries the literal text it stands for in a trailing comment.
 */
const BACKSLASH = '\\';
const QUOTE = '"';

function assertEqual(actual: string, expected: string, label: string): void {
  if (actual !== expected) {
    failures.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

/*
 * A command line that is inside the budget as the quoter leaves it and over it as the shell receives it.
 * Until 2026-09-16 `exec` measured the first of those and handed the second to `cmd.exe`, which answered
 * `The command line is too long.` - an exit code 1 from somewhere inside the command, with nothing naming
 * the length as the cause. It has to be refused here, before anything is spawned.
 */
async function assertOverBudgetCommandIsRefused(): Promise<void> {
  const maxCommandLength = getMaxCommandLength();
  const PREFIX = 'echo ';
  const METACHARACTER = '&';

  /*
   * What one more metacharacter costs the budget, read off the helper rather than restated: two bytes where
   * the escape applies, one where it does not. Sizing this way is what lets the case run on both.
   */
  const costPerCharacter = getShellCommandLineLength(PREFIX + METACHARACTER) - getShellCommandLineLength(PREFIX);
  const count = Math.ceil((maxCommandLength + 1 - getShellCommandLineLength(PREFIX)) / costPerCharacter);
  const commandLine = PREFIX + METACHARACTER.repeat(count);

  assertEqual(
    String(commandLine.length <= maxCommandLength),
    String(process.platform === 'win32'),
    'the over-budget command line is one the quoted length would have let through, on Windows'
  );

  let message = '';
  try {
    await execFromRoot(commandLine, { isQuiet: true });
  } catch (error) {
    message = error instanceof Error ? error.message : String(error);
  }

  assertEqual(
    String(message.startsWith('Command line is too long')),
    'true',
    `an over-budget command line is refused by exec rather than by the shell, which answered ${JSON.stringify(message.split('\n', 1)[0] ?? '')}`
  );
}

function assertPlatformCommandLine(): void {
  const expected = process.platform === 'win32' ? 'git commit -m "a & b"' : 'git commit -m \'a & b\'';
  assertEqual(toCommandLine(['git', 'commit', '-m', 'a & b']), expected, 'a command line built from parts, quoted for this platform');
}

/*
 * `sh` obeys none of the MSVCRT rules {@link assertWindowsQuoting} covers, so quoting a POSIX command line
 * with them is how a program handed `C:\dir\subdir` received it with every backslash eaten, and how an
 * embedded `&` split the command. Single quotes are the answer: inside them `sh` treats every character
 * literally, so the only thing still needing an escape is `'` itself.
 */
function assertPosixQuoting(): void {
  /*
   * The case that started this. The Windows quoter returns this argument untouched -- there is no whitespace
   * for `cmd.exe` to split on -- and `sh` then eats every backslash.
   */
  assertEqual(
    posixQuote(String.raw`C:\dir\subdir`),
    String.raw`'C:\dir\subdir'`,
    'a backslash-bearing argument with nothing to split on'
  );

  /*
   * A trailing backslash needs no special handling at all here: it is the closing quote of a double-quoted
   * word that would swallow it, and there is no such thing inside single quotes.
   */
  assertEqual(
    posixQuote(String.raw`C:\Program Files` + BACKSLASH),
    `'${String.raw`C:\Program Files`}${BACKSLASH}'`, // 'C:\Program Files\'
    'a path with a space and a trailing backslash'
  );

  assertEqual(posixQuote('a & b | c'), '\'a & b | c\'', 'sh metacharacters');

  /*
   * A single quote cannot be escaped inside single quotes, so the word is closed, the quote is handed over as
   * a backslash-escaped one outside it, and the word is reopened: `'` becomes `'\''`.
   */
  assertEqual(posixQuote('it\'s here'), String.raw`'it'\''s here'`, 'an embedded single quote');

  /*
   * Carried through as a real newline, as the Windows quoter does -- `sh` reads a newline inside single
   * quotes as a literal character rather than as the end of the command.
   */
  assertEqual(posixQuote('line1\nline2'), '\'line1\nline2\'', 'an embedded newline');

  /*
   * An argument built only of characters `sh` never acts on is passed through, which is what keeps an
   * ordinary command line readable.
   */
  assertEqual(posixQuote('--format=%H'), '--format=%H', 'an argument needing no quoting');

  /*
   * The empty argument is the one case where quoting is what makes the word exist at all: unquoted, `sh`
   * drops it and the program is handed one fewer argument than the caller passed.
   */
  assertEqual(posixQuote(''), '\'\'', 'the empty argument');
}

/*
 * The one assertion here that is not a pure function: it spawns a real child through whichever shell this
 * platform uses and reads `process.argv` back, so it covers the quoter, the `cmd.exe` escape and
 * `spawnViaShell`'s choice between handing the shell a command line and spawning the program directly.
 */
async function assertRoundTrip(echoScriptPath: string): Promise<void> {
  const expectedArguments = [
    String.raw`C:\Program Files` + BACKSLASH,
    'say "hi"',
    'a & b | c',
    'line1\nline2',
    /*
     * The two cases that made this round trip run everywhere: both are whitespace-free, so the Windows quoter
     * hands them over untouched, and on `sh` the first lost its backslashes and the second split the command.
     */
    String.raw`C:\dir\subdir`,
    'a&b',
    ''
  ];

  const stdout = await execFromRoot([process.execPath, echoScriptPath, ...expectedArguments], { isQuiet: true });
  const actualArguments = JSON.parse(stdout) as string[];

  assertEqual(
    JSON.stringify(actualArguments),
    JSON.stringify(expectedArguments),
    `the argv round trip through ${process.platform === 'win32' ? 'cmd.exe' : '/bin/sh'}`
  );
}

/*
 * The budget's two Windows-only layers, asserted as properties rather than by restating the arithmetic the
 * helper does: a metacharacter costs the line the byte its escape takes, and the wrapper `cmd.exe` is
 * invoked with costs it a fixed amount. Both are zero everywhere else, where the command string is handed
 * to `sh` as its own argv entry and shares its budget with nothing.
 */
function assertShellCommandLineLength(): void {
  const isWindows = process.platform === 'win32';

  assertEqual(
    String(getShellCommandLineLength('echo a&b') - getShellCommandLineLength('echo axb')),
    isWindows ? '1' : '0',
    'a cmd.exe metacharacter costs the budget its escape'
  );

  const PLAIN_COMMAND_LINE = 'echo plain';
  assertEqual(
    String(getShellCommandLineLength(PLAIN_COMMAND_LINE) > PLAIN_COMMAND_LINE.length),
    String(isWindows),
    'the shell wrapper is spent from the same budget'
  );
}

/*
 * The shared body of the two split cases: run the batched command, then check that it split at all, that
 * every argument came back, and that they came back in order.
 */
async function assertSplitRoundTrip(echoScriptPath: string, expectedArguments: string[], label: string): Promise<void> {
  const batchArgumentLists = await execBatchedEchoArgv(echoScriptPath, expectedArguments);

  /*
   * Guards the callers' sizing: were their padding ever to stop exceeding the budget, this case would
   * quietly become a second copy of the unsplit one rather than failing.
   */
  const MINIMUM_SPLIT_BATCH_COUNT = 2;
  if (batchArgumentLists.length < MINIMUM_SPLIT_BATCH_COUNT) {
    failures.push(
      `${label}: expected the command to split into more than one batch, got ${String(batchArgumentLists.length)}`
    );
    return;
  }

  const actualArguments = batchArgumentLists.flat();
  if (actualArguments.length !== expectedArguments.length) {
    failures.push(
      `${label}: expected ${String(expectedArguments.length)} arguments back, got ${String(actualArguments.length)}`
    );
    return;
  }

  /*
   * Reported one argument at a time rather than as two JSON blobs: the arrays run to hundreds of entries, and
   * a whole-array diff would bury the one that moved.
   */
  const differenceIndex = expectedArguments.findIndex((argument, index) => actualArguments[index] !== argument);
  if (differenceIndex !== -1) {
    failures.push(
      `${label}: argument ${String(differenceIndex)} came back as ${JSON.stringify(actualArguments[differenceIndex])}, expected ${JSON.stringify(expectedArguments[differenceIndex])}`
    );
  }
}

function assertWindowsQuoting(): void {
  /*
   * The case the naive quoter gets wrong: a directory path with a space in it. Quoting it puts the trailing
   * backslash immediately before the closing quote, where `cmd.exe` reads the pair as an escaped quote and
   * the argument runs on into the next one. MSVCRT's answer is to double that run of backslashes.
   */
  assertEqual(
    argvQuote(String.raw`C:\Program Files` + BACKSLASH),
    `${QUOTE}${String.raw`C:\Program Files`}${BACKSLASH}${BACKSLASH}${QUOTE}`, // "C:\Program Files\\"
    'a path with a space and a trailing backslash'
  );

  /*
   * A backslash NOT followed by a quote is left alone -- doubling every backslash is the other common bug.
   */
  assertEqual(
    argvQuote(String.raw`C:\Program Files\app.exe`),
    String.raw`"C:\Program Files\app.exe"`,
    'a path with a space and no trailing backslash'
  );

  /*
   * An argument with nothing for the shell to split on needs no quoting at all.
   */
  assertEqual(argvQuote('plain'), 'plain', 'an argument needing no quoting');

  assertEqual(argvQuote('say "hi"'), String.raw`"say \"hi\""`, 'an embedded quote');

  /*
   * One backslash before a quote becomes three: the pair the backslash itself needs, plus the quote's own.
   */
  assertEqual(
    argvQuote(String.raw`a\"b`),
    `${QUOTE}a${BACKSLASH}${BACKSLASH}${BACKSLASH}${QUOTE}b${QUOTE}`, // "a\\\"b"
    'a backslash before an embedded quote'
  );

  /*
   * The newline is carried through as a real newline. The naive quoter replaced it with the two characters
   * `\` and `n`, which silently changes the argument the program receives.
   */
  assertEqual(argvQuote('line1\nline2'), '"line1\nline2"', 'an embedded newline');

  assertEqual(commandEscapeCommandLine('a & b | c'), 'a ^& b ^| c', 'cmd.exe metacharacters');

  assertEqual(
    commandEscapeCommandLine(argvQuote('--format=%H')),
    '--format=^%H',
    'a percent sign reaching cmd.exe'
  );
}

/*
 * The same padding as {@link buildPaddingArguments}, built out of the one character whose escape costs the
 * command line a second byte, so a batch sized by the quoted length is over the ceiling by the time
 * `cmd.exe` parses it. Sized from the raw length as the padding below is, which is a floor on the length the
 * shell sees and so exceeds the budget on every platform. The index suffix keeps the arguments distinct.
 */
function buildEscapePaddingArguments(): string[] {
  const PADDING_ARGUMENT_LENGTH = 100;
  const METACHARACTER = '&';
  const count = Math.ceil(getMaxCommandLength() / (PADDING_ARGUMENT_LENGTH + 1)) + 1;
  return Array.from(
    { length: count },
    (_unused, index) => METACHARACTER.repeat(PADDING_ARGUMENT_LENGTH) + String(index)
  );
}

/*
 * Enough distinct, quoting-free arguments to carry a batched command line past the budget whichever platform
 * this runs on, sized from {@link getMaxCommandLength} rather than from a restated constant. Each is exactly
 * {@link PADDING_ARGUMENT_LENGTH} characters of word characters, so the quoter passes it through untouched and
 * it costs the command line its own length plus the separating space.
 */
function buildPaddingArguments(): string[] {
  const PADDING_ARGUMENT_LENGTH = 200;
  const PREFIX = 'pad';
  const count = Math.ceil(getMaxCommandLength() / (PADDING_ARGUMENT_LENGTH + 1)) + 1;
  return Array.from(
    { length: count },
    (_unused, index) => PREFIX + String(index).padStart(PADDING_ARGUMENT_LENGTH - PREFIX.length, '0')
  );
}

/*
 * Runs the echo script over `batchedArguments` and returns one `process.argv` list per batch `exec` actually
 * spawned - one line of output per batch, joined with a newline, which is why no case below puts a newline in
 * a batched argument.
 */
async function execBatchedEchoArgv(echoScriptPath: string, batchedArguments: string[]): Promise<string[][]> {
  const stdout = await execFromRoot([process.execPath, echoScriptPath, { batchedArguments }], { isQuiet: true });
  return stdout.split('\n').map((line) => JSON.parse(line) as string[]);
}

/*
 * The batched half of the cases the quoters cover, minus the embedded newline: a batched command is handed to
 * the shell as a command line with no argument array beside it, and `spawnViaShell` refuses a newline on
 * Windows without one. Everything else that broke when these were interpolated raw is here - a space, a
 * quote, `cmd.exe` and `sh` metacharacters, backslashes, and the empty argument the shell drops entirely.
 */
function getBatchedTrickyArguments(): string[] {
  return [
    String.raw`C:\Program Files` + BACKSLASH,
    'say "hi"',
    'a & b | c',
    String.raw`C:\dir\subdir`,
    'a&b',
    'two words',
    ''
  ];
}

async function main(): Promise<void> {
  await assertCopiesAreIdentical();
  assertWindowsQuoting();
  assertPosixQuoting();
  assertPlatformCommandLine();
  assertShellCommandLineLength();

  const echoScriptPath = await writeEchoArgvScript();
  await assertRoundTrip(echoScriptPath);
  await assertBatchedRoundTrip(echoScriptPath);
  await assertBatchedSplitRoundTrip(echoScriptPath);
  await assertBatchedEscapedSplitRoundTrip(echoScriptPath);
  await assertOverBudgetCommandIsRefused();

  if (failures.length > 0) {
    console.error(`check:exec-helpers found ${String(failures.length)} problem(s):`);
    for (const failure of failures) {
      console.error(`  - ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log('check:exec-helpers passed.');
}

async function writeEchoArgvScript(): Promise<string> {
  const echoScriptPath = toPosixPath(join(tmpdir(), 'obsidian-typings-check-exec-helpers-echo-argv.mjs'));
  await writeFile(echoScriptPath, 'console.log(JSON.stringify(process.argv.slice(2)));\n');
  return echoScriptPath;
}

await main();
