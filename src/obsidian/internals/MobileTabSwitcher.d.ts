import type {
    App,
    Debouncer
} from 'obsidian';

/**
 * Tab switcher component for navigating between open tabs on mobile.
 * @public
 * @unofficial
 */
export interface MobileTabSwitcher {
    /** Reference to the app. */
    app: App;

    /** Directory path for cached tab previews. */
    cacheDir: string;

    /** Close the currently selected tab. */
    close(): void;

    /** Container element for the tab switcher. */
    containerEl: HTMLDivElement;

    /** Hide the tab switcher UI. */
    hide(): void;

    /** Inner scrollable element containing tab previews. */
    innerScrollEl: HTMLDivElement;

    /** Whether the tab switcher is currently visible. */
    isVisible: boolean;

    /** Handle workspace layout changes by updating the tab list. */
    onLayoutChange(): void;

    /** Render the tab switcher content. */
    render(): void;

    /** Debounced function to re-render the tab switcher. */
    requestRender: Debouncer<[], void>;

    /** Scroll container element. */
    scrollEl: HTMLDivElement;

    /**
     * Set up the directory for caching tab preview images.
     *
     * @returns A promise that resolves when the cache directory has been set up.
     */
    setupCacheDir(): Promise<void>;

    /**
     * Show the tab switcher UI.
     *
     * @returns A promise that resolves when the tab switcher is shown.
     */
    show(): Promise<void>;

    /**
     * Display the tab management context menu.
     *
     * @param e - The mouse event.
     */
    showTabManagementMenu(e: MouseEvent): void;

    /** Weak map caching tab preview images by leaf reference. */
    tabPreviewLookup: WeakMap<object, unknown>;
}
