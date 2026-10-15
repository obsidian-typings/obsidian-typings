import { execSync } from 'node:child_process';
import {
  basename,
  dirname
} from 'node:path/posix';

function exec(command: string): string {
  return execSync(command, { encoding: 'utf-8', stdio: 'inherit' });
}

function main(): void {
  const nodeModulesPath = exec('npm root').replaceAll('\\', '/');
  let projectRoot = dirname(nodeModulesPath);
  const parentDirectory = dirname(projectRoot);
  if (basename(parentDirectory) === 'workflow-scripts') {
    projectRoot = dirname(parentDirectory);
  }

  exec(`git -C ${projectRoot} restore --source=origin/main --worktree -- ./workflow-scripts`);
  exec(`npm install -C ${projectRoot}/workflow-scripts`);
  exec(`jiti ${projectRoot}/workflow-scripts/release-impl.ts beta`);
}

main();
