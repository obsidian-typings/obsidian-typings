import { spawnSync } from 'node:child_process';
import {
    join,
    relative
} from 'node:path/posix';
import {
    cwd,
    env
} from 'node:process';


const initCwd = env['INIT_CWD'];

console.warn('initCwd', initCwd);
console.warn('cwd', cwd());
console.warn('env', JSON.stringify(env, null, 2));

// const patchDir = relative(initCwd, join(cwd(), 'patches'));
// console.warn('patchDir', patchDir);
// console.warn('initCwd', initCwd);

// spawnSync('npx', ['patch-package', '--patch-dir', patchDir], {
//     shell: true,
//     stdio: 'inherit',
//     cwd: initCwd
// });
