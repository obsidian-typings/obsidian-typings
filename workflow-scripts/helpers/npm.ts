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
 * the publisher are separate steps with separate failure modes, and all five of reading that publisher,
 * attaching it, saying what the attach did, settling the two into one answer, and wording the hand-back for
 * when none of that can be done from where the caller stands are needed by more than one script.
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
 * How an {@link attachTrustedPublisher} attempt ended.
 *
 * Until 2026-09-16 this was a bare `boolean`, and every non-success below was one `false`: everything npm
 * said about which one it was went to the operator's screen and nowhere a caller could read. They want
 * different things said about them. A code nobody typed is answered by typing one; a code the registry
 * refused is answered by a fresh one, since a code is single-use and time-boxed; and a refusal no code fixes
 * is answered only by reading npm's own words for it.
 *
 * `alreadyConfigured` is the odd one out, and the only one where npm exited non-zero while the caller got
 * what it wanted. The registry answers a POST that overlaps an existing configuration with `E409` and
 * creates nothing (measured 2026-09-17 -- see {@link attachTrustedPublisher}), so the package ends up with a
 * publisher this workflow's token matches, which is the whole of what an attach is for. It is kept apart
 * from `refused` because folding the two together reports a correctly-configured package as a failure and
 * sends its operator off to fix what is not broken.
 *
 * `refused` is the catch-all of the rest, and it is a narrower state than it sounds. Measured 2026-09-16
 * against the live registry, the trust endpoint challenges for a one-time password **before** it checks
 * anything else -- a POST naming a package that does not exist, from an account that does not own it, is
 * answered `EOTP` rather than 404 -- so the first call almost never fails for its real reason. What lands
 * here is mostly a machine with no npm login at all (`ENEEDAUTH`, which no code fixes) or a refusal the
 * registry only gets round to stating once a code has been accepted.
 */
export type TrustedPublisherAttachOutcome =
  | 'alreadyConfigured'
  | 'attached'
  | 'challenged'
  | 'oneTimePasswordRejected'
  | 'refused';

/**
 * What {@link readTrustedPublisherState} was able to find out about a package's trusted publisher.
 *
 * `unknown` is a first-class answer rather than a failure. The read is authenticated and 2FA-gated, so
 * "nobody is logged in on this machine", "this machine's token has expired", "the registry challenged for a
 * one-time password and there was nobody to type one", "the code it was given was wrong or had expired", and
 * "the request never arrived" all land in it — and a caller that cannot tell those apart must not act as
 * though it can.
 *
 * Since 2026-09-16 that list is shorter than it was by its most common member. {@link readTrustedPublisherState}
 * can now ask for the code and pass it, so a logged-in operator standing at a terminal gets a definite
 * `attached` or `none` rather than this. `unknown` has gone back to meaning roughly what it says.
 *
 * The expired-token route is the one worth naming separately, because it looks like the logged-in case from
 * here and is not: an `~/.npmrc` carrying an `_authToken` the registry no longer accepts answers `E401`,
 * where no credential at all answers `ENEEDAUTH` (measured 2026-09-17, and it nearly cost the measurement
 * {@link attachTrustedPublisher} records — `--otp` supplies the second factor and nothing about the first).
 * `npm whoami` tells the two apart and is what {@link getNpmUsername} asks.
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

/*
 * The error code npm reports when the registry refused to create a trust configuration because the package
 * already carries one a token from the same workflow would match. It is the whole of the test for "this
 * failed, and the state it wanted is nevertheless the state the package is in"; every other refusal leaves
 * the package with no publisher.
 */
const CONFLICT_ERROR_CODE = 'E409';

/** What {@link attachTrustedPublisher} did, and what npm said while it was doing it. */
export interface TrustedPublisherAttachResult {
  /**
   * What npm said while doing it, verbatim and unparsed: on `attached` the configuration it created, on
   * every other outcome its diagnostic.
   *
   * Empty only when the attempt ended in the inherited-terminal fallback, whose whole point is that npm owns
   * the operator's screen -- so what it said went there rather than anywhere this process can read.
   */
  readonly npmOutput: string;

