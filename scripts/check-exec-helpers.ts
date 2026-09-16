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
 * 2. **The quoting behaves.** `argvQuote` and the `cmd.exe` metacharacter escape carry the rules that make an
 *    argument survive `cmd.exe`, and nothing in this repo exercised them: a trailing backslash on a path with
 *    a space, an embedded quote, an embedded newline. They are asserted here as pure functions, so the cases
 *    run on every platform rather than only where a shell could be spawned.
 *
 * The end-to-end round trip below - actually spawning a child and reading its `process.argv` back - runs on
 * Windows only. It is not a gap in coverage of the quoter: `exec` applies these Windows rules on every
 * platform and escapes nothing for `/bin/sh`, so on POSIX a backslash-bearing argument does not survive the
 * shell. That is a real defect, tracked separately, and asserting the round trip there would assert the bug.
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

function assertQuoting(): void {
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
    commandEscapeCommandLine(toCommandLine(['git', 'log', '--format=%H'])),
    'git log --format=^%H',
    'a percent sign reaching cmd.exe'
  );

  assertEqual(toCommandLine(['git', 'commit', '-m', 'a & b']), 'git commit -m "a & b"', 'a command line built from parts');
}

async function assertRoundTrip(): Promise<void> {
  if (process.platform !== 'win32') {
    console.log('Skipping the argv round trip: it is a cmd.exe check, and this is not Windows.');
    return;
  }

  const echoScriptPath = toPosixPath(join(tmpdir(), 'obsidian-typings-check-exec-helpers-echo-argv.mjs'));
  await writeFile(echoScriptPath, 'console.log(JSON.stringify(process.argv.slice(2)));\n');

  const expectedArguments = [
    String.raw`C:\Program Files` + BACKSLASH,
    'say "hi"',
    'a & b | c',
    'line1\nline2'
  ];

  const stdout = await execFromRoot([process.execPath, echoScriptPath, ...expectedArguments], { isQuiet: true });
  const actualArguments = JSON.parse(stdout) as string[];

  assertEqual(JSON.stringify(actualArguments), JSON.stringify(expectedArguments), 'the argv round trip through cmd.exe');
}

async function main(): Promise<void> {
  await assertCopiesAreIdentical();
  assertQuoting();
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
