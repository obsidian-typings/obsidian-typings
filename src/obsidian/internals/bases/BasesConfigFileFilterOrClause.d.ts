import type { BasesConfigFileFilter } from 'obsidian';

/**
 * BasesConfigFileFilter `or` clause.
 *
 * @public
 * @unofficial
 */
export interface BasesConfigFileFilterOrClause {
  /**
   * Some of the following filters should match.
   *
   * @example
   * ```ts
   * {
   *     or: [
   *         '*.md',
   *         '*.txt',
   *     ],
   * }
   * ```
   * @public
   * @since 1.10.0
   */
  or: BasesConfigFileFilter[];
}
