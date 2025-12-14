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
     * @public
     * @since 1.10.0
     * @example
     * ```ts
     * {
     *     or: [
     *         '*.md',
     *         '*.txt',
     *     ],
     * }
     * ```
     */
    or: BasesConfigFileFilter[];
}
