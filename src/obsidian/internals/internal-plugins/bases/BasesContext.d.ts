import type { Component } from 'obsidian';
import type { BasesLocal } from './BasesLocal.d.ts';

/**
 * Bases context
 *
 * @public
 * @unofficial
 */
export interface BasesContext extends Component {
    /**
     * Local context.
     */
    _local: BasesLocal;
}
