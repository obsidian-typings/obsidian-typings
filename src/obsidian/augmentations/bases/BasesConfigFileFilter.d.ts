import type { BasesConfigFileFilterAndClause } from '../../internals/bases/BasesConfigFileFilterAndClause.d.ts';
import type { BasesConfigFileFilterNotClause } from '../../internals/bases/BasesConfigFileFilterNotClause.d.ts';
import type { BasesConfigFileFilterOrClause } from '../../internals/bases/BasesConfigFileFilterOrClause.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A filter clause used in Bases config files, supporting AND, OR, NOT, and string conditions.
   * @since 1.10.0
   *
   * @deprecated - Added only for typing purposes. Use {@link BasesConfigFileFilter} instead.
   */
  type BasesConfigFileFilter__ =
    | BasesConfigFileFilterAndClause
    | BasesConfigFileFilterNotClause
    | BasesConfigFileFilterOrClause
    | string;
}