  readonly outcome: TrustedPublisherAttachOutcome;
}

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
 * Attaches this repo's trusted publisher to a package, reporting what npm did and what it said about it.
 *
 * This is the npmjs.com form, as a command. `npm trust github` POSTs to `/-/package/<name>/trust`, which is
 * the record the "Trusted Publisher" panel writes, so the two are interchangeable — and this one can be run
 * by the script the operator is already standing in front of, which is the whole point. The form is the half
 * of the hand-back that gets skipped, and it gets skipped because it is somewhere else.
 *
 * The flags live in {@link getTrustedPublisherArguments}, which is also what
 * {@link getTrustedPublisherCommand} prints, so the command that runs and the command handed back cannot
 * drift apart.
 *
 * **Two paths, and the captured one is tried first.** Until 2026-09-16 there was only the second: this ran
 * `execFileSync` with `stdio: 'inherit'`, returned a bare `boolean`, and everything npm said went to the
 * operator's screen. The reason given was npm's `otplease`, which opens with
 * `if (!process.stdin.isTTY || !process.stdout.isTTY) { throw err }` (npm 12.0.2, `lib/utils/auth.js`) — so
 * redirecting either stream was held to turn the one-time-password challenge into an immediate failure
 * rather than a prompt. That is the same reasoning {@link readTrustedPublisherState} retired on the read
 * side: `otplease` calls `fn(opts)` **first** and reaches that TTY check only from the `catch`, so a call
 * already carrying `--otp=<code>` never gets there.
 *
 * **Measured on the WRITE endpoint, 2026-09-16, npm 12.0.2, at no cost in codes.** The same captured attach
 * run twice against a package name that does not exist and that this account does not own — chosen precisely
 * so that a success would have been impossible:
 *
 * - without `--otp`: `EOTP`, *"This operation requires a one-time password."*, followed by npm's **web**
 *   challenge — the `authUrl`/`doneUrl` branch of `otplease`, the one that wants to open a browser. (npm
 *   redacts both URLs out of its own error output, so a captured stderr is safe to print.)
 * - with a deliberately wrong `--otp=000000`: `EOTP`, *"This operation requires a one-time password **from
 *   your authenticator**. ... If you already provided a one-time password then it is likely that you either
 *   typoed it, or it timed out."*, and **no** web challenge.
 *
 * The registry's answer changed, which is the proof the flag reaches this endpoint too rather than being
 * dropped. That probe also settled something the read could not: the challenge comes **before** any
 * existence or ownership check, which is why {@link TrustedPublisherAttachOutcome}'s `refused` is a narrower
 * state than it sounds.
 *
 * So the flow is: run the captured attach; if it failed for any reason OTHER than the challenge, report that
 * with npm's own words, because no code fixes a missing login; if it failed ON the challenge, ask for one
 * code and run it again. **Skipping that prompt hands the whole thing back to the inherited-terminal form**,
 * which is what ran here before and is the ONLY path that can take npm's web challenge — a call carrying a
 * code on its argv gets no `authUrl` for `otplease` to open a browser at. The two are a pair rather than a
 * replacement, and which one an operator wants depends on whether they would rather type six digits or
 * authenticate in a browser.
 *
 * Deliberately **not** `--json`, though the read beside it is, and the two reasons are worth keeping apart.
 * Under `--json`, `logOptions` emits the REQUEST options as one object before the POST and
 * `displayResponseBody` emits the created configuration as another after it, so a successful attach prints
 * two concatenated objects that no single `JSON.parse` reads. Captured plain text is npm's own human
 * wording — with color already off, because chalk sees a pipe — and is exactly what the operator used to
 * read off the screen. The read needs `--json` for a different reason entirely: it has to tell "no
 * configurations" from "some", and `--json` is what suppresses the `dialogue` line that would otherwise make
 * an empty result's stdout non-empty.
 *
 * **What a SECOND configuration does to a package that already has one was measured on 2026-09-17, and the
 * registry REFUSES it.** The question was open until then because settling it needs a write on this
 * endpoint and every write costs a one-time password: `createConfig` in `npm/lib/trust-cmd.js` POSTs
 * `[trustConfig]` and reads nothing beforehand, so the client cannot reconcile and the registry's answer is
 * the whole of the behavior. Run against `@obsidian-typings/obsidian-public-latest`, which already carried a
 * publisher, with a `npm trust list` taken either side of it, npm answered: `E409`,
 * *"409 Conflict ... a trusted publisher configuration that a token could also match already exists for this
 * package; list the package trusted publishers to find it"*. The read taken afterwards was byte-identical to
 * the one taken before — same configuration id, same permissions, still exactly one entry. So a second POST
 * is neither a duplicate nor a replacement nor a partial write; it is a no-op that says so. That is what
 * lets {@link resolveTrustedPublisherState} attach on `unknown` as well as on a definite `none`, and why
 * `E409` comes back here as `alreadyConfigured` rather than as a refusal.
 *
 * **The conflict is judged on what a token would match, not on the fields being equal**, which makes that
 * guarantee wider than "identical": the existing configuration carried `permissions: publish, stage publish`
 * while this attach's payload carries `permissions: publish` — `--allow-publish` yields that alone — and the
 * registry refused anyway, in its own words about *"a configuration that a token could also match"*. Read
 * the other way, the same sentence is a limitation worth knowing: an attach can never WIDEN an existing
 * configuration, because it is refused before it gets the chance. Narrowing a publisher is `npm trust
 * revoke <package> --id=<id>` and a fresh attach, not a second POST.
 *
 * **The two npm docs that looked like they disagreed about this never did**, and saying so is the correction
 * to what stood here until the measurement. npm's own bundled `npm-trust.md` — *"if you attempt to create a
 * new trust relationship when one already exists, it will result in an error"* — describes exactly what
 * happened, and was read as stale only because npmjs.com's trusted-publishers page says a package may carry
 * up to ten publishers, added and deleted independently. Those ten are DISTINCT publishers, a different repo
 * or a different workflow; neither page says which case it is describing, which is the whole of why they
 * read as a contradiction.
 *
 * Never throws, because every caller's failure path is to print
 * {@link getTrustedPublisherInstructions} and carry on. A publisher that could not be attached from here
 * leaves the repo in the state it has always been in; that is not worth aborting a script over.
 */
