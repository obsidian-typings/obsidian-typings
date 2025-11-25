import type {
    Capacitor,
    CapacitorPlatforms
} from '@capacitor/core';
import type { default as CodeMirror } from 'codemirror';
import type { default as DOMPurify } from 'dompurify';
import type * as electron from 'electron';
import type { default as i18next } from 'i18next';
import type { Mermaid } from 'mermaid';
import type { moment } from 'obsidian';
import type {
    App,
    Notice,
    ObsidianProtocolHandler,
    request,
    requestUrl
} from 'obsidian';
import type { default as pdfjsLib } from 'pdfjs-dist';
import type { default as PIXI } from 'pixi.js';
import type { default as Prism } from 'prismjs';
import type { default as scrypt } from 'scrypt-js';
import type { default as TurndownService } from 'turndown';
import type { CodeMirrorAdapterEx } from '../../@codemirror__view/internals/CodeMirrorAdapterEx.d.ts';
import type { VimApi } from '../../@codemirror__view/internals/Vim/VimApi.d.ts';
import type { CapacitorAdapterFsConstructor } from '../../obsidian/internals/CapacitorAdapterFsConstructor.d.ts';
import type { ElectronWindow } from '../../obsidian/internals/ElectronWindow.d.ts';
import type { FrameDom } from '../../obsidian/internals/FrameDom.d.ts';
import type { Localization } from '../../obsidian/internals/Localization.d.ts';
import type { MathJax } from '../../obsidian/internals/MathJax/MathJax.d.ts';
import type { PdfJsTestingUtils } from '../../obsidian/internals/PdfJs/PdfJsTestingUtils.d.ts';
import type { Database } from '../../obsidian/internals/WebSQL/Database.d.ts';

export {};

