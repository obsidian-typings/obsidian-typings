import type {
    EditorSuggest,
    TFile
} from 'obsidian';
import type { MarkdownBaseView } from './MarkdownBaseView.d.ts';

/** @public */
export interface EditorSuggests {
    /**
     * Currently active and rendered editor suggestion popup
     */
    currentSuggest: null | EditorSuggest<unknown>;
    /**
     * Registered editor suggestions
     *
     * @remark Used for providing autocompletions for specific strings
     * @tutorial Reference official documentation under EditorSuggest<T> for usage
     */
    suggests: EditorSuggest<unknown>[];

    /**
     * Add a new editor suggestion to the list of registered suggestion providers
     */
    addSuggest(suggest: EditorSuggest<unknown>): void;
    /**
     * Close the currently active editor suggestion popup
     */
    close(): void;
    /**
     * Whether there is a editor suggestion popup active and visible
     */
    isShowingSuggestion(): boolean;
    /**
     * Remove a registered editor suggestion from the list of registered suggestion providers
     */
    removeSuggest(suggest: EditorSuggest<unknown>): void;
    /**
     * Update position of currently active and rendered editor suggestion popup
     */
    reposition(): void;
    /**
     * Set the currently active editor suggestion popup to specified suggester
     */
    setCurrentSuggest(suggest: EditorSuggest<unknown>): void;
    /**
     * Run check on focused editor to see whether a suggestion should be triggered and rendered
     */
    trigger(editor: MarkdownBaseView, t: TFile, n: boolean): void;
}