export async function attachTrustedPublisher(packageName: string): Promise<TrustedPublisherAttachResult> {
  const firstResult = await runTrustAttach(packageName);

  if (firstResult.exitCode === 0) {
    return { npmOutput: firstResult.stdout.trim(), outcome: 'attached' };
  }

  if (!isOneTimePasswordChallenge(firstResult)) {
    return { npmOutput: describeNpmFailure(firstResult), outcome: getFailedAttachOutcome(firstResult) };
  }

  const oneTimePassword = await askOneTimePassword([
    `\nnpm challenged the attach of ${packageName}'s trusted publisher for a one-time password.`,
    'Entering one lets this script read back the configuration npm creates, and say exactly what went wrong',
    'if it cannot. Skipping is fine: npm is then run again holding this terminal and asks for the code in',
    'its own voice -- which is the browser flow, the challenge the registry offers a call carrying no code.'
  ]);

  if (oneTimePassword === null) {
    return attachTrustedPublisherInteractively(packageName);
  }

  const retryResult = await runTrustAttach(packageName, oneTimePassword);

  if (retryResult.exitCode === 0) {
    return { npmOutput: retryResult.stdout.trim(), outcome: 'attached' };
  }

  return {
    npmOutput: describeNpmFailure(retryResult),
    outcome: isOneTimePasswordChallenge(retryResult) ? 'oneTimePasswordRejected' : getFailedAttachOutcome(retryResult)
  };
}

/**
 * The operator-facing account of an attach, worded once for both callers.
 *
 * `bootstrap-new-package.ts` and {@link resolveTrustedPublisherState} reach the attach from opposite sides --
 * a name claimed seconds ago, and a name npm has just said has no publisher -- but what there is to say
 * afterwards is identical, and it used to be written out twice in two slightly different ways over the same
 * bare `boolean`.
 *
 * Every outcome but `attached` means npm created nothing, and all but one of those also mean the package is
 * still without a publisher -- which is what {@link getTrustedPublisherStateAfterAttach} turns into a
 * {@link TrustedPublisherState} for both callers. They are still worth telling apart in words: only one of
 * them is fixed by typing a code, and only one of them is npm's final answer.
 *
 * `alreadyConfigured` is the exception in both directions, and it is the reason this cannot be written as
 * "success, then a paragraph of failure". npm exited non-zero, so it reads like a failure; the package has
 * the publisher it was asked to have, so saying anything about fixing it is wrong. It therefore ends where
 * the success does rather than at {@link getTrustedPublisherInstructions}: printing "attach the trusted
 * publisher, or CI still will not be able to publish it" under a `409 Conflict` sends the reader off to
 * re-attach what the registry has just declined to duplicate.
 *
 * Each real failure ends where the inherited-terminal form always ended, with
 * {@link getTrustedPublisherInstructions} -- so nothing is lost by any of the ways this can go wrong.
 */
