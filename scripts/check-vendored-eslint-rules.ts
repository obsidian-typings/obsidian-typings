/**
 * @file
 *
 * Gate for the ESLint rule sources this repo vendors out of `obsidian-dev-utils`.
 *
 * This repo resolves no dependency on `obsidian-dev-utils` - it is a sibling of it, not a consumer - so the
 * custom rules it lints itself with are hand-copied out of that repo's
 * `src/script-utils/linters/eslint-rules/` rather than imported. Nothing kept the copies honest, and they had
 * aged apart in three directions at once: refinements upstream made and no copy took, a local autofix
 * rewriting a copy in place, and a copy whose behavior had quietly diverged from the rule it is named after.
 * One tree had never been compared to anything at all.
 *
 * What this asserts is byte-identity after a recorded transform. The copies are supposed to be the same
 * bytes, so there is no "which side is stricter" judgement to make and no ESLint has to resolve anything -
 * which is what makes this check cheap where the same question about the shared ESLint **config** is not.
 *
 * Four things it does deliberately:
 *
 * 1. **A deliberate difference is recorded as the TRANSFORM that reproduces it**, in {@link TRANSFORM_ARMS},
 *    rather than as a comment no checker can parse. Each arm carries the reason it exists and the files it
 *    applies to, so accepting a divergence is a code change that every later run then enforces.
 * 2. **It enumerates the TREES, not the directories.** Any file anywhere in this repo named after an upstream
 *    rule source is a copy, wherever it sits - including inside a self-contained subpackage with its own
 *    `package.json`. Walking one known path per repo is how a second tree was never compared to anything.
 * 3. **This repo's side is READ FROM THE INDEX**, not from the working tree ({@link readIndexContent}). A
 *    local autofix rewriting a copy in place is one of the three drift directions above, and `lint:fix` and
 *    `format` do exactly that to a staged file in the same commit this runs in. nano-staged cannot be made
 *    to run this after them - it runs its per-pattern task groups with `Promise.all`, so a separate key
 *    RACES the fixer rather than following it (measured against 1.0.2 in this checkout, 2026-09-19;
 *    sequencing exists within one key's command list and nowhere else). Reading the index makes that
 *    ordering irrelevant instead of trying to enforce it, and answers the same question when a developer
 *    runs this by hand mid-edit. An untracked copy has no staged bytes and is read from disk.
 * 4. **The upstream list comes from upstream**, from the directory listing rather than from a roster restated
 *    here, so a rule added there is not invisible to this check. The sources are then read from
 *    `raw.githubusercontent.com`: the published npm package ships `dist/` only, so the `.ts` sources are not
 *    in it, and reading them off a sibling checkout would make this check pass only on a machine that happens
 *    to have one - which is the property that kept this check out of `obsidian-dev-utils` itself. The
 *    generated `index.ts` beside the sources would have been the cheaper listing and is not published: it is
 *    a build artifact and git ignores it, as it does the `.d.ts` files beside it.
 *
 * Offline, or anywhere the fetch is unwelcome, this is turned off the way every script here is turned off:
 * `CHECK_VENDORED_ESLINT_RULES=0`, via {@link exitIfScriptDisabled}. That is an explicit opt-out rather than
 * a silent skip, so a network failure is still reported as a failure.
 */

import {
  mkdir,
  readdir,
  readFile,
  writeFile
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  basename,
  join
} from 'node:path/posix';
import process from 'node:process';

import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { readIndexContent } from './helpers/git-content.ts';
import {
  getRootFolder,
  toPosixPath
} from './helpers/root.ts';

/**
 * What an arm does to upstream's text.
 *
 * Held as an alias rather than written inline as a member's type on purpose: this file is itself a near-copy
 * across the repos that vendor these rules, and they do not agree on `@typescript-eslint/method-signature-style`
 * - a function PROPERTY signature is an error in one and a method shorthand is an error in another. A member
 * typed by an alias is neither, so the same file lints clean in all of them.
 */
type TransformApply = (text: string) => string;

/**
 * A recorded deliberate divergence between an upstream rule source and this repo's copy of it, expressed as
 * the transform that reproduces the copy from upstream.
 *
 * An empty `fileNames` means the arm applies to every vendored file.
 */
interface TransformArm {
  apply: TransformApply;
  fileNames: readonly string[];
  reason: string;
}

/**
 * One entry of GitHub's contents listing, narrowed to the two fields this reads.
 */
interface UpstreamListingEntry {
  name: string;
  type: string;
}

/**
 * One vendored copy's bytes, and where they were read from.
 *
 * The source is carried rather than inferred, because it is the difference between "this is what your
 * commit would write" and "this is what is on your disk" - and a failure message that does not say which is
 * one a reader cannot act on.
 */
interface VendoredText {
  isStaged: boolean;
  text: string;
}

const HTTP_STATUS_NOT_FOUND = 404;

const IGNORED_DIRECTORY_NAMES = new Set([
  '.astro',
  '.git',
  'dist',
  'node_modules'
]);

