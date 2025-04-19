import type {
    Capacitor as _Capacitor,
    CapacitorPlatforms as _CapacitorPlatforms
} from '@capacitor/core';
import type { default as CodeMirror } from 'codemirror';
import type { default as DOMPurify } from 'dompurify';
import type * as electron from 'electron';
import type { default as i18next } from 'i18next';
import type { Mermaid } from 'mermaid';
import type { default as moment } from 'moment';
import type {
    App,
    Notice as _Notice,
    ObsidianProtocolHandler,
    request as _request,
    requestUrl as _requestUrl
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
import type { PdfJsTestingUtils } from '../../obsidian/internals/PdfJs/PdfJsTestingUtils.js';
import type { Database } from '../../obsidian/internals/WebSQL/Database.d.ts';

export {};

declare global {
    interface Window {
        /**
         * Global reference to the app.
         * @public @unofficial
         * @deprecated - Prefer not to use this value directly.
         */
        app: App;
        /** @public @unofficial */
        bl: typeof Object.hasOwnProperty;
        /** @public @unofficial */
        blinkfetch: typeof fetch;
        /** @public @unofficial */
        blinkFormData: typeof FormData;
        /** @public @unofficial */
        blinkHeaders: typeof Headers;
        /** @public @unofficial */
        blinkRequest: typeof Request;
        /** @public @unofficial */
        blinkResponse: typeof Response;
        /** @public @unofficial */
        Capacitor: typeof _Capacitor;
        /** @public @unofficial */
        CapacitorPlatforms: typeof _CapacitorPlatforms;
        /** @public @unofficial */
        Cf: typeof Object.getOwnPropertyDescriptors;
        /** @public @unofficial */
        CodeMirror: typeof CodeMirror;
        /** @public @unofficial */
        CodeMirrorAdapter: CodeMirrorAdapterEx;
        /**
         * DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
         * @public @unofficial
         */
        DOMPurify: typeof DOMPurify;
        /** @public @unofficial */
        El: typeof Object.propertyIsEnumerable;
        /** @public @unofficial */
        electron: typeof electron;
        /** @public @unofficial */
        electronWindow: ElectronWindow;
        /** @public @unofficial */
        frameDom: FrameDom;
        /**
         * Constructor for the Capacitor file system adapter.
         * @public @unofficial
         */
        FS: CapacitorAdapterFsConstructor;
        /** @public @unofficial */
        i18next: typeof i18next;
        /** @public @unofficial */
        MathJax?: MathJax;
        /** @public @unofficial */
        mermaid?: Mermaid;
        /**
         * Parse, validate, manipulate, and display dates in javascript.
         * @public @unofficial
         *
         * Commented out because the global variable is already declared in the `moment` package.
         */
        moment: typeof moment;
        /** @public @unofficial */
        mr: typeof Object.getOwnPropertySymbols;
        /**
         * Notification component. Use to present timely, high-value information.
         * @public @unofficial
         */
        Notice: typeof _Notice;
        /**
         * Invoke obsidian protocol action.
         * @public @unofficial
         */
        OBS_ACT: ObsidianProtocolHandler;
        /** @public @unofficial */
        OBSIDIAN_DEFAULT_I18N: Localization;
        /** @public @unofficial */
        pdfjsLib: typeof pdfjsLib;
        /** @public @unofficial */
        pdfjsTestingUtils: PdfJsTestingUtils;
        /** @public @unofficial */
        PIXI: typeof PIXI;
        /** @public @unofficial */
        Prism?: typeof Prism;
        /**
         * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
         * Returns the text value of the response.
         * @public @unofficial
         */
        request: typeof _request;
        /**
         * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
         * @public @unofficial
         */
        requestUrl: typeof _requestUrl;
        /** @public @unofficial */
        scrypt: typeof scrypt;
        /** @public @unofficial */
        Sf: typeof Object.defineProperties;
        /** @public @unofficial */
        temp1: Database['changeVersion'];
        /** @public @unofficial */
        titlebarStyle: string;
        /** @public @unofficial */
        TurndownService: typeof TurndownService;
        /** @public @unofficial */
        WebView: electron.WebviewTag;
        /** @public @unofficial */
        wf: typeof Object.defineProperty;

        /** @public @unofficial */
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
         * @public @unofficial
         */
        initVimMode(CodeMirror: CodeMirrorAdapterEx): VimApi;
        /** @public @unofficial */
        li(target: object, source: object): object;
        /** @public @unofficial */
        mo(target: object, propertyNames: string[]): object;
        /** @public @unofficial */
        openDatabase(
            name: string,
            version: string,
            displayName: string,
            estimatedSize: number,
            creationCallback?: (database: Database) => void
        ): Database;
        /**
         * Select a language file location.
         * @public @unofficial
         */
        selectLanguageFileLocation(): void;
        /** @public @unofficial */
        St(target: object, source: object | undefined): object;
        /** @public @unofficial */
        Tl(target: object, propertyName: string, propertyValue: unknown): unknown;
    }
}
