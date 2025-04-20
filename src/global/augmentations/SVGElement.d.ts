export {};

declare global {
    /**
     * Augments the built-in {@link SVGElement} interface.
     */
    interface SVGElement extends Element {
        /**
         * Sets the CSS properties of the element.
         *
         * @param props - The properties to set.
         * @example
         * ```ts
         * const element = document.body.createEl('svg');
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
         * const element = document.body.createEl('svg');
         * element.setCssStyles({ color: 'red', fontSize: '16px' });
         * ```
         * @official
         */
        setCssStyles(styles: Partial<CSSStyleDeclaration>): void;
    }
}
