import type { MetadataCacheBlockCacheNode } from './MetadataCacheBlockCacheNode.d.ts';

/**
 * One block of a file in the {@link MetadataCacheBlockCache}.
 *
 * @public
 * @unofficial
 */
export interface MetadataCacheBlockCacheBlock {
  /**
   * The plain text of the block shown in the suggestion, trimmed; a heading's text is prefixed with its `#` marks.
   */
  display: string;

  /**
   * The parsed markdown node of the block.
   */
  node: MetadataCacheBlockCacheNode;
}
