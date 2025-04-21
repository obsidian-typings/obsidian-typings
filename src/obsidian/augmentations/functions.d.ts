import type { Mermaid } from 'mermaid';
import type { default as pdfjsLib } from 'pdfjs-dist';
import type { default as Prism } from 'prismjs';

export {};

declare module 'obsidian' {
    /**
     * Adds an icon to the library.
     *
     * @param iconId - the icon ID.
     * @param svgContent - the content of the SVG.
     *
     * @example
     * ```ts
     * addIcon('my-icon', '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40"/></svg>');
     * ```
     *
     * @official
     */
    function addIcon(iconId: string, svgContent: string): void;

    /**
     * Converts an `ArrayBuffer` to a base64 string.
     *
     * @param buffer - The `ArrayBuffer` to convert.
     * @returns The base64 string.
     *
     * @example
     * ```ts
     * console.log(arrayBufferToBase64(new Uint8Array([1,2,3]).buffer)); // AQID
     * ```
     *
     * @official
     */
    function arrayBufferToBase64(buffer: ArrayBuffer): string;

    /**
     * Converts an `ArrayBuffer` to a hex string.
     *
     * @param buffer - The `ArrayBuffer` to convert.
     * @returns The hex string.
     *
     * @example
     * ```ts
     * console.log(arrayBufferToHex(new Uint8Array([1,2,3]).buffer)); // 010203
     * ```
     *
     * @official
     */
    function arrayBufferToHex(data: ArrayBuffer): string;

    /**
     * Converts a base64 string to an `ArrayBuffer`.
     *
     * @param base64 - The base64 string to convert.
     * @returns The `ArrayBuffer`.
     *
     * @example
     * ```ts
     * console.log(base64ToArrayBuffer('AQID'));
     * ```
     *
     * @official
     */
    function base64ToArrayBuffer(base64: string): ArrayBuffer;

    /**
     * A standard debounce function.
     * Use this to have a time-delayed function only be called once in a given timeframe.
     *
     * @typeParam T - The type of the arguments of the function to debounce.
     * @typeParam V - The type of the return value of the function to debounce.
     * @param cb - The function to call.
     * @param timeout - The timeout to wait, in milliseconds.
     * @param resetTimer - Whether to reset the timeout when the debouncer is called again.
     * @returns a debounced function that takes the same parameter as the original function.
     *
     * @example
     * ```ts
     * const debounced = debounce((text: string) => {
     *     console.log(text);
     * }, 1000, true);
     * debounced('foo'); // this will not be printed
     * await sleep(500);
     * debounced('bar'); // this will be printed to the console.
     * ```
     *
     * @official
     */
    function debounce<T extends unknown[], V>(
        cb: (...args: [...T]) => V,
        timeout?: number,
        resetTimer?: boolean
    ): Debouncer<T, V>;

    /**
     * Manually trigger a tooltip that will appear over the provided element.
     * To display a tooltip on hover, use {@link setTooltip} instead.
     *
     * @param newTargetEl - The element to display the tooltip over.
     * @param content - The content of the tooltip.
     * @param options - The options for the tooltip.
     *
     * @example
     * ```ts
     * displayTooltip(document.body, 'foo');
     * ```
     *
     * @official
     */
    function displayTooltip(
        newTargetEl: HTMLElement,
        content: string | DocumentFragment,
        options?: TooltipOptions
    ): void;

    /**
     * Flush the MathJax stylesheet.
     *
     * @official
     */
    function finishRenderMath(): Promise<void>;

    /**
     * Combines all tags from frontmatter and note content into a single array.
     *
     * @example
     * For the following note:
     *
     * ```markdown
     * ---
     * tags:
     *   - foo
     *   - bar
     * ---
     *
     * #baz
     * ```
     *
     * Usage:
     *
     * ```ts
     * console.log(getAllTags(cache)); // ['foo', 'bar', 'baz']
     * ```
     *
     * @official
     */
    function getAllTags(cache: CachedMetadata): string[] | null;

    /**
     * Converts a Blob to an ArrayBuffer.
     *
     * @param blob - The Blob to convert.
     * @returns The ArrayBuffer.
     *
     * @example
     * ```ts
     * console.log(await getBlobArrayBuffer(blob));
     * ```
     *
     * @official
     */
    function getBlobArrayBuffer(blob: Blob): Promise<ArrayBuffer>;

