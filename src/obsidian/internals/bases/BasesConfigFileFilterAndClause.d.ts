import type { BasesConfigFileFilter } from 'obsidian';

/**
 * {@link obsidian#BasesConfigFileFilter} `and` clause.
 *
 * @public
 * @unofficial
 */
export interface BasesConfigFileFilterAndClause {
  /**
   * All of the following filters must match.
   *
   * @example
   * ```ts
   * {
   *     and: [
   *         '*.md',
   *         '*.txt',
   *     ],
   * }
   * ```
   * @public
   * @since 1.10.0
   */
  and: BasesConfigFileFilter[];
}
