import type { TypedViewConstructor } from '../../views/TypedViewConstructor.d.ts';
import type { FilePropertiesView } from './FilePropertiesView.d.ts';
import type { PropertiesPluginInstance } from './PropertiesPluginInstance.d.ts';

/**
 * Constructor interface for creating FilePropertiesView instances.
 * @public
 * @unofficial
 */
export interface FilePropertiesViewConstructor
    extends TypedViewConstructor<FilePropertiesView, [propertiesPluginInstance: PropertiesPluginInstance]>
{}
