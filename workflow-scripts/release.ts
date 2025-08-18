import { execSync } from 'node:child_process';
import {
  basename,
  dirname
} from 'node:path/posix';

function main(): void {
  const nodeModulesPath = exec('npm root').replace(/\\/g, '/');
  let projectRoot = dirname(nodeModulesPath);
  const parentDir = dirname(projectRoot);
  if (basename(parentDir) === 'workflow-scripts') {
    projectRoot = dirname(parentDir);
  }

  exec(`git -C ${projectRoot} restore --source=origin/main --worktree -- ./workflow-scripts`);
  exec(`npm install -C ${projectRoot}/workflow-scripts`);
  exec(`bun ${projectRoot}/workflow-scripts/release-impl.ts`);
}

function exec(command: string): string {
  return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
}

main();
