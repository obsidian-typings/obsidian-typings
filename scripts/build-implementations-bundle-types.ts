import { execFromRoot } from './helpers/root.ts';

await execFromRoot('dts-bundle-generator ./src/obsidian/implementations/index.ts --out-file ./dist/cjs/implementations.d.cts --sort');
