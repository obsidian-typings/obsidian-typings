export {};

declare module 'obsidian' {
    /**
     * A component that can be loaded and unloaded.
     */
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
         * Adds a child component, loading it if this component is loaded.
         *
         * @typeParam T - The type of the component to add.
         * @param component - The component to add.
         * @returns The added component.
         * @example
         * ```ts
         * component.addChild(childComponent);
         * ```
         * @official
         * @since 0.12.0
         */
        addChild<T extends Component>(component: T): T;

        /**
         * Load this component and its children.
         *
         * @official
         * @since 0.9.7
         */
        load(): void;

        /**
         * Override this to load your component.
         *
         * @example
         * ```ts
         * class MyComponent extends Component {
         *   public override onload(): void {
         *     console.log('MyComponent loaded');
         *   }
         * }
         * ```
         * @virtual
         * @official
         * @since 0.9.7
         */
        onload(): void;

        /**
         * Override this to unload your component
         *
         * @virtual
         * @official
         * @since 0.9.7
         */
        onunload(): void;

        /**
         * Registers a callback to be called when unloading.
         *
         * @param cb - The callback to be called when unloading.
         * @example
         * ```ts
         * component.register(() => {
         *   console.log('MyComponent unloaded');
         * });
         * ```
         * @official
         * @since 0.9.7
         */
        register(cb: () => any): void;

        /**
         * Registers a DOM event to be detached when unloading.
         *
         * @typeParam K - The type of the event to register.
         * @param el - The element to register the event on.
         * @param type - The type of the event to register.
         * @param callback - The callback to be called when the event is triggered.
         * @param options - The options for the event.
         * @example
         * ```ts
         * component.registerDomEvent(document, 'click', () => {
         *   console.log('Document clicked');
         * });
         * ```
         * @official
         * @since 0.14.8
         */
        registerDomEvent<K extends keyof DocumentEventMap>(
            el: Document,
            type: K,
            callback: (this: HTMLElement, ev: DocumentEventMap[K]) => any,
            options?: boolean | AddEventListenerOptions
        ): void;

        /**
         * Registers a DOM event to be detached when unloading.
         *
         * @typeParam K - The type of the event to register.
         * @param el - The element to register the event on.
         * @param type - The type of the event to register.
         * @param callback - The callback to be called when the event is triggered.
         * @param options - The options for the event.
         * @example
         * ```ts
         * component.registerDomEvent(document.body, 'click', () => {
         *   console.log('Body clicked');
         * });
         * ```
         * @official
         */
        registerDomEvent<K extends keyof HTMLElementEventMap>(
            el: HTMLElement,
            type: K,
            callback: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
            options?: boolean | AddEventListenerOptions
        ): void;

        /**
         * Registers a DOM event to be detached when unloading.
         *
         * @typeParam K - The type of the event to register.
         * @param el - The element to register the event on.
         * @param type - The type of the event to register.
         * @param callback - The callback to be called when the event is triggered.
         * @param options - The options for the event.
         * @example
         * ```ts
         * component.registerDomEvent(window, 'click', () => {
         *   console.log('Window clicked');
         * });
         * ```
         * @official
         */
        registerDomEvent<K extends keyof WindowEventMap>(
            el: Window,
            type: K,
            callback: (this: HTMLElement, ev: WindowEventMap[K]) => any,
            options?: boolean | AddEventListenerOptions
        ): void;

        /**
         * Registers an event to be detached when unloading.
         *
         * @param eventRef - The event to be registered.
         * @example
         * ```ts
         * component.registerEvent(eventRef);
         * ```
         * @official
         * @since 0.9.7
         */
        registerEvent(eventRef: EventRef): void;

        /**
         * Registers an interval (from setInterval) to be cancelled when unloading.
         * Use {@link window.setInterval} instead of {@link setInterval} to avoid TypeScript confusing between NodeJS vs Browser API
         *
         * @param id - The id of the interval to register.
         * @returns The id of the interval.
         * @example
         * ```ts
         * component.registerInterval(window.setInterval(() => {
         *   console.log('Interval');
         * }, 1000));
         * ```
         * @official
         * @since 0.13.8
         */
        registerInterval(id: number): number;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        registerScopeEvent(keymapEventHandler: KeymapEventHandler): void;

        /**
         * Removes a child component, unloading it.
         *
         * @typeParam T - The type of the component to remove.
         * @param component - The component to remove.
         * @returns The removed component.
         * @example
         * ```ts
         * component.removeChild(childComponent);
         * ```
         * @official
         * @since 0.12.0
         */
        removeChild<T extends Component>(component: T): T;

        /**
         * Override this to unload your component.
         *
         * @example
         * ```ts
         * class MyComponent extends Component {
         *   public override onunload(): void {
         *     console.log('MyComponent unloaded');
         *   }
         * }
         * ```
         * @virtual
         * @official
         * @since 0.9.7
         */
        unload(): void;
    }
}
