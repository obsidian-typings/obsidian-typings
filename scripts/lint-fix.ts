import { spawnSync } from 'child_process';

const result = spawnSync('eslint --fix', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
