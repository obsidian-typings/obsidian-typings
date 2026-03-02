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

    /** Container element for the tab switcher. */
    containerEl: HTMLDivElement;

    /** Inner scrollable element containing tab previews. */
    innerScrollEl: HTMLDivElement;

    /** Whether the tab switcher is currently visible. */
    isVisible: boolean;

    /** Debounced function to re-render the tab switcher. */
    requestRender: Debouncer<[], void>;

    /** Scroll container element. */
    scrollEl: HTMLDivElement;

    /** Weak map caching tab preview images by leaf reference. */
    tabPreviewLookup: WeakMap<object, unknown>;

    /** Close the currently selected tab. */
    close(): void;

    /** Hide the tab switcher UI. */
    hide(): void;

    /** Handle workspace layout changes by updating the tab list. */
    onLayoutChange(): void;

    /** Render the tab switcher content. */
    render(): void;

    /** Set up the directory for caching tab preview images. */
    setupCacheDir(): Promise<void>;

    /** Show the tab switcher UI. */
    show(): Promise<void>;

    /**
     * Display the tab management context menu.
     *
     * @param e - The mouse event.
     */
    showTabManagementMenu(e: MouseEvent): void;
}
