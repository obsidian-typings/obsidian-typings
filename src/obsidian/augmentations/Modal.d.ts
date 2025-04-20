import type { WindowSelection } from '../internals/WindowSelection.d.ts';

export {};

declare module 'obsidian' {
    interface Modal extends CloseableComponent {
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
         * Modal container element
         *
         * @unofficial
         */
        modalEl: HTMLElement;

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
         * On escape key press close modal
         *
         * @unofficial
         */
        onEscapeKey(): void;

        /**
         * On closing of the modal
         *
         * @unofficial
         */
        onWindowClose(): void;

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
         * @param content Content to set.
         * @unofficial
         */
        setContent(content: DocumentFragment | string): this;

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
         * @param title Title to set.
         * @unofficial
         */
        setTitle(title: string): this;
    }
}
