import {
    appendFile,
    cp
} from 'node:fs/promises';

await cp('src/style-mod/style-mod.d.cts.dist', 'dist/style-mod.d.cts');
await appendFile('dist/types.d.ts', 'import \'./style-mod.d.cts\';\n');
