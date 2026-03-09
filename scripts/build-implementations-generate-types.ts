import { spawnSync } from 'child_process';

const result = spawnSync('tsc --project ./tsconfig.implementations.json', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