    /**
     * Given the contents of a file, get information about the frontmatter of the file, including
     * whether there is a frontmatter block, the offsets of where it starts and ends, and the frontmatter text.
     *
     * @example
     * ```ts
     * const content = `---
     * key1: value1
     * key2: value2
     * ---
     * main content
     * `;
     * console.log(getFrontMatterInfo(content));
     * ```
     *
     * @official
     */
    function getFrontMatterInfo(content: string): FrontMatterInfo;

    /**
     * Create an SVG from an iconId. Returns `null` if no icon associated with the iconId.
     *
     * @param iconId - the icon ID.
     * @returns the SVG element or `null` if no icon associated with the iconId.
     *
     * @example
     * ```ts
     * console.log(getIcon('dice')); // <svg>...</svg>
     * ```
     *
     * @official
     */
    function getIcon(iconId: string): SVGSVGElement | null;

    /**
     * Get the list of registered icons.
     *
     * @official
     */
    function getIconIds(): IconName[];

    /**
     * Get the ISO code for the currently configured app language. Defaults to 'en'.
     * See {@link https://github.com/obsidianmd/obsidian-translations?tab=readme-ov-file#existing-languages} for list of options.
     *
     * @official
     */
    function getLanguage(): string;

    /**
     * Converts the linktext to a linkpath.
     *
     * @param linktext A wikilink without the leading [[ and trailing ]].
     * @returns the name of the file that is being linked to.
     *
     * @example
     * ```ts
     * console.log(getLinkpath('foo#bar')); // foo
     * ```
     *
     * @official
     */
    function getLinkpath(linktext: string): string;

    /**
     * Converts a hex string to an ArrayBuffer.
     *
     * @param hex - The hex string to convert.
     * @returns The ArrayBuffer.
     *
     * @example
     * ```ts
     * console.log(hexToArrayBuffer('00112233445566778899aabbccddeeff'));
     * ```
     *
     * @official
     */
    function hexToArrayBuffer(hex: string): ArrayBuffer;

    /**
     * Converts HTML to a Markdown string.
     *
     * @example
     * ```ts
     * console.log(htmlToMarkdown('<h1>foo</h1>')); // # foo
     * const el = createDiv();
     * el.createEl('h2', { text: 'bar' });
     * console.log(htmlToMarkdown(el)); // ## bar
     * const fragment = createFragment();
     * fragment.createEl('h3', { text: 'baz' });
     * console.log(htmlToMarkdown(fragment)); // ### baz
     * ```
     *
     * @official
     */
    function htmlToMarkdown(html: string | HTMLElement | Document | DocumentFragment): string;

    /**
     * Iterate links and embeds.
     * If callback returns true, the iteration process will be interrupted.
     *
     * @param cache - The cache to iterate.
     * @param cb - The callback to call for each link or embed.
     * @returns `true` if callback ever returns `true`, `false` otherwise.
     *
     * @example
     * ```ts
     * iterateCacheRefs(cache, (ref) => {
     *     console.log(ref);
     *     return true;
     * });
     * @official
     * @deprecated - Use {@link iterateRefs} instead.
     */
    function iterateCacheRefs(cache: CachedMetadata, cb: (ref: ReferenceCache) => boolean | void): boolean;

    /**
     * If callback returns true, the iteration process will be interrupted.
     *
     * @param refs - The references to iterate.
     * @param cb - The callback to call for each reference.
     * @returns `true` if callback ever returns true, `false` otherwise.
     *
     * @example
     * ```ts
     * iterateRefs(refs, (ref) => {
     *     console.log(ref);
     *     return true;
     * });
     * @official
     */
    function iterateRefs(refs: Reference[], cb: (ref: Reference) => boolean | void): boolean;

    /**
     * Load MathJax.
     *
     * @returns A promise that resolves when MathJax is loaded.
     *
     * @see {@link https://www.mathjax.org/ Official MathJax documentation}.
     * @official
     */
    function loadMathJax(): Promise<void>;

    /**
     * Load Mermaid and return a promise to the global mermaid object.
     * Can also use {@link Window.mermaid} after this promise resolves to get the same reference.
     *
     * @returns A promise that resolves to the global {@link Window.mermaid} object.
     *
     * @see {@link https://mermaid.js.org/ Official Mermaid documentation}.
     * @official - Patched return type to be more specific.
     */
    function loadMermaid(): Promise<Mermaid>;

