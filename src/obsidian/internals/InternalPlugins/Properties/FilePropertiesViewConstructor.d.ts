import type { TypedViewConstructor } from '../../Views/TypedViewConstructor.d.ts';
import type { FilePropertiesView } from './FilePropertiesView.d.ts';
import type { PropertiesPluginInstance } from './PropertiesPluginInstance.d.ts';

/** @public */
export interface FilePropertiesViewConstructor
    extends TypedViewConstructor<FilePropertiesView, [propertiesPluginInstance: PropertiesPluginInstance]>
{}
