import { spawnSync } from 'child_process';

const result = spawnSync('tsc --build --force', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