declare global {
    /**
     * Augments the built-in {@link Window} interface.
     */
    interface Window
        extends
            EventTarget,
            AnimationFrameProvider,
            GlobalEventHandlers,
            WindowEventHandlers,
            WindowLocalStorage,
            WindowOrWorkerGlobalScope,
            WindowSessionStorage
    {
        /**
         * The actively focused Document object. This is usually the same as `document` but.
         * it will be different when using popout windows.
         *
         * @official
         */
        activeDocument: Document;

        /**
         * The actively focused Window object. This is usually the same as `window` but.
         * it will be different when using popout windows.
         *
         * @official
         */
        activeWindow: Window;

        /**
         * Global reference to the app.
         *
         * @unofficial
         * @deprecated - Prefer not to use this value directly.
         */
        app: App;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        bl: typeof Object.hasOwnProperty;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         * @hidden
         */
        blinkfetch: typeof fetch;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        blinkFormData: typeof FormData;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        blinkHeaders: typeof Headers;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        blinkRequest: typeof Request;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        blinkResponse: typeof Response;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        Capacitor: typeof Capacitor;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        CapacitorPlatforms: typeof CapacitorPlatforms;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        Cf: typeof Object.getOwnPropertyDescriptors;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        CodeMirror: typeof CodeMirror;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        CodeMirrorAdapter: CodeMirrorAdapterEx;

        /**
         * DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
         *
         * @unofficial
         */
        DOMPurify: typeof DOMPurify;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        El: typeof Object.propertyIsEnumerable;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        electron: typeof electron;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        electronWindow: ElectronWindow;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        frameDom: FrameDom;

        /**
         * Constructor for the Capacitor file system adapter.
         *
         * @unofficial
         */
        FS: CapacitorAdapterFsConstructor;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        i18next: typeof i18next;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        MathJax?: MathJax;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        mermaid?: Mermaid;

        /**
         * Parse, validate, manipulate, and display dates in javascript.
         *
         * @unofficial
         *
         * Commented out because the global variable is already declared in the `moment` package.
         */
        moment: typeof moment;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        mr: typeof Object.getOwnPropertySymbols;

        /**
         * Notification component. Use to present timely, high-value information.
         *
         * @unofficial
         */
        Notice: typeof Notice;

        /**
         * Invoke obsidian protocol action.
         *
         * @unofficial
         */
        OBS_ACT: ObsidianProtocolHandler;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        OBSIDIAN_DEFAULT_I18N: Localization;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        pdfjsLib: typeof pdfjsLib;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        pdfjsTestingUtils: PdfJsTestingUtils;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        PIXI: typeof PIXI;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        Prism?: typeof Prism;

        /**
         * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
         *
         * Returns the text value of the response.
         * @unofficial
         */
        request: typeof request;

        /**
         * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
         *
         * @unofficial
         */
        requestUrl: typeof requestUrl;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        scrypt: typeof scrypt;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        Sf: typeof Object.defineProperties;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        temp1: Database['changeVersion'];

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        titlebarStyle: string;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        TurndownService: typeof TurndownService;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        WebView: electron.WebviewTag;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        wf: typeof Object.defineProperty;

        /**
         * Sends an AJAX request.
         *
         * @param options - The options for the AJAX request.
         * @example
         * ```ts
         * ajax({
         *     url: 'https://example.com',
         *     success: (response) => {
         *         console.log(response);
         *     },
         *     error: (error) => {
         *         console.error(error);
         *     }
         * });
         * ```
         * @official
         */
        ajax(options: AjaxOptions): void;

        /**
         * Sends an AJAX request and returns a promise.
         *
         * @param options - The options for the AJAX request.
         * @returns A promise that resolves to the response.
         * @example
         * ```ts
         * const response = await ajaxPromise({ url: 'https://example.com' });
         * console.log(response);
         * ```
         * @official
         */
        ajaxPromise(options: AjaxOptions): Promise<any>;

        /**
         * Creates a new `<div>` element.
         *
         * @param o - The options object.
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * createDiv({ text: 'foo' }, (div) => {
         *     div.createEl('strong', { text: 'bar' });
         * });
         * ```
         * @official
         */
        createDiv(o?: DomElementInfo | string, callback?: (el: HTMLDivElement) => void): HTMLDivElement;

        /**
         * Creates a new element.
         *
         * @typeParam K - The type of the element to create.
         * @param tag - The tag name of the element to create.
         * @param o - The options object.
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * createEl('p', { text: 'foo' }, (p) => {
         *     p.createEl('strong', { text: 'bar' });
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
         * Creates a new document fragment.
         *
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * createFragment((fragment) => {
         *     fragment.createEl('p', { text: 'foo' });
         * });
         * ```
         * @official
         */
        createFragment(callback?: (el: DocumentFragment) => void): DocumentFragment;

        /**
         * Creates a new `<span>` element.
         *
         * @param o - The options object.
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * createSpan({ text: 'foo' }, (span) => {
         *     span.createEl('strong', { text: 'bar' });
         * });
         * ```
         * @official
         */
        createSpan(o?: DomElementInfo | string, callback?: (el: HTMLSpanElement) => void): HTMLSpanElement;

        /**
         * Creates a new svg element such as `<svg>`, `<circle>`, `<rect>`, etc.
         *
         * @param tag - The tag name of the element to create.
         * @param o - The options object.
         * @param callback - A callback function to be called when the element is created.
         * @returns The created element.
         * @example
         * ```ts
         * createSvg('svg', { cls: 'foo bar' }, (svg) => {
         *     svg.createSvg('circle');
         * });
         * ```
         * @official
         */
        createSvg<K extends keyof SVGElementTagNameMap>(
            tag: K,
            o?: SvgElementInfo | string,
            callback?: (el: SVGElementTagNameMap[K]) => void
        ): SVGElementTagNameMap[K];

        /**
         * Finds the first element that matches the selector.
         *
         * @param selector - The selector to find the element with.
         * @returns The first element that matches the selector, or `null` if no match is found.
         * @example
         * ```ts
         * const element = document.body.createEl('p');
         * element.createEl('strong', { cls: 'foo' });
         * console.log(fish('.foo')); // <strong class="foo"></span>
         * console.log(fish('.bar')); // null
         * ```
         * @official
         */
        fish(selector: string): HTMLElement | null;

        /**
         * Finds all elements that match the selector.
         *
         * @param selector - The selector to find the elements with.
         * @returns An array of all elements that match the selector.
         * @example
         * ```ts
         * const element = document.body.createEl('p');
         * element.createEl('strong', { cls: 'foo' });
         * element.createEl('strong', { cls: 'foo' });
         * console.log(fishAll('.foo')); // [<strong class="foo"></strong>, <strong class="foo"></strong>]
         * console.log(fishAll('.bar')); // []
         * ```
         * @official
         */
        fishAll(selector: string): HTMLElement[];

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        globalEnhance(): void;

        /**
         * vim.js based on https://github.com/codemirror/CodeMirror/commit/793c9e65e09ec7fba3f4f5aaf366b3d36e1a709e (2021-12-04)
         *
         * Modified from https://github.com/nightwing/cm6-vim-mode-experiment/blob/master/src/vim.js 103a9b5 2021-12-03
         *
         * CodeMirror, copyright (c) by Marijn Haverbeke and others
         *
         * Distributed under an MIT license: https://codemirror.net/5/LICENSE
         *
         * Supported keybindings:
         *   Too many to list. Refer to defaultKeymap below.
         *
         * Supported Ex commands:
         *   Refer to defaultExCommandMap below.
         *
         * Registers: unnamed, -, ., :, /, _, a-z, A-Z, 0-9
         *   (Does not respect the special case for number registers when delete
         *    operator is made with these commands: %, (, ),  , /, ?, n, N, {, } )
         *   TODO: Implement the remaining registers.
         *
         * Marks: a-z, A-Z, and 0-9
         *   TODO: Implement the remaining special marks. They have more complex
         *       behavior.
         *
         * Events:
         *  'vim-mode-change' - raised on the editor anytime the current mode changes,
         *                      Event object: {mode: "visual", subMode: "linewise"}
         *
         * Code structure:
         *  1. Default keymap
         *  2. Variable declarations and short basic helpers
         *  3. Instance (External API) implementation
         *  4. Internal state tracking objects (input state, counter) implementation
         *     and instantiation
         *  5. Key handler (the main command dispatcher) implementation
         *  6. Motion, operator, and action implementations
         *  7. Helper functions for the key handler, motions, operators, and actions
         *  8. Set up Vim to work as a keymap for CodeMirror.
         *  9. Ex command implementations.
         *
         * @unofficial
         */
        initVimMode(CodeMirror: CodeMirrorAdapterEx): VimApi;

        /**
         * Checks if the given object is a boolean.
         *
         * @param obj - The object to check.
         * @returns `true` if the object is a boolean, `false` otherwise.
         * @example
         * ```ts
         * console.log(isBoolean(false)); // true
         * console.log(isBoolean('not a boolean')); // false
         * ```
         * @official
         */
        isBoolean(obj: any): obj is boolean;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        li(target: object, source: object): object;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        mo(target: object, propertyNames: string[]): object;

        /**
         * Waits for the next frame.
         *
         * @returns A promise that resolves after the next frame.
         * @example
         * ```ts
         * await nextFrame();
         * ```
         * @official
         */
        nextFrame(): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        openDatabase(
            name: string,
            version: string,
            displayName: string,
            estimatedSize: number,
            creationCallback?: (database: Database) => void
        ): Database;

        /**
         * Executes a function when the DOM is ready.
         *
         * @param fn - The function to execute when the DOM is ready.
         * @example
         * ```ts
         * ready(() => {
         *     console.log('DOM is ready');
         * });
         * @official
         */
        ready(fn: () => any): void;

        /**
         * Select a language file location.
         *
         * @unofficial
         */
        selectLanguageFileLocation(): void;

        /**
         * Sleeps for a given number of milliseconds.
         *
         * @param ms - The number of milliseconds to sleep.
         * @returns A promise that resolves after the given number of milliseconds.
         * @example
         * ```ts
         * await sleep(1000);
         * ```
         * @official
         */
        sleep(ms: number): Promise<void>;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        St(target: object, source: object | undefined): object;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        Tl(target: object, propertyName: string, propertyValue: unknown): unknown;
    }
}