    /**
     * Load PDF.js and return a promise to the global pdfjsLib object.
     * Can also use {@link Window.pdfjsLib} after this promise resolves to get the same reference.
     *
     * @returns A promise that resolves to the global {@link Window.pdfjsLib} object.
     *
     * @see {@link https://mozilla.github.io/pdf.js/ Official PDF.js documentation}.
     * @official - Patched return type to be more specific.
     */
    function loadPdfJs(): Promise<typeof pdfjsLib>;

    /**
     * Load Prism.js and return a promise to the global Prism object.
     * Can also use {@link Window.Prism} after this promise resolves to get the same reference.
     *
     * @returns A promise that resolves to the global {@link Window.Prism} object.
     *
     * @see {@link https://prismjs.com/ Official Prism documentation}.
     * @official - Patched return type to be more specific.
     */
    function loadPrism(): Promise<typeof Prism>;

    /**
     * Normalizes a path replacing all invalid symbols.
     *
     * @param path - The path to normalize.
     * @returns The normalized path.
     *
     * @example
     * ```ts
     * normalizePath('foo/bar'); // foo/bar
     * normalizePath('/foo/bar'); // foo/bar
     * normalizePath('foo/bar/'); // foo/bar
     * normalizePath('foo//bar'); // foo/bar
     * normalizePath('foo\\bar'); // foo/bar
     * normalizePath('foo\u00A0bar'); // foo bar
     * normalizePath('foo\u202Fbar'); // foo bar
     * ```
     *
     * @official
     */
    function normalizePath(path: string): string;

    /**
     * Parses the frontmatter aliases from the frontmatter object.
     *
     * @param frontmatter - The frontmatter object.
     * @returns The aliases of the note or `null` if no aliases are found.
     *
     * @example
     * ```ts
     * console.log(parseFrontMatterAliases({ aliases: ['foo', 'bar'] })); // ['foo', 'bar']
     * console.log(parseFrontMatterAliases({ alias: ['foo', 'bar'] })); // ['foo', 'bar']
     * console.log(parseFrontMatterAliases({ aliases: 'baz' })); // ['baz']
     * ```
     *
     * @official
     */
    function parseFrontMatterAliases(frontmatter: any | null): string[] | null;

    /**
     * Parses a frontmatter entry from the frontmatter object.
     *
     * @param frontmatter - The frontmatter object.
     * @param key - The key to parse.
     * @returns The parsed entry or `null` if the key is not found.
     *
     * @example
     * ```ts
     * console.log(parseFrontMatterEntry({ foo: 'bar' }, 'foo')); // bar
     * console.log(parseFrontMatterEntry({ baz: 'qux' }, /ba./)); // qux
     * ```
     *
     * @official
     */
    function parseFrontMatterEntry(frontmatter: any | null, key: string | RegExp): any | null;

    /**
     * Parses a frontmatter string array from the frontmatter object.
     *
     * @param frontmatter - The frontmatter object.
     * @param key - The key to parse.
     * @param nospaces - Whether to remove spaces from the array.
     * @returns The parsed entry or `null` if the key is not found.
     *
     * @example
     * ```ts
     * console.log(parseFrontMatterStringArray({ foo: ['bar', 'baz'] }, 'foo')); // ['bar', 'baz']
     * console.log(parseFrontMatterStringArray({ foo: 'bar,baz' }, 'foo')); // ['bar', 'baz']
     * console.log(parseFrontMatterStringArray({ foo: 'bar\nbaz' }, 'foo')); // ['bar', 'baz']
     * console.log(parseFrontMatterStringArray({ foo: 'bar baz' }, 'foo')); // ['bar baz']
     * console.log(parseFrontMatterStringArray({ foo: 'bar baz' }, 'foo', false)); // ['bar baz']
     * console.log(parseFrontMatterStringArray({ foo: 'bar baz' }, 'foo', true)); // ['bar', 'baz']
     * console.log(parseFrontMatterStringArray({ foo: ['bar', 'baz'] }, /fo./)); // ['bar', 'baz']
     * ```
     *
     * @official
     */
    function parseFrontMatterStringArray(
        frontmatter: any | null,
        key: string | RegExp,
        nospaces?: boolean
    ): string[] | null;

