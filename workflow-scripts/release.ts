import { execFromRoot } from '@mnaoumov/typescript-dev-toolkit/root';
import {
  basename,
  dirname
} from 'node:path/posix';

async function main(): Promise<void> {
  const npmRootOutput = await execFromRoot('npm root', { isQuiet: true });
  const nodeModulesPath = npmRootOutput.replaceAll('\\', '/');
  let projectRoot = dirname(nodeModulesPath);
  const parentDirectory = dirname(projectRoot);
  if (basename(parentDirectory) === 'workflow-scripts') {
    projectRoot = dirname(parentDirectory);
  }

  // These three are a sequence, not three independent commands: the restore replaces
  // `workflow-scripts` with `main`'s copy, the install resolves that copy's dependencies, and only then
  // can `release-impl.ts` be run. Un-awaited they raced, and a rejection in any of them was an unhandled
  // rejection rather than a failed release.
  await execFromRoot(`git -C ${projectRoot} restore --source=origin/main --worktree -- ./workflow-scripts`);
  await execFromRoot(`npm install -C ${projectRoot}/workflow-scripts`);
  await execFromRoot(`jiti ${projectRoot}/workflow-scripts/release-impl.ts`);
}

await main();
