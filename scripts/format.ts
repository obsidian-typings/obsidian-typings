import { spawnSync } from 'child_process';

const result = spawnSync('dprint fmt', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
