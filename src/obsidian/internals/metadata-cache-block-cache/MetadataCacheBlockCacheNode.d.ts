import type { Pos } from 'obsidian';

/**
 * A markdown syntax tree node of a block in the {@link MetadataCacheBlockCache}.
 *
 * @remarks The node comes from Obsidian's markdown parser, not from the metadata cache, so its `position` lines are
 * 1-based, unlike those of a {@link obsidian#CacheItem}.
 * @public
 * @unofficial
 */
export interface MetadataCacheBlockCacheNode {
  /**
   * The child nodes, for a node that has any.
   */
  children?: MetadataCacheBlockCacheNode[];

  /**
   * The level of a heading node, from `1` to `6`.
   */
  depth?: number;

  /**
   * The ID of the block, when it carries one.
   */
  id?: string;

  /**
   * The position of the node in the file, with 1-based lines.
   */
  position: Pos;

  /**
   * The node type, such as `heading`, `paragraph`, `listItem` or `code`.
   */
  type: string;
}