    /**
     * Parses the frontmatter tags from the frontmatter object.
     *
     * @param frontmatter - The frontmatter object.
     * @returns The tags of the note or `null` if no tags are found.
     *
     * @example
     * ```ts
     * console.log(parseFrontMatterTags({ tags: ['foo', 'bar'] })); // ['#foo', '#bar']
     * console.log(parseFrontMatterTags({ tag: ['foo', 'bar'] })); // ['#foo', '#bar']
     * console.log(parseFrontMatterTags({ tags: 'foo bar' })); // ['#foo', '#bar']
     * ```
     *
     * @official
     */
    function parseFrontMatterTags(frontmatter: any | null): string[] | null;

    /**
     * Parses the linktext of a wikilink into its component parts.
     *
     * @param linktext A wikilink without the leading [[ and trailing ]].
     * @returns filepath and subpath (subpath can refer either to a block id, or a heading).
     *
     * @example
     * ```ts
     * console.log(parseLinktext('[[foo]]')); // { path: 'foo', subpath: '' }
     * console.log(parseLinktext('[[foo#bar]]')); // { path: 'foo', subpath: 'bar' }
     * ```
     *
     * @official
     */
    function parseLinktext(linktext: string): {
        /**
         * @official
         */
        path: string;
        /**
         * @official
         */
        subpath: string;
    };

    /**
     * Parses a YAML string into an object.
     *
     * @param yaml - The YAML string to parse.
     * @returns The parsed object.
     *
     * @example
     * ```ts
     * console.log(parseYaml('foo: bar')); // { foo: 'bar' }
     * ```
     *
     * @official
     */
    function parseYaml(yaml: string): any;

    /**
     * Construct a fuzzy search callback that runs on a target string.
     * Performance may be an issue if you are running the search for more than a few thousand times.
     * If performance is a problem, consider using `prepareSimpleSearch` instead.
     *
     * @param query - the fuzzy query.
     * @return fn - the callback function to apply the search on or `null` if the query is empty.
     *
     * @official
     */
    function prepareFuzzySearch(query: string): (text: string) => SearchResult | null;

    /**
     * Construct a simple search callback that runs on a target string.
     *
     * @param query - the space-separated words.
     * @return fn - the callback function to apply the search on or `null` if the query is empty.
     *
     * @official
     */
    function prepareSimpleSearch(query: string): (text: string) => SearchResult | null;

    /**
     * Remove a custom icon from the library.
     *
     * @param iconId - the icon ID.
     *
     * @example
     * ```ts
     * removeIcon('my-icon');
     * ```
     *
     * @official
     */
    function removeIcon(iconId: string): void;

    /**
     * Render the matches of a search.
     *
     * @param el - The element to render the matches to.
     * @param text - The text to render the matches to.
     * @param matches - The matches to render.
     * @param offset - The offset to render the matches to.
     *
     * @example
     * ```ts
     * renderMatches(document.body, 'foo', [[0, 3]]);
     * ```
     *
     * @official
     */
    function renderMatches(
        el: HTMLElement | DocumentFragment,
        text: string,
        matches: SearchMatches | null,
        offset?: number
    ): void;

    /**
     * Render some LaTeX math using the MathJax engine. Returns an HTMLElement.
     * Requires calling `finishRenderMath` when rendering is all done to flush the MathJax stylesheet.
     *
     * @param source - The LaTeX source code.
     * @param display - Whether to render the math in display mode.
     * @returns The rendered math element.
     *
     * @example
     * ```ts
     * console.log(renderMath('\\frac{1}{2}', true));
     * ```
     *
     * @official
     */
    function renderMath(source: string, display: boolean): HTMLElement;

    /**
     * Render the results of a search.
     *
     * @param el - The element to render the results to.
     * @param text - The text to render the results to.
     * @param result - The result to render.
     * @param offset - The offset to render the results to.
     *
     * @example
     * ```ts
     * renderResults(document.body, 'foo', {
     *     score: 0.5,
     *     matches: [[0, 3]],
     * });
     * ```
     *
     * @official
     */
    function renderResults(el: HTMLElement, text: string, result: SearchResult, offset?: number): void;

    /**
     * Similar to {@link fetch}, request a URL using HTTP/HTTPS, without any CORS restrictions.
     *
     * @param request - The request parameters.
     * @returns The promise that resolves to the text value of the response.
     *
     * @example
     * ```ts
     * console.log(await request({ url: 'https://google.com' }));
     * console.log(await request('https://google.com'));
     * ```
     *
     * @official
     */
    function request(request: RequestUrlParam | string): Promise<string>;

