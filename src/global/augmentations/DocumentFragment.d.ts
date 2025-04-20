export {};

declare global {
    /**
     * Augments the built-in {@link DocumentFragment} interface.
     */
    interface DocumentFragment extends Node, NonElementParentNode, ParentNode {
        /**
         * Finds the first descendant element that matches the selector.
         *
         * @param selector - The selector to find the element with.
         * @returns The first descendant element that matches the selector, or `null` if no match is found.
         * @example
         * ```ts
         * const fragment = createFragment();
         * fragment.createEl('strong', { cls: 'foo' });
         * console.log(fragment.find('.foo')); // <strong class="foo"></strong>
         * console.log(fragment.find('.bar')); // null
         * ```
         * @remarks See bug {@link https://forum.obsidian.md/t/bug-find-findall-findallself/98108}.
         * @official
         */
        find(selector: string): Element | null;

        /**
         * Finds all descendant elements that match the selector.
         *
         * @param selector - The selector to find the elements with.
         * @returns An array of all descendant elements that match the selector.
         * @example
         * ```ts
         * const fragment = createFragment();
         * fragment.createEl('strong', { cls: 'foo' });
         * fragment.createEl('strong', { cls: 'foo' });
         * console.log(fragment.findAll('.foo')); // [<strong class="foo"></strong>, <strong class="foo"></strong>]
         * console.log(fragment.findAll('.bar')); // []
         * ```
         * @remarks See bug {@link https://forum.obsidian.md/t/bug-find-findall-findallself/98108}.
         * @official
         */
        findAll(selector: string): Element[];
    }
}
