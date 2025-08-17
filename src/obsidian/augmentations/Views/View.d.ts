import type { ViewEphemeralState } from '../../internals/ViewEphemeralState.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Base class for all views.
     */
    interface View extends Component {
        /**
         * The Obsidian app instance.
         *
         * @official
         */
        app: App;

        /**
         * Whether the leaf may close the view.
         *
         * @unofficial
         */
        closeable: boolean;

        /**
         * The container HTML element for the component.
         *
         * @official
         */
        containerEl: HTMLElement;

        /**
         * The icon of the view.
         *
         * @official
         */
        icon: IconName;

        /**
         * The leaf of the view.
         *
         * @official
         */
        leaf: WorkspaceLeaf;

        /**
         * Whether or not the view is intended for navigation.
         * If your view is a static view that is not intended to be navigated away, set this to false.
         * (For example: File explorer, calendar, etc.)
         * If your view opens a file or can be otherwise navigated, set this to true.
         * (For example: Markdown editor view, Kanban view, PDF view, etc.)
         *
         * @official
         */
        navigation: boolean;

        /**
         * Assign an optional scope to your view to register hotkeys for when the view.
         * is in focus.
         *
         * @example
         * ```ts
         * this.scope = new Scope(this.app.scope);
         * ```
         * @default `null`
         * @official
         */
        scope: Scope | null;

        /**
         * Closes the view.
         *
         * @unofficial
         */
        close(): Promise<void>;

        /**
         * Creates a new view.
         *
         * @param leaf - The leaf of the view.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(leaf: WorkspaceLeaf): this;

        /**
         * Get the display text of the view.
         *
         * @returns The display text of the view.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getDisplayText} instead.
         */
        getDisplayText__?(): string;

        /**
         * Get the ephemeral state of the view.
         *
         * @returns The ephemeral state of the view.
         * @official
         */
        getEphemeralState(): Record<string, unknown>;

        /**
         * Get the icon of the view.
         *
         * @returns The icon of the view.
         * @official
         */
        getIcon(): IconName;

        /**
         * Returns the placement of the tooltip.
         *
         * @unofficial
         */
        getSideTooltipPlacement(): 'left' | 'right' | undefined;

        /**
         * Get the state of the view.
         *
         * @returns The state of the view.
         * @official
         */
        getState(): Record<string, unknown>;

        /**
         * The type of the view.
         *
         * @returns The type of the view.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link getViewType} instead.
         */
        getViewType__?(): string;

        /**
         * Handle copy event on metadata editor and serialize properties.
         *
         * @unofficial
         */
        handleCopy(event: ClipboardEvent): void;

        /**
         * Handle cut event on metadata editor and serialize and remove properties.
         *
         * @unofficial
         */
        handleCut(event: ClipboardEvent): void;

        /**
         * Handle paste event of properties on metadata editor.
         *
         * @unofficial
         */
        handlePaste(event: ClipboardEvent): void;

        /**
         * Called when the view is closed.
         *
         * @returns A promise that resolves when the view is closed.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link onClose} instead.
         */
        onClose__?(): Promise<void>;

        /**
         * @deprecated use {@link onPaneMenu} instead
         * @unofficial
         */
        onHeaderMenu(e: unknown): void;

        /**
         * Called when the view is opened.
         *
         * @returns A promise that resolves when the view is opened.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link onOpen} instead.
         */
        onOpen__?(): Promise<void>;

        /**
         * Populates the pane menu.
         *
         * (Replaces the previously removed `onHeaderMenu` and `onMoreOptionsMenu`)
         *
         * @param menu - The menu to populate.
         * @param source - The source of the menu.
         * @official
         */
        onPaneMenu(menu: Menu, source: 'more-options' | 'tab-header' | string): void;

        /**
         * Called when the size of this view is changed.
         *
         * @official
         */
        onResize(): void;

        /**
         * Adds the menu items to the menu.
         *
         * @param menu the menu to fill.
         * @unofficial
         */
        onTabMenu(menu: Menu): void;

        /**
         * Opens the view.
         *
         * @param parentEl The node the view get attached to.
         * @unofficial
         */
        open(parentEl: Node): Promise<void>;

        /**
         * Set the ephemeral state of the view.
         *
         * @param state - The ephemeral state of the view.
         * @example
         * ```ts
         * this.setEphemeralState({ foo: 'bar' });
         * ```
         * @official
         */
        setEphemeralState(state: unknown): void;

        /**
         * Set the state of the view.
         *
         * @param state - The state of the view.
         * @param result - The result of the view.
         * @returns A promise that resolves when the state is set.
         * @example
         * ```ts
         * this.setState({ foo: 'bar' }, { history: true });
         * ```
         * @official
         */
        setState(state: unknown, result: ViewStateResult): Promise<void>;
    }
}
