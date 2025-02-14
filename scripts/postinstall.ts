import { spawnSync } from 'node:child_process';
import {
    cwd,
    env
} from 'node:process';


const initCwd = env['INIT_CWD'];

console.warn('initCwd', initCwd);
console.warn('cwd', cwd());
console.warn('env', JSON.stringify(env, null, 2));

spawnSync('npx', ['patch-package', '--patch-dir', './patches'], {
    shell: true,
    stdio: 'inherit',
    cwd: initCwd
});
