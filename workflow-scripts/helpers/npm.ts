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
 * the publisher are separate steps with separate failure modes, and all four of reading that publisher,
 * attaching it, settling the two into one answer, and wording the hand-back for when none of that can be done
 * from where the caller stands are needed by more than one script.
 */

import { execFileSync } from 'node:child_process';
import process from 'node:process';

import type { BranchSpec } from './branchSpec.ts';
import type { ExecResult } from './exec.ts';

import { askLine } from './prompt.ts';
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
 * "nobody is logged in on this machine", "the registry challenged for a one-time password and there was
 * nobody to type one", "the code it was given was wrong or had expired", and "the request never arrived" all
 * land in it — and a caller that cannot tell those apart must not act as though it can.
 *
 * Since 2026-09-16 that list is shorter than it was by its most common member. {@link readTrustedPublisherState}
 * can now ask for the code and pass it, so a logged-in operator standing at a terminal gets a definite
 * `attached` or `none` rather than this. `unknown` has gone back to meaning roughly what it says.
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

/*
 * The error code npm reports when the registry challenged a call for a one-time password. It is the whole of
 * the test for "this failed only because nobody typed a code": every other way the read can fail -- no npm
 * login (`ENEEDAUTH`), a credential the registry no longer accepts (`E401`), a network failure -- carries a
 * different one, and none of them is fixed by asking the operator for six digits.
 */
const OTP_ERROR_CODE = 'EOTP';

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
 * earlier by `publishPlaceholder`, or a definite `none` {@link resolveTrustedPublisherState} has just read
 * out of {@link readTrustedPublisherState} — and that is deliberate, because what a SECOND configuration does
 * to a package that already has one is not known.
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
 * authenticated and 2FA-gated, so it answers only from a machine that is logged in, and only once a one-time
 * password has been supplied -- which since 2026-09-16 means only where there is an operator to supply one;
 * this one is an unauthenticated `fetch` that answers everywhere -- from CI, from a checkout with no npm
 * login, from an unattended script. They are asked in that order rather than chosen between.
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
 * Printed by `bootstrap-new-package.ts` when it cannot attach the publisher to a name it has just claimed,
 * printed by {@link resolveTrustedPublisherState} -- and so by both local hand-back scripts -- when the
 * publisher of an already-claimed name can be neither read nor attached from here, and embedded in the error
 * `publish-release.ts` throws when CI meets the consequence.
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
 * {@link getPackageRegistryState}, because **it is 2FA-gated per call, not merely authenticated**: measured
 * 2026-09-15 against npm 12.0.2 with a valid login -- `npm whoami` answered seconds earlier -- this read on a
 * package the account owns came back `EOTP ... This operation requires a one-time password`. The challenge
 * belongs to the endpoint, not to the state of the token, so the unauthenticated `fetch` in
 * {@link getPackageRegistryState} still answers in places this cannot: from CI, from a checkout with no npm
 * login. They are asked in that order rather than chosen between.
 *
 * **Until 2026-09-16 that challenge was treated as the end of the road, and it is not.** The reasoning was
 * that npm's `otplease` opens with `if (!process.stdin.isTTY || !process.stdout.isTTY) { throw err }` and
 * capturing stdout is exactly what makes stdout not a TTY -- so a caller could have the answer or have a
 * terminal, never both. The premise is true and the conclusion does not follow: reading `npm/lib/utils/auth.js`,
 * `otplease` calls `fn(opts)` **first** and reaches that TTY check only from the `catch`. A call already
 * carrying a code never fails, so it never gets there. `otp` is a real flattened npm config -- `npm trust list`
 * declares no `--otp` of its own, but per-command definitions only allow-list flags that would otherwise be
 * *unknown*, and this one is global -- and it rides `this.npm.flatOptions` into `npm-registry-fetch`, which
 * sets `headers['npm-otp']` from it. So the code goes out on the first request.
 *
 * **Measured against the live registry, 2026-09-16, at no cost in codes.** The same captured read, run twice
 * seconds apart on `@obsidian-typings/obsidian-public-latest`:
 *
 * - without `--otp`: `EOTP`, *"This operation requires a one-time password."*, the body carrying `authUrl`
 *   and `doneUrl` -- npm's **web** challenge, the branch that wants to open a browser.
 * - with a deliberately wrong `--otp=000000`: `EOTP`, *"This operation requires a one-time password **from
 *   your authenticator**. ... If you already provided a one-time password then it is likely that you either
 *   typoed it, or it timed out."*, and **no** `authUrl`/`doneUrl`.
 *
 * The registry's answer changed, which is the proof the flag reached the request rather than being dropped,
 * and it changed into the registry's own wording for a wrong or expired authenticator code -- so the endpoint
 * does take a TOTP from this account, and a correct one succeeds where `000000` did not. A wrong code is also
 * harmless: it lands back in `unknown`, the same place declining lands.
 *
 * So the flow is: run the read; if it failed for any reason OTHER than the challenge, answer `unknown`
 * without troubling anybody, because no code fixes a missing login; if it failed ON the challenge and there
 * is a terminal to ask at, ask for one code and run it again. Skipping the prompt is a first-class answer and
 * restores the old behavior exactly.
 *
 * Two costs worth knowing before wiring this anywhere else. npm challenges **per operation**, so a read that
 * finds `none` and an attach that fixes it are two separate codes. And `--otp` is an argv token: npm writes
 * the full argv into its debug log under `_logs/`, verbatim, so the code is on disk -- single-use and
 * time-boxed, spent by the time the line is written, but on disk.
 *
 * The SUCCESS output is deliberately NOT parsed. Reading `npm/lib/trust-cmd.js`: under `--json`,
 * `displayResponseBody` emits one pretty-printed object PER configuration, so two publishers produce two
 * concatenated objects rather than an array -- `JSON.parse` would throw on exactly the packages that are most
 * thoroughly configured. An EMPTY result emits nothing at all, because the "No trust configurations found"
 * line goes through `dialogue`, which `--json` suppresses. Non-empty stdout on a zero exit is therefore the
 * whole predicate, and it is the right granularity: the question is whether this package has a publisher, not
 * which.
 */
