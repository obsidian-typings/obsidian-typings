import { spawnSync } from 'child_process';

const result = spawnSync('cspell . --no-progress', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
