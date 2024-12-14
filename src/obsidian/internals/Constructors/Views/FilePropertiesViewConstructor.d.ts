import type { WorkspaceLeaf } from 'obsidian';
import type { FilePropertiesView } from '../../InternalPlugins/Properties/FilePropertiesView.js';
import type { PropertiesPluginInstance } from '../../InternalPlugins/Properties/PropertiesPluginInstance.js';

/**
 * A constructor for a file properties view.
 *
 * @public
 */
export type FilePropertiesViewConstructor = new(
    leaf: WorkspaceLeaf,
    propertiesPluginInstance: PropertiesPluginInstance
) => FilePropertiesView;
