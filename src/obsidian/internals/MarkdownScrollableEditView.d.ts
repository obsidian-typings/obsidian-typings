import type { Extension } from "@codemirror/state";
import type { ViewUpdate } from "@codemirror/view";
import type { Scope } from "obsidian";
import type { EditorSearchComponent } from "./EditorSearchComponent.js";
import type { MarkdownBaseView } from "./MarkdownBaseView.js";

/** @public */
export interface MarkdownScrollableEditView extends MarkdownBaseView {
    /**
     * List of CSS classes applied to the editor
     */
    cssClasses: [];
    /**
     * Whether the editor is currently scrolling
     */
    isScrolling: boolean;
    /**
     * Scope for the search component, if exists
     */
    scope: Scope | undefined;
    /**
     * Search component for the editor, provides highlight and search functionality
     */
    search: EditorSearchComponent;
    /**
     * Container for the editor, handles editor size
     */
    sizerEl: HTMLElement;

    /**
     * Set the scroll count of the editor scrollbar
     */
    applyScroll(scroll: number): void;
    /**
     * Constructs local (always active) extensions for the editor
     *
     * @remark Creates extensions for list indentation, tab indentations
     */
    buildLocalExtensions(): Extension[];
    /**
     * Focus the editor (and for mobile: render keyboard)
     */
    focus(): void;
    /**
     * Constructs extensions for the editor based on user settings
     *
     * @remark Creates toggleable extensions for showing line numbers, indentation guides,
     *          folding, brackets pairing and properties rendering
     */
    getDynamicExtensions(): Extension[];
    /**
     * Get the current scroll count of the editor scrollbar
     */
    getScroll(): number;
    /**
     * Invokes onMarkdownScroll on scroll
     */
    handleScroll(): void;
    /**
     * Hides the editor (sets display: none)
     */
    hide(): void;
    /**
     * Clear editor cache and refreshes editor on app css change
     */
    onCssChange(): void;
    /**
     * Update editor size and bottom padding on resize
     */
    onResize(): void;
    /**
     * Update editor suggest position and invokes handleScroll on scroll
     */
    onScroll(): void;
    /**
     * Execute functionality on CM editor state update
     */
    onUpdate(update: ViewUpdate, changed: boolean): void;
    /**
     * Close editor suggest and removes highlights on click
     */
    onViewClick(event?: MouseEvent): void;
    /**
     * Add classes to the editor, functions as a toggle
     */
    setCssClass(classes: string[]): void;
    /**
     * Reveal the editor (sets display: block)
     */
    show(): void;
    /**
     * Reveal the search (and replace) component
     */
    showSearch(replace: boolean): void;
    /**
     * Update the bottom padding of the CodeMirror contentdom
     */
    updateBottomPadding(height: number): void;
}