/*
 * The one file in a vendored tree that is NOT a copy: it registers the subset of the rules that tree
 * actually vendors, so its `rules` map differs in every repo by construction. `generator-obsidian-plugin`
 * calls its own `custom-eslint-plugin.ts`; both names are excluded everywhere, which costs nothing and keeps
 * this list the same in every repo.
 */
const REGISTRATION_FILE_NAMES = new Set([
  'custom-eslint-plugin.ts',
  'obsidian-dev-utils-plugin.ts'
]);

/**
 * The recorded divergences, in the order they are applied. Any difference an arm does not account for is
 * drift and is reported.
 */
const TRANSFORM_ARMS: readonly TransformArm[] = [
  {
    apply: (text) => text.replaceAll('\'../../../type-guards.ts\'', '\'../type-guards.ts\''),
    fileNames: [],
    reason: 'Upstream sits three levels under `src/script-utils/`, so it reaches `type-guards.ts` by `../../../`. A vendored tree sits directly beside its copy of that helper.'
  }
  /*
   * There is exactly ONE arm here, and the second arm the other consumers carry is deliberately absent.
   * They strip upstream's inline `unicorn/no-useless-recursion` disable from
   * `no-async-callback-to-unsafe-return.ts`; this repo keeps it, because it installs
   * `eslint-plugin-unicorn` AND enables that rule, so the directive suppresses something real and no
   * autofix touches it. Do not add the arm here to make the five copies look alike - it would demand a
   * file this repo's own lint would then argue with.
   */
];

const UPSTREAM_BASE_URL = 'https://raw.githubusercontent.com/mnaoumov/obsidian-dev-utils/main/src/script-utils/linters/eslint-rules';

const UPSTREAM_LISTING_URL = 'https://api.github.com/repos/mnaoumov/obsidian-dev-utils/contents/src/script-utils/linters/eslint-rules?ref=main';

const failures: string[] = [];

exitIfScriptDisabled();

/**
 * Every file in this repo named after an upstream rule source, wherever it sits.
 *
 * The walk is what makes a tree impossible to miss: it is the name that identifies a copy, not the directory
 * it was expected to be found in.
 */
async function collectVendoredFiles(root: string, upstreamFileNames: ReadonlySet<string>): Promise<string[]> {
  const found: string[] = [];

  async function walk(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (!IGNORED_DIRECTORY_NAMES.has(entry.name)) {
          await walk(path);
        }

        continue;
      }

      if (upstreamFileNames.has(entry.name) && !REGISTRATION_FILE_NAMES.has(entry.name)) {
        found.push(path);
      }
    }
  }

  await walk(root);
  return found.sort((left, right) => left.localeCompare(right));
}

async function compareVendoredFile(vendoredPath: string, root: string, scratchDirectory: string): Promise<void> {
  const fileName = basename(vendoredPath);
  const relativePath = vendoredPath.slice(root.length + 1);

  const upstreamText = await fetchUpstreamText(fileName);
  if (upstreamText === null) {
    failures.push(`${relativePath} has no counterpart upstream - it is named after a rule source that is no longer published at ${UPSTREAM_BASE_URL}.`);
    return;
  }

  const expected = transform(upstreamText, fileName);
  const { isStaged, text: actual } = await readVendoredText(root, relativePath, vendoredPath);
  if (actual === expected) {
    return;
  }

  const expectedPath = getScratchPath(relativePath, scratchDirectory, 'upstream');
  await writeFile(expectedPath, expected);

  const actualPath = getScratchPath(relativePath, scratchDirectory, isStaged ? 'staged' : 'disk');
  await writeFile(actualPath, actual);

  failures.push(
    `${relativePath} differs from upstream after the recorded transform. See how with \`git diff --no-index ${expectedPath} ${actualPath}\` - the right-hand side is ${isStaged ? `the STAGED ${relativePath}, which is what a commit would write` : `${relativePath} as it sits on disk, because it is untracked`}.`
  );
}

async function fetchUpstreamText(fileName: string): Promise<null | string> {
  const response = await fetch(`${UPSTREAM_BASE_URL}/${fileName}`);
  if (response.ok) {
    return await response.text();
  }

  if (response.status === HTTP_STATUS_NOT_FOUND) {
    return null;
  }

  throw new Error(`Could not read ${fileName} from ${UPSTREAM_BASE_URL}: HTTP ${String(response.status)} ${response.statusText}.`);
}

/**
 * Where one side of a file's comparison is parked.
 *
 * Both sides are written out rather than only upstream's, because this repo's side is read from the index
 * and so is not readable as a path - see {@link readVendoredText}.
 */
function getScratchPath(relativePath: string, scratchDirectory: string, side: 'disk' | 'staged' | 'upstream'): string {
  return join(scratchDirectory, `${side}__${relativePath.replaceAll('/', '__')}`);
}

