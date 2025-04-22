import type { WindowSelection } from '../internals/WindowSelection.d.ts';

export {};

declare module 'obsidian' {
    /**
     * Modal dialog component.
     */
    interface Modal extends CloseableComponent {
        /**
         * The Obsidian app instance.
         *
         * @official
         */
        app: App;

        /**
         * Background applied to application to dim it
         *
         * @unofficial
         */
        bgEl: HTMLElement;

        /**
         * Opacity percentage of the background
         *
         * @unofficial
         */
        bgOpacity: string;

        /**
         * The container HTML element for the modal.
         *
         * @official
         */
        containerEl: HTMLElement;

        /**
         * The HTML element that represents the content of the modal.
         *
         * @official
         */
        contentEl: HTMLElement;

        /**
         * Whether the background is being dimmed
         *
         * @unofficial
         */
        dimBackground: boolean;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        headerEl: HTMLDivElement;

        /**
         * The HTML element that represents the modal.
         *
         * @official
         */
        modalEl: HTMLElement;

        /**
         * The scope for the keymaps.
         *
         * @official
         */
        scope: Scope;

        /**
         * Selection logic handler
         *
         * @unofficial
         */
        selection: WindowSelection | null;

        /**
         * Whether the modal should animate
         *
         * @unofficial
         */
        shouldAnimate: boolean;

        /**
         * Whether the modal should restore the selection when it is opened or closed.
         *
         * @official
         */
        shouldRestoreSelection: boolean;

        /**
         * The HTML element that represents the title of the modal.
         *
         * @official
         */
        titleEl: HTMLElement;

        /**
         * Reference to the global Window object.
         *
         * @unofficial
         */
        win: Window | null;

        /**
         * Performed when animation is complete
         *
         * @unofficial
         */
        animateClose(): Promise<void>;

        /**
         * Performed when animation is started
         *
         * @unofficial
         */
        animateOpen(): Promise<void>;

        /**
         * Close the modal.
         *
         * @official
         */
        close(): void;

        /**
         * Create a new modal.
         *
         * @param app - The Obsidian app instance.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(app: App): this;

        /**
         * Called when the modal is closed.
         *
         * @example
         * ```ts
         * class MyModal extends Modal {
         *     public override onClose(): void {
         *         console.log('MyModal closed');
         *     }
         * }
         * ```
         * @official
         */
        onClose(): void;

        /**
         * On escape key press close modal
         *
         * @unofficial
         */
        onEscapeKey(): void;

        /**
         * Called when the modal is opened.
         *
         * @example
         * ```ts
         * class MyModal extends Modal {
         *     public override onOpen(): void {
         *         console.log('MyModal opened');
         *     }
         * }
         * ```
         * @official
         */
        onOpen(): void;

        /**
         * On closing of the modal
         *
         * @unofficial
         */
        onWindowClose(): void;

        /**
         * Show the modal on the the active window. On mobile, the modal will animate on screen.
         *
         * @official
         */
        open(): void;

        /**
         * Set the background opacity of the dimmed background.
         *
         * @param opacity Opacity percentage.
         * @unofficial
         */
        setBackgroundOpacity(opacity: string): this;

        /**
         * Set the content of the modal.
         *
         * @param content - The content of the modal.
         * @returns The modal instance.
         * @example
         * ```ts
         * modal.setContent('foo');
         *
         * const fragment = createFragment();
         * fragment.createEl('strong', { text: 'foo' });
         * modal.setContent(fragment);
         * ```
         * @official
         */
        setContent(content: string | DocumentFragment): this;

        /**
         * Set whether the background should be dimmed.
         *
         * @param dim Whether the background should be dimmed.
         * @unofficial
         */
        setDimBackground(dim: boolean): this;

        /**
         * Set the title of the modal.
         *
         * @param title - The title of the modal.
         * @returns The modal instance.
         * @example
         * ```ts
         * modal.setTitle('foo');
         * ```
         * @official
         */
        setTitle(title: string): this;
    }
}
