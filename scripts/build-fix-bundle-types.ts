import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';

import { fixBundleTypes } from './helpers/fix-bundle-types.ts';

await wrapCliTask(async () => {
  await fixBundleTypes('dist/cjs/types.d.cts');
});
