import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';
import type { FoldInfo } from '../internals/FoldInfo.d.ts';
import type { MarkdownEditViewEphemeralState } from '../internals/MarkdownEditViewEphemeralState.d.ts';
import type { MarkdownScrollableEditView } from '../internals/MarkdownScrollableEditView.d.ts';
import type { SetHighlightMatch } from '../internals/SetHighlightMatch.d.ts';

export {};

declare module 'obsidian' {
    /**
     * This is the editor for Obsidian Mobile as well as the upcoming WYSIWYG editor.
     */
    interface MarkdownEditView extends MarkdownSubView, HoverParent, MarkdownFileInfo, MarkdownScrollableEditView {
        /**
         * The Obsidian app instance.
         *
         * @official
         */
        app: App;

        /**
         * The hover popover.
         *
         * @official
         */
        hoverPopover: HoverPopover;

        /**
         * Frontmatter editor extension for the editor.
         *
         * @unofficial
         */
        propertiesExtension: Extension[];

        /**
         * Editing mode of the editor.
         *
         * @unofficial
         */
        type: 'source';

        /**
         * View the source view editor is attached to.
         *
         * @unofficial
         */
        view: MarkdownView;

        /**
         * Apply the scroll position to the edit view.
         *
         * @param scroll - The scroll position to apply.
         * @example
         * ```ts
         * markdownEditView.applyScroll(100);
         * ```
         * @official
         */
        applyScroll(scroll: number): void;

        /**
         * Save functionality to execute before editor view unload.
         *
         * @unofficial
         */
        beforeUnload(): void;

        /**
         * Clear the markdown edit view.
         *
         * @example
         * ```ts
         * markdownEditView.clear();
         * ```
         * @official
         */
        clear(): void;

        /**
         * Create a new markdown edit view.
         *
         * @param view - The markdown view.
         * @returns The markdown edit view instance.
         * @official
         * @deprecated - Added only for typing purposes. Use `ExtractConstructor<MarkdownEditView>` or `getMarkdownEditViewConstructor()` instead.
         */
        constructor__(view: MarkdownView): this;

        /**
         * Destroy/Detach the editor view.
         *
         * @unofficial
         */
        destroy(): void;

        /**
         * Get the file associated with the edit view.
         *
         * @example
         * ```ts
         * console.log(markdownEditView.file);
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link file} instead.
         */
        file__?(): TFile;

        /**
         * Get the markdown content of the edit view.
         *
         * @returns The markdown content.
         * @official
         */
        get(): string;

        /**
         * Constructs extensions for the editor based on user settings.
         *
         * @returns The dynamic editor extensions.
         * @remark Creates extension for properties rendering.
         * @unofficial
         */
        getDynamicExtensions(): Extension[];

        /**
         * Gets the ephemeral (non-persistent) state of the editor.
         *
         * @param state - The state to get ephemeral state from.
         * @returns The ephemeral state.
         * @unofficial
         */
        getEphemeralState(state: unknown): MarkdownEditViewEphemeralState;

        /**
         * Get the current folds of the editor.
         *
         * @returns The fold info or `null`.
         * @unofficial
         */
        getFoldInfo(): null | FoldInfo;

        /**
         * Get the scroll position of the edit view.
         *
         * @returns The scroll position.
         * @official
         */
        getScroll(): number;

        /**
         * Get the selection of the edit view.
         *
         * @returns The selected text.
         * @official
         */
        getSelection(): string;

        /**
         * Add highlights for specified ranges.
         *
         * @param ranges - The ranges to highlight.
         * @param style - The highlight style class.
         * @param removePrevious - Whether to remove previous highlights.
         * @param range - The editor selection range.
         * @remark Only ranges parameter is used.
         * @unofficial
         */
        highlightSearchMatches(
            ranges: EditorRange[],
            style?: 'is-flashing' | 'obsidian-search-match-highlight',
            removePrevious?: boolean,
            range?: EditorSelection
        ): void;

        /**
         * Execute functionality on CM editor state update.
         *
         * @param update - The CodeMirror view update.
         * @param changed - Whether the document changed.
         * @unofficial
         */
        onUpdate(update: ViewUpdate, changed: boolean): void;

        /**
         * Debounced onInternalDataChange of view.
         *
         * @unofficial
         */
        requestOnInternalDataChange(): void;

        /**
         * Debounced onMarkdownFold of view.
         *
         * @returns The result of the debounced fold save operation.
         * @unofficial
         */
        requestSaveFolds(): unknown;

        /**
         * Set the markdown content of the edit view.
         *
         * @param data - The markdown content.
         * @param clear - Whether to clear the content before setting it.
         * @example
         * ```ts
         * markdownEditView.set('**foo** bar', true);
         * ```
         * @official
         */
        set(data: string, clear: boolean): void;

        /**
         * Set the ephemeral (non-persistent) state of the editor.
         *
         * @param state - The ephemeral state to set.
         * @unofficial
         */
        setEphemeralState(state: unknown): void;

        /**
         * Set highlight of any search match.
         *
         * @param match - The match to highlight.
         * @unofficial
         */
        setHighlight(match: SetHighlightMatch): void;

        /**
         * Set the state of the editor (applies selections, scrolls, ...).
         *
         * @param state - The state to apply.
         * @unofficial
         */
        setState(state: unknown): void;

        /**
         * Render the editor and the metadata-editor element.
         *
         * @unofficial
         */
        show(): void;

        /**
         * Update the bottom padding of the CodeMirror contentdom (based on backlinksEl).
         *
         * @param height - The padding height in pixels.
         * @unofficial
         */
        updateBottomPadding(height: number): void;

        /**
         * Update options of the editor from settings.
         *
         * @unofficial
         */
        updateOptions(): void;
    }
}
