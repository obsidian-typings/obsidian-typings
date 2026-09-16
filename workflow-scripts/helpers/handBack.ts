/**
 * @file
 *
 * The last step of the new-package hand-back: turning a claimed name into a released branch.
 *
 * A new Obsidian version mints a package name npm has never seen, and claiming it needs a human twice over --
 * an `npm login` credential with an interactive 2FA prompt, then a form on npmjs.com that nothing can read
 * back. So `create-new-release-branch.ts` cannot simply dispatch the release, and for as long as the end of
 * its instructions merely *printed* `npm run release`, that command had no owner: nothing ran it, and nothing
 * noticed it had not been run. Two branches sat created-but-unreleased from 2026-09-14 because of exactly
 * that.
 *
 * Asking the operator is what gives it an owner, and for a while asking was all that could be done, on the
 * belief that npm exposes no way to read a package's trusted publisher. It does -- `npm trust list`, wired up
 * here as `readTrustedPublisherState()` -- so the question is now asked only when that read comes back
 * `unknown` or `none`. On `attached` there is nothing left to ask about and the release is dispatched
 * outright, exactly as `create-new-release-branch.ts` has always done for a name carrying a real release.
 *
 * Where the question is still asked, it no longer has to be answered *correctly*. Since `publish-release.ts`
 * gained `assertCanPublish`, a dispatch into a package whose publisher was never attached is refused at the
 * top of the job, before `npm install`, the build, the version bump, the commit and the tag, and costs
 * nothing but a red run carrying the `/access` link. A wrong "yes" is cheap; a release nobody dispatches
 * never gets cheaper.
 *
 * Every path that declines ends where the old instructions did, so nothing is lost by saying no: the exact
 * two commands, printed. TWO, not one -- `npm run release` exists only on a release branch, and both callers
 * can leave the checkout on `main`, where it dies with `Missing script: "release"`.
 */

import process from 'node:process';

import type { BranchSpec } from './branchSpec.ts';
import type { TrustedPublisherState } from './npm.ts';

import { generateBranchName } from './branchSpec.ts';
import { restoreWorkflowScripts } from './checkout.ts';
import { askLine } from './prompt.ts';
import { execFromRoot } from './root.ts';

/** The answers taken as a yes. Anything else -- including an empty line -- declines. */
const YES_ANSWERS: ReadonlySet<string> = new Set(['y', 'yes']);

/**
 * The commands that release the branch by hand, for every path that does not release it here.
 *
 * The `git checkout` is not padding. `npm run release` is defined only in a release branch's `package.json`;
 * `main` has no such script, and both callers of this module can be standing on `main` when they print this
 * -- `generateMainReadme()` opens with `git checkout main` and never switches back. Handing back
 * `npm run release` alone is handing back a command that fails with `Missing script: "release"` wherever the
 * operator happens to be.
 */
export function getManualReleaseInstructions(branchName: string): string {
  return [
    '',
    'Release the branch when you are ready:',
    '',
    `  git checkout "${branchName}"`,
    '  npm run release',
    ''
  ].join('\n');
}

/**
 * Dispatches the release for a freshly claimed package, asking first unless npm has already confirmed the
 * package's trusted publisher. Resolves to whether the release was actually dispatched.
 *
 * `publisherState` is what `readTrustedPublisherState()` managed to find out, and it decides whether there is
 * anything to ask:
 *
 * - `attached` -- npm itself says the package can be published, so no question is put and none is needed.
 *   The dispatch does not require a terminal either, which is why the TTY check sits inside the asking arm
 *   rather than above it: this is the same unconditional dispatch `create-new-release-branch.ts` has always
 *   performed for a name that already carries a real release.
 * - `none` -- npm says there is no publisher, AND attaching one from here failed. Since 2026-09-16 both
 *   callers run `resolveTrustedPublisherState()`, which attaches on a definite `none` rather than reporting
 *   it, so this state no longer reaches here as a bare read: a `none` that could be fixed has already become
 *   `attached`. The question is still worth putting, because the operator can attach one in another window --
 *   the exact command was printed a moment ago -- and answer `y` when they have.
 * - `unknown` -- the read could not be made. This is the original behavior, and the reason a wrong `y` had
 *   to be made cheap in the first place. It is a much rarer answer since 2026-09-16, when
 *   `readTrustedPublisherState()` learned to ask for the one-time password the registry challenges it with:
 *   an operator who is logged in and standing here now reaches one of the two states above instead. What
 *   still lands here is a machine with no npm login, a code skipped or refused, or a request that never
 *   arrived.
 *
 * Declining is a first-class answer, not a failure: it prints the same two commands the hand-back has always
 * ended with and returns. So is having no terminal to ask at -- the prompt is skipped outright rather than
 * reading EOF and guessing, because this module is imported by scripts that a CI job could one day run, and
 * an unattended hang is the one outcome worse than an unreleased branch.
 */
