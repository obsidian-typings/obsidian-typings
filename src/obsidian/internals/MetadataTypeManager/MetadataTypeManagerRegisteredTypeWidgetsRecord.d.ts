import { PropertyWidget } from "../PropertyWidget.js";
import { PropertyWidgetType } from "../PropertyWidgetType.js";

export interface MetadataTypeManagerRegisteredTypeWidgetsRecord
    extends Record<PropertyWidgetType, PropertyWidget<unknown>>
{}
