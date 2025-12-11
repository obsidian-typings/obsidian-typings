import type { BasesConfigFileFilter } from 'obsidian';

/**
 * BasesConfigFileFilter `and` clause.
 *
 * @public
 * @unofficial
 */
export interface BasesConfigFileFilterAndClause {
    /**
     * All of the following filters must match.
     *
     * @public
     * @since 1.10.0
     * @example
     * ```ts
     * {
     *     and: [
     *         '*.md',
     *         '*.txt',
     *     ],
     * }
     */
    and: BasesConfigFileFilter[];
}
