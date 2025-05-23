import type { App } from 'obsidian';
import type { ConstructorBase } from '../../Constructors/ConstructorBase.d.ts';
import type { TableView } from './TableView.d.ts';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface TableViewConstructor extends ConstructorBase<[app: App, containerEl: HTMLElement], TableView> {}
