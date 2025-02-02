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
import type { ClipboardManager } from './ClipboardManager.js';
import type { EditorSuggests } from './EditorSuggests.js';
import type { FoldInfo } from './FoldInfo.js';
import type { TableCell } from './TableCell.js';
import type { TableCellEditor } from './TableCellEditor.js';
import type { TableEditor } from './TableEditor.js';
import type { Token } from './Token.js';

/** @public */
export interface MarkdownBaseView extends Component {
    /**
     * Reference to the app
     */
    app: App;
    /**
     * Callback to clear all elements
     */
    cleanupLivePreview: null | (() => void);
    /**
     * Manager that handles pasting text, html and images into the editor
     */
    clipboardManager: ClipboardManager;
    /**
     * Codemirror editor instance
     */
    cm: EditorView;
    /**
     * Whether CodeMirror is initialized
     */
    cmInit: boolean;
    /**
     * Container element of the editor view
     */
    containerEl: HTMLElement;
    /**
     * Popup element for internal link
     */
    cursorPopupEl: HTMLElement | null;
    /**
     * Obsidian editor instance
     *
     * @remark Handles formatting, table creation, highlight adding, etc.
     */
    editor?: Editor;
    /**
     * Element in which the CodeMirror editor resides
     */
    editorEl: HTMLElement;
    /**
     * Editor suggester for autocompleting files, links, aliases, etc.
     */
    editorSuggest: EditorSuggests;
    /**
     * The CodeMirror plugins that handle the rendering of, and interaction with Obsidian's Markdown
     */
    livePreviewPlugin: Extension[];
    /**
     * Local (always active) extensions for the editor
     */
    localExtensions: Extension[];
    /**
     * Controller of the editor view
     */
    owner: MarkdownFileInfo;
    /**
     * Whether live preview rendering is disabled
     */
    sourceMode: boolean;
    /**
     * Reference to editor attached to table cell, if any
     */
    tableCell: null | TableCellEditor;
    /**
     * Currently active CM instance (table cell CM or main CM)
     */
    get activeCM(): EditorView;
    /**
     * Returns attached file of the owner instance
     */
    get file(): TFile | null;
    /**
     * Returns path of the attached file
     */
    get path(): string;

    /**
     * Apply fold history to editor
     */
    applyFoldInfo(info: FoldInfo): void;
    /**
     * Constructs local (always active) extensions for the editor
     *
     * @remark Creates extensions for handling dom events, editor info state fields, update listener, suggestions
     */
    buildLocalExtensions(): Extension[];
    /**
     * Cleanup live preview, remove and then re-add all editor extensions
     */
    clear(): void;
    /**
     * Clean up live preview, remove all extensions, destroy editor
     */
    destroy(): void;
    /**
     * Removes specified tablecell
     */
    destroyTableCell(cell?: TableCellEditor): void;
    /**
     * Edit a specified table cell, creating a table cell editor
     */
    editTableCell(cell: TableEditor, new_cell: TableCell): TableCellEditor;
    /**
     * Get the current editor document as a string
     */
    get(): string;
    /**
     * Constructs extensions for the editor based on user settings
     *
     * @remark Creates extension for tab size, RTL rendering, spellchecking, pairing markdown syntax, live preview and vim
     */
    getDynamicExtensions(): Extension[];
    /**
     * Get the current folds of the editor
     */
    getFoldInfo(): null | FoldInfo;
    /**
     * Builds all local extensions and assigns to this.localExtensions
     *
     * @remark Will build extensions if they were not already built
     */
    getLocalExtensions(): unknown;
    /**
     * Creates menu on right mouse click
     */
    onContextMenu(event: PointerEvent, x: boolean): Promise<void>;
    /**
     * Execute click functionality on token on mouse click
     */
    onEditorClick(event: MouseEvent, element?: HTMLElement): void;
    /**
     * Execute drag functionality on drag start
     *
     * @remark Interfaces with dragManager
     */
    onEditorDragStart(event: DragEvent): void;
    /**
     * Execute hover functionality on mouse over event
     */
    onEditorLinkMouseover(event: MouseEvent, target: HTMLElement): void;
    /**
     * Execute context menu functionality on right mouse click
     *
     * @deprecated Use onContextMenu instead
     */
    onMenu(event: MouseEvent): void;
    /**
     * Reposition suggest and scroll position on resize
     */
    onResize(): void;
    /**
     * Execute functionality on CM editor state update
     */
    onUpdate(update: ViewUpdate, changed: boolean): void;
    /**
     * Reinitialize the editor inside new container
     */
    reinit(): void;
    /**
     * Move the editor into the new container
     */
    reparent(new_container: HTMLElement): void;
    /**
     * Bodge to reset the syntax highlighting
     *
     * @remark Uses single-character replacement transaction
     */
    resetSyntaxHighlighting(): void;
    /** @internal Save history of file and data (for caching, for faster reopening of same file in editor) */
    saveHistory(): void;
    /**
     * Set the state of the editor
     */
    set(data: string, clear: boolean): void;
    /**
     * Enables/disables frontmatter folding
     */
    toggleFoldFrontmatter(): void;
    /**
     * Toggle source mode for editor and dispatch effect
     */
    toggleSource(): void;
    /**
     * Execute functionality of token (open external link, open internal link in leaf, ...)
     */
    triggerClickableToken(token: Token, new_leaf: boolean): void;
    /** @internal Callback for onUpdate functionality added as an extension */
    updateEvent(): (update: ViewUpdate) => void;
    /**
     * In mobile, creates a popover link on clickable token, if exists
     */
    updateLinkPopup(): void;
    /**
     * Reconfigure/re-add all the dynamic extensions
     */
    updateOptions(): void;
}
