import type {
    App,
    TFile
} from 'obsidian';
import type { ConstructorBase } from '../../Constructors/ConstructorBase.d.ts';
import type { BasesContext } from './BasesContext.d.ts';
import type { BasesFilter } from './BasesFilter.d.ts';
import type { BasesFormula } from './BasesFormula.d.ts';

/**
 * Table view constructor.
 *
 * @public
 * @unofficial
 */
export interface BasesContextConstructor extends
    ConstructorBase<
        [app: App, filter: Record<string, BasesFilter>, formulas: Record<string, BasesFormula>, file: TFile | null],
        BasesContext
    >
{}
