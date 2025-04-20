export {};

declare global {
    /**
     * Options object passed to {@link createEl}.
     */
    interface DomElementInfo {
        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        [eventName: `on${string}`]: EventListenerOrEventListenerObject;

        /**
         * HTML attributes to be added.
         *
         * @example
         * ```ts
         * createEl('p', { attr: { id: 'foo', 'data-bar': 'baz' } });
         * ```
         * @official
         */
        attr?: {
            [key: string]: string | number | boolean | null;
        };

        /**
         * The class to be assigned. Can be a space-separated string or an array of strings.
         *
         * @example
         * ```ts
         * createEl('p', { cls: 'foo bar' });
         * createEl('p', { cls: ['foo', 'bar'] });
         * ```
         * @official
         */
        cls?: string | string[];

        /**
         * The href to be assigned. Applies to `<a>`, `<link>`, and `<base>` elements.
         *
         * @example
         * ```ts
         * createEl('a', { href: 'https://example.com' });
         * ```
         * @official
         */
        href?: string;

        /**
         * The parent element to be assigned to.
         *
         * @example
         * ```ts
         * createEl('strong', { parent: document.body });
         * ```
         * @official
         */
        parent?: Node;

        /**
         * The placeholder to be assigned. Applies to `<input>` elements.
         *
         * @example
         * ```ts
         * createEl('input', { placeholder: 'foo' });
         * ```
         * @official
         */
        placeholder?: string;

        /**
         * Whether to prepend the element to the parent.
         * If `true`, the element will be inserted before the first child of the parent.
         * If `false` or omitted, the element will be inserted after the last child of the parent.
         *
         * @example
         * ```ts
         * createEl('input', { prepend: true });
         * ```
         * @official
         */
        prepend?: boolean;

        /**
         * The textContent to be assigned.
         *
         * @example
         * ```ts
         * createEl('p', { text: 'foo' });
         * const fragment = createFragment();
         * fragment.createEl('strong', { text: 'bar' });
         * createEl('p', { text: fragment });
         * ```
         * @official
         */
        text?: string | DocumentFragment;

        /**
         * HTML title (for hover tooltip).
         *
         * @example
         * ```ts
         * createEl('p', { title: 'foo' });
         * ```
         * @official
         */
        title?: string;

        /**
         * The type to be assigned. Applies to `<input>` and `<style>` elements.
         *
         * @example
         * ```ts
         * createEl('input', { type: 'text' });
         * @official
         */
        type?: string;

        /**
         * The value to be assigned. Applies to `<input>`, `<select>`, and `<option>` elements.
         *
         * @example
         * ```ts
         * createEl('input', { value: 'foo' });
         * ```
         * @official
         */
        value?: string;
    }
}
