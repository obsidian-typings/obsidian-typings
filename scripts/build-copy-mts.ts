import { cp } from 'node:fs/promises';

await cp('dist/implementations.d.cts', 'dist/implementations.d.mts');
await cp('dist/types.d.cts', 'dist/types.d.mts');
