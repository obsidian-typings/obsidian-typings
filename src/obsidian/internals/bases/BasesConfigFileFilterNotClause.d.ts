import type { BasesConfigFileFilter } from 'obsidian';

/**
 * BasesConfigFileFilter `not` clause.
 *
 * @public
 * @unofficial
 */
export interface BasesConfigFileFilterNotClause {
  /**
   * None of the following filters should match.
   *
   * @example
   * ```ts
   * {
   *     not: [
   *         '*.md',
   *         '*.txt',
   *     ],
   * }
   * ```
   * @public
   * @since 1.10.0
   */
  not: BasesConfigFileFilter[];
}
