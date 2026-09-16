/**
 * @file
 *
 * Claims the npm name for a brand-new release branch, so that CI can publish to it afterwards.
 *
 * npm attaches a trusted publisher to a *package*, which means the package has to exist before the publisher
 * can be configured -- and a package only comes into existence by being published. CI has no npm credential
 * at all under trusted publishing, so it cannot break that cycle; npm has no equivalent of PyPI's
 * pre-registered publisher (npm/cli#8544).
 *
 * A human can break it, because a human has interactive 2FA. This script is that step: run locally, once,
 * whenever a new Obsidian version mints a new package name.
 *
 * It used to cover only the FIRST of the two steps -- claiming the name -- and hand the second back as a form
 * on npmjs.com, which is the half that then got skipped, silently, because nothing fails until CI tries to
 * publish and is answered with a bare `E404`. Since 2026-09-15 it does both: `npm trust github` writes the
 * same `/-/package/<name>/trust` record that form writes, so the script can attach the publisher itself
 * while it still holds the operator's terminal. What that costs is a second one-time password -- npm's
 * `otplease` challenges per operation and caches nothing between processes -- and what it buys is that the
 * step which never announced its own absence no longer depends on somebody remembering to go and do it.
 * The printed npmjs.com instructions survive as the fallback for when the call fails.
 *
 * And then it asks whether to release, rather than ending on a printed instruction. That release was the
 * THIRD step and the only one with no owner at all: `create-new-release-branch.ts` stops before it, nothing
 * else runs it, and nothing notices it was skipped -- two branches sat created-but-unreleased from
 * 2026-09-14 for exactly that reason. This script is where the operator is standing when it is the only thing
 * left, so `helpers/handBack.ts` handles it here -- dispatching outright when npm has confirmed the
 * publisher, and asking when it has not. See that file for why a wrong yes is cheap.
 *
 * The placeholder is published under its own `bootstrap` dist-tag. That does NOT keep it off `latest`: on a
 * brand-new package there is no other version for `latest` to point at, so it holds both (measured
 * 2026-09-14). Installing the name before its first real release therefore resolves to the stub -- a window
 * normally minutes wide, and only wide open when the hand-back above stalls. The real release starts at
 * `1.1.0`, well above the placeholder, so it takes `latest` when it lands and version ordering is unaffected.
 *
 * So the placeholder is published DEPRECATED, which is the part that makes that window survivable: the
 * install still succeeds, but npm says in its own voice what was installed and that there are no types in it.
 * See `publishPlaceholder` for why this rather than moving `latest` off the placeholder by hand.
 */

import { execFileSync } from 'node:child_process';
import {
  mkdir,
  rm,
  writeFile
} from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

import type { BranchSpec } from './helpers/branchSpec.ts';

import { exitIfScriptDisabled } from './helpers/env-toggle.ts';
import { offerRelease } from './helpers/handBack.ts';
import { writeJson } from './helpers/json.ts';
import {
  attachTrustedPublisher,
  getNpmUsername,
  getPackageRegistryState,
  getScopedPackageName,
  getTrustedPublisherInstructions,
  PLACEHOLDER_VERSION,
  REPOSITORY,
  resolveTrustedPublisherState
} from './helpers/npm.ts';

exitIfScriptDisabled();

const BOOTSTRAP_FOLDER = '.bootstrap-tmp';
const PLACEHOLDER_DIST_TAG = 'bootstrap';

