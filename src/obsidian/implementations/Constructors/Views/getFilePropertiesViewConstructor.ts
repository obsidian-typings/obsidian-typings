import type {
    App} from 'obsidian';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { FilePropertiesViewConstructor } from '../../../internals/Constructors/Views/FilePropertiesViewConstructor.ts';

/**
 * Get the FilePropertiesView constructor.
 *
 * @returns The FilePropertiesView constructor.
 * @public
 */
export function getFilePropertiesViewConstructor(app: App): FilePropertiesViewConstructor {
    return getViewConstructorByViewType(app, ViewType.FileProperties) as FilePropertiesViewConstructor;
}