/**
 * The `.ts` files upstream publishes in that directory - the rule sources and the `*.test.ts` that travels
 * with each of them.
 *
 * Reading the list from upstream rather than restating it here is what keeps a newly added rule - or a newly
 * vendored copy of one - from being invisible to this check.
 *
 * The listing is the one call here that goes to the API rather than to `raw`, which rate-limits an
 * unauthenticated caller to 60 requests an hour per address. A `GITHUB_TOKEN` in the environment is used when
 * there is one, which is what makes this survive a CI runner shared with anything else.
 */
async function getUpstreamFileNames(): Promise<Set<string>> {
  const headers: Record<string, string> = { accept: 'application/vnd.github+json' };
  const token = process.env['GITHUB_TOKEN'] ?? process.env['GH_TOKEN'];
  if (token !== undefined) {
    headers['authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(UPSTREAM_LISTING_URL, { headers });

  if (!response.ok) {
    throw new Error(
      `Could not list the upstream rule sources at ${UPSTREAM_LISTING_URL}: HTTP ${String(response.status)} ${response.statusText}. A 403 here is almost always GitHub's unauthenticated rate limit; set GITHUB_TOKEN, or turn this check off for the run with CHECK_VENDORED_ESLINT_RULES=0.`
    );
  }

  const entries = await response.json() as UpstreamListingEntry[];
  const names = new Set(entries.filter((entry) => entry.type === 'file' && entry.name.endsWith('.ts')).map((entry) => entry.name));

  if (names.size === 0) {
    throw new Error(`${UPSTREAM_LISTING_URL} listed no rule sources, so this check would have compared nothing.`);
  }

  return names;
}

async function main(): Promise<void> {
  const rootFolder = getRootFolder();
  if (rootFolder === null) {
    console.error('check:vendored-eslint-rules could not find the repository root.');
    process.exitCode = 1;
    return;
  }

  const root = toPosixPath(rootFolder);
  const upstreamFileNames = await getUpstreamFileNames();
  const vendoredPaths = await collectVendoredFiles(root, upstreamFileNames);

  /*
   * A repo that vendors nothing has no business running this, and a walk that suddenly finds nothing is far
   * more likely to be a broken walk than a deleted tree. Either way it is reported rather than passed.
   */
  if (vendoredPaths.length === 0) {
    console.error('check:vendored-eslint-rules found no vendored rule sources at all, which is not a state this repo is expected to reach.');
    process.exitCode = 1;
    return;
  }

  const scratchDirectory = toPosixPath(join(tmpdir(), 'check-vendored-eslint-rules', basename(root)));
  await mkdir(scratchDirectory, { recursive: true });

  for (const vendoredPath of vendoredPaths) {
    await compareVendoredFile(vendoredPath, root, scratchDirectory);
  }

  if (failures.length > 0) {
    console.error(`check:vendored-eslint-rules found ${String(failures.length)} problem(s) across ${String(vendoredPaths.length)} vendored file(s):`);
    for (const failure of failures) {
      console.error(`  - ${failure}`);
    }

    console.error('');
    console.error('Each of these is a hand-copy that has aged apart from the source it was taken from. Take upstream\'s bytes; or, where the difference is deliberate, record it as a transform arm in this script so that every later run enforces it instead of reporting it.');
    console.error('');
    console.error(`The ${String(TRANSFORM_ARMS.length)} divergence(s) already recorded, so that a difference matching one of them is not reported above:`);
    for (const arm of TRANSFORM_ARMS) {
      const scope = arm.fileNames.length === 0 ? 'every vendored file' : arm.fileNames.join(', ');
      console.error(`  - ${scope}: ${arm.reason}`);
    }

    process.exitCode = 1;
    return;
  }

  console.log(`check:vendored-eslint-rules passed: ${String(vendoredPaths.length)} vendored file(s) match upstream after the recorded transform.`);
}

/**
 * Reads one vendored copy as it is about to be committed.
 *
 * The index rather than the working tree - see the file header for why, and
 * `scripts/helpers/git-content.ts` for the nano-staged measurement behind it. The fallback to disk is not a
 * safety net: this gate finds its copies by WALKING for the name, deliberately, so a vendored tree that has
 * been added but not yet `git add`ed is an ordinary case, and disk is the only place its bytes exist.
 *
 * @param root - The repository root.
 * @param relativePath - The copy's path relative to `root`.
 * @param absolutePath - The same file, for the fallback read.
 * @returns The bytes to compare, and whether they came from the index.
 */
async function readVendoredText(root: string, relativePath: string, absolutePath: string): Promise<VendoredText> {
  const staged = await readIndexContent(root, relativePath);
  return staged === null
    ? { isStaged: false, text: await readFile(absolutePath, 'utf-8') }
    : { isStaged: true, text: staged.toString('utf-8') };
}

function transform(upstreamText: string, fileName: string): string {
  let text = upstreamText;
  for (const arm of TRANSFORM_ARMS) {
    if (arm.fileNames.length === 0 || arm.fileNames.includes(fileName)) {
      text = arm.apply(text);
    }
  }

  return text;
}

await main();
