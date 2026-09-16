/**
 * @file
 *
 * The two README generators: the one a release branch gets from the template, and the one that keeps `main`'s
 * "Latest `<channel>` release" rows pointing at the newest branch of each channel.
 *
 * The second is the one with a trap in it. The rows it writes name a git branch AND the npm package that branch
 * publishes, and those two do not come into existence together: `create-new-release-branch.ts` cuts and pushes
 * the branch, then stops and hands the package-claiming steps to a human, because npm binds a trusted publisher
 * to a package that must already exist. So there is a window -- open from the moment the branch is cut until
 * somebody finishes a manual step that has no deadline -- in which the branch is real and the package is not.
 * Anything this file writes about npm during that window is false, which is why the npm half of a row is now
 * conditional on the registry rather than on the branch.
 */

import {
  readFile,
  writeFile
} from 'node:fs/promises';

import type { BranchSpec } from './branchSpec.ts';

import {
  CHANNELS,
  generateBranchName
} from './branchSpec.ts';
import { execFromRoot } from './exec.ts';
import { commit } from './git.ts';
import {
  getLatestWrapperPackageName,
  getPackageRegistryState,
  getScopedPackageName
} from './npm.ts';
import { getLatestVersion } from './version.ts';

export async function generateMainReadme(): Promise<void> {
  await execFromRoot('git checkout main');

  const readme = await readFile('README.md', 'utf-8');
  let updatedReadme = readme;

  for (const channel of CHANNELS) {
    const latestVersion = await getLatestVersion(channel);
    const branchSpec: BranchSpec = { channel, obsidianVersion: latestVersion };
    const isPublished = await isPackagePublished(branchSpec);

    // `null` means the registry could not be asked, not that the package is missing. Leaving the row exactly
    // as it stands is the only answer that cannot make the README less true: whatever it says today was true
    // when it was written, whereas both guesses are a coin flip that gets committed and pushed.
    if (isPublished === null) {
      console.warn(`Could not ask npm about the latest ${channel} package -- leaving that row of README.md alone.`);
      continue;
    }

    const sourceRegExp = new RegExp(`\\n- Latest \`${channel}\` release: .*`, 'g');
    updatedReadme = updatedReadme.replaceAll(sourceRegExp, generateMainReadmeLine(branchSpec, isPublished));
  }

  if (readme === updatedReadme) {
    return;
  }

  await writeFile('README.md', updatedReadme, 'utf-8');
  await execFromRoot('git add README.md');
  await commit('chore: generate README.md from template');
  await execFromRoot('git push');
}

export async function generateReadme(branchSpec: BranchSpec, changelogUrl: string): Promise<void> {
  const readmeTemplate = await readFile('./workflow-scripts/README.template.md', 'utf-8');
  const readme = await readFile('README.md', 'utf-8');

  const updatedReadme = fillReadmeTemplate(readmeTemplate, branchSpec, changelogUrl);
  if (readme === updatedReadme) {
    return;
  }
  await writeFile('README.md', updatedReadme, 'utf-8');
  await execFromRoot('git add README.md');
  await commit('chore: generate README.md from template');
  await execFromRoot('git push');
}

function fillReadmeTemplate(readmeTemplate: string, branchSpec: BranchSpec, changelogUrl: string): string {
  return readmeTemplate
    .replaceAll('{{OBSIDIAN_VERSION}}', branchSpec.obsidianVersion)
    .replaceAll('{{CHANNEL}}', branchSpec.channel)
    .replaceAll('{{CHANGELOG_URL}}', changelogUrl);
}

function generateMainReadmeLine(branchSpec: BranchSpec, isPublished: boolean): string {
  const branchName = generateBranchName(branchSpec);
  const branchLink = `[\`${branchName}\`](https://github.com/obsidian-typings/obsidian-typings/tree/${branchName})`;

  // The `-latest` wrapper is a stable name that has been published for as long as the channel has existed, so
  // it is linked unconditionally; only the per-version package churns, and only it can be a name npm has never
  // seen.
  const npmLatestPackage = getLatestWrapperPackageName(branchSpec.channel);
  const latestBadge = `[![npm](https://img.shields.io/npm/v/${npmLatestPackage}?logo=npm&logoColor=white&label=${encodeURIComponent(npmLatestPackage)})](https://www.npmjs.com/package/${npmLatestPackage})`;

  if (!isPublished) {
    return `\n- Latest \`${branchSpec.channel}\` release: ${branchLink} | not published to npm yet | ${latestBadge}`;
  }

  const npmPackage = getScopedPackageName(branchSpec);
  const versionBadge = `[![npm](https://img.shields.io/npm/v/${npmPackage}?logo=npm&logoColor=white&label=${encodeURIComponent(npmPackage)})](https://www.npmjs.com/package/${npmPackage})`;
  return `\n- Latest \`${branchSpec.channel}\` release: ${branchLink} | ${versionBadge} | ${latestBadge}`;
}

/**
 * Whether the branch's npm package is something a reader can actually install, or `null` when the registry
 * could not be asked.
 *
 * `released` is the predicate rather than mere existence, and it is the same one `create-new-release-branch.ts`
 * uses to decide whether to dispatch a release -- deliberately, so "released" means one thing across the
 * repository. A name carrying only the bootstrap placeholder exists, and its npmjs.com page answers 200, so a
 * link check is happy with it; what it holds is a `0.0.0` stub with no types in it. Linking that is the same
 * lie as linking a 404, just one the gate cannot catch.
 */
async function isPackagePublished(branchSpec: BranchSpec): Promise<boolean | null> {
  try {
    return await getPackageRegistryState(getScopedPackageName(branchSpec)) === 'released';
  } catch {
    return null;
  }
}
