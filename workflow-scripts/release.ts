import {
  basename,
  dirname
} from 'node:path/posix';

import { execFromRoot } from './scripts/helpers/exec.ts';

async function main(): Promise<void> {
  const nodeModulesPath = (await execFromRoot('npm root', { isQuiet: true })).replace(/\\/g, '/');
  let projectRoot = dirname(nodeModulesPath);
  const parentDir = dirname(projectRoot);
  if (basename(parentDir) === 'workflow-scripts') {
    projectRoot = dirname(parentDir);
  }

  execFromRoot(`git -C ${projectRoot} restore --source=origin/main --worktree -- ./workflow-scripts`);
  execFromRoot(`npm install -C ${projectRoot}/workflow-scripts`);
  execFromRoot(`jiti ${projectRoot}/workflow-scripts/release-impl.ts`);
}

await main();
