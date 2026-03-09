import { spawnSync } from 'child_process';

const result = spawnSync('git show origin/main:workflow-scripts/release-beta.ts | bun -', {
    stdio: 'inherit',
    shell: true
});
process.exit(result.status ?? 1);
