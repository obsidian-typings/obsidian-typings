import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

let patchDir = './node_modules/obsidian-typings/patches';

if (!existsSync(patchDir)) {
    patchDir = './patches';
}

spawnSync('npx', ['patch-package', '--patch-dir', patchDir], { stdio: 'inherit' });
