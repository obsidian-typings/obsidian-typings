import { wrapCliTask } from '@mnaoumov/typescript-dev-toolkit/cli-utils';
import {
  readdir,
  rm
} from 'node:fs/promises';

await wrapCliTask(async () => {
  await rm('dist', { recursive: true, force: true });

  const files = await readdir('src/obsidian/implementations', { recursive: true });
  const dtsFiles = files.filter((file) => file.endsWith('.d.ts'));

  for (const file of dtsFiles) {
    await rm(`src/obsidian/implementations/${file}`);
  }

  const filesToRemove = [
    'src/index.d.ts',
    'src/obsidian/index.d.ts',
    'src/obsidian/augmentations/index.d.ts',
    'src/obsidian/implementations/index.ts'
  ];

  for (const file of filesToRemove) {
    await rm(file, { force: true });
  }
});
