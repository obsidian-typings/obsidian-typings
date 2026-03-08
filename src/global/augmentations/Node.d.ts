export {};

declare global {
    /**
     * Augments the built-in {@link Node} interface.
     */
    interface Node {
        /**
         * Global window object.
         * @official
         */
        constructorWin: Window;

        /**
         * The document this node belongs to, or the global document.
         * @official
         */
        doc: Document;

        /**
         * The window object this node belongs to, or the global window.
         * @official
         */
        win: Window;

        /**
         * Appends a text node to the node.
         *
         * @param val - The text to append.
         * @example
         * ```ts
         * const parent = createEl('p');
         * parent.createEl('strong', { text: 'foo' });
         * parent.appendText('bar');
         * console.log(parent); // <p><strong>foo</strong>bar</p>
         * ```
         * @official
         */
        appendText(val: string): void;

        /**
         * Creates a new `<div>` element.
         *
         * @param o - The options object.
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * document.body.createDiv({ text: 'foo' }, (div) => {
         *     div.createEl('strong', { text: 'bar' });
         * });
         * ```
         * @official
         */
        createDiv(o?: DomElementInfo | string, callback?: (el: HTMLDivElement) => void): HTMLDivElement;

        /**
         * Create an element and append it to this node.
         *
         * @typeParam K - The type of the element to create.
         * @param tag - The tag name of the element to create.
         * @param o - The options object.
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * document.body.createEl('p', { text: 'foo' }, (div) => {
         *     div.createEl('strong', { text: 'bar' });
         * });
         * ```
         * @official
         */
        createEl<K extends keyof HTMLElementTagNameMap>(
            tag: K,
            o?: DomElementInfo | string,
            callback?: (el: HTMLElementTagNameMap[K]) => void
        ): HTMLElementTagNameMap[K];

        /**
         * Creates a new `<span>` element.
         *
         * @param o - The options object.
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * document.body.createSpan({ text: 'foo' }, (span) => {
         *     span.createEl('strong', { text: 'bar' });
         * });
         * ```
         * @official
         */
        createSpan(o?: DomElementInfo | string, callback?: (el: HTMLSpanElement) => void): HTMLSpanElement;

        /**
         * Creates a new svg element such as `<svg>`, `<circle>`, `<rect>`, etc.
         *
         * @typeParam K - The type of the element to create.
         * @param tag - The tag name of the element to create.
         * @param o - The options object.
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * document.body.createSvg('svg', { cls: 'foo bar' }, (svg) => {
         *     svg.createSvg('circle');
         * });
         * @official
         */
        createSvg<K extends keyof SVGElementTagNameMap>(
            tag: K,
            o?: SvgElementInfo | string,
            callback?: (el: SVGElementTagNameMap[K]) => void
        ): SVGElementTagNameMap[K];

        /**
         * Detaches the node from the DOM.
         *
         * @example
         * ```ts
         * const node = document.body.createEl('p');
         * console.log(document.body.contains(node)); // true
         * node.detach();
         * console.log(document.body.contains(node)); // false
         * ```
         * @official
         */
        detach(): void;

        /**
         * Empties the node.
         *
         * @example
         * ```ts
         * const parent = createEl('p');
         * parent.createEl('strong');
         * console.log(parent.childNodes.length); // 1
         * parent.empty();
         * console.log(parent.childNodes.length); // 0
         * ```
         * @official
         */
        empty(): void;

        /**
         * Returns the index of the node or `-1` if the node is not found.
         *
         * @param other - The node to find.
         * @returns The index of the node or `-1` if the node is not found.
         * @official
         */
        indexOf(other: Node): number;

        /**
         * Inserts a child node after the current node.
         *
         * @typeParam T - The type of the node to insert.
         * @param node - The node to insert.
         * @param child - The child node to insert after.
         * @returns The inserted node.
         * @example
         * ```ts
         * const parent = createEl('p');
         * const child1 = parent.createEl('strong', { text: '1' });
         * const child2 = parent.createEl('strong', { text: '2' });
         * const child3 = parent.createEl('strong', { text: '3' });
         * const newNode = createEl('em', { text: '4' });
         * parent.insertAfter(newNode, child2);
         * console.log(parent); // <p><strong>1</strong><strong>2</strong><em>4</em><strong>3</strong></p>
         * ```
         * @official
         */
        insertAfter<T extends Node>(node: T, child: Node | null): T;

        /**
         * Cross-window capable instanceof check, a drop-in replacement.
         * for instanceof checks on DOM Nodes. Remember to also check
         * for nulls when necessary.
         *
         * @typeParam T - The type of the instance.
         * @param type - The type to check.
         * @returns `true` if the node is of the given type, `false` otherwise.
         * @example
         * ```ts
         * const node = createEl('p');
         * console.log(node.instanceOf(HTMLParagraphElement)); // true
         * console.log(node.instanceOf(HTMLSpanElement)); // false
         * ```
         * @official
         */
        instanceOf<T>(type: {
            new(): T;
        }): this is T;

        /**
         * Sets the children of the node.
         *
         * @param children - The children to set.
         * @example
         * ```ts
         * const parent = createEl('p');
         * const child1 = parent.createEl('strong', { text: '1' });
         * const child2 = parent.createEl('strong', { text: '2' });
         * const child3 = createEl('strong', { text: '3' });
         * parent.setChildrenInPlace([child1, child3]);
         * console.log(parent); // <p><strong>1</strong><strong>3</strong></p>
         * ```
         * @official
         */
        setChildrenInPlace(children: Node[]): void;
    }
}
