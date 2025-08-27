import type { App } from 'obsidian';
import type { ConstructorBase } from '../../Constructors/ConstructorBase.d.ts';
import type { TableView } from './TableView.d.ts';

/**
 * Table view constructor.
 *
 * @public
 * @unofficial
 */
export interface TableViewConstructor extends ConstructorBase<[app: App, containerEl: HTMLElement], TableView> {}
