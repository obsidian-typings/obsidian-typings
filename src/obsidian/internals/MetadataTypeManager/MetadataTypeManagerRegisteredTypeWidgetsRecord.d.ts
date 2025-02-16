import { PropertyWidget } from '../PropertyWidget.d.ts';
import { PropertyWidgetType } from '../PropertyWidgetType.d.ts';

/** @public */
export interface MetadataTypeManagerRegisteredTypeWidgetsRecord
    extends Record<PropertyWidgetType, PropertyWidget<unknown>>
{}
