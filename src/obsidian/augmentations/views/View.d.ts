import type { ViewEphemeralState } from '../../internals/ViewEphemeralState.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Base class for all views.
   * @since 0.9.7
   */
  interface View extends Component {
    /**
     * The Obsidian app instance.
     *
     * @official
     * @since 0.9.7
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
     * @since 0.9.7
     */
    containerEl: HTMLElement;

    /**
     * The icon of the view.
     *
     * @official
     * @since 1.1.0
     */
    icon: IconName;

    /**
     * The leaf of the view.
     *
     * @official
     * @since 0.9.7
     */
    leaf: WorkspaceLeaf;

    /**
     * Whether or not the view is intended for navigation.
     * If your view is a static view that is not intended to be navigated away, set this to `false`.
     * (For example: File explorer, calendar, etc.)
     * If your view opens a file or can be otherwise navigated, set this to `true`.
     * (For example: Markdown editor view, Kanban view, PDF view, etc.)
     *
     * @official
     * @since 0.15.1
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
     * @since 1.5.7
     */
    scope: null | Scope;

    /**
     * Closes the view.
     *
     * @returns A promise that resolves when the view is closed.
     * @unofficial
     */
    close(): Promise<void>;

    /**
     * Constructor.
     *
     * To extract the constructor type, use `ExtractConstructor<View>`.
     *
     * @param leaf - The leaf of the view.
     * @returns The view instance.
     * @official
     * @since 0.9.7
     * @deprecated - Added only for typing purposes.
     */
    constructor2__(leaf: WorkspaceLeaf): this;

    /**
     * Get the display text of the view.
     *
     * @returns The display text of the view.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link getDisplayText} instead.
     * @since 0.9.7
     */
    getDisplayText__?(): string;

    /**
     * Get the ephemeral state of the view.
     *
     * @returns The ephemeral state of the view.
     * @official
     * @since 0.9.7
     */
    getEphemeralState(): Record<string, unknown>;

    /**
     * Get the icon of the view.
     *
     * @returns The icon of the view.
     * @official
     * @since 1.1.0
     */
    getIcon(): IconName;

    /**
     * Returns the placement of the tooltip.
     *
     * @returns The tooltip placement direction.
     * @unofficial
     */
    getSideTooltipPlacement(): 'left' | 'right' | undefined;

    /**
     * Get the state of the view.
     *
     * @returns The state of the view.
     * @official
     * @since 0.9.7
     */
    getState(): Record<string, unknown>;

    /**
     * The type of the view.
     *
     * @returns The type of the view.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link getViewType} instead.
     * @since 0.9.7
     */
    getViewType__?(): string;

    /**
     * Handle copy event on metadata editor and serialize properties.
     *
     * @param event - The clipboard event.
     * @unofficial
     */
    handleCopy(event: ClipboardEvent): void;

    /**
     * Handle cut event on metadata editor and serialize and remove properties.
     *
     * @param event - The clipboard event.
     * @unofficial
     */
    handleCut(event: ClipboardEvent): void;

    /**
     * Handle paste event of properties on metadata editor.
     *
     * @param event - The clipboard event.
     * @unofficial
     */
    handlePaste(event: ClipboardEvent): void;

    /**
     * Called when the view is closed.
     *
     * @returns A promise that resolves when the view is closed.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link onClose} instead.
     * @since 0.9.7
     */
    onClose__?(): Promise<void>;

    /**
     * Called when the header context menu is triggered.
     *
     * @param e - The menu event.
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
     * @since 0.9.7
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
     * @since 0.15.3
     */
    onPaneMenu(menu: Menu, source: 'more-options' | 'tab-header' | string): void;

    /**
     * Called when the size of this view is changed.
     *
     * @official
     * @since 0.9.7
     */
    onResize(): void;

    /**
     * Adds the menu items to the menu.
     *
     * @param menu - The menu to fill.
     * @unofficial
     */
    onTabMenu(menu: Menu): void;

    /**
     * Opens the view.
     *
     * @param parentEl - The node the view gets attached to.
     * @returns A promise that resolves when the view is opened.
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
     * @since 0.9.7
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
     * @since 0.9.7
     */
    setState(state: unknown, result: ViewStateResult): Promise<void>;
  }
}
