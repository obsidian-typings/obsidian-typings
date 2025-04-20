export {};

declare global {
    /**
     * Augments the built-in {@link HTMLElement} interface.
     */
    interface HTMLElement extends Element {
        /**
         * The event listeners of the element.
         * @official
         */
        _EVENTS?: {
            [K in keyof HTMLElementEventMap]?: EventListenerInfo[];
        };

        /**
         * Get the inner height of this element without padding.
         * @official
         */
        readonly innerHeight: number;

        /**
         * Get the inner width of this element without padding.
         * @official
         */
        readonly innerWidth: number;

        /**
         * Hides the element using css `display` property.
         *
         * @example
         * ```ts
         * document.body.hide();
         * ```
         * @official
         */
        hide(): void;

        /**
         * Returns whether this element is shown, when the element is attached to the DOM and.
         * none of the parent and ancestor elements are hidden with `display: none`.
         *
         * Exception: Does not work on `<body>` and `<html>`, or on elements with `position: fixed`.
         *
         * @example
         * ```ts
         * const element = document.body.createEl('p');
         * console.log(element.isShown()); // true
         * element.hide();
         * console.log(element.isShown()); // false
         * ```
         * @official
         */
        isShown(): boolean;

        /**
         * Removes an event listener from the element.
         *
         * @typeParam K - The type of the event to listen for.
         * @param this - The element to remove the event listener from.
         * @param type - The type of event to listen for.
         * @param selector - The selector of the event target.
         * @param listener - The listener to call when the event is triggered.
         * @param options - The options of the event listener.
         * @example
         * ```ts
         * document.body.off('click', 'div', document.body._EVENTS.click[0].listener);
         * ```
         * @official
         */
        off<K extends keyof HTMLElementEventMap>(
            this: HTMLElement,
            type: K,
            selector: string,
            listener: (this: HTMLElement, ev: HTMLElementEventMap[K], delegateTarget: HTMLElement) => any,
            options?: boolean | AddEventListenerOptions
        ): void;

        /**
         * Adds an event listener to the element.
         *
         * @typeParam K - The type of the event to listen for.
         * @param this - The element to add the event listener to.
         * @param type - The type of event to listen for.
         * @param selector - The selector of the event target.
         * @param listener - The listener to call when the event is triggered.
         * @param options - The options of the event listener.
         * @example
         * ```ts
         * document.body.on('click', 'div', (ev) => {
         *     console.log(ev);
         * });
         * ```
         * @official
         */
        on<K extends keyof HTMLElementEventMap>(
            this: HTMLElement,
            type: K,
            selector: string,
            listener: (this: HTMLElement, ev: HTMLElementEventMap[K], delegateTarget: HTMLElement) => any,
            options?: boolean | AddEventListenerOptions
        ): void;

        /**
         * Adds a click event listener to the element.
         *
         * @param this - The element to add the event listener to.
         * @param listener - The listener to call when the click event is triggered.
         * @param options - The options of the click event listener.
         * @example
         * ```ts
         * document.body.onClickEvent((ev) => {
         *     console.log(ev);
         * });
         * ```
         * @official
         */
        onClickEvent(
            this: HTMLElement,
            listener: (this: HTMLElement, ev: MouseEvent) => any,
            options?: boolean | AddEventListenerOptions
        ): void;

        /**
         * Adds an event listener to the element when it is inserted into the DOM.
         *
         * @param listener - the callback to call when this node is inserted into the DOM.
         * @param once - if true, this will only fire once and then unhook itself.
         * @returns destroy - a function to remove the event handler to avoid memory leaks.
         * @example
         * ```ts
         * document.body.onNodeInserted(() => {
         *     console.log('node inserted');
         * });
         * ```
         * @official
         */
        onNodeInserted(this: HTMLElement, listener: () => any, once?: boolean): () => void;

        /**
         * Adds an event listener to the element when it is migrated to another window.
         *
         * @param listener - the callback to call when this node has been migrated to another window.
         * @returns destroy - a function to remove the event handler to avoid memory leaks.
         * @example
         * ```ts
         * document.body.onWindowMigrated((win) => {
         *     console.log('window migrated');
         * });
         * @official
         */
        onWindowMigrated(this: HTMLElement, listener: (win: Window) => any): () => void;

        /**
         * Sets the CSS properties of the element.
         *
         * @param props - The properties to set.
         * @example
         * ```ts
         * const element = document.body.createEl('p');
         * element.setCssProps({ color: 'red', 'font-size': '16px' });
         * ```
         * @official
         */
        setCssProps(props: Record<string, string>): void;

        /**
         * Sets the CSS styles of the element.
         *
         * @param styles - The styles to set.
         * @example
         * ```ts
         * const element = document.body.createEl('p');
         * element.setCssStyles({ color: 'red', fontSize: '16px' });
         * ```
         * @official
         */
        setCssStyles(styles: Partial<CSSStyleDeclaration>): void;

        /**
         * Shows the element using css `display` property.
         *
         * @example
         * ```ts
         * document.body.show();
         * ```
         * @official
         */
        show(): void;

        /**
         * Toggles the visibility of the element using css `display` property.
         *
         * @param show - Whether to show the element.
         * @example
         * ```ts
         * document.body.toggle(true);
         * document.body.toggle(false);
         * ```
         * @official
         */
        toggle(show: boolean): void;

        /**
         * Toggles the visibility of the element using css `visibility` property.
         *
         * @param visible - Whether to show the element.
         * @example
         * ```ts
         * document.body.toggleVisibility(true);
         * document.body.toggleVisibility(false);
         * ```
         * @official
         */
        toggleVisibility(visible: boolean): void;

        /**
         * Triggers an event on the element.
         *
         * @param eventType - the type of event to trigger.
         * @example
         * ```ts
         * document.body.trigger('click');
         * ```
         * @official
         */
        trigger(eventType: string): void;
    }
}