    /**
     * Similar to {@link fetch}, request a URL using HTTP/HTTPS, without any CORS restrictions.
     *
     * @param request - The request parameters.
     * @returns The response.
     *
     * @example
     * ```ts
     * const response = requestUrl({ url: 'https://google.com' });
     * console.log(await response);
     * console.log(await response.arrayBuffer());
     * console.log(await response.json());
     * console.log(await response.text());
     * console.log(await requestUrl('https://google.com'));
     * ```
     *
     * @official
     */
    function requestUrl(request: RequestUrlParam | string): RequestUrlResponsePromise;

    /**
     * Returns `true` if the API version is equal or higher than the requested version.
     * Use this to limit functionality that require specific API versions to avoid
     * crashing on older Obsidian builds.
     *
     * @param version - The version to check against.
     * @returns `true` if the API version is equal or higher than the requested version.
     *
     * @example
     * ```ts
     * console.log(requireApiVersion('1.8.9')); // true
     * ```
     *
     * @official
     */
    function requireApiVersion(version: string): boolean;

    /**
     * Resolve the given subpath to a reference in the MetadataCache.
     *
     * @param cache - The cached metadata to resolve the subpath in.
     * @param subpath - The subpath to resolve.
     * @returns The resolved subpath or `null` if the subpath is not found.
     *
     * @example
     * ```ts
     * console.log(resolveSubpath(cache, '#foo'));
     * ```
     *
     * @official
     */
    function resolveSubpath(
        cache: CachedMetadata,
        subpath: string
    ): HeadingSubpathResult | BlockSubpathResult | FootnoteSubpathResult | null;

    /**
     * Sanitize HTML to a DOM fragment.
     *
     * @param html - The HTML to sanitize.
     * @returns The sanitized DOM fragment.
     *
     * @example
     * ```ts
     * console.log(sanitizeHTMLToDom('<div>foo</div>')); #document-fragment
     * ```
     *
     * @official
     */
    function sanitizeHTMLToDom(html: string): DocumentFragment;

    /**
     * Insert an SVG into the element from an iconId. Does nothing if no icon associated with the iconId.
     *
     * @param parent - the HTML element to insert the icon.
     * @param iconId - the icon ID.
     * @see The Obsidian icon library includes the {@link https://lucide.dev/ Lucide icon library}, any icon name from their site will work here.
     *
     * @example
     * ```ts
     * setIcon(document.body, 'dice');
     * ```
     *
     * @official
     */
    function setIcon(parent: HTMLElement, iconId: IconName): void;

    /**
     * Set a tooltip on an element.
     *
     * @param el - The element to show the tooltip on.
     * @param tooltip - The tooltip text to show.
     * @param options - The options for the tooltip.
     *
     * @example
     * ```ts
     * setTooltip(document.body, 'foo');
     * ```
     *
     * @official
     */
    function setTooltip(el: HTMLElement, tooltip: string, options?: TooltipOptions): void;

    /**
     * Sort search results.
     *
     * @param results - The search results to sort.
     *
     * @example
     * ```ts
     * sortSearchResults([{ match: { score: 1, matches: [[0, 3]]} }]);
     * ```
     *
     * @official
     */
    function sortSearchResults(results: SearchResultContainer[]): void;

    /**
     * Stringify a YAML object.
     *
     * @param obj - The object to stringify.
     * @returns The stringified object.
     *
     * @example
     * ```ts
     * console.log(stringifyYaml({ foo: 'bar' })); // foo: bar
     * ```
     *
     * @official
     */
    function stringifyYaml(obj: any): string;

    /**
     * Normalizes headings for link matching by stripping out special characters and shrinking consecutive spaces.
     *
     * @param heading - The heading to normalize.
     * @returns The normalized heading.
     *
     * @example
     * ```ts
     * console.log(stripHeading('foo!"#$%&()*+,.:;<=>?@^`{|}~\/\[\]\\\r\nbar')); // foo bar
     * ```
     *
     * @official
     */
    function stripHeading(heading: string): string;

    /**
     * Prepares headings for linking by stripping out some bad combinations of special characters that could break links.
     *
     * @param heading - The heading to prepare.
     * @returns The prepared heading.
     *
     * @example
     * ```ts
     * console.log(stripHeadingForLink('foo:#|^\\\r\n%%[[]]bar')); // foo bar
     * ```
     *
     * @official
     */
    function stripHeadingForLink(heading: string): string;
}
