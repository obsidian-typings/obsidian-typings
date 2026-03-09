import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { TableView } from '../../../../internals/internal-plugins/bases/TableView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the TableView constructor.
 *
 * @param app - The app.
 * @returns The TableView constructor.
 *
 * @public
 * @unofficial
 */
export function getTableViewConstructor(app: App): ExtractConstructor<TableView> {
    return getViewConstructorByViewType(app, ViewType.Table);
}
