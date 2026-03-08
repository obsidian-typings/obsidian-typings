import type {
    App,
    Debouncer,
    Events
} from 'obsidian';
import type { PropertyInfo } from '../PropertyInfo.d.ts';
import type { PropertyWidget } from '../PropertyWidget.d.ts';
import type { PropertyWidgetType } from '../PropertyWidgetType.d.ts';
import type { MetadataTypeManagerPropertiesRecord } from './MetadataTypeManagerPropertiesRecord.d.ts';
import type {
    MetadataTypeManagerRegisteredTypeWidgetsRecord
} from './MetadataTypeManagerRegisteredTypeWidgetsRecord.d.ts';
import type { MetadataTypeManagerTypesRecord } from './MetadataTypeManagerTypesRecord.d.ts';
import type { TypeInfo } from './TypeInfo.d.ts';

/**
 * Manager for frontmatter property types, handling registration and assignment of property widgets.
 * @public
 * @unofficial
 */
export interface MetadataTypeManager extends Events {
    /**
     * Reference to App.
     */
    app: App;

    /**
     * Associated widget types for each property.
     */
    assignedWidgets: MetadataTypeManagerTypesRecord;

    /**
     * Get all registered properties of the vault.
     *
     * @returns Record of property names to their info.
     */
    getAllProperties(): Record<string, PropertyInfo>;

    /**
     * Get assigned widget type for property.
     *
     * @param property - Property name.
     * @returns The assigned widget type, or `null`.
     */
    getAssignedWidget(property: string): PropertyWidgetType | null;

    /**
     * Get info for property.
     *
     * @param property - Property name.
     * @returns Information about the property.
     */
    getPropertyInfo(property: string): PropertyInfo;

    /**
     * Get expected widget type for property and the one inferred from the property value.
     *
     * @param property - Property name.
     * @param value - Property value.
     * @returns Type information for the property.
     */
    getTypeInfo(property: string, value: unknown): TypeInfo;

    /**
     * Get property widget.
     *
     * @param type - Widget type name.
     * @returns The property widget.
     */
    getWidget(type: string): PropertyWidget;

    /**
     * Unix timestamp of the last save
     */
    lastSave: number;

    /** Load metadata type configuration. */
    load(): Promise<void>;

    /**
     * Load property types from config.
     *
     * @returns A promise that resolves when the property types are loaded.
     */
    loadData(): Promise<void>;

    /** Debounced handler for property type config file changes on disk. */
    onConfigFileChange: Debouncer<[], Promise<void>>;

    /**
     * Handle raw file system change events for the property type config.
     *
     * @param e - The raw file system change event.
     */
    onRaw(e: unknown): void;

    /**
     * Registered properties of the vault.
     */
    properties: MetadataTypeManagerPropertiesRecord;

    /**
     * Registered type widgets.
     */
    registeredTypeWidgets: MetadataTypeManagerRegisteredTypeWidgetsRecord;

    /** Register event listeners for property type config file changes. */
    registerListeners(): void;

    /**
     * Save property types to config.
     *
     * @returns A promise that resolves when the property types are saved.
     */
    save(): Promise<void>;

    /**
     * Set widget type for property.
     *
     * @param property - Property name.
     * @param type - Widget type to assign.
     * @returns A promise that resolves when the widget type is set.
     */
    setType(property: string, type: PropertyWidgetType): Promise<void>;

    /**
     * Unset widget type for property.
     *
     * @param property - Property name.
     * @returns A promise that resolves when the widget type is unset.
     */
    unsetType(property: string): Promise<void>;

    /**
     * Updates `this.properties` to match the MetadataCache
     */
    updatePropertyInfoCache(): void;
}