export async function readTrustedPublisherState(packageName: string): Promise<TrustedPublisherState> {
  const firstResult = await runTrustList(packageName);

  if (firstResult.exitCode === 0) {
    return firstResult.stdout.trim() ? 'attached' : 'none';
  }

  if (!isOneTimePasswordChallenge(firstResult)) {
    return 'unknown';
  }

  const oneTimePassword = await askOneTimePassword(packageName);

  if (oneTimePassword === null) {
    return 'unknown';
  }

  const retryResult = await runTrustList(packageName, oneTimePassword);

  if (retryResult.exitCode !== 0) {
    console.log(`\nnpm did not accept that one-time password, so ${packageName}'s trusted publisher is still unread.`);
    return 'unknown';
  }

  return retryResult.stdout.trim() ? 'attached' : 'none';
}

/**
 * Settles the trusted-publisher state of an already-claimed name: reads it, and attaches one when npm says
 * there is none. Resolves to what the package's state actually is once that is done.
 *
 * This is the whole of the second half of the hand-back, for a name the first half has already claimed, and
 * it is shared because both hand-back scripts stand in front of exactly that state.
 * `bootstrap-new-package.ts` reaches it when it is re-run against a name it claimed on an earlier run;
 * `create-new-release-branch.ts` reaches it whenever the branch it just cut names a package carrying nothing
 * but the bootstrap placeholder. Until 2026-09-16 only the first of them acted on the answer -- the second
 * read the same state with the same helper and then merely *printed*, telling the operator to go and attach
 * it in another window while the sibling script attached it for them from the terminal it was already
 * holding. Nothing gave a reason for the asymmetry; it reads like the attach landed in one script and was
 * never carried to the other.
 *
 * Only the definite `none` is acted on. An `unknown` answer is left alone rather than attached "just in
 * case", because `npm trust github` creates a configuration rather than reconciling one, and what the
 * registry does with a second one is genuinely unsettled -- {@link attachTrustedPublisher} carries what is
 * and is not known about that, including the npm doc that reads like an answer and is stale. This arm used
 * to state flatly that a second call "adds a duplicate record"; nobody had made one, so the claim was as
 * unverified as the behavior it warned about. The asymmetry is what survives the correction: guessing wrong
 * risks a duplicate in the package's trust list, while not guessing costs one question the operator can
 * answer, which is what the `unknown` arm of `offerRelease` is for.
 *
 * Since 2026-09-16 that arm is also much harder to reach, which is the better fix and the one that did not
 * need the unsettled question answered. {@link readTrustedPublisherState} asks the operator for a one-time
 * password when the registry challenges its read, so an operator who is logged in and standing here gets a
 * definite answer and lands on one of the two arms above. What still arrives as `unknown` is a machine with
 * no npm login, a code that was skipped or refused, or a request that never got there -- and for those, an
 * attach would be as blind as it ever was.
 *
 * Every message names the package rather than saying "it". The two callers print very different preambles
 * ahead of this -- one about a name it declined to re-claim, one about a branch it has just cut -- and a
 * pronoun that resolves against whichever of them ran is a sentence that reads correctly only by accident.
 */
