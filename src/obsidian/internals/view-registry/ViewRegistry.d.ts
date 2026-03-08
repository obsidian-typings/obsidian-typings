import type {
    EventRef,
    Events,
    ViewCreator
} from 'obsidian';
import type { TypedViewCreator } from '../views/TypedViewCreator.d.ts';
import type { ViewTypeType } from '../views/ViewTypeType.d.ts';
import type { ViewTypeViewMapping } from '../views/ViewTypeViewMapping.d.ts';
import type { ViewRegistryTypeByExtensionRecord } from './ViewRegistryTypeByExtensionRecord.d.ts';
import type { ViewRegistryViewByTypeRecord } from './ViewRegistryViewByTypeRecord.d.ts';

/**
 * Registry that maps view types to their constructors and file extensions to view types.
 * @public
 * @unofficial
 */
export interface ViewRegistry extends Events {
    /**
     * Mapping of file extensions to view type.
     */
    typeByExtension: ViewRegistryTypeByExtensionRecord;

    /**
     * Mapping of view type to view constructor.
     */
    viewByType: ViewRegistryViewByTypeRecord;

    /**
     * Constructor.
     *
     * @deprecated - Added only for typing purposes. Use `ExtractConstructor<ViewRegistry>` or `getViewRegistryConstructor()` instead.
     */
    constructor__(): this;

    /**
     * Get the view type associated with a file extension.
     *
     * @param extension - File extension.
     * @returns The view type string, or `undefined` if not registered.
     */
    getTypeByExtension(extension: string): string | undefined;

    /**
     * Get the view creator function associated with a view type.
     *
     * @param type - The view type identifier.
     * @returns The view creator function, or `undefined` if not registered.
     */
    getViewCreatorByType(type: string): ViewCreator | undefined;

    /**
     * Get the view constructor associated with a view type.
     *
     * @param type - The view type identifier.
     * @returns The typed view creator function, or `undefined` if not registered.
     */
    getViewCreatorByType<TViewType extends ViewTypeType>(
        type: TViewType
    ): TypedViewCreator<ViewTypeViewMapping[TViewType]> | undefined;

    /**
     * Check whether a view type is registered.
     *
     * @param extension - The file extension to check.
     * @returns Whether the extension is registered.
     */
    isExtensionRegistered(extension: string): boolean;

    /**
     * Called when the file extensions mapping has been updated.
     *
     * @param name - The event name.
     * @param callback - The callback to invoke.
     * @returns The event reference.
     */
    on(name: 'extensions-updated', callback: () => void): EventRef;

    /**
     * Called when a view of type has been registered into the registry.
     *
     * @param name - The event name.
     * @param callback - The callback to invoke with the registered view type.
     * @returns The event reference.
     */
    on(name: 'view-registered', callback: (type: string) => void): EventRef;

    /**
     * Called when a view of type has been unregistered from the registry.
     *
     * @param name - The event name.
     * @param callback - The callback to invoke with the unregistered view type.
     * @returns The event reference.
     */
    on(name: 'view-unregistered', callback: (type: string) => void): EventRef;

    /**
     * Register a view type for a file extension.
     *
     * @param extension - File extension.
     * @param type - View type.
     * @remark Prefer registering the extension via the Plugin class.
     */
    registerExtensions(extension: string[], type: string): void;

    /**
     * Register a view constructor for a view type.
     *
     * @param type - The view type identifier.
     * @param viewCreator - The view creator function.
     */
    registerView(type: string, viewCreator: ViewCreator): void;

    /**
     * Register a view and its associated file extensions.
     *
     * @param extensions - The file extensions to register.
     * @param type - The view type identifier.
     * @param viewCreator - The view creator function.
     */
    registerViewWithExtensions(extensions: string[], type: string, viewCreator: ViewCreator): void;

    /**
     * Unregister extensions for a view type.
     *
     * @param extension - The file extensions to unregister.
     */
    unregisterExtensions(extension: string[]): void;

    /**
     * Unregister a view type.
     *
     * @param type - The view type identifier to unregister.
     */
    unregisterView(type: string): void;
}
