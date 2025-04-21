import type {
    App,
    Debouncer
} from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface MobileTabSwitcher {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    cacheDir: string;

    /** @todo Documentation incomplete. */
    containerEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    innerScrollEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    isVisible: boolean;

    /** @todo Documentation incomplete. */
    requestRender: Debouncer<[], void>;

    /** @todo Documentation incomplete. */
    scrollEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    tabPreviewLookup: WeakMap<object, unknown>;

    /** @todo Documentation incomplete. */
    close(): void;

    /** @todo Documentation incomplete. */
    hide(): void;

    /** @todo Documentation incomplete. */
    onLayoutChange(): void;

    /** @todo Documentation incomplete. */
    render(): void;

    /** @todo Documentation incomplete. */
    setupCacheDir(): Promise<void>;

    /** @todo Documentation incomplete. */
    show(): Promise<void>;

    /** @todo Documentation incomplete. */
    showTabManagementMenu(e: MouseEvent): void;
}
