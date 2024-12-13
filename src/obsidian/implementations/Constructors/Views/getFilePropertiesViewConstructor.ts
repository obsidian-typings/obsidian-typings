import type {
    App,
    WorkspaceLeaf
} from 'obsidian';
import type { FilePropertiesView } from '../../../internals/InternalPlugins/Properties/FilePropertiesView.js';
import type {
    PropertiesPluginInstance
} from '../../../internals/InternalPlugins/Properties/PropertiesPluginInstance.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the FilePropertiesView constructor.
 *
 * @returns The FilePropertiesView constructor.
 */
export function getFilePropertiesViewConstructor(app: App): FilePropertiesViewConstructor {
    return getViewConstructorByViewType(app, ViewType.FileProperties) as FilePropertiesViewConstructor;
}

type FilePropertiesViewConstructor = new(
    leaf: WorkspaceLeaf,
    propertiesPluginInstance: PropertiesPluginInstance
) => FilePropertiesView;
