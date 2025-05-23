import type {
    EventRef,
    Events,
    ViewCreator
} from 'obsidian';
import type { TypedViewCreator } from '../Views/TypedViewCreator.d.ts';
import type { ViewTypeType } from '../Views/ViewTypeType.d.ts';
import type { ViewTypeViewMapping } from '../Views/ViewTypeViewMapping.d.ts';
import type { ViewRegistryTypeByExtensionRecord } from './ViewRegistryTypeByExtensionRecord.d.ts';
import type { ViewRegistryViewByTypeRecord } from './ViewRegistryViewByTypeRecord.d.ts';

/**
 * @todo Documentation incomplete.
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
     * Get the view type associated with a file extension.
     *
     * @param extension - File extension.
     */
    getTypeByExtension(extension: string): string | undefined;

    /** @todo Documentation incomplete. */
    getViewCreatorByType(type: string): ViewCreator | undefined;

    /**
     * Get the view constructor associated with a view type.
     */
    getViewCreatorByType<TViewType extends ViewTypeType>(
        type: TViewType
    ): TypedViewCreator<ViewTypeViewMapping[TViewType]> | undefined;

    /**
     * Check whether a view type is registered.
     */
    isExtensionRegistered(extension: string): boolean;

    /**
     * Called when the file extensions mapping has been updated.
     */
    on(name: 'extensions-updated', callback: () => void): EventRef;

    /**
     * Called when a view of type has been registered into the registry.
     */
    on(name: 'view-registered', callback: (type: string) => void): EventRef;

    /**
     * Called when a view of type has been unregistered from the registry.
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
     */
    registerView(type: string, viewCreator: ViewCreator): void;

    /**
     * Register a view and its associated file extensions.
     */
    registerViewWithExtensions(extensions: string[], type: string, viewCreator: ViewCreator): void;

    /**
     * Unregister extensions for a view type.
     */
    unregisterExtensions(extension: string[]): void;

    /**
     * Unregister a view type.
     */
    unregisterView(type: string): void;
}
