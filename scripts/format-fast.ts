import { execSync } from 'node:child_process';

const addedModified = execSync('git diff --name-only --diff-filter=AM HEAD', { encoding: 'utf-8', stdio: 'pipe' });
const untracked = execSync('git ls-files --others --exclude-standard', { encoding: 'utf-8', stdio: 'pipe' });

const filePaths = (`${addedModified}\n${untracked}`).split('\n').filter((line) => line.startsWith('src/'));

for (const filePath of filePaths) {
    execSync(`bun run scripts/sort-interfaces.ts ${filePath}`, { encoding: 'utf-8', stdio: 'inherit' });
}

execSync('bun dprint fmt', { encoding: 'utf-8', stdio: 'inherit' });
