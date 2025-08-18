import { execSync } from 'node:child_process';

async function main(): Promise<void> {
  const target = process.argv[2];
  const withScripts = process.argv[3] === '--with-scripts';
  if (!target) {
    throw new Error('Usage: bun ./workflow-scripts/checkout.ts <branch> [--with-scripts]');
  }
  execSync(`git checkout "${target}"`, { stdio: 'inherit' });
  if (withScripts) {
    execSync(`git restore --source=main --worktree -- ./workflow-scripts`, { stdio: 'inherit' });
  }
}

await main();
