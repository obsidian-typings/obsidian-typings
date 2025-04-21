import type { StateField } from '@codemirror/state';
import type {
    EditorView,
    ViewPlugin
} from '@codemirror/view';
import type * as Moment from 'moment';

export {};

declare module 'obsidian' {
    /**
     * This is the API version of the app, which follows the release cycle of the desktop app.
     * Example: '0.13.21'
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link apiVersion} instead.
     */
    let apiVersion__: string;

    /**
     * Use this `CodeMirror` {@link StateField} to get a reference to the {@link EditorView}
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link editorEditorField} instead.
     */
    const editorEditorField__: StateField<EditorView>;

    /**
     * Use this `CodeMirror` {@link StateField} to get {@link MarkdownFileInfo} about this Markdown editor, such as the associated file, or the Editor.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link editorInfoField} instead.
     */
    const editorInfoField__: StateField<MarkdownFileInfo>;

    /**
     * Use this `CodeMirror` {@link StateField} to check whether `Live Preview` is active
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link editorLivePreviewField} instead.
     */
    const editorLivePreviewField__: StateField<boolean>;

    /**
     * This is now deprecated - it is now mapped directly to {@link editorInfoField}, which return a {@link MarkdownFileInfo}, which may be a {@link MarkdownView} but not necessarily.
     *
     * @official
     * @deprecated - use {@link editorInfoField} instead.
     * @deprecated - Added only for typing purposes. Use {@link editorViewField} instead.
     */
    const editorViewField__: StateField<MarkdownFileInfo>;

    /**
     * `CodeMirror` {@link ViewPlugin} for `Live Preview`.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link livePreviewState} instead.
     */
    const livePreviewState__: ViewPlugin<LivePreviewStateType>;

    /**
     * An instance of `Moment.js` library.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link moment} instead.
     */
    const moment__: typeof Moment;

    /**
     * Information about the current platform.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Platform} instead.
     */
    const Platform__: {
        /**
         * The UI is in desktop mode.
         *
         * @official
         */
        isDesktop: boolean;
        /**
         * The UI is in mobile mode.
         *
         * @official
         */
        isMobile: boolean;
        /**
         * We're running the `Electron`-based desktop app.
         *
         * @official
         */
        isDesktopApp: boolean;
        /**
         * We're running the `Capacitor` mobile app.
         *
         * @official
         */
        isMobileApp: boolean;
        /**
         * We're running the `iOS` app.
         *
         * @official
         */
        isIosApp: boolean;
        /**
         * We're running the `Android` app.
         *
         * @official
         */
        isAndroidApp: boolean;
        /**
         * We're in a mobile app that has very limited screen space.
         *
         * @official
         */
        isPhone: boolean;
        /**
         * We're in a mobile app that has sufficiently large screen space.
         * @official
         */
        isTablet: boolean;
        /**
         * We're on a macOS device, or a device that pretends to be one (like iPhones and iPads).
         * Typically used to detect whether to use command-based hotkeys vs ctrl-based hotkeys.
         *
         * @official
         */
        isMacOS: boolean;
        /**
         * We're on a Windows device.
         *
         * @official
         */
        isWin: boolean;
        /**
         * We're on a Linux device.
         *
         * @official
         */
        isLinux: boolean;
        /**
         * We're running in Safari.
         * Typically used to provide workarounds for Safari bugs.
         *
         * @official
         */
        isSafari: boolean;
        /**
         * The path prefix for resolving local files on this platform.
         * This returns:
         * - `file:///` on mobile
         * - `app://random-id/` on desktop (Replaces the old format of `app://local/`)
         *
         * @official
         */
        resourcePathPrefix: string;
    };
}
