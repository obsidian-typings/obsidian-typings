import type { BasesQuery } from '../internal-plugins/bases/BasesQuery.d.ts';
import type { ExtractConstructor } from './ExtractConstructor.d.ts';

/**
 * Bases query constructor.
 *
 * Extends {@link ExtractConstructor} with a static `fromString` parser (the `.base` parser). `BasesQuery`
 * is not part of the public `obsidian` module, so its constructor is modeled here rather than obtained from
 * `obsidian` directly.
 *
 * @public
 * @unofficial
 */
export interface BasesQueryConstructor extends ExtractConstructor<BasesQuery> {
  /**
   * Parse a `.base` file's content into a {@link BasesQuery}.
   *
   * @param content - The `.base` file content.
   * @returns The parsed query.
   */
  fromString(content: string): BasesQuery;
}
