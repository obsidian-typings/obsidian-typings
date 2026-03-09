import { spawnSync } from 'child_process';

const lint = spawnSync('eslint --fix', { stdio: 'inherit', shell: true });
if (lint.status !== 0) {
    process.exit(lint.status ?? 1);
}

const fmt = spawnSync('dprint fmt', { stdio: 'inherit', shell: true });
process.exit(fmt.status ?? 1);
