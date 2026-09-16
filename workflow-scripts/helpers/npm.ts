/**
 * @file
 *
 * The npm side of a release: what each branch is called on the registry, how far along that name is, whether
 * CI is actually allowed to publish it, and the repository coordinates every manifest generated for it has to
 * carry.
 *
 * The name derivation lives here rather than in `publish-release.ts` because two scripts now have to agree
 * on it exactly. `bootstrap-new-package.ts` claims the name by hand so a trusted publisher can be attached
 * to it, and `publish-release.ts` publishes into that name from CI. If the two ever computed the name
 * differently, the bootstrap would claim one package and CI would fail publishing to another.
 *
 * The trusted-publisher half lives here for the same reason, one step later: claiming the name and attaching
 * the publisher are separate steps with separate failure modes, and all three of reading that publisher,
 * attaching it, and wording the hand-back for when neither can be done from where the caller stands are
 * needed by more than one script.
 */

import { execFileSync } from 'node:child_process';
import process from 'node:process';

import type { BranchSpec } from './branchSpec.ts';

import { execFromRoot } from './root.ts';

/**
 * How far along a package name is on the registry.
 *
 * `placeholderOnly` is the state `bootstrap-new-package.ts` leaves a name in: claimed, so it exists, but
 * nothing has ever published through CI to it. It is deliberately distinct from `released` — see
 * {@link getPackageRegistryState}.
 */
export type PackageRegistryState = 'missing' | 'placeholderOnly' | 'released';

/**
 * What {@link readTrustedPublisherState} was able to find out about a package's trusted publisher.
 *
 * `unknown` is a first-class answer rather than a failure. The read is authenticated and 2FA-gated, so
 * "nobody is logged in on this machine", "the registry wants a one-time password and there is no terminal to
 * type it into", and "the request never arrived" all land in it — and a caller that cannot tell those apart
 * must not act as though it can.
 */
export type TrustedPublisherState = 'attached' | 'none' | 'unknown';

/** The unscoped package the `public` channel's `-latest` wrapper is itself wrapped by. */
export const LEGACY_PACKAGE_NAME = 'obsidian-typings';

export const NPM_SCOPE = '@obsidian-typings';

/** The version `bootstrap-new-package.ts` publishes to claim a name. Real releases start at `1.1.0`. */
export const PLACEHOLDER_VERSION = '0.0.0';

/*
 * A published manifest is validated by npm against the provenance statement that trusted publishing
 * attaches, and the publish is rejected when the two disagree. The manifests that `publish-release.ts` and
 * `bootstrap-new-package.ts` generate from scratch therefore have to carry the same repository as the
 * package.json a release branch publishes.
 */
export const REPOSITORY = {
  type: 'git',
  url: 'git+https://github.com/obsidian-typings/obsidian-typings.git'
};

/* The GitHub coordinates a trusted publisher is pinned to. All packages here publish from the same workflow. */
const GITHUB_OWNER = 'obsidian-typings';
const GITHUB_REPOSITORY = 'obsidian-typings';
const PUBLISH_WORKFLOW_FILE_NAME = 'publish-release.yml';

const REGISTRY_URL = 'https://registry.npmjs.org';

/* The HTTP status range npm answers a token exchange with when the answer is about THIS request, not the server. */
const CLIENT_ERROR_MIN_STATUS = 400;
const CLIENT_ERROR_MAX_STATUS = 499;

const NOT_FOUND_STATUS = 404;

interface ActionsIdTokenResponse {
  value?: string;
}

interface Packument {
  versions?: Record<string, unknown>;
}

interface TokenExchangeResponse {
  token?: string;
}

