import type {
    App,
    QueryController,
    TFile
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The QueryController constructor.
 *
 * @public
 * @unofficial
 */
export interface QueryControllerConstructor extends ConstructorBase<[app: App, plugin: unknown, viewHeaderEl: HTMLElement, currentFile?: TFile | null], QueryController> {}
