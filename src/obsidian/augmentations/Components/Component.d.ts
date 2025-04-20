export {};

declare module 'obsidian' {
    /** @todo Documentation incomplete */
    interface Component {
        /**
         * Child Components attached to current component, will be unloaded on unloading parent component.
         *
         * @unofficial
         */
        _children: Component[];
        /**
         * Events that are attached to the current component, will be detached on unloading parent component.
         *
         * @unofficial
         */
        _events: EventRef[];
        /**
         * Whether the component and its children are loaded.
         *
         * @unofficial
         */
        _loaded: boolean;

        /**
         * @unofficial
         */
        registerScopeEvent(keymapEventHandler: KeymapEventHandler): void;
    }
}
