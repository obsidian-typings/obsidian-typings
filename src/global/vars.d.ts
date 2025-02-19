import {
    Capacitor as _Capacitor,
    CapacitorPlatforms as _CapacitorPlatforms
} from '@capacitor/core';
import _i18next from 'i18next';
import type {
    App,
    Notice as _Notice,
    ObsidianProtocolData,
    request as _request,
    requestUrl as _requestUrl
} from 'obsidian';
import _TurndownService from 'turndown';
import type { CodeMirrorAdapterEx } from '../@codemirror__view/internals/CodeMirrorAdapterEx.d.ts';
import type { VimApi } from '../@codemirror__view/internals/Vim/VimApi.d.ts';
import type { CapacitorAdapterFs } from '../obsidian/internals/CapacitorAdapterFs.d.ts';
import type { ElectronWindow } from '../obsidian/internals/ElectronWindow.d.ts';
import type { FrameDom } from '../obsidian/internals/FrameDom.d.ts';
import type { Localization } from '../obsidian/internals/Localization.d.ts';
import type { Database } from '../obsidian/internals/WebSQL/Database.d.ts';

declare global {
    /**
     * Global reference to the app
     * @public
     * @deprecated - Prefer not to use this value directly.
     */
    var app: App;

    /**
     * @public
     */
    var bl: typeof Object.hasOwnProperty;

    /**
     * @public
     */
    var blinkfetch: typeof fetch;

    /**
     * @public
     */
    var blinkFormData: typeof FormData;

    /**
     * @public
     */
    var blinkHeaders: typeof Headers;

    /**
     * @public
     */
    var blinkRequest: typeof Request;

    /**
     * @public
     */
    var blinkResponse: typeof Response;

    /**
     * @public
     */
    var Capacitor: typeof _Capacitor;

    /**
     * @public
     */
    var CapacitorPlatforms: typeof _CapacitorPlatforms;

    /**
     * @public
     */
    var Cf: typeof Object.getOwnPropertyDescriptors;

    /**
     * @public
     *
     * Commented out because the global variable is already declared in the `@types/codemirror` package.
     */
    // var CodeMirror: typeof import('codemirror');

    /**
     * @public
     */
    var CodeMirrorAdapter: CodeMirrorAdapterEx;

    /**
     * DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
     * @public
     *
     * Commented out because the global variable is already declared in the `@types/dompurify` package.
     */
    // var DOMPurify: typeof import('dompurify);

    /**
     * @public
     */
    var El: typeof Object.propertyIsEnumerable;

    /**
     * @public
     */
    var electron: typeof import('electron');

    /**
     * @public
     */
    var electronWindow: ElectronWindow;

    /**
     * @public
     */
    var frameDom: FrameDom;

    /**
     * Constructor for the Capacitor file system adapter.
     * @public
     */
    var FS: new(dir: string) => CapacitorAdapterFs;

    /**
     * @public
     */
    var globalEnhance: () => void;

    /**
     * @public
     */
    var i18next: typeof _i18next & {
        observers: object;
        isLanguageChangingTo: string | undefined;
        logger: unknown;
        translator: unknown;
    };

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
    var initVimMode: (CodeMirror: CodeMirrorAdapterEx) => VimApi;

    /**
     * @public
     */
    var li: (target: object, source: object) => object;

    /**
     * @public
     */
    var mo: (target: object, propertyNames: string[]) => object;

    /**
     * Parse, validate, manipulate, and display dates in javascript.
     * @public
     *
     * Commented out because the global variable is already declared in the `moment` package.
     */
    // var moment: typeof import('moment');

    /**
     * @public
     */
    var mr: typeof Object.getOwnPropertySymbols;

    /**
     * Notification component. Use to present timely, high-value information.
     * @public
     */
    /**
     * @public
     */
    var Notice: typeof _Notice;

    /**
     * Invoke obsidian protocol action.
     * @public
     */
    var OBS_ACT: (obsidianProtocolData: ObsidianProtocolData) => void;

    /**
     * @public
     */
    var OBSIDIAN_DEFAULT_I18N: Localization;

    /**
     * @public
     */
    var openDatabase: (
        name: string,
        version: string,
        displayName: string,
        estimatedSize: number,
        creationCallback?: (database: Database) => void
    ) => Database;

    /**
     * @public
     *
     * Commented out because the global variable is already declared in the `@types/pixi.js` package.
     */
    // var PIXI: typeof import('pixi.js');

    /**
     * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
     * Returns the text value of the response.
     * @public
     */
    var request: typeof _request;

    /**
     * Similar to `fetch()`, request a URL using HTTP/HTTPS, without any CORS restrictions.
     * @public
     */
    var requestUrl: typeof _requestUrl;

    /**
     * @public
     *
     * Commented out because the global variable is already declared in the `scrypt-js` package.
     */
    // var scrypt: typeof import('scrypt-js');

    /**
     * Select a language file location.
     * @public
     */
    var selectLanguageFileLocation: () => void;

    /**
     * @public
     */
    var Sf: typeof Object.defineProperties;

    /**
     * @public
     */
    var St: (target: object, source: object | undefined) => object;

    /**
     * @public
     */
    var temp1: Database['changeVersion'];

    /**
     * @public
     */
    var titlebarStyle: string;

    /**
     * @public
     */
    var Tl: (target: object, propertyName: string, propertyValue: unknown) => unknown;

    /**
     * @public
     */
    var TurndownService: typeof _TurndownService;

    /**
     * @public
     */
    var WebView: HTMLElement & { new(): HTMLElement };

    /**
     * @public
     */
    var wf: typeof Object.defineProperty;
}
