import { spawnSync } from 'child_process';

const result = spawnSync('husky', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
