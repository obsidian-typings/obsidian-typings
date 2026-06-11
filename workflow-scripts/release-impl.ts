import { execFromRoot } from './helpers/exec.ts';

async function main(): Promise<void> {
  await checkGitRepoClean();
  await execFromRoot('git pull origin --rebase');
  await execFromRoot('git push origin');

  const isBeta = process.argv[2] === 'beta';
  const sha = (await execFromRoot('git rev-parse HEAD', { isQuiet: true })).trim();

  // Trigger the release workflow on main directly, passing the exact commit to
  // release as an input. The release branches no longer contain a proxy workflow,
  // and a tag push cannot trigger a workflow that lives only on main, so the
  // workflow is dispatched explicitly here. The SHA is immutable, so no
  // intermediate "release-candidate" tag is needed to point CI at the commit.
  await execFromRoot(`gh workflow run publish-release.yml --ref main -f ref=${sha} -f isBeta=${String(isBeta)}`);
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
