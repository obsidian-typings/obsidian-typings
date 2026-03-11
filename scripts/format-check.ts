import { spawnSync } from 'child_process';

const result = spawnSync('dprint check', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
