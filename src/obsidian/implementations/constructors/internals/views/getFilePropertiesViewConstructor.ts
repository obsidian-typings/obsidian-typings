import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { FilePropertiesView } from '../../../../internals/internal-plugins/properties/FilePropertiesView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the {@link FilePropertiesView} constructor.
 *
 * @param app - The app.
 * @returns The {@link FilePropertiesView} constructor.
 *
 * @public
 * @unofficial
 */
export function getFilePropertiesViewConstructor(app: App): ExtractConstructor<FilePropertiesView> {
  return getViewConstructorByViewType(app, ViewType.FileProperties);
}
