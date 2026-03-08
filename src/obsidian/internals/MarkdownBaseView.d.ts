import type { Extension } from '@codemirror/state';
import type {
    EditorView,
    ViewUpdate
} from '@codemirror/view';
import type {
    App,
    Component,
    Editor,
    MarkdownFileInfo,
    TFile
} from 'obsidian';
import type { ClipboardManager } from './ClipboardManager.d.ts';
import type { EditorSuggests } from './EditorSuggests.d.ts';
import type { FoldInfo } from './FoldInfo.d.ts';
import type { TableCell } from './TableCell.d.ts';
import type { TableCellEditor } from './TableCellEditor.d.ts';
import type { TableEditor } from './TableEditor.d.ts';
import type { Token } from './Token.d.ts';

/**
 * Base interface for markdown editor views, providing CodeMirror integration and editing capabilities.
 * @public
 * @unofficial
 */
export interface MarkdownBaseView extends Component {
    /**
     * Currently active CM instance (table cell CM or main CM).
     *
     * @returns The active CodeMirror editor view.
     */
    get activeCM(): EditorView;

    /**
     * Reference to the app.
     */
    app: App;

    /**
     * Apply fold history to editor.
     *
     * @param info - Fold information to apply.
     */
    applyFoldInfo(info: FoldInfo): void;

    /**
     * Constructs local (always active) extensions for the editor.
     *
     * @returns Array of CodeMirror extensions.
     * @remark Creates extensions for handling dom events, editor info state fields, update listener, suggestions.
     */
    buildLocalExtensions(): Extension[];

    /**
     * Callback to clear all elements.
     */
    cleanupLivePreview: null | (() => void);

    /**
     * Cleanup live preview, remove and then re-add all editor extensions.
     */
    clear(): void;

    /**
     * Manager that handles pasting text, html and images into the editor.
     */
    clipboardManager: ClipboardManager;

    /**
     * Codemirror editor instance.
     */
    cm: EditorView;

    /**
     * Whether CodeMirror is initialized.
     */
    cmInit: boolean;

    /**
     * Container element of the editor view.
     */
    containerEl: HTMLElement;

    /**
     * Popup element for internal link.
     */
    cursorPopupEl: HTMLElement | null;

    /**
     * Clean up live preview, remove all extensions, destroy editor.
     */
    destroy(): void;

    /**
     * Removes specified tablecell.
     *
     * @param cell - Table cell editor to destroy.
     */
    destroyTableCell(cell?: TableCellEditor): void;

    /**
     * Obsidian editor instance.
     *
     * @remark Handles formatting, table creation, highlight adding, etc.
     */
    editor?: Editor;

    /**
     * Element in which the CodeMirror editor resides.
     */
    editorEl: HTMLElement;

    /**
     * Editor suggester for autocompleting files, links, aliases, etc.
     */
    editorSuggest: EditorSuggests;

    /**
     * Edit a specified table cell, creating a table cell editor.
     *
     * @param cell - Table editor owning the cell.
     * @param newCell - Table cell to edit.
     * @returns The created table cell editor.
     */
    editTableCell(cell: TableEditor, newCell: TableCell): TableCellEditor;

    /**
     * Returns attached file of the owner instance.
     *
     * @returns The attached file, or `null`.
     */
    get file(): TFile | null;

    /**
     * Get the current editor document as a string.
     *
     * @returns The editor document content.
     */
    get(): string;

    /**
     * Constructs extensions for the editor based on user settings.
     *
     * @returns Array of dynamic CodeMirror extensions.
     * @remark Creates extension for tab size, RTL rendering, spellchecking, pairing markdown syntax, live preview and vim.
     */
    getDynamicExtensions(): Extension[];

    /**
     * Get the current folds of the editor.
     *
     * @returns Current fold information, or `null`.
     */
    getFoldInfo(): null | FoldInfo;

    /**
     * Builds all local extensions and assigns to `this.localExtensions`.
     *
     * @returns The local extensions.
     * @remark Will build extensions if they were not already built.
     */
    getLocalExtensions(): unknown;

    /**
     * The CodeMirror plugins that handle the rendering of, and interaction with Obsidian's Markdown.
     */
    livePreviewPlugin: Extension[];

    /**
     * Local (always active) extensions for the editor.
     */
    localExtensions: Extension[];

    /**
     * Creates menu on right mouse click.
     *
     * @param event - The pointer event.
     * @param x - Whether the context menu was triggered by keyboard.
     * @returns A promise that resolves when the context menu is handled.
     */
    onContextMenu(event: PointerEvent, x: boolean): Promise<void>;

    /**
     * Execute click functionality on token on mouse click.
     *
     * @param event - The mouse event.
     * @param element - The clicked element.
     */
    onEditorClick(event: MouseEvent, element?: HTMLElement): void;

    /**
     * Execute drag functionality on drag start.
     *
     * @param event - The drag event.
     * @remark Interfaces with dragManager.
     */
    onEditorDragStart(event: DragEvent): void;

    /**
     * Execute hover functionality on mouse over event.
     *
     * @param event - The mouse event.
     * @param target - The hovered element.
     */
    onEditorLinkMouseover(event: MouseEvent, target: HTMLElement): void;

    /**
     * Execute context menu functionality on right mouse click.
     *
     * @param event - The mouse event.
     * @deprecated Use {@link MarkdownBaseView.onContextMenu} instead.
     */
    onMenu(event: MouseEvent): void;

    /**
     * Reposition suggest and scroll position on resize.
     */
    onResize(): void;

    /**
     * Execute functionality on CM editor state update.
     *
     * @param update - The CodeMirror view update.
     * @param changed - Whether the document content changed.
     */
    onUpdate(update: ViewUpdate, changed: boolean): void;

    /**
     * Controller of the editor view.
     */
    owner: MarkdownFileInfo;

    /**
     * Returns path of the attached file.
     *
     * @returns The file path.
     */
    get path(): string;

    /**
     * Reinitialize the editor inside new container.
     */
    reinit(): void;

    /**
     * Move the editor into the new container.
     *
     * @param newContainer - New container element for the editor.
     */
    reparent(newContainer: HTMLElement): void;

    /**
     * Bodge to reset the syntax highlighting.
     *
     * @remark Uses single-character replacement transaction.
     */
    resetSyntaxHighlighting(): void;

    /**
     * Save history of file and data (for caching, for faster reopening of same file in editor).
     */
    saveHistory(): void;

    /**
     * Set the state of the editor.
     *
     * @param data - Document content to set.
     * @param clear - Whether to clear existing state.
     */
    set(data: string, clear: boolean): void;

    /**
     * Whether live preview rendering is disabled.
     */
    sourceMode: boolean;

    /**
     * Reference to editor attached to table cell, if any.
     */
    tableCell: null | TableCellEditor;

    /**
     * Enables/disables frontmatter folding.
     */
    toggleFoldFrontmatter(): void;

    /**
     * Toggle source mode for editor and dispatch effect.
     */
    toggleSource(): void;

    /**
     * Execute functionality of token (open external link, open internal link in leaf, ...).
     *
     * @param token - The clickable token.
     * @param newLeaf - Whether to open in a new leaf.
     */
    triggerClickableToken(token: Token, newLeaf: boolean): void;

    /**
     * Callback for onUpdate functionality added as an extension.
     *
     * @returns A callback function that handles view updates.
     */
    updateEvent(): (update: ViewUpdate) => void;

    /**
     * In mobile, creates a popover link on clickable token, if exists.
     */
    updateLinkPopup(): void;

    /**
     * Reconfigure/re-add all the dynamic extensions.
     */
    updateOptions(): void;
}
