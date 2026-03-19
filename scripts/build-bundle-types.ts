import { execFromRoot } from './helpers/exec.ts';

await execFromRoot(
  'dts-bundle-generator ./src/index.d.ts --out-file ./dist/cjs/types.d.cts --inline-declare-global --inline-declare-externals --sort --no-check'
);
