import { spawnSync } from 'child_process';

const result = spawnSync(
    'dts-bundle-generator ./src/index.d.ts --out-file ./dist/cjs/types.d.cts --inline-declare-global --inline-declare-externals --sort --no-check',
    { stdio: 'inherit', shell: true }
);
process.exit(result.status ?? 1);
