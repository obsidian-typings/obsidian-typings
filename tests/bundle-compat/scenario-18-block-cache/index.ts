/**
 * Scenario 18: `MetadataCache.blockCache`, and the core plugin list without `markdown-importer`.
 *
 * `MetadataCache.blockCache` is the per-file cache of block-link suggestions, not a block's
 * `BlockCache` entry, so neither type is assignable to the other and each keeps only its own members.
 * The `markdown-importer` core plugin is not registered by Obsidian 1.14.2 and later, so it has no
 * `InternalPluginName` member and no entry in either internal-plugin mapping.
 *
 * Each `@ts-expect-error` asserts that a removed or mismatched member is rejected.
 */

import type {
  BlockCache,
  MetadataCache,
  TFile
} from 'obsidian';
import type {
  InternalPluginNameInstancesMapping,
  InternalPluginNamePluginsMapping,
  MetadataCacheBlockCache,
  MetadataCacheBlockCacheFileEntry,
  Runnable
} from 'obsidian-typings';

import 'obsidian-typings';
import { InternalPluginName } from 'obsidian-typings/implementations';

declare const metadataCache: MetadataCache;
declare const block: BlockCache;
declare const runnable: Runnable;
declare const file: TFile;

// === The suggestion cache has its own type ===
const blockCache: MetadataCacheBlockCache = metadataCache.blockCache;
// @ts-expect-error -- the suggestion cache is not a block's cache entry.
const _notABlock: BlockCache = metadataCache.blockCache;
// @ts-expect-error -- `id` belongs to a block's cache entry.
void blockCache.id;
void _notABlock;

const _cached: Record<string, MetadataCacheBlockCacheFileEntry> = blockCache.cache;
void _cached;
blockCache.clear();

async function readBlocks(): Promise<void> {
  const entry = await blockCache.getForFile(runnable, file);
  if (entry) {
    const entryFile: TFile = entry.file;
    const content: string = entry.content;
    const mtime: number = entry.mtime;
    for (const { display, node } of entry.blocks) {
      const text: string = display;
      const type: string = node.type;
      const line: number = node.position.start.line;
      const id: string | undefined = node.id;
      void text;
      void type;
      void line;
      void id;
    }
    void entryFile;
    void content;
    void mtime;
  }

  for await (const nextEntry of blockCache.getAll(runnable)) {
    const nextFile: TFile | undefined = nextEntry?.file;
    void nextFile;
  }
}
void readBlocks;

// === A block's cache entry keeps only its own members ===
const blockId: string = block.id;
void blockId;
// @ts-expect-error -- `clear` belongs to the suggestion cache.
block.clear();
// @ts-expect-error -- `getForFile` belongs to the suggestion cache.
void block.getForFile(runnable, file);

// === No `markdown-importer` core plugin ===
// @ts-expect-error -- not registered by Obsidian 1.14.2 and later.
void InternalPluginName.MarkdownImporter;

type HasMarkdownImporterPlugin = 'markdown-importer' extends keyof InternalPluginNamePluginsMapping ? true : false;
type HasMarkdownImporterInstance = 'markdown-importer' extends keyof InternalPluginNameInstancesMapping ? true : false;
const _noPlugin: HasMarkdownImporterPlugin = false;
const _noInstance: HasMarkdownImporterInstance = false;
void _noPlugin;
void _noInstance;
