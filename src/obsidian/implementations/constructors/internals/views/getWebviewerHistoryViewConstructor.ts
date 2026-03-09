import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { WebviewerHistoryView } from '../../../../internals/internal-plugins/webviewer/WebviewerHistoryView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the WebviewerHistoryView constructor.
 *
 * @param app - The app.
 * @returns The WebviewerHistoryView constructor.
 *
 * @public
 * @unofficial
 */
export function getWebviewerHistoryViewConstructor(app: App): ExtractConstructor<WebviewerHistoryView> {
    return getViewConstructorByViewType(app, ViewType.WebviewerHistory);
}
