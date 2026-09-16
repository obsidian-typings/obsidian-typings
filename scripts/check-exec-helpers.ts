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
 *
 * The end-to-end round trip below - actually spawning a child and reading its `process.argv` back - runs
 * everywhere. It was Windows-only until 2026-09-16, when `toCommandLine` gained its POSIX arm: before that
 * `exec` applied the Windows rules on every platform and escaped nothing for `/bin/sh`, so a backslash-bearing
 * argument did not survive the shell and asserting the round trip there would have asserted the bug.
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
async function assertRoundTrip(): Promise<void> {
  const echoScriptPath = toPosixPath(join(tmpdir(), 'obsidian-typings-check-exec-helpers-echo-argv.mjs'));
  await writeFile(echoScriptPath, 'console.log(JSON.stringify(process.argv.slice(2)));\n');

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

async function main(): Promise<void> {
  await assertCopiesAreIdentical();
  assertWindowsQuoting();
  assertPosixQuoting();
  assertPlatformCommandLine();
  await assertRoundTrip();

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

await main();
