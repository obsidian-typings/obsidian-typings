import {
  readFile,
  writeFile
} from 'node:fs/promises';

export async function fixBundleTypes(bundleTypesFilePath: string): Promise<void> {
  const content = await readFile(bundleTypesFilePath, 'utf-8');
  const newContent = content
    .replace(/Plugin\$1/g, 'Plugin')
    .replace(/import \{/g, 'import type {');

  const ALIASED_TYPES_REGEXP = /\w+\$\d+/g;
  const aliasedTypes = Array.from(newContent.matchAll(ALIASED_TYPES_REGEXP)).map((match) => match[0]);

  if (aliasedTypes.length > 0) {
    throw new Error(`Generated aliases found in ${bundleTypesFilePath}: ${aliasedTypes.join(', ')}`);
  }

  await writeFile(bundleTypesFilePath, newContent, 'utf-8');
}
