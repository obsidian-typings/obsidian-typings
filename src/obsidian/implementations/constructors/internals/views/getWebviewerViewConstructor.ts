import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { WebviewerView } from '../../../../internals/internal-plugins/webviewer/WebviewerView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the WebviewerView constructor.
 *
 * @param app - The app.
 * @returns The WebviewerView constructor.
 *
 * @public
 * @unofficial
 */
export function getWebviewerViewConstructor(app: App): ExtractConstructor<WebviewerView> {
  return getViewConstructorByViewType(app, ViewType.Webviewer);
}
