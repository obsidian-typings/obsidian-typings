import type { KeyScope } from '../internals/KeyScope.d.ts';

export {};

declare module 'obsidian' {
    interface Scope {
        /**
         * Callback to execute when scope is matched
         *
         * @unofficial
         */
        cb: (() => boolean) | undefined;

        /**
         * Overridden keys that exist in this scope.
         *
         * @unofficial
         */
        keys: KeyScope[];

        /**
         * Scope that this scope is a child of
         *
         * @unofficial
         */
        parent: Scope | undefined;

        /** @unofficial */
        tabFocusContainerEl: HTMLElement | null;

        /**
         * Execute keypress within this scope.
         *
         * @param event - Keyboard event.
         * @param keypress - Pressed key information.
         * @unofficial
         */
        handleKey(event: KeyboardEvent, keypress: KeymapInfo): unknown;

        /**
         * @deprecated - Executes same functionality as `Scope.register`.
         * @unofficial
         */
        registerKey(modifiers: Modifier[], key: string | null, func: KeymapEventListener): KeymapEventHandler;

        /** @unofficial */
        setTabFocusContainer(container: HTMLElement): void;
    }
}
