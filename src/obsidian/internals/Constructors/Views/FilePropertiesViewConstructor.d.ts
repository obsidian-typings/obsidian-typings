import type { WorkspaceLeaf } from 'obsidian';
import type { FilePropertiesView } from '../../InternalPlugins/Properties/FilePropertiesView.d.ts';
import type { PropertiesPluginInstance } from '../../InternalPlugins/Properties/PropertiesPluginInstance.d.ts';

/**
 * A constructor for a file properties view.
 *
 * @public
 */
export type FilePropertiesViewConstructor = new(
    leaf: WorkspaceLeaf,
    propertiesPluginInstance: PropertiesPluginInstance
) => FilePropertiesView;
