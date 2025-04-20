import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';
import type { FoldInfo } from '../internals/FoldInfo.d.ts';
import type { MarkdownEditViewEphemeralState } from '../internals/MarkdownEditViewEphemeralState.d.ts';
import type { MarkdownScrollableEditView } from '../internals/MarkdownScrollableEditView.d.ts';
import type { SetHighlightMatch } from '../internals/SetHighlightMatch.d.ts';

export {};

declare module 'obsidian' {
    interface MarkdownEditView extends MarkdownSubView, HoverParent, MarkdownFileInfo, MarkdownScrollableEditView {
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
         * Save functionality to execute before editor view unload.
         *
         * @unofficial
         */
        beforeUnload(): void;

        /**
         * Clear the editor view.
         *
         * @unofficial
         */
        clear(): void;

        /**
         * Destroy/Detach the editor view.
         *
         * @unofficial
         */
        destroy(): void;

        /**
         * Constructs extensions for the editor based on user settings.
         *
         * @remark Creates extension for properties rendering.
         * @unofficial
         */
        getDynamicExtensions(): Extension[];

        /**
         * Gets the ephemeral (non-persistent) state of the editor.
         *
         * @unofficial
         */
        getEphemeralState(state: unknown): MarkdownEditViewEphemeralState;

        /**
         * Get the current folds of the editor.
         *
         * @unofficial
         */
        getFoldInfo(): null | FoldInfo;

        /**
         * Get the main selected range as string.
         *
         * @unofficial
         */
        getSelection(): string;

        /**
         * Add highlights for specified ranges.
         *
         * @remark Only ranges parameter is used.
         * @unofficial
         */
        highlightSearchMatches(
            ranges: EditorRange[],
            style?: 'is-flashing' | 'obsidian-search-match-highlight',
            remove_previous?: boolean,
            range?: EditorSelection
        ): void;

        /**
         * Execute functionality on CM editor state update.
         *
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
         * @unofficial
         */
        requestSaveFolds(): unknown;

        /**
         * Set the state of the editor.
         *
         * @unofficial
         */
        set(data: string, clear: boolean): void;

        /**
         * Set the ephemeral (non-persistent) state of the editor.
         *
         * @unofficial
         */
        setEphemeralState(state: unknown): void;

        /**
         * Set highlight of any search match.
         *
         * @unofficial
         */
        setHighlight(match: SetHighlightMatch): void;

        /**
         * Set the state of the editor (applies selections, scrolls, ...).
         *
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
