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
     * @public
     * @since 1.10.0
     * @example
     * ```ts
     * {
     *     not: [
     *         '*.md',
     *         '*.txt',
     *     ],
     * }
     */
    not: BasesConfigFileFilter[];
}