/**
 * Attaches this repo's trusted publisher to a package, reporting whether npm accepted it.
 *
 * This is the npmjs.com form, as a command. `npm trust github` POSTs to `/-/package/<name>/trust`, which is
 * the record the "Trusted Publisher" panel writes, so the two are interchangeable — and this one can be run
 * by the script the operator is already standing in front of, which is the whole point. The form is the half
 * of the hand-back that gets skipped, and it gets skipped because it is somewhere else.
 *
 * Three flag choices, each load-bearing:
 *
 * - `--allow-publish` is not optional. `npm/lib/trust-cmd.js` throws `At least one permission flag is
 *   required` when neither it nor `--allow-stage-publish` is given, so a call without it creates nothing at
 *   all. Staged publishing is not something this repo does, so it takes the one permission.
 * - `--repo` is passed EXPLICITLY, although npm would infer it from the nearest `package.json`'s `repository`
 *   field. The inference reads `npm.prefix`, so what it resolves to depends on which directory the command
 *   was spawned from and which branch is checked out — and both callers here can be standing on `main` or on
 *   a release branch. Pinning it to the same constants {@link getTrustedPublisherInstructions} prints keeps
 *   the command, the printed fallback and the web form all saying one thing.
 * - `--yes` skips npm's own `Do you want to proceed? (y/N)` confirm and nothing else. The 2FA challenge is a
 *   separate mechanism that no flag suppresses, which is exactly the shape wanted here: one command, one code.
 *
 * Deliberately not `execFromRoot`. npm's `otplease` opens with
 * `if (!process.stdin.isTTY || !process.stdout.isTTY) { throw err }` (npm 12.0.2, `lib/utils/auth.js`), so
 * redirecting EITHER stream turns the one-time-password challenge into an immediate failure rather than a
 * prompt. Inheriting the terminal is the only way this call can succeed, and it is the same reason
 * `publishPlaceholder` in `bootstrap-new-package.ts` inherits it.
 *
 * Neither caller reaches this without already knowing the package has no publisher — a name claimed seconds
 * earlier by `publishPlaceholder`, or a definite `none` from {@link readTrustedPublisherState} — and that is
 * deliberate, because what a SECOND configuration does to a package that already has one is not known.
 * `createConfig` in `npm/lib/trust-cmd.js` POSTs `[trustConfig]` and reads nothing beforehand, so the client
 * cannot reconcile and the registry's answer is the whole of the behavior. npm's own bundled `npm-trust.md`
 * says the registry "only supports one configuration per package" and that creating a second "will result in
 * an error", which would make a blind call harmless — but that paragraph was written on 2026-02-11 and last
 * touched on 2026-06-03, and npmjs.com's trusted-publishers page documented on 2026-09-03 that a package may
 * carry up to TEN publishers, added and deleted independently. A registry that accepts ten is not one that
 * refuses the second, so the client doc is stale in exactly the direction that matters: a blind call may
 * leave a duplicate behind rather than being turned away. Settling it needs a write on that endpoint, and
 * every write there costs a one-time password — which is why it is still open rather than merely untried.
 *
 * Returns `false` rather than throwing, because every caller's failure path is to print
 * {@link getTrustedPublisherInstructions} and carry on. A publisher that could not be attached from here
 * leaves the repo in the state it has always been in; that is not worth aborting a script over.
 */
