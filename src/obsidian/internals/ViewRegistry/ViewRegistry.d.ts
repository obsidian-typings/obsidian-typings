import type {
    EventRef,
    Events,
    View,
    WorkspaceLeaf
} from "obsidian";
import type { ViewRegistryTypeByExtensionRecord } from "./ViewRegistryTypeByExtensionRecord.js";
import type { ViewRegistryViewByTypeRecord } from "./ViewRegistryViewByTypeRecord.js";

/** @public */
export interface ViewRegistry extends Events {
    /**
     * Mapping of file extensions to view type
     */
    typeByExtension: ViewRegistryTypeByExtensionRecord;
    /**
     * Mapping of view type to view constructor
     */
    viewByType: ViewRegistryViewByTypeRecord;

    /**
     * Get the view type associated with a file extension
     *
     * @param extension - File extension
     */
    getTypeByExtension(extension: string): string;
    /**
     * Get the view constructor associated with a view type
     */
    getViewCreatorByType(type: string): (leaf: WorkspaceLeaf) => View;
    /**
     * Check whether a view type is registered
     */
    isExtensionRegistered(extension: string): boolean;
    /**
     * Called when a view of type has been registered into the registry
     */
    on(name: "view-registered", callback: (type: string) => void): EventRef;
    /**
     * Called when a view of type has been unregistered from the registry
     */
    on(name: "view-unregistered", callback: (type: string) => void): EventRef;
    /**
     * Called when the file extensions mapping has been updated
     */
    on(name: "extensions-updated", callback: () => void): EventRef;
    /**
     * Register a view type for a file extension
     *
     * @param extension - File extension
     * @param type - View type
     * @remark Prefer registering the extension via the Plugin class
     */
    registerExtensions(extension: string[], type: string): void;
    /**
     * Register a view constructor for a view type
     */
    registerView(type: string, viewCreator: (leaf: WorkspaceLeaf) => View): void;
    /**
     * Register a view and its associated file extensions
     */
    registerViewWithExtensions(
        extensions: string[],
        type: string,
        viewCreator: (leaf: WorkspaceLeaf) => View
    ): void;
    /**
     * Unregister extensions for a view type
     */
    unregisterExtensions(extension: string[]): void;
    /**
     * Unregister a view type
     */
    unregisterView(type: string): void;
}
