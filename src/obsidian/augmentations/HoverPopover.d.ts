export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface HoverPopover extends Component {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        watchResize(): void;
    }
}
