import type {
    App,
    Debouncer,
    Events
} from 'obsidian';
import type { PropertyInfo } from '../PropertyInfo.d.ts';
import type { PropertyWidgetType } from '../PropertyWidgetType.d.ts';
import type { GetTypeInfoOptions } from './GetTypeInfoOptions.d.ts';
import type { MetadataTypeManagerPropertiesRecord } from './MetadataTypeManagerPropertiesRecord.d.ts';
import type {
    MetadataTypeManagerRegisteredTypeWidgetsRecord
} from './MetadataTypeManagerRegisteredTypeWidgetsRecord.d.ts';
import type { MetadataTypeManagerTypesRecord } from './MetadataTypeManagerTypesRecord.d.ts';
import type { TypeInfo } from './TypeInfo.d.ts';

/**
 * @public
 * @unofficial
 */
export interface MetadataTypeManager extends Events {
    /**
     * Reference to App.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    onConfigFileChange: Debouncer<[], Promise<void>>;

    /**
     * Registered properties of the vault.
     */
    properties: MetadataTypeManagerPropertiesRecord;

    /**
     * Registered type widgets.
     */
    registeredTypeWidgets: MetadataTypeManagerRegisteredTypeWidgetsRecord;

    /**
     * Associated widget types for each property.
     */
    types: MetadataTypeManagerTypesRecord;

    /**
     * Get all registered properties of the vault.
     */
    getAllProperties(): Record<string, PropertyInfo>;

    /**
     * Get assigned widget type for property.
     */
    getAssignedType(property: string): PropertyWidgetType | null;

    /**
     * Get info for property.
     */
    getPropertyInfo(property: string): PropertyInfo;

    /**
     * Get expected widget type for property and the one inferred from the property value.
     */
    getTypeInfo(options: GetTypeInfoOptions): TypeInfo;

    /**
     * Get all properties with an assigned widget type.
     */
    getTypes(): string[];

    /**
     * Load property types from config.
     */
    loadData(): Promise<void>;

    /**
     * @todo Documentation incomplete.
     */
    onRaw(e: unknown): void;

    /**
     * @todo Documentation incomplete.
     */
    registerListeners(): void;

    /**
     * Save property types to config.
     */
    save(): Promise<void>;

    /**
     * Get all properties from metadata cache.
     */
    savePropertyInfo(): void;

    /**
     * Set widget type for property.
     */
    setType(property: string, type: PropertyWidgetType): Promise<void>;

    /**
     * Unset widget type for property.
     */
    unsetType(property: string): Promise<void>;
}
