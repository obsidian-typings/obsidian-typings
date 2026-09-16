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

import { once } from 'node:events';
import process from 'node:process';
import { createInterface } from 'node:readline/promises';

import type { BranchSpec } from './branchSpec.ts';
import type { TrustedPublisherState } from './npm.ts';

import { generateBranchName } from './branchSpec.ts';
import { restoreWorkflowScripts } from './checkout.ts';
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
 * - `none` -- npm says there is no publisher. The question is still worth putting, because the operator can
 *   attach one in another window and answer `y` when they have; it is simply worded as the statement it is
 *   rather than as an open question.
 * - `unknown` -- the read could not be made. This is the original behavior, and the reason a wrong `y` had
 *   to be made cheap in the first place.
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
      ? `\nnpm reports no trusted publisher for ${packageName}. Attach it now and answer y when it is saved. [y/N] `
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
 * The question is written directly rather than handed to `question()`, which echoes its prompt only when
 * readline decides it is driving a terminal -- and it decides that from `output.isTTY`. Redirect this
 * script's stdout to a file or a pager and the prompt silently disappears while the script still waits for a
 * line, which is indistinguishable from a hang. Writing it ourselves makes the question unconditional.
 */
async function askYesNo(question: string): Promise<boolean> {
  const readlineInterface = createInterface({ input: process.stdin, output: process.stdout });

  try {
    process.stdout.write(question);

    // Ctrl+D closes the stream out from under the pending question, and `question()` then settles NEITHER
    // way -- measured 2026-09-15: the process ends on Node's `Detected unsettled top-level await` warning
    // with nothing printed, which reads as a hang at the very last step of the hand-back. Racing the
    // interface's own `close` turns that into the decline it is.
    const answer = await Promise.race([
      readlineInterface.question(''),
      once(readlineInterface, 'close').then(() => null)
    ]);

    return answer !== null && YES_ANSWERS.has(answer.trim().toLowerCase());
  } finally {
    readlineInterface.close();
  }
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
