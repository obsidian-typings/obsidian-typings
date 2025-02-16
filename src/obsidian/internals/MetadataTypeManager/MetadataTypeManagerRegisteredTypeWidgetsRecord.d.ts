import type { PropertyWidget } from '../PropertyWidget.d.ts';
import type { PropertyWidgetType } from '../PropertyWidgetType.d.ts';

/** @public */
export interface MetadataTypeManagerRegisteredTypeWidgetsRecord
    extends Record<PropertyWidgetType, PropertyWidget<unknown>>
{}
