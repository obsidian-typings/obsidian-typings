import { spawnSync } from 'node:child_process';
import {
    join,
    relative
} from 'node:path/posix';
import {
    cwd,
    env
} from 'node:process';

const initCwd = env['INIT_CWD'] ?? cwd();

spawnSync('npx', ['patch-package', '--patch-dir', relative(initCwd, join(cwd(), 'patches'))], {
    shell: true,
    stdio: 'inherit',
    cwd: initCwd
});
