import type { BasesConfigFileFilterAndClause } from '../../internals/Bases/BasesConfigFileFilterAndClause.d.ts';
import type { BasesConfigFileFilterNotClause } from '../../internals/Bases/BasesConfigFileFilterNotClause.d.ts';
import type { BasesConfigFileFilterOrClause } from '../../internals/Bases/BasesConfigFileFilterOrClause.d.ts';

declare module 'obsidian' {
    /**
     * @todo Documentation incomplete.
     * @since 1.10.0
     *
     * @deprecated - Added only for typing purposes. Use {@link BasesConfigFileFilter} instead.
     */
    type BasesConfigFileFilter__ =
        | string
        | BasesConfigFileFilterAndClause
        | BasesConfigFileFilterOrClause
        | BasesConfigFileFilterNotClause;
}
