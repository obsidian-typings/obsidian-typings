import type {
    App,
    Component,
    TFile
} from 'obsidian';
import type { BasesFilter } from './BasesFilter.d.ts';
import type { BasesFormula } from './BasesFormula.d.ts';
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

    /**
     * Constructor.
     *
     * @param app - The app instance.
     * @param filter - The filters.
     * @param formulas - The formulas.
     * @param file - The file.
     * @returns The new instance.
     * @deprecated - Added only for typing purposes.
     */
    constructor2__(app: App, filter: Record<string, BasesFilter>, formulas: Record<string, BasesFormula>, file: TFile | null): this;
}
