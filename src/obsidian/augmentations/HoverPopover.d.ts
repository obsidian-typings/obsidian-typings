export {};

declare module 'obsidian' {
    /**
     * A hover popover.
     * @since 0.15.0
     */
    interface HoverPopover extends Component {
        /**
         * The HTML element representation of the hover popover.
         *
         * @official
         */
        hoverEl: HTMLElement;

        /**
         * The state of the hover popover.
         *
         * @official
         */
        state: PopoverState;

        /**
         * Create a new hover popover.
         *
         * @param parent - The parent of the hover popover.
         * @param targetEl - The target element of the hover popover.
         * @param waitTime - The wait time of the hover popover.
         * @param staticPos - The static position of the hover popover.
         * @official
         */
        constructor__(
            parent: HoverParent,
            targetEl: HTMLElement | null,
            waitTime?: number,
            staticPos?: Point | null
        ): this;

        /**
         * Start observing the popover element for size changes.
         * @unofficial
         */
        watchResize(): void;
    }
}
