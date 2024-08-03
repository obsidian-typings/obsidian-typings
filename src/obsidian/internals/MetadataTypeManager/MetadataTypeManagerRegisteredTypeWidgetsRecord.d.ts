import type {
    PropertyWidget,
    PropertyWidgetType
} from "../index.js";

export interface MetadataTypeManagerRegisteredTypeWidgetsRecord
    extends Record<PropertyWidgetType, PropertyWidget<unknown>>
{}
