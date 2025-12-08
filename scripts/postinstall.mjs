import { spawnSync } from 'node:child_process';
import {
    join,
    relative
} from 'node:path/posix';
import {
    cwd,
    env
} from 'node:process';

const isGlobalInstall = env.npm_config_global === 'true';

if (isGlobalInstall) {
    console.log('Global install detected, skipping patch-package...');
    process.exit(0);
}

let pkgDir = cwd().replace(/\\/g, '/');
const patchDir = join(pkgDir, 'patches');
const relativePath = '/node_modules/obsidian-typings';
if (pkgDir.endsWith(relativePath)) {
    pkgDir = pkgDir.slice(0, -relativePath.length);
}

spawnSync('npx', ['patch-package', '--patch-dir', relative(pkgDir, patchDir)], {
    shell: true,
    stdio: 'inherit',
    cwd: pkgDir
});
