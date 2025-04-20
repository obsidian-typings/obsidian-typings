export {};

declare global {
    /**
     * Options object passed to {@link createSvg}.
     */
    interface SvgElementInfo {
        /**
         * HTML attributes to be added.
         *
         * @example
         * ```ts
         * createSvg('svg', { attr: { id: 'foo', 'data-bar': 'baz' } });
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
         * createSvg('svg', { cls: 'foo bar' });
         * createSvg('svg', { cls: ['foo', 'bar'] });
         * ```
         * @official
         */
        cls?: string | string[];

        /**
         * The parent element to be assigned to.
         *
         * @example
         * ```ts
         * createSvg('svg', { parent: document.body });
         * ```
         * @official
         */
        parent?: Node;

        /**
         * Whether to prepend the element to the parent.
         * If `true`, the element will be inserted before the first child of the parent.
         * If `false` or omitted, the element will be inserted after the last child of the parent.
         *
         * @example
         * ```ts
         * createSvg('svg', { prepend: true });
         * ```
         * @official
         */
        prepend?: boolean;
    }
}
