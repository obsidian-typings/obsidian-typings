import type { App, Debouncer, Events } from 'obsidian';
import type { PropertyInfo } from '../PropertyInfo.d.ts';
import type { PropertyWidget } from '../PropertyWidget.d.ts';
import type { PropertyWidgetType } from '../PropertyWidgetType.d.ts';
import type { GetTypeInfoOptions } from './GetTypeInfoOptions.d.ts';
import type { MetadataTypeManagerPropertiesRecord } from './MetadataTypeManagerPropertiesRecord.d.ts';
import type { MetadataTypeManagerRegisteredTypeWidgetsRecord } from './MetadataTypeManagerRegisteredTypeWidgetsRecord.d.ts';
import type { MetadataTypeManagerTypesRecord } from './MetadataTypeManagerTypesRecord.d.ts';
import type { TypeInfo } from './TypeInfo.d.ts';

/**
 * @todo Documentation incomplete.
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
     * Unix timestamp of the last save
     */
    lastSave: number;

    /** @todo Documentation incomplete. */
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
     * Get all registered properties of the vault.
     */
    getAllProperties(): Record<string, PropertyInfo>;

    /**
     * Get assigned widget type for property.
     */
    getAssignedWidget(property: string): PropertyWidgetType | null;

    /**
     * Get info for property.
     */
    getPropertyInfo(property: string): PropertyInfo;

    /**
     * Get expected widget type for property and the one inferred from the property value.
     */
    getTypeInfo(property: string, value: unknown): TypeInfo;

    /**
     * Get property widget.
     */
    getWidget(type: string): PropertyWidget<unknown>;

    /**
     * Load property types from config.
     */
    loadData(): Promise<void>;

    /** @todo Documentation incomplete. */
    onRaw(e: unknown): void;

    /** @todo Documentation incomplete. */
    registerListeners(): void;

    /**
     * Save property types to config.
     */
    save(): Promise<void>;

    /**
     * Set widget type for property.
     */
    setType(property: string, type: PropertyWidgetType): Promise<void>;

    /**
     * Unset widget type for property.
     */
    unsetType(property: string): Promise<void>;

    /**
     * Updates `this.properties` to match the MetadataCache
     */
    updatePropertyInfoCache(): void;
}
