import type {
    Capacitor as _Capacitor,
    CapacitorPlatforms as _CapacitorPlatforms
} from '@capacitor/core';
import type { default as CodeMirror } from 'codemirror';
import type { default as DOMPurify } from 'dompurify';
import type * as electron from 'electron';
import type { default as i18next } from 'i18next';
import type { default as moment } from 'moment';
import type {
    App,
    Notice as _Notice,
    ObsidianProtocolHandler,
    request as _request,
    requestUrl as _requestUrl
} from 'obsidian';
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
import type { Database } from '../../obsidian/internals/WebSQL/Database.d.ts';

export {};

declare global {
    interface Window {
        /**
         * Global reference to the app
         * @public
         * @deprecated - Prefer not to use this value directly.
         */
        app: App;
        /** @public */
        bl: typeof Object.hasOwnProperty;
        /** @public */
        blinkfetch: typeof fetch;
        /** @public */
        blinkFormData: typeof FormData;
        /** @public */
        blinkHeaders: typeof Headers;
        /** @public */
        blinkRequest: typeof Request;
        /** @public */
        blinkResponse: typeof Response;
        /** @public */
        Capacitor: typeof _Capacitor;
        /** @public */
        CapacitorPlatforms: typeof _CapacitorPlatforms;
        /** @public */
        Cf: typeof Object.getOwnPropertyDescriptors;
        /** @public */
        CodeMirror: typeof CodeMirror;
        /** @public */
        CodeMirrorAdapter: CodeMirrorAdapterEx;
        /**
         * DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
         * @public
         */
        DOMPurify: typeof DOMPurify;
        /** @public */
        El: typeof Object.propertyIsEnumerable;
        /** @public */
        electron: typeof electron;
        /** @public */
        electronWindow: ElectronWindow;
        /** @public */
        frameDom: FrameDom;
        /**
         * Constructor for the Capacitor file system adapter.
         * @public
         */
        FS: CapacitorAdapterFsConstructor;
        /** @public */
        i18next: typeof i18next;
        /** @public */
        MathJax?: MathJax;
        /**
         * Parse, validate, manipulate, and display dates in javascript.
         * @public
         *
         * Commented out because the global variable is already declared in the `moment` package.
         */
        moment: typeof moment;
        /** @public */
        mr: typeof Object.getOwnPropertySymbols;
        /**
         * Notification component. Use to present timely, high-value information.
         * @public
         */
        Notice: typeof _Notice;
        /**
         * Invoke obsidian protocol action.
         * @public
         */
        OBS_ACT: ObsidianProtocolHandler;
        /** @public */
        OBSIDIAN_DEFAULT_I18N: Localization;
        /** @public */
        PIXI: typeof PIXI;
        /**
         * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
         * Returns the text value of the response.
         * @public
         */
        request: typeof _request;
        /**
         * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
         * @public
         */
        requestUrl: typeof _requestUrl;
        /** @public */
        scrypt: typeof scrypt;
        /** @public */
        Sf: typeof Object.defineProperties;
        /** @public */
        temp1: Database['changeVersion'];
        /** @public */
        titlebarStyle: string;
        /** @public */
        TurndownService: typeof TurndownService;
        /** @public */
        WebView: electron.WebviewTag;
        /** @public */
        wf: typeof Object.defineProperty;

        /** @public */
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
         * @public
         */
        initVimMode(CodeMirror: CodeMirrorAdapterEx): VimApi;
        /** @public */
        li(target: object, source: object): object;
        /** @public */
        mo(target: object, propertyNames: string[]): object;
        /** @public */
        openDatabase(
            name: string,
            version: string,
            displayName: string,
            estimatedSize: number,
            creationCallback?: (database: Database) => void
        ): Database;
        /**
         * Select a language file location.
         * @public
         */
        selectLanguageFileLocation(): void;
        /** @public */
        St(target: object, source: object | undefined): object;
        /** @public */
        Tl(target: object, propertyName: string, propertyValue: unknown): unknown;
    }
}