async function main(): Promise<void> {
  const [, , obsidianVersionArg, channelArg] = process.argv;
  const obsidianVersion = obsidianVersionArg ?? '';
  const channel = channelArg as BranchSpec['channel'] | undefined;

  if (!obsidianVersion || !channel || !['catalyst', 'public'].includes(channel)) {
    throw new Error('Usage: jiti ./workflow-scripts/bootstrap-new-package.ts <obsidianVersion> <public|catalyst>');
  }

  const packageName = getScopedPackageName({ channel, obsidianVersion });

  const registryState = await getPackageRegistryState(packageName);

  if (registryState === 'released') {
    console.log(`${packageName} already carries a real release, so both halves of this step are long done.`);
    return;
  }

  if (registryState === 'placeholderOnly') {
    console.log(`${packageName} is already claimed, so there is nothing to claim.`);
    console.log('Nothing has ever published through it, though, so its trusted publisher may still be missing --');
    console.log('the half that gets skipped, and that surfaces in CI as a bare E404 and nowhere else. Asking npm.');
    await offerRelease({ channel, obsidianVersion }, packageName, await resolveTrustedPublisherState(packageName));
    return;
  }

  // Preflight the credential before building or publishing anything. npm answers an *unauthorized* PUT to a
  // package that does not exist yet with **404**, not 401 -- it will not confirm the existence of something you
  // may not read -- so a stale login surfaces as `E404 ... could not be found or you do not have permission`
  // against the very name this script is trying to claim, and reads as a registry-side refusal. (Measured
  // 2026-09-14: the name was genuinely free, `getPackageRegistryState` above said so over an unauthenticated fetch,
  // and the machine's token had simply expired.) The 2FA prompt never appearing is the tell, and asking
  // `npm whoami` first is the cheap way to say so in words.
  //
  // This is deliberately AFTER the existence short-circuit: a re-run against an already-claimed name only
  // prints instructions, and needs no credential at all. That is what makes the script safe to re-run.
  const npmUsername = await getNpmUsername();

  if (!npmUsername) {
    throw new Error(
      `npm rejected this machine's credential, so claiming ${packageName} would fail with a bare E404 that reads`
        + ' as a registry-side refusal. Run `npm login` in this terminal and re-run this script -- it is safe to'
        + ' re-run, and it is the only step in the release path that needs a local npm credential at all.'
    );
  }

  console.log(`Claiming ${packageName} with a ${PLACEHOLDER_VERSION} placeholder, as npm user ${npmUsername}.`);
  console.log('npm will prompt for your 2FA one-time password -- that prompt is the whole point of this step.');

  await publishPlaceholder(packageName);

  console.log(`\nClaimed ${packageName}. That was the first of two steps, and the second follows here.`);
  console.log('npm will ask for a second one-time password: it challenges per operation and caches nothing');
  console.log('between processes, so attaching the publisher cannot reuse the code the publish above consumed.');

  const publisherState = attachTrustedPublisher(packageName) ? 'attached' : 'unknown';

  if (publisherState === 'attached') {
    console.log(`\nTrusted publisher attached to ${packageName}. Both halves of this step are done.`);
  } else {
    console.log(`\nCould not attach the trusted publisher to ${packageName}, so that half is still outstanding.`);
    console.log(getTrustedPublisherInstructions(packageName));
  }

  // And the third step, which was neither manual nor automatic until somebody owned it. This script is where
  // the operator is standing when the release is the only thing left, and it already holds their terminal --
  // so it is the one place that can dispatch it, or ask when the publisher could not be confirmed. Leaving
  // `npm run release` as a printed instruction is what left two branches created-but-unreleased on
  // 2026-09-14.
  await offerRelease({ channel, obsidianVersion }, packageName, publisherState);
}

async function publishPlaceholder(packageName: string): Promise<void> {
  // Written with Node's own fs rather than the `mkdir -p` / `cat > file << EOF` shell pattern the CI-only
  // scripts use: this one runs on a maintainer's machine, which is as likely to be Windows as not.
  await rm(BOOTSTRAP_FOLDER, { force: true, recursive: true });
  await mkdir(BOOTSTRAP_FOLDER, { recursive: true });

  try {
    // The one thing that makes the pre-release window audible to whoever is standing in it. The `bootstrap`
    // dist-tag does not keep this version off `latest` (see the file header), so `npm install <name>` in that
    // window succeeds and hands back a package with no types in it -- silently, which is the whole defect.
    // A `deprecated` field is carried verbatim into the registry's version document at publish time and read
    // straight back out by the installer, so it costs nothing and nothing has to undo it: the first real
    // release is simply not deprecated, takes `latest` when it lands, and leaves `0.0.0` labelled as what it
    // has always been. Verified against the installed npm (12.0.2): `libnpmpublish/lib/publish.js` assigns
    // the whole manifest into `root.versions[version]`, normalized only by its `fixName` step, and
    // `@npmcli/arborist/lib/arborist/reify.js` warns off `node.package.deprecated`.
    //
    // Deliberately not the alternative of moving `latest` off the placeholder with `npm dist-tag rm`: that is
    // a second authenticated write needing a second 2FA prompt in the one script that has to be interactive,
    // and what it buys is a name that answers `No matching version found` -- which says nothing about why.
    const placeholderPackageJson = {
      deprecated: `Placeholder claiming the name for ${packageName}. It contains no types. Wait for the first real release.`,
      description: `Placeholder claiming the name for ${packageName}. Replaced by the first real release.`,
      license: 'MIT',
      name: packageName,
      repository: REPOSITORY,
      version: PLACEHOLDER_VERSION
    };

    await writeJson(join(BOOTSTRAP_FOLDER, 'package.json'), placeholderPackageJson);
    await writeFile(
      join(BOOTSTRAP_FOLDER, 'README.md'),
      `# ${packageName}\n\nPlaceholder version reserving this package name. See the first real release for the actual typings.\n`,
      'utf-8'
    );

    // `--access public` is required here and only here. The package does not exist yet, and npm defaults a
    // new *scoped* package to restricted; every other publish in this repo targets a package that is already
    // public and so carries its access forward without the flag. Restricted-to-public is a package-access
    // change, which npm now gates behind an interactive 2FA challenge -- fine for a human at a terminal,
    // impossible for CI, which is exactly why this step is not automated.
    //
    // Not `execFromRoot`: that helper closes the child's stdin immediately, so npm's 2FA prompt would read
    // EOF and the publish would fail without ever showing the prompt. Inheriting the terminal is the point.
    execFileSync('npm', ['publish', '--access', 'public', '--tag', PLACEHOLDER_DIST_TAG], {
      cwd: BOOTSTRAP_FOLDER,
      shell: true,
      stdio: 'inherit'
    });
  } finally {
    await rm(BOOTSTRAP_FOLDER, { force: true, recursive: true });
  }
}

await main();
