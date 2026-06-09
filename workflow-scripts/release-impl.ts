import { execFromRoot } from './helpers/exec.ts';

async function main(): Promise<void> {
  await checkGitRepoClean();
  await execFromRoot('git pull origin --rebase');
  await execFromRoot('git push origin');

  const isBeta = process.argv[2] === 'beta';

  if (isBeta) {
    await execFromRoot('git push origin HEAD:refs/tags/release-candidate-beta');
  }

  await execFromRoot('git push origin HEAD:refs/tags/release-candidate');

  // Trigger the release workflow on main directly. The release branches no longer
  // contain a proxy workflow, and a tag push cannot trigger a workflow that lives
  // only on main, so the workflow is dispatched explicitly here.
  await execFromRoot('gh workflow run push-release-tag.yml --ref main');
}

async function checkGitRepoClean(): Promise<void> {
  try {
    const stdout = await execFromRoot('git status --porcelain --untracked-files=all', { isQuiet: true });
    if (stdout) {
      throw new Error();
    }
  } catch {
    throw new Error('Git repository is not clean. Please commit or stash your changes before releasing a new version.');
  }
}

await main();