export function describeTrustedPublisherAttach(packageName: string, result: TrustedPublisherAttachResult): string {
  if (result.outcome === 'attached') {
    const attached = ['', `Trusted publisher attached to ${packageName}.`];

    if (result.npmOutput) {
      attached.push('', 'npm reports:', '', indentBlock(result.npmOutput), '');
    }

    return attached.join('\n');
  }

  if (result.outcome === 'alreadyConfigured') {
    const alreadyConfigured = [
      '',
      `npm declined to add a second trusted publisher to ${packageName}, because it already carries one that a`,
      'token from this workflow would match. Nothing was created, and nothing needed to be.'
    ];

    if (result.npmOutput) {
      alreadyConfigured.push('', 'npm said:', '', indentBlock(result.npmOutput), '');
    }

    return alreadyConfigured.join('\n');
  }

  const lines = [''];

  if (result.outcome === 'challenged') {
    lines.push(
      `npm challenged the attach of ${packageName}'s trusted publisher for a`,
      'one-time password, and none reached the registry -- none was typed, or there was nobody to type one.'
    );
  } else if (result.outcome === 'oneTimePasswordRejected') {
    lines.push(
      `npm did not accept that one-time password, so ${packageName} still has no`,
      'trusted publisher. A code is single-use and time-boxed, so a fresh one from your authenticator is the',
      'whole of the fix.'
    );
  } else {
    lines.push(
      // Deliberately does not promise npm's words below it. `npmOutput` is empty when npm never ran at all
      // -- it is not on the PATH, say -- which `exec` reports as this same outcome with nothing on either
      // stream, and a sentence pointing at an explanation that is not there is worse than no sentence.
      `npm refused to attach the trusted publisher to ${packageName}, for a reason`,
      'no one-time password fixes.'
    );
  }

  if (result.npmOutput) {
    lines.push('', 'npm said:', '', indentBlock(result.npmOutput));
  }

  lines.push(getTrustedPublisherInstructions(packageName));
  return lines.join('\n');
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
 * cannot *run* it -- CI, or a caller with no terminal to answer the challenge from. The two are now built
 * from one {@link getTrustedPublisherArguments} rather than merely from the same constants: a printed command
 * that differs from the one the tooling runs is a second, unverified way to configure the package, and it is
 * the printed one a human would then trust. Two hand-written lists of the same eight tokens were one
 * careless edit away from being exactly that.
 *
 * Joined with spaces and not quoted, because nothing in it ever needs quoting -- every token but the package
 * name is a literal here, and the names this repo generates are npm package names.
 */
export function getTrustedPublisherCommand(packageName: string): string {
  return ['npm', ...getTrustedPublisherArguments(packageName)].join(' ');
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
    'npm asks for one 2FA code and prints the configuration it created. Run it in a real terminal: carrying no',
    '`--otp` on its command line, it answers the challenge in a browser, and it will not open one for a process',
    'whose input or output is redirected.',
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
 * Turns an attach's outcome into what the package's trusted-publisher state now is, given what was known
 * about it before the attach ran.
 *
 * Two facts live here rather than at the three call sites, because a call site that quietly disagreed with
 * the others would be wrong in a way nothing would catch.
 *
 * **`alreadyConfigured` is `attached`.** The registry answers an overlapping second POST with `E409` and
 * creates nothing, so the package carries a publisher a token from this workflow matches -- which is the
 * question every caller is actually asking. Folding it in with the failures would report a correctly
 * configured package as having none, and send `offerRelease` off to ask whether somebody has attached one by
 * hand.
 *
 * **Every other non-success returns `fallbackState` rather than `none`.** What npm created is known -- and
 * it is nothing -- but that is not the same as what the package HAS. After a definite `none` read, or a name
 * claimed seconds earlier by `bootstrap-new-package.ts`, `none` is still the truth and that is what the
 * caller passes. After an `unknown` read it is not: an attach that failed for want of a login says nothing
 * about a package whose state could not be read in the first place, and answering `none` there would be a
 * guess wearing the clothes of a reading.
 */
export function getTrustedPublisherStateAfterAttach(
  outcome: TrustedPublisherAttachOutcome,
  fallbackState: TrustedPublisherState
): TrustedPublisherState {
  return outcome === 'alreadyConfigured' || outcome === 'attached' ? 'attached' : fallbackState;
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

  const oneTimePassword = await askOneTimePassword([
    `\nnpm challenged the read of ${packageName}'s trusted publisher for a one-time password.`,
    'Entering one settles it outright. Skipping is fine: the hand-back then falls back to asking you',
    'whether the publisher is attached, exactly as it did before it could ask for a code at all.',
    'npm challenges per operation, so attaching a publisher after this asks for a second, later code.'
  ]);

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
 * **Both `none` and `unknown` are acted on, and until 2026-09-17 only the first of them was.** An `unknown`
 * answer used to be left alone rather than attached "just in case", because `npm trust github` creates a
 * configuration rather than reconciling one and what the registry did with a second one was unmeasured: an
 * attach that guessed wrong risked a duplicate in a published package's trust list, while not guessing cost
 * one question the operator could answer, which is what the `unknown` arm of `offerRelease` is for. That
 * asymmetry is gone, because the guess is no longer a guess. The registry answers an overlapping second POST
 * with `E409` and creates nothing -- see {@link attachTrustedPublisher} for the measurement -- so the worst a
 * blind attach can do here is fail loudly with a code that names the cause, and the question it replaces was
 * being put to an operator who by definition could not answer it from what this script had shown them.
 *
 * The two arms still differ in what they say and in what they answer with, which is the whole reason they are
 * not one branch. On `none` the attach is the fix for a state npm has just stated. On `unknown` it is an
 * attempt at a state nobody could read, so a failure leaves the answer exactly as unread as it was: the
 * fallback handed to {@link getTrustedPublisherStateAfterAttach} is `unknown` rather than `none`, and the
 * hand-back {@link describeTrustedPublisherAttach} prints is the one that arm has always ended with.
 *
 * Reaching `unknown` at all has been rare since 2026-09-16, which is why this is a smaller change than it
 * sounds. {@link readTrustedPublisherState} asks the operator for a one-time password when the registry
 * challenges its read, so an operator who is logged in and standing here gets a definite answer and lands on
 * one of the other two arms. What still arrives as `unknown` is a machine with no npm login, one whose token
 * has expired, a code that was skipped or refused, or a request that never got there -- and the first two of
 * those will fail the attach as well, for the same reason, one `npm trust github` later.
 *
 * The `none` this returns when the attach does not land is npm's word rather than this function's guess,
 * which it was not before 2026-09-16: {@link attachTrustedPublisher} answered a bare `false` covering "no
 * code was typed", "the code was refused" and "npm said no" alike, and the only thing to do with it was to
 * print the whole hand-back again. {@link describeTrustedPublisherAttach} now says which of them it was, and
 * every one of them still means npm created nothing, so the mapping through
 * {@link getTrustedPublisherStateAfterAttach} is unchanged for this arm.
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
    console.log('\nAttaching one anyway. The registry answers a POST overlapping a configuration it already');
    console.log('holds with 409 Conflict and creates nothing, so this cannot duplicate a publisher that is');
    console.log('already there; it can only attach the missing one, or fail and say why.');
  } else {
    console.log(`\nnpm reports no trusted publisher on ${packageName}, so that is the half still outstanding.`);
    console.log('Attaching it now. That needs a one-time password of its own: npm challenges per operation and');
    console.log('caches nothing between processes, so this code cannot be a reuse of any earlier one.');
  }

  const attachResult = await attachTrustedPublisher(packageName);
  console.log(describeTrustedPublisherAttach(packageName, attachResult));

  return getTrustedPublisherStateAfterAttach(attachResult.outcome, publisherState);
}

/**
 * Asks the operator for the one-time password the registry just challenged an operation with, or `null` when
 * there is none to be had.
 *
 * **The preamble is the caller's, and the asking is shared.** Both the read and the attach reach this, and
 * every line they print differs: which operation wanted the code, what skipping it costs, and what happens
 * next if it is skipped -- the read falls back to a question, the attach falls back to npm's own browser
 * challenge. What they have in common is the asking, and it is the asking that carries the subtleties worth
 * writing once. Handing the whole preamble in is what lets the two share this without sharing a sentence
 * that would be wrong for one of them.
 *
 * The terminal test comes before the preamble rather than being left to {@link askLine}, which would answer
 * `null` on its own. Lines addressed to an operator, printed into a log nobody is reading, describe a prompt
 * that never appeared -- and some of them are simply untrue where nothing is going to happen next. Saying
 * nothing is the honest output for an unattended run.
 *
 * The answer is not validated beyond stripping whitespace, which is what npm's own `read.otp` does to a code
 * pasted as `123 456`. Anything else is the registry's judgement to make: a local pattern strict enough to be
 * worth having would have to guess at forms this account might use, and being wrong there rejects a code npm
 * would have accepted. A code the registry refuses costs one more request and lands where declining lands
 * anyway.
 */
async function askOneTimePassword(preamble: readonly string[]): Promise<null | string> {
  if (!process.stdin.isTTY) {
    return null;
  }

  for (const line of preamble) {
    console.log(line);
  }

  const answer = await askLine('\nOne-time password from your authenticator (empty to skip): ');

  if (answer === null) {
    return null;
  }

  return answer.replaceAll(/\s/gu, '') || null;
}

/**
 * Runs the attach the way it ran before 2026-09-16 -- npm holding the terminal, this process reading nothing
 * back -- as the fallback for an operator who did not supply a code.
 *
 * This is not a lesser copy of the captured path; it is the only path that can reach npm's **web** challenge.
 * `otplease` takes that branch on `err.body.authUrl && err.body.doneUrl`, and the registry sends those two
 * only to a call carrying no `--otp` (measured 2026-09-16, both here and on the read). So an operator who
 * would rather authenticate in a browser than read six digits off an authenticator gets there by skipping
 * the prompt, which is also what an operator who cannot produce a code at all does.
 *
 * Gated on a real terminal on BOTH streams, which is the test `otplease` itself makes one line later. Without
 * it this would run npm only to have it rethrow the challenge it was handed, printing a second copy of the
 * same failure into a log nobody is reading.
 *
 * A non-zero exit is reported as `challenged` rather than as a refusal: the only way here is through a
 * captured call that already came back `EOTP`, so the challenge is the known cause and npm was given the one
 * thing that could answer it -- the operator's terminal.
 *
 * That wording sweeps up one case this path cannot see, deliberately. A package that already carries an
 * overlapping publisher is answered `E409` only once the code npm collected has been accepted, and nothing
 * here reads either. The operator reads it on their own screen; the caller is left exactly where it started,
 * which is the honest answer when the whole point of this path is that npm owns the conversation. Reporting
 * `alreadyConfigured` off a stream nothing captured would be inventing a state.
 */
function attachTrustedPublisherInteractively(packageName: string): TrustedPublisherAttachResult {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return { npmOutput: '', outcome: 'challenged' };
  }

  console.log('\nHanding the challenge back to npm, which will ask for it in its own way -- a browser, or a');
  console.log('code typed at its prompt. What it prints below is its own; this script cannot read it back.');

  try {
    execFileSync('npm', getTrustedPublisherArguments(packageName), {
      shell: true,
      stdio: 'inherit'
    });
    return { npmOutput: '', outcome: 'attached' };
  } catch {
    return { npmOutput: '', outcome: 'challenged' };
  }
}

