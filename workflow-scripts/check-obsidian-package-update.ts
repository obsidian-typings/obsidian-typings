import { generateBranchName } from './helpers/branchSpec.ts';
import { checkout } from './helpers/checkout.ts';
import {
  execFromRoot,
  readPackageJson
} from './helpers/exec.ts';
import { commit } from './helpers/git.ts';
import { getLatestVersion } from './helpers/version.ts';

async function main(): Promise<void> {
  const latestPublicBranchVersion = await getLatestVersion('public');
  const latestBranch = generateBranchName({ channel: 'public', obsidianVersion: latestPublicBranchVersion });
  await checkout(latestBranch, true);

  const packageJson = await readPackageJson();
  const usedObsidianVersion = packageJson.dependencies?.['obsidian'] ?? '';
  const latestObsidianVersion = await getLatestObsidianVersion();

  if (usedObsidianVersion === latestObsidianVersion) {
    console.log(`Obsidian version matches: ${usedObsidianVersion} === ${latestObsidianVersion}`);
    return;
  }

  await execFromRoot(`npm install --save-exact obsidian@${latestObsidianVersion}`);
  await execFromRoot('git add package.json package-lock.json');

  const hasChanges = (await execFromRoot('git diff --staged --name-only', { isQuiet: true })).trim() !== '';
  if (!hasChanges) {
    console.log(`No file changes after npm install obsidian@${latestObsidianVersion}, skipping release.`);
    return;
  }

  await commit(`chore: update obsidian API version to ${latestObsidianVersion}`);
  await execFromRoot('npm run release');

  // NOTE: Manually invoke the workflow if running in GitHub Actions, because it's not be triggered automatically.
  if (process.env['GITHUB_ACTIONS']) {
    await execFromRoot(`gh workflow run push-release-tag-proxy.yml --ref ${latestBranch}`);
  }
}

async function getLatestObsidianVersion(): Promise<string> {
  const response = await fetch('https://registry.npmjs.org/obsidian/latest');

  if (!response.ok) {
    throw new Error(`npm registry returned ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (typeof json !== 'object' || json === null || Array.isArray(json)) {
    throw new Error('Invalid response from npm registry for obsidian');
  }

  return json['version'] as string;
}

await main();
