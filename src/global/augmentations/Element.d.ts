export {};

declare global {
    /**
     * Augments the built-in {@link Element} interface.
     */
    interface Element extends Node {
        /**
         * Adds a class to the element.
         *
         * @param classes - The class to add.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.addClass('foo', 'bar');
         * console.log(element.className); // foo
         * @official
         */
        addClass(...classes: string[]): void;

        /**
         * Adds multiple classes to the element.
         *
         * @param classes - The classes to add.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.addClasses(['foo', 'bar']);
         * console.log(element.className); // foo bar
         * ```
         * @official
         */
        addClasses(classes: string[]): void;

        /**
         * Finds the first descendant element that matches the selector.
         *
         * @param selector - The selector to find the element with.
         * @returns The first descendant element that matches the selector, or `null` if no match is found.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.createEl('strong', { cls: 'foo' });
         * console.log(element.find('.foo')); // <strong class="foo"></strong>
         * console.log(element.find('.bar')); // null
         * ```
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
         * const element = createEl('p');
         * element.createEl('strong', { cls: 'foo' });
         * element.createEl('strong', { cls: 'foo' });
         * console.log(element.findAll('.foo')); // [<strong class="foo"></strong>, <strong class="foo"></strong>]
         * console.log(element.findAll('.bar')); // []
         * ```
         * @remarks See bug {@link https://forum.obsidian.md/t/bug-find-findall-findallself/98108}.
         * @official
         */
        findAll(selector: string): Element[];

        /**
         * Finds all descendant elements or self that match the selector.
         *
         * @param selector - The selector to find the elements with.
         * @returns An array of all descendant elements or self that match the selector.
         * @example
         * ```ts
         * const element = createEl('p', { cls: 'foo' });
         * element.createEl('strong', { cls: 'foo' });
         * console.log(element.findAllSelf('.foo')); // [<p class="foo"></p>, <strong class="foo"></strong>]
         * console.log(element.findAllSelf('.bar')); // []
         * ```
         * @remarks See bug {@link https://forum.obsidian.md/t/bug-find-findall-findallself/98108}.
         * @official
         */
        findAllSelf(selector: string): Element[];

        /**
         * Gets an attribute from the element.
         *
         * @param qualifiedName - The name of the attribute to get.
         * @returns The value of the attribute.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.setAttr('data-foo', 'bar');
         * console.log(element.getAttr('data-foo')); // bar
         * ```
         * @official
         */
        getAttr(qualifiedName: string): string | null;

        /**
         * Gets the value of a CSS property of the element.
         *
         * @param property - The property to get the value of.
         * @param pseudoElement - The pseudo-element to get the value of.
         * @returns The value of the CSS property.
         * @example
         * ```ts
         * const element = document.body.createEl('p');
         * element.style.color = 'red';
         * console.log(element.getCssPropertyValue('color')); // rgb(255, 0, 0)
         * console.log(element.getCssPropertyValue('color', ':after')); // rgb(255, 0, 0)
         * ```
         * @official
         */
        getCssPropertyValue(property: string, pseudoElement?: string): string;

        /**
         * Returns the text content of the element.
         *
         * @returns The text content of the element.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.createEl('strong', { text: 'foo' });
         * element.createEl('strong', { text: 'bar' });
         * console.log(element.getText()); // foobar
         * ```
         * @official
         */
        getText(): string;

        /**
         * Checks if the element has a class.
         *
         * @param cls - The class to check for.
         * @returns `true` if the element has the class, `false` otherwise.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.addClass('foo', 'bar');
         * console.log(element.hasClass('foo')); // true
         * console.log(element.hasClass('baz')); // false
         * ```
         * @official
         */
        hasClass(cls: string): boolean;

        /**
         * Checks if the element is the active element.
         *
         * @returns `true` if the element is the active element, `false` otherwise.
         * @example
         * ```ts
         * const element = document.body.createEl('p');
         * console.log(element.isActiveElement()); // false
         * console.log(document.activeElement.isActiveElement()); // true
         * ```
         * @official
         */
        isActiveElement(): boolean;

        /**
         * Matches the selector recursively up the DOM tree.
         *
         * @param selector - The selector to match the parent with.
         * @param lastParent - The last parent to stop matching against.
         * @returns The matched element or `null` if no match is found.
         * @example
         * ```ts
         * const element = createEl('p');
         * console.log(element.matchParent('p')); // <p></p>
         * console.log(element.matchParent('strong')); // null
         * const child = element.createEl('strong');
         * console.log(child.matchParent('strong')); // <strong></strong>
         * console.log(child.matchParent('p')); // <p></p>
         * const grandchild = child.createEl('em');
         * console.log(grandchild.matchParent('p', child)); // null
         * ```
         * @official
         */
        matchParent(selector: string, lastParent?: Element): Element | null;

        /**
         * Removes a class from the element.
         *
         * @param classes - The class to remove.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.addClass('foo bar');
         * element.removeClass('foo', 'baz');
         * console.log(element.className); // bar
         * ```
         * @official
         */
        removeClass(...classes: string[]): void;

        /**
         * Removes multiple classes from the element.
         *
         * @param classes - The classes to remove.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.addClass('foo bar');
         * element.removeClasses(['foo', 'baz']);
         * console.log(element.className); // bar
         * ```
         * @official
         */
        removeClasses(classes: string[]): void;

        /**
         * Sets an attribute on the element.
         *
         * @param qualifiedName - The name of the attribute to set.
         * @param value - The value to set the attribute to.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.setAttr('data-foo', 'bar');
         * console.log(element.getAttr('data-foo')); // bar
         * ```
         * @official
         */
        setAttr(qualifiedName: string, value: string | number | boolean | null): void;

        /**
         * Sets multiple attributes on the element.
         *
         * @param obj - The attributes to set.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.setAttrs({
         *     'data-foo': 'bar',
         *     'data-baz': 'qux',
         * });
         * console.log(element.getAttr('data-foo')); // bar
         * console.log(element.getAttr('data-baz')); // qux
         * ```
         * @official
         */
        setAttrs(obj: {
            [key: string]: string | number | boolean | null;
        }): void;

        /**
         * Sets the text content of the element.
         *
         * @param val - The text content to set.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.setText('foo');
         * console.log(element); // <p>foo</p>
         * const fragment = createFragment();
         * fragment.createEl('strong', { text: 'bar' });
         * element.setText(fragment);
         * console.log(element); // <p><strong>bar</strong></p>
         * ```
         * @official
         */
        setText(val: string | DocumentFragment): void;

        /**
         * Toggles a class on the element.
         *
         * @param classes - The class to toggle.
         * @param value - If `true`, the class will be added, if `false`, the class will be removed.
         * @example
         * ```ts
         * const element = createEl('p');
         * element.addClass('foo', 'bar');
         * element.toggleClass('foo', false);
         * console.log(element.className); // bar
         * element.toggleClass('foo', true);
         * console.log(element.className); // bar foo
         * element.toggleClass('baz', false);
         * console.log(element.className); // bar foo
         * element.toggleClass('baz', true);
         * console.log(element.className); // bar foo baz
         * ```
         * @official
         */
        toggleClass(classes: string | string[], value: boolean): void;
    }
}
