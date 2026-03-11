import { spawnSync } from 'child_process';

const fmt = spawnSync('dprint fmt', { stdio: 'inherit', shell: true });
process.exit(fmt.status ?? 1);
