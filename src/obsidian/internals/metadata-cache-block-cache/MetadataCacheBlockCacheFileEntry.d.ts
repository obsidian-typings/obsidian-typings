import type { TFile } from 'obsidian';

import type { MetadataCacheBlockCacheBlock } from './MetadataCacheBlockCacheBlock.d.ts';

/**
 * The blocks of one file in the {@link MetadataCacheBlockCache}.
 *
 * @public
 * @unofficial
 */
export interface MetadataCacheBlockCacheFileEntry {
  /**
   * The blocks of the file, in document order: every top-level block except the frontmatter, with each list item in
   * place of the list holding it.
   */
  blocks: MetadataCacheBlockCacheBlock[];

  /**
   * The text of the file the entry was parsed from.
   */
  content: string;

  /**
   * The file of the entry.
   */
  file: TFile;

  /**
   * The modification time of the file when it was read.
   */
  mtime: number;
}
