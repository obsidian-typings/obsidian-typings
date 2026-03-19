import {
  readFile,
  writeFile
} from 'node:fs/promises';

export async function fixBundleTypes(bundleTypesFilePath: string): Promise<void> {
  const content = await readFile(bundleTypesFilePath, 'utf-8');
  const newContent = content
    .replace(/\$\d+/g, '')
    .replace(/import \{/g, 'import type {');

  await writeFile(bundleTypesFilePath, newContent, 'utf-8');
}