export async function offerRelease(
  branchSpec: BranchSpec,
  packageName: string,
  publisherState: TrustedPublisherState
): Promise<boolean> {
  const branchName = generateBranchName(branchSpec);

  if (publisherState !== 'attached') {
    if (!process.stdin.isTTY) {
      console.log('\nNot running on a terminal, so the release was not dispatched.');
      console.log(getManualReleaseInstructions(branchName));
      return false;
    }

    const question = publisherState === 'none'
      ? `\nThe trusted publisher for ${packageName} could not be attached from here. Attach it and answer y when it is saved. [y/N] `
      : `\nHas the trusted publisher for ${packageName} been saved? [y/N] `;

    if (!await askYesNo(question)) {
      console.log(getManualReleaseInstructions(branchName));
      return false;
    }
  }

  // A dirty tree stops this before the branch switch rather than after it. `git checkout` would refuse
  // anyway, and `release-impl.ts` refuses a second time on its own check -- but both of those refuse
  // *mid-way*, having already answered the prompt, and a half-done hand-back is the state this whole module
  // exists to remove.
  const status = (await execFromRoot('git status --porcelain --untracked-files=all', { isQuiet: true })).trim();

  if (status) {
    console.log('\nThe working tree is not clean, so the release was not dispatched. Commit or stash first.');
    console.log(getManualReleaseInstructions(branchName));
    return false;
  }

  await switchToBranch(branchName);

  console.log(`\nDispatching the release for ${branchName}.`);

  if (publisherState !== 'attached') {
    console.log('If the publisher turns out to be missing after all, the workflow refuses before it installs,');
    console.log('builds, bumps or tags anything -- so a wrong answer above costs a red run and nothing else.');
  }

  await execFromRoot('npm run release');
  return true;
}

/**
 * Reads one line from the terminal and reports whether it is a yes.
 *
 * The reading itself lives in `helpers/prompt.ts`, which carries the three measured reasons it is not a bare
 * `question()` call. What stays here is only the part that is about this question: `null` -- no terminal, or
 * a stream closed by Ctrl+D -- is a decline, exactly as an empty line and any other non-yes answer are, so
 * every way of not saying yes ends in the same place.
 */
async function askYesNo(question: string): Promise<boolean> {
  const answer = await askLine(question);
  return answer !== null && YES_ANSWERS.has(answer.toLowerCase());
}

/**
 * Puts the checkout on the release branch, with its `workflow-scripts` in place.
 *
 * Release branches `.gitignore` `/workflow-scripts`, so switching to one from `main` -- where the same tree is
 * tracked -- deletes it, and `npm run release` is `jiti workflow-scripts/release.ts`. The restore is what
 * `create-new-release-branch.ts` and `check-obsidian-package-update.ts` already do after every such switch,
 * for the same reason.
 *
 * A plain `git checkout` rather than `-B`: the branch is expected to exist locally (its own creation is what
 * started this hand-back), and this runs in a developer's checkout, where a `-B` could quietly move a branch
 * carrying unpushed work.
 */
async function switchToBranch(branchName: string): Promise<void> {
  const currentBranch = (await execFromRoot('git branch --show-current', { isQuiet: true })).trim();

  if (currentBranch === branchName) {
    return;
  }

  await execFromRoot(`git checkout "${branchName}"`);
  await restoreWorkflowScripts();
}
