/**
 * Custom API documentation generator.
 *
 * Reads obsidian.d.ts (base types) and our augmentation types,
 * merges them, and generates Starlight-compatible markdown pages.
 */

import type { SourceFile } from 'ts-morph';

import {
  existsSync,
  readFileSync
} from 'node:fs';
import {
  mkdir,
  rm,
  writeFile
} from 'node:fs/promises';
import {
  dirname,
  join,
  relative,
  resolve
} from 'node:path';
import { Project } from 'ts-morph';

import type {
  PageContent,
  TypeInfo
} from './helpers/api-doc-types.ts';

import {
  CACHE_FILE,
  OUTPUT_DIR
} from './helpers/api-doc-constants.ts';
import { loadExternalTypeMaps } from './helpers/api-doc-link-rendering.ts';
import {
  appendBacklinksAndWrite,
  generateMemberPages,
  generateNamespaceIndexPages,
  generateOverviewPage,
  generateSidebarJson
} from './helpers/api-doc-page-generation.ts';
import {
  collectFunctions,
  computeCacheHash,
  findDtsFiles,
  processModuleDeclaration,
  processSourceFile,
  registerGenericTypeParams
} from './helpers/api-doc-source-processing.ts';
import { resolveInheritedMembers } from './helpers/api-doc-type-merging.ts';

async function main(): Promise<void> {
  loadExternalTypeMaps();

  const rootDir = process.env['TYPINGS_ROOT'] ?? resolve(process.cwd(), '..');
  const srcDir = join(rootDir, 'src');

  // Check cache — skip generation if nothing changed
  const currentHash = computeCacheHash(srcDir);
  if (existsSync(CACHE_FILE) && readFileSync(CACHE_FILE, 'utf-8').trim() === currentHash) {
    console.warn('Source files and generator unchanged — skipping generation.');
    return;
  }

  const project = new Project({ skipAddingFilesFromTsConfig: true });

  // Load official obsidian.d.ts for merging
  const obsidianPath = join(rootDir, 'node_modules/obsidian/obsidian.d.ts');
  let obsidianSrc: SourceFile | undefined;
  try {
    obsidianSrc = project.addSourceFileAtPath(obsidianPath);
  } catch {
    console.warn('obsidian.d.ts not found — base types will not be included.');
  }

  const types = new Map<string, TypeInfo>();

  // Process official obsidian.d.ts first (all types marked as official)
  if (obsidianSrc) {
    processSourceFile(obsidianSrc, types, true, 'obsidian/augmentations');
  }

  // Walk all source .d.ts files
  const dtsFiles = findDtsFiles(srcDir);
  console.warn(`Found ${String(dtsFiles.length)} source .d.ts files`);

  for (const filePath of dtsFiles) {
    const relPath = relative(srcDir, filePath).replace(/\\/g, '/');
    const dirPath = dirname(relPath);
    const src = project.addSourceFileAtPath(filePath);

    // Check if file contains module declarations (augmentations)
    const modules = src.getModules();
    if (modules.length > 0) {
      for (const mod of modules) {
        processModuleDeclaration(mod, types, false, dirPath);
      }
    }

    // Process top-level exports (internals, standalone types)
    processSourceFile(src, types, false, dirPath);
    collectFunctions(src, types, false, dirPath);
  }

  resolveInheritedMembers(types);

  // Sort members alphabetically
  for (const [_name, info] of types) {
    info.properties.sort((a, b) => a.name.localeCompare(b.name));
    info.methods.sort((a, b) => a.name.localeCompare(b.name));
  }

  const allTypes = types;

  registerGenericTypeParams(types);

  await rm(OUTPUT_DIR, { force: true, recursive: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  await generateNamespaceIndexPages(types, allTypes);

  // Pass 1: generate all pages without backlinks, collect content
  const pageContents = new Map<string, PageContent>();
  let pageCount = 0;
  for (const [name, info] of types) {
    const { content, filePath } = await generateOverviewPage(name, info, allTypes);
    pageContents.set(name, { content, filePath });
    if (info.kind !== 'function') {
      await generateMemberPages(name, info, allTypes);
    }
    pageCount++;
  }

  // Pass 2–3: scan content for links, append backlinks, write files
  await appendBacklinksAndWrite(pageContents, types, allTypes);

  // Generate sidebar JSON for astro config
  await generateSidebarJson(types);

  // Write cache hash on successful generation
  await writeFile(CACHE_FILE, currentHash, 'utf-8');

  console.warn(`Generated docs for ${String(pageCount)} types, ${String(types.size)} total types`);
}

await main();
