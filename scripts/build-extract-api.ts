import { spawnSync } from 'child_process';

const result = spawnSync('api-extractor run --local', { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
