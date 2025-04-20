export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface HoverPopover extends Component {
        /** @unofficial */
        watchResize(): void;
    }
}