export function attachTrustedPublisher(packageName: string): boolean {
  try {
    execFileSync('npm', [
      'trust',
      'github',
      packageName,
      '--file',
      PUBLISH_WORKFLOW_FILE_NAME,
      '--repo',
      `${GITHUB_OWNER}/${GITHUB_REPOSITORY}`,
      '--allow-publish',
      '--yes'
    ], {
      shell: true,
      stdio: 'inherit'
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolves the registry name of the stable `-latest` wrapper for a channel, e.g.
 * `@obsidian-typings/obsidian-public-latest`. Unlike the per-version packages, these names never change, so
 * their trusted publishers are configured once and never again.
 */
export function getLatestWrapperPackageName(channel: BranchSpec['channel']): string {
  return `${NPM_SCOPE}/obsidian-${channel}-latest`;
}

/**
 * Resolves the npm account this machine's credential belongs to, or `null` when the registry will not accept it.
 *
 * `npm whoami` is the one npm command that asks the registry who you are without changing anything, and its
 * failure covers both halves of what goes wrong here (measured 2026-09-14, npm 12.0.2): no token configured at
 * all exits 1 with `ENEEDAUTH`, and a token the registry no longer accepts exits 1 with `E401`. Both are fixed
 * by the same `npm login`, so a caller has no reason to tell them apart.
 *
 * The exit code is the signal, not stdout: npm writes its diagnostics to stderr and leaves stdout empty on
 * either failure. That is what `shouldIncludeDetails` is for -- it is the only way to read one -- and
 * `isQuiet` keeps a raw `ENEEDAUTH` from printing next to the sentence a caller wrote to explain it.
 *
 * This was a bare `spawnSync` until 2026-09-15, because `execFromRoot`'s detail mode was unreachable: see the
 * discriminator note in `exec.ts`. It is that mode's only caller, which makes it the guard on the fix as well
 * as its beneficiary: nothing else in this package reads an exit code, so reverting the discriminator turns
 * `result.exitCode` here into a property on `string` and `npm run typecheck` goes red. Without a caller the
 * bug is invisible to every gate, which is how it survived unnoticed in the first place.
 */
export async function getNpmUsername(): Promise<null | string> {
  const result = await execFromRoot('npm whoami', {
    isQuiet: true,
    shouldIgnoreExitCode: true,
    shouldIncludeDetails: true
  });

  if (result.exitCode !== 0) {
    return null;
  }

  return result.stdout.trim() || null;
}

/**
 * Determines how far along a package name is: never published, claimed by the bootstrap placeholder and
 * nothing else, or carrying at least one real release.
 *
 * Asked against the registry directly rather than through `npm view`, which reports "missing" and "the
 * request failed" with the same non-zero exit code -- a distinction that matters here, because treating a
 * transient network failure as "does not exist" would send a release down the bootstrap path and stall it
 * for no reason.
 *
 * The three states exist because "the package exists" is NOT the predicate for "the bootstrap is done", and
 * two scripts used to treat it as one. The hand-back is two steps -- claim the name, then attach its trusted
 * publisher -- with separate failure modes, and once the placeholder publishes, mere existence is `true` in
 * both states.
 *
 * This is still a HEURISTIC, but not for the reason it used to give. Until 2026-09-15 this doc asserted that
 * npm exposes no way to read a package's trusted publisher -- that `npm access` has no subcommand for it and
 * the registry offers no endpoint. `npm access` really does not, and the conclusion was then generalized
 * without looking for a separate top-level command. There is one: `npm trust`, which
 * {@link readTrustedPublisherState} calls.
 *
 * The reason this function survives the correction is narrower than the claim it replaces. That read is
 * authenticated and 2FA-gated, so it answers only from a logged-in machine and only when the registry does
 * not challenge the call; this one is an unauthenticated `fetch` that answers everywhere -- from CI, from a
 * checkout with no npm login, from a script whose stdout is a pipe. They are asked in that order rather than
 * chosen between.
 *
 * What this reads is the *consequence* of a publisher rather than the publisher itself: a package carrying a
 * real release has, by definition, already published through CI, so its publisher is attached. One carrying
 * only the placeholder has not, and from here its publisher state is unknown -- which is the honest answer,
 * and the reason no caller dispatches into that state on this function's say-so alone.
 * {@link hasTrustedPublisher} answers the question directly from inside the CI job, where there is no npm
 * credential for {@link readTrustedPublisherState} to authenticate with at all.
 */
export async function getPackageRegistryState(packageName: string): Promise<PackageRegistryState> {
  const url = `${REGISTRY_URL}/${escapePackageName(packageName)}`;
  const response = await fetch(url);

  if (response.status === NOT_FOUND_STATUS) {
    return 'missing';
  }

  if (!response.ok) {
    throw new Error(`npm registry returned ${String(response.status)} ${response.statusText} for ${packageName}`);
  }

  const packument = await response.json() as Packument;
  const versions = Object.keys(packument.versions ?? {});

  if (versions.length === 0 || versions.every((version) => version === PLACEHOLDER_VERSION)) {
    return 'placeholderOnly';
  }

  return 'released';
}

/**
 * Resolves the registry name of the per-Obsidian-version package a release branch publishes to, e.g.
 * `@obsidian-typings/obsidian-public-1.13.7`.
 */
export function getScopedPackageName(branchSpec: BranchSpec): string {
  return `${NPM_SCOPE}/obsidian-${branchSpec.channel}-${branchSpec.obsidianVersion}`;
}

/**
 * The exact `npm trust` invocation that attaches this repo's publisher to a package, as a single line.
 *
 * Kept separate from {@link attachTrustedPublisher} so that the command can be *printed* by a script that
 * cannot *run* it -- CI, or any caller whose stdio is redirected. The two are built from the same constants
 * on purpose: a printed command that differs from the one the tooling runs is a second, unverified way to
 * configure the package, and it is the printed one a human would then trust.
 */
export function getTrustedPublisherCommand(packageName: string): string {
  return `npm trust github ${packageName} --file ${PUBLISH_WORKFLOW_FILE_NAME}`
    + ` --repo ${GITHUB_OWNER}/${GITHUB_REPOSITORY} --allow-publish --yes`;
}

/**
 * The remedy for a package with no trusted publisher attached, worded once.
 *
 * Printed by `bootstrap-new-package.ts` when it cannot attach the publisher itself, printed by
 * `create-new-release-branch.ts` when it refuses to dispatch into a name nothing has published through, and
 * embedded in the error `publish-release.ts` throws when CI meets the consequence.
 *
 * It leads with the command, because that is the form the remedy actually takes now: one line, one 2FA code,
 * no browser. The npmjs.com form follows as a fallback rather than as the primary path -- it remains the only
 * route on a machine with no npm login, and the only one a reader can follow when the command has just failed
 * in front of them. Its fields are given verbatim because every one of them is case-sensitive.
 */
export function getTrustedPublisherInstructions(packageName: string): string {
  return [
    '',
    'Attach the trusted publisher, or CI still will not be able to publish it:',
    '',
    `  ${getTrustedPublisherCommand(packageName)}`,
    '',
    'npm asks for one 2FA code and prints the configuration it created. Run it in a real terminal: npm refuses',
    'the operation outright, rather than prompting, when its input or output is redirected.',
    '',
    'The same thing by hand, if that command is unavailable -- every field is case-sensitive:',
    '',
    `  1. Open https://www.npmjs.com/package/${packageName}/access`,
    '  2. Under "Trusted Publisher", choose GitHub Actions and enter, exactly:',
    '',
    `       Organization or user: ${GITHUB_OWNER}`,
    `       Repository:           ${GITHUB_REPOSITORY}`,
    `       Workflow filename:    ${PUBLISH_WORKFLOW_FILE_NAME}`,
    '       Environment name:     (leave empty)',
    '       Allowed actions:      npm publish',
    '',
    // `npm run release` is defined only in a release branch's `package.json`, so naming it without naming
    // where it runs hands back a command that dies with `Missing script: "release"` on `main` -- which is
    // exactly where two of this function's three callers can leave the checkout.
    '  3. Save it. The release is then dispatched from the release branch, where `npm run release` lives.',
    ''
  ].join('\n');
}

/**
 * Determines whether this CI job is allowed to publish the package, or `null` when that cannot be told from
 * here.
 *
 * This is the check `npm publish` makes and then throws away. Reading npm 12.0.2's `lib/utils/oidc.js`: it
 * requests a GitHub Actions ID token with audience `npm:<registry host>`, POSTs it to
 * `/-/npm/v1/oidc/token/exchange/package/<name>`, and on ANY failure logs at `verbose` and returns silently,
 * because OIDC is an optional feature the registry may not offer at all. `npm publish` then carries on with
 * no credential, and npm answers an unauthorized `PUT` with **404**, not 401 -- it will not confirm the
 * existence of something you may not read. So a package whose trusted publisher was never attached fails
 * with `E404 ... could not be found or you do not have permission` against a name that plainly does exist,
 * and the run's only clue is a log line nobody enabled. (Measured 2026-09-14: two dispatches died exactly
 * that way, having already burned a version number each.) Asking the same question up front is the whole of
 * the fix.
 *
 * Only a **4xx** is treated as a definitive "no". Everything else -- not running in Actions, no
 * `id-token: write` permission, a 5xx, a network failure, a 2xx that somehow carries no token -- answers
 * `null`, meaning "could not tell", and leaves the caller to publish and find out. The asymmetry is
 * deliberate: a wrong "no" costs a re-run of a job that has not yet changed anything, while a wrong "yes"
 * costs a version number, because the publish it lets through happens after the release commit and tag are
 * already pushed.
 */
export async function hasTrustedPublisher(packageName: string): Promise<boolean | null> {
  const idToken = await fetchActionsIdToken();

  if (idToken === null) {
    return null;
  }

  let response: Response;

  try {
    response = await fetch(`${REGISTRY_URL}/-/npm/v1/oidc/token/exchange/package/${escapePackageName(packageName)}`, {
      headers: {
        authorization: `Bearer ${idToken}`
      },
      method: 'POST'
    });
  } catch {
    return null;
  }

  if (response.ok) {
    const body = await response.json() as TokenExchangeResponse;
    return body.token ? true : null;
  }

  if (response.status >= CLIENT_ERROR_MIN_STATUS && response.status <= CLIENT_ERROR_MAX_STATUS) {
    return false;
  }

  return null;
}

/**
 * Asks the registry which trusted publishers a package has, or `unknown` when it will not say from here.
 *
 * `npm trust list` GETs `/-/package/<name>/trust`, which is the direct answer to the question three places in
 * this repo used to say could not be asked at all. It is not a drop-in replacement for
 * {@link getPackageRegistryState}, for two measured reasons rather than the imagined one:
 *
 * 1. **It is 2FA-gated per call, not merely authenticated.** Measured 2026-09-15 against npm 12.0.2 with a
 *    valid login -- `npm whoami` answered `mnaoumov` seconds earlier -- `npm trust list` on a package this
 *    account owns came back `EOTP ... This operation requires a one-time password`. The challenge belongs to
 *    the endpoint, not to the state of the token.
 * 2. **The challenge cannot be answered by a script that reads the output.** npm's `otplease` opens with
 *    `if (!process.stdin.isTTY || !process.stdout.isTTY) { throw err }`, and capturing stdout is precisely
 *    what makes stdout not a TTY. So a caller may have the answer or may have a terminal, never both.
 *
 * That second point is also what makes this safe to call unconditionally: it cannot hang waiting for a code
 * nobody will type, because the prompt is never reached. It fails immediately and lands in `unknown`, and the
 * caller falls back to the heuristic it would have used anyway.
 *
 * The output is deliberately NOT parsed. Reading `npm/lib/trust-cmd.js`: under `--json`, `displayResponseBody`
 * emits one pretty-printed object PER configuration, so two publishers produce two concatenated objects
 * rather than an array -- `JSON.parse` would throw on exactly the packages that are most thoroughly
 * configured. An EMPTY result emits nothing at all, because the "No trust configurations found" line goes
 * through `dialogue`, which `--json` suppresses. Non-empty stdout on a zero exit is therefore the whole
 * predicate, and it is the right granularity: the question is whether this package has a publisher, not
 * which.
 */
export async function readTrustedPublisherState(packageName: string): Promise<TrustedPublisherState> {
  const result = await execFromRoot(`npm trust list "${packageName}" --json`, {
    isQuiet: true,
    shouldIgnoreExitCode: true,
    shouldIncludeDetails: true
  });

  if (result.exitCode !== 0) {
    return 'unknown';
  }

  return result.stdout.trim() ? 'attached' : 'none';
}

/**
 * The single-path-segment form of a package name that both the packument URL and the token exchange take.
 * Only the scope separator is escaped; npm's own `npm-package-arg` does exactly this and no more.
 */
function escapePackageName(packageName: string): string {
  return packageName.replace('/', '%2f');
}

/**
 * Requests this job's GitHub Actions OIDC token for the npm registry, or `null` when there is none to be had.
 *
 * The two `ACTIONS_ID_TOKEN_REQUEST_*` variables exist only inside a GitHub Actions job that declared
 * `permissions: id-token: write`, so their absence is the test for "not running under CI that can do this" --
 * the same test npm makes, and cheaper than detecting the CI vendor.
 */
async function fetchActionsIdToken(): Promise<null | string> {
  const requestUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
  const requestToken = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];

  if (!requestUrl || !requestToken) {
    return null;
  }

  const url = new URL(requestUrl);
  url.searchParams.set('audience', `npm:${new URL(REGISTRY_URL).hostname}`);

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${requestToken}`
      }
    });

    if (!response.ok) {
      return null;
    }

    const body = await response.json() as ActionsIdTokenResponse;
    return body.value ?? null;
  } catch {
    return null;
  }
}
