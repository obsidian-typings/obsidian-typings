import {
  readFile,
  writeFile
} from 'node:fs/promises';

// Both bundles use Node types they never bring into scope themselves: `node:fs` / `node:fs/promises`
// / `node:path` module imports plus the `Buffer` and `NodeJS.*` globals, from `FileSystemAdapter` and
// the Electron internals. `@types/node` is a peer dependency, which is an install-time contract only
// — it puts the types on disk, it does not put them in the compiler's scope. A consumer compiling
// with `types: []` therefore gets 40 errors per bundle, and one compiling with the far more common
// `skipLibCheck: true` gets no errors but silently resolves every `Buffer`-typed member to an error
// type. `dts-bundle-generator` emits no directive of its own here, because the dependency arrives as
// `node:`-prefixed module specifiers and ambient globals rather than as `@types/node` symbols, so the
// directive is prepended after generation. `build:validate-bundle-types` fails if it goes missing.
const TYPES_REFERENCE_DIRECTIVES = '/// <reference types="node" />\n';

export async function fixBundleTypes(bundleTypesFilePath: string): Promise<void> {
  const content = await readFile(bundleTypesFilePath, 'utf-8');
  const newContent = TYPES_REFERENCE_DIRECTIVES + content
    .replace(/\$\d+/g, '')
    .replace(/import \{/g, 'import type {');

  await writeFile(bundleTypesFilePath, newContent, 'utf-8');
}
