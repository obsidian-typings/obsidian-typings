import { spawnSync } from 'child_process';

const result = spawnSync('cz', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
