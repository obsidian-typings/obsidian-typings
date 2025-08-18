import { execSync } from 'node:child_process';

function main(): void {
  // eslint-disable-next-line no-magic-numbers
  const targetBranch = process.argv[2];
  // eslint-disable-next-line no-magic-numbers
  const withScripts = process.argv[3] === '--with-scripts';
  if (!targetBranch) {
    throw new Error('Usage: bun ./workflow-scripts/checkout.ts <targetBranch> [--with-scripts]');
  }
  execSync(`git checkout "${targetBranch}"`, { stdio: 'inherit' });
  if (withScripts) {
    execSync('git restore --source=main --worktree -- ./workflow-scripts', { stdio: 'inherit' });
  }
}

main();
