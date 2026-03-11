import { spawnSync } from 'child_process';

const fmt = spawnSync('dprint check', { stdio: 'inherit', shell: true });
process.exit(fmt.status ?? 1);