/**
 * What npm said about a failed run, taken from the stream it actually writes diagnostics to.
 *
 * stderr carries the `npm error ...` block. stdout is not empty on a failure either -- `createConfigCommand`
 * echoes the request options and their URLs before it POSTs anything -- so stdout is the fallback rather than
 * the first choice: it is what the call was ASKING for, not what went wrong with it.
 */
function describeNpmFailure(result: ExecResult): string {
  return result.stderr.trim() || result.stdout.trim();
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
 * Which failure a non-zero {@link runTrustAttach} was, once the one-time-password challenge has been ruled
 * out by its caller.
 *
 * `E409` is the registry saying the package already carries a configuration a token from this workflow would
 * match -- see {@link attachTrustedPublisher} for the measurement behind that. It is a failure of the POST
 * and a success for the caller, and it is the one refusal that must not be reported as one.
 *
 * A token test over both streams rather than a parse, exactly as {@link isOneTimePasswordChallenge} is and
 * for the same reasons. The attach runs without `--json`, so stderr's `npm error code E409` line is the whole
 * of what there is to read; stdout is tested too because that costs nothing and the day this call gains
 * `--json` is not the day anyone will remember to come back here.
 */
function getFailedAttachOutcome(result: ExecResult): TrustedPublisherAttachOutcome {
  const isConflict = result.stdout.includes(CONFLICT_ERROR_CODE) || result.stderr.includes(CONFLICT_ERROR_CODE);
  return isConflict ? 'alreadyConfigured' : 'refused';
}

/**
 * The `npm trust github` argument list, minus the `npm` itself: the one place these flags are written down.
 *
 * Three choices, each load-bearing:
 *
 * - `--allow-publish` is not optional. `npm/lib/trust-cmd.js` throws `At least one permission flag is
 *   required` when neither it nor `--allow-stage-publish` is given, so a call without it creates nothing at
 *   all. Staged publishing is not something this repo does, so it takes the one permission.
 * - `--repo` is passed EXPLICITLY, although npm would infer it from the nearest `package.json`'s `repository`
 *   field. The inference reads `npm.prefix`, so what it resolves to depends on which directory the command
 *   was spawned from and which branch is checked out -- and both callers here can be standing on `main` or on
 *   a release branch. Pinning it to the same constants {@link getTrustedPublisherInstructions} prints keeps
 *   the command, the printed fallback and the web form all saying one thing.
 * - `--yes` skips npm's own `Do you want to proceed? (y/N)` confirm and nothing else. The 2FA challenge is a
 *   separate mechanism that no flag suppresses, which is exactly the shape wanted here: one command, one code.
 *
 * Notably absent is `--dry-run`, and it is worth knowing why a reader should not add one to check something:
 * `createConfigCommand` returns immediately after echoing the options, before `confirmOperation` and before
 * the POST -- so a dry run exits **0** having reached no registry at all. It is a safe probe and a worthless
 * predicate.
 */
function getTrustedPublisherArguments(packageName: string): string[] {
  return [
    'trust',
    'github',
    packageName,
    '--file',
    PUBLISH_WORKFLOW_FILE_NAME,
    '--repo',
    `${GITHUB_OWNER}/${GITHUB_REPOSITORY}`,
    '--allow-publish',
    '--yes'
  ];
}

/** Indents a block of npm's own output so it reads as a quotation rather than as this script's voice. */
function indentBlock(text: string): string {
  return text.split('\n').map((line) => (line ? `  ${line}` : line)).join('\n');
}

/**
 * Reports whether a failed {@link runTrustList} or {@link runTrustAttach} failed only because the registry
 * wanted a one-time password.
 *
 * A substring test rather than a parse, and both streams rather than one, because npm says it twice and the
 * two sayings have different shapes (measured 2026-09-16, npm 12.0.2): stdout carries a single well-formed
 * `{ "error": { "code": "EOTP", ... } }` under `--json`, while stderr carries the human `npm error code EOTP`
 * line. Parsing the stdout object would work today and would be the narrower test, but it buys nothing here
 * -- the only thing being asked is which of the failure codes this was -- and it would put a second
 * `JSON.parse` of npm's output in a function whose sibling documents at length why the success body must not
 * be parsed.
 *
 * Testing BOTH streams is what lets one predicate serve both callers, and it stopped being redundant the
 * moment the attach arrived: the attach runs without `--json`, so its stdout carries no error object at all
 * and the stderr half is the whole of the test there.
 *
 * The cost of a false positive bounds how careful this needs to be: one prompt the operator can dismiss with
 * an empty line.
 */
function isOneTimePasswordChallenge(result: ExecResult): boolean {
  return result.stdout.includes(OTP_ERROR_CODE) || result.stderr.includes(OTP_ERROR_CODE);
}

/**
 * Runs the captured `npm trust github` attach, carrying a one-time password when one is supplied.
 *
 * The twin of {@link runTrustList}, with the same three options and for the same three reasons -- and
 * deliberately without that one's `--json`, for the reason {@link attachTrustedPublisher} sets out: the
 * attach prints two objects under `--json` and clean human text without it.
 */
function runTrustAttach(packageName: string, oneTimePassword?: string): Promise<ExecResult> {
  const command = ['npm', ...getTrustedPublisherArguments(packageName)];

  if (oneTimePassword !== undefined) {
    command.push(`--otp=${oneTimePassword}`);
  }

  return execFromRoot(command, {
    isQuiet: true,
    shouldIgnoreExitCode: true,
    shouldIncludeDetails: true
  });
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
