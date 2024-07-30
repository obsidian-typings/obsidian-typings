import type {
    PropertyInfo,
    PropertyWidget,
    PropertyWidgetType
} from "../types.js";
import type {
    App,
    Events
} from "obsidian";
export interface MetadataTypeManager extends Events {
    /**
     * Reference to App
     */
    app: App;
    /**
     * Registered properties of the vault
     */
    properties: MetadataTypeManagerPropertiesRecord;
    /** @internal Registered type widgets */
    registeredTypeWidgets: MetadataTypeManagerRegisteredTypeWidgetsRecord;
    /**
     * Associated widget types for each property
     */
    types: MetadataTypeManagerTypesRecord;

    /**
     * Get all registered properties of the vault
     */
    getAllProperties(): Record<string, PropertyInfo>;
    /**
     * Get assigned widget type for property
     */
    getAssignedType(property: string): PropertyWidgetType | null;
    /**
     * Get info for property
     */
    getPropertyInfo(property: string): PropertyInfo;
    /** @internal Get expected widget type for property and the one inferred from the property value */
    getTypeInfo(arg: { key: string; type: string; value: unknown }): {
        inferred: PropertyWidget<unknown>;
        expected: PropertyWidget<unknown>;
    };
    /**
     * Get all properties with an assigned widget type
     */
    getTypes(): string[];
    /** @internal Load property types from config */
    loadData(): Promise<void>;
    /** @internal */
    onRaw(e: unknown): void;
    /** @internal */
    registerListeners(): void;
    /** @internal Save property types to config */
    save(): Promise<void>;
    /** @internal Get all properties from metadata cache */
    savePropertyInfo(): void;
    /** @internal Set widget type for property */
    setType(property: string, type: PropertyWidgetType): Promise<void>;
    /** @internal Unset widget type for property */
    unsetType(property: string): Promise<void>;
}

export interface MetadataTypeManagerPropertiesRecord extends Record<string, PropertyInfo> {}
export interface MetadataTypeManagerRegisteredTypeWidgetsRecord extends Record<PropertyWidgetType, PropertyWidget<unknown>> {}
export interface MetadataTypeManagerTypesRecord extends Record<string, PropertyWidgetType> {}
