import type { StateField } from '@codemirror/state';
import type {
    EditorView,
    ViewPlugin
} from '@codemirror/view';
import type { default as moment } from 'moment';
import type { PlatformEx } from '../internals/PlatformEx.d.ts';

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
    const moment__: typeof moment;

    /**
     * Information about the current platform.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Platform} instead.
     */
    const Platform__: PlatformEx;
}
