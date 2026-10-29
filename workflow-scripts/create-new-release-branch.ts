import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';

import type { BranchSpec } from './helpers/branch-spec.ts';

import { generateBranchName } from './helpers/branch-spec.ts';
import { restoreWorkflowScripts } from './helpers/checkout.ts';
import { offerRelease } from './helpers/hand-back.ts';
import {
  getNpmUsername,
  getScopedPackageName,
  resolveTrustedPublisherState
} from './helpers/npm.ts';
import { generateMainReadme } from './helpers/readme-generator.ts';
import { cutReleaseBranch } from './helpers/release-branch.ts';

async function main(): Promise<void> {
  const [, , newVersionArgument, newVersionChannelArgument, changelogUrlArgument] = process.argv;

  const newVersion = newVersionArgument ?? '';
  const newVersionChannel = newVersionChannelArgument as 'catalyst' | 'public' | undefined;
  const changelogUrl = changelogUrlArgument ?? '';
  if (!newVersion || !newVersionChannel || !['catalyst', 'public'].includes(newVersionChannel) || !changelogUrl) {
    throw new Error('Usage: jiti ./workflow-scripts/create-new-release-branch.ts <newVersion> <public|catalyst> <changelogUrl>');
  }

  const newBranchSpec: BranchSpec = { channel: newVersionChannel, obsidianVersion: newVersion };
  const newBranch = generateBranchName(newBranchSpec);

  // The cut is shared with `check-obsidian-package-update.ts`, which runs it unattended; what follows it here
  // is the interactive half. So the steps that need a human are handed back to the human rather than
  // dispatched into.
  //
  // A wrong guess about the publisher is not expensive. The two runs that died with a bare `E404` on
  // 2026-09-14 -- `obsidian-catalyst/1.14.0` and `1.14.1` -- each burned a minor and left a tag behind
  // because the publish was attempted after the bump, the commit, the tag and the push. `publish-release.ts`
  // now asks npm for the publish right before any of that, so the same mistake today costs a red run and
  // nothing else.
  const registryState = await cutReleaseBranch(newBranchSpec, changelogUrl);
  const packageName = getScopedPackageName(newBranchSpec);

  if (registryState === 'released') {
    // Publish the new branch right away, so it never sits created-but-unreleased.
    await execFromRoot('npm run release');
    await generateMainReadme();
    return;
  }

  // Both remaining arms hand a step back to a human, and everything they hand back runs on the NEW branch --
  // so this is the last moment that wants to be anywhere else. `generateMainReadme()` opens with
  // `git checkout main` and never switches back, which used to leave the operator standing on `main` while
  // being told to run `npm run release`: a script `main`'s `package.json` does not define at all, so the last
  // step of the hand-back failed with `Missing script: "release"` rather than merely being forgotten.
  await generateMainReadme();
  await execFromRoot(`git checkout "${newBranch}"`);
  await restoreWorkflowScripts();

  if (registryState === 'missing') {
    // The bootstrap step is the only release step that needs a local npm credential, and this is where the
    // operator is standing when they are told to run it -- so check the credential HERE, where saying "log in
    // first" costs one `npm whoami` on a path that is already stopping, rather than letting them discover it
    // one command later as an E404 npm reports for an unauthorized PUT to a name that does not exist yet.
    printBootstrapRequired(packageName, newBranchSpec, await getNpmUsername());
    return;
  }

  // `placeholderOnly`. The name is claimed, so the only step that can still be outstanding is the publisher --
  // and that one CAN be asked about directly, from a machine that is logged in to npm, and attached from here
  // whether or not the asking worked. `resolveTrustedPublisherState` is the same call
  // `bootstrap-new-package.ts` makes against the same state; until 2026-09-16 this arm only *read* it and then
  // told the operator to go and attach it in another window, which is a hand-off whose entire failure mode is
  // that people forget it. Since 2026-09-17 a read that could not be made at all -- no login here, an expired
  // token, or a one-time-password challenge with no terminal to answer it -- is attached into as well, on the
  // measurement that the registry refuses an overlapping second configuration rather than duplicating it. Only
  // an attach that then fails leaves this a printed instruction with `offerRelease` asking, which is what this
  // arm used to do in every one of those cases. A wrong answer there is not expensive: `publish-release.ts`
  // checks the publish right before it does anything irreversible, so a dispatch into a package with no
  // publisher attached costs a red run.
  printTrustedPublisherPending(packageName);

  const publisherState = await resolveTrustedPublisherState(packageName);

  await offerRelease(newBranchSpec, packageName, publisherState);
}

function printBootstrapRequired(packageName: string, branchSpec: BranchSpec, npmUsername: null | string): void {
  console.log([
    '',
    `Branch created, but ${packageName} does not exist on npm yet, so the release was NOT dispatched.`,
    '',
    ...npmUsername === null
      ? [
        'npm does not currently accept this machine\'s credential, and claiming the name needs one. Log in first,',
        'or the step below dies with an E404 that looks like a registry-side refusal and is not one:',
        '',
        '  npm login',
        ''
      ]
      : [`Logged in to npm as ${npmUsername}.`, ''],
    'Claim the name and attach its trusted publisher first:',
    '',
    `  npm run bootstrap-new-package -- ${branchSpec.obsidianVersion} ${branchSpec.channel}`,
    '',
    'That script publishes a placeholder, prints what to enter on npmjs.com, and then waits: once you have',
    'saved the form it offers to dispatch the release itself, so this branch is not left created-but-',
    'unreleased. Decline the offer and it hands back the two commands that do it by hand.',
    '',
    `This checkout has been left on ${generateBranchName(branchSpec)}, which is where both of them run.`,
    ''
  ].join('\n'));
}

/**
 * Says where the hand-back stands before it is settled, and deliberately does not say how it ends.
 *
 * This used to be `printTrustedPublisherRequired`, which opened with "the release was NOT dispatched" and,
 * on a definite `none`, went on to state that the second half was "definitely still outstanding". Both
 * sentences were written when reading the publisher was all this arm could do. It now attaches one, and
 * `offerRelease` dispatches after it -- so an unconditional message about what did not happen would announce
 * the opposite of what the next two calls are about to do.
 */
function printTrustedPublisherPending(packageName: string): void {
  console.log([
    '',
    `Branch created. Nothing has ever published through ${packageName} yet.`,
    '',
    'The name is claimed -- a bootstrap placeholder holds it -- so the first half of the hand-back is done,',
    'and its trusted publisher is the only step that can still be outstanding. Asking npm.'
  ].join('\n'));
}

await wrapCliTask(main);