export async function resolveTrustedPublisherState(packageName: string): Promise<TrustedPublisherState> {
  const publisherState = await readTrustedPublisherState(packageName);

  if (publisherState === 'attached') {
    console.log(`\nnpm reports a trusted publisher on ${packageName}, so both halves of the hand-back are done.`);
    return publisherState;
  }

  if (publisherState === 'unknown') {
    console.log(`\nnpm would not say whether ${packageName} has a trusted publisher. That read needs an npm`);
    console.log('login and a one-time password: either this machine has no login, or no code reached the');
    console.log('registry -- none was typed, or the one that was had expired.');
    console.log(getTrustedPublisherInstructions(packageName));
    return publisherState;
  }

  console.log(`\nnpm reports no trusted publisher on ${packageName}, so that is the half still outstanding.`);
  console.log('Attaching it now. npm will ask for a one-time password: it challenges per operation and caches');
  console.log('nothing between processes, so this code is its own rather than a reuse of any earlier one.');

  if (attachTrustedPublisher(packageName)) {
    console.log(`\nTrusted publisher attached to ${packageName}.`);
    return 'attached';
  }

  console.log(`\nCould not attach the trusted publisher to ${packageName}.`);
  console.log(getTrustedPublisherInstructions(packageName));
  return 'none';
}

/**
 * Asks the operator for the one-time password the registry just challenged a read with, or `null` when there
 * is none to be had.
 *
 * The preamble is three lines because every one of them changes what a reader does next. They are being asked
 * for a code by a script, not by npm, so it says which read wanted it; skipping is a real option rather than
 * a failure, so it says what skipping costs; and npm challenges per operation, so it says that attaching a
 * publisher afterwards will ask again rather than reusing this one -- an operator who does not know that
 * reads the second prompt as the first one having failed.
 *
 * The answer is not validated beyond stripping whitespace, which is what npm's own `read.otp` does to a code
 * pasted as `123 456`. Anything else is the registry's judgement to make: a local pattern strict enough to be
 * worth having would have to guess at forms this account might use, and being wrong there rejects a code npm
 * would have accepted. A code the registry refuses costs one more request and lands in `unknown`, which is
 * where declining lands anyway.
 */
async function askOneTimePassword(packageName: string): Promise<null | string> {
  // The terminal test comes before the preamble rather than being left to `askLine`, which would answer
  // `null` on its own. Four lines addressed to an operator, printed into a log nobody is reading, describe a
  // prompt that never appeared -- and the last of them, about a second code for the attach, is simply untrue
  // where nothing can be attached. Saying nothing is the honest output for an unattended run.
  if (!process.stdin.isTTY) {
    return null;
  }

  console.log(`\nnpm challenged the read of ${packageName}'s trusted publisher for a one-time password.`);
  console.log('Entering one settles it outright. Skipping is fine: the hand-back then falls back to asking you');
  console.log('whether the publisher is attached, exactly as it did before it could ask for a code at all.');
  console.log('npm challenges per operation, so attaching a publisher after this asks for a second, later code.');

  const answer = await askLine('\nOne-time password from your authenticator (empty to skip): ');

  if (answer === null) {
    return null;
  }

  return answer.replaceAll(/\s/gu, '') || null;
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

/**
 * Reports whether a failed {@link runTrustList} failed only because the registry wanted a one-time password.
 *
 * A substring test rather than a parse, and both streams rather than one, because npm says it twice and the
 * two sayings have different shapes (measured 2026-09-16, npm 12.0.2): stdout carries a single well-formed
 * `{ "error": { "code": "EOTP", ... } }` under `--json`, while stderr carries the human `npm error code EOTP`
 * line. Parsing the stdout object would work today and would be the narrower test, but it buys nothing here
 * -- the only thing being asked is which of the failure codes this was -- and it would put a second
 * `JSON.parse` of npm's output in a function whose sibling documents at length why the success body must not
 * be parsed.
 *
 * The cost of a false positive bounds how careful this needs to be: one prompt the operator can dismiss with
 * an empty line.
 */
function isOneTimePasswordChallenge(result: ExecResult): boolean {
  return result.stdout.includes(OTP_ERROR_CODE) || result.stderr.includes(OTP_ERROR_CODE);
}

/**
 * Runs the captured `npm trust list` read, carrying a one-time password when one is supplied.
 *
 * The command is built as an argument array rather than as a string so that {@link execFromRoot} quotes the
 * package name for the platform it is actually running on. It used to be interpolated into a command line
 * inside hand-written double quotes, which is the one form that is wrong on both platforms for the same
 * reason -- `cmd.exe` and `/bin/sh` disagree about what survives inside them. No package name this repo
 * generates contains anything that needs quoting, so nothing was broken; the array form simply removes the
 * question.
 *
 * `shouldIgnoreExitCode` because every interesting answer here is a non-zero exit, and `isQuiet` because npm
 * prints the whole challenge -- including a browser URL that is no use to a captured caller -- to stderr on
 * the way to the caller deciding what it means.
 */
function runTrustList(packageName: string, oneTimePassword?: string): Promise<ExecResult> {
  const command = ['npm', 'trust', 'list', packageName, '--json'];

  if (oneTimePassword !== undefined) {
    command.push(`--otp=${oneTimePassword}`);
  }

  return execFromRoot(command, {
    isQuiet: true,
    shouldIgnoreExitCode: true,
    shouldIncludeDetails: true
  });
}
