import type {
    TFile,
    Scope,
    CachedMetadata,
    TAbstractFile
} from "obsidian";
import type {
    EmbeddedEditorView,
    FoldInfo
} from "../types.d.ts";

export interface WidgetEditorView extends EmbeddedEditorView {
    /**
     * Data after reference
     */
    after: string;
    /**
     * Data before reference
     */
    before: string;
    /**
     * Full file contents
     */
    data: string;
    /**
     * File being currently renamed
     */
    fileBeingRenamed: null | TFile;
    /**
     * Current heading
     */
    heading: string;
    /**
     * Indent
     */
    indent: string;
    /**
     * Inline title element
     */
    inlineTitleEl: HTMLElement;
    /**
     * Full inline content string
     */
    lastSavedData: null | string;
    /**
     * Whether embedding should be saved twice on save
     */
    saveAgain: boolean;
    /**
     * Whether the widget is currently saving
     */
    saving: boolean;
    /**
     * Subpath reference of the path
     */
    subpath: string;
    /**
     * Whether the subpath was not found in the cache
     */
    subpathNotFound: boolean;

    /**
     * Push/pop current scope
     */
    applyScope(scope: Scope): void;
    /**
     * Get the current folds of the editor
     */
    getFoldInfo(): null | FoldInfo;
    /**
     * Splice incoming data at according to subpath for correct reference, then update heading and render
     */
    loadContents(data: string, cache: CachedMetadata): void;
    /**
     * Load file from cache based on stored path
     */
    loadFile(): Promise<void>;
    /**
     * Load file and check if data is different from last saved data, then loads contents
     */
    loadFileInternal(data: string, cache?: CachedMetadata): void;
    /**
     * Update representation on file finished updating
     */
    onFileChanged(file: TFile, data: string, cache: CachedMetadata): void;
    /**
     * Update representation on file rename
     */
    onFileRename(file: TAbstractFile, oldPath: string): void;
    /**
     * On loading widget, register vault change and rename events
     */
    onload(): void;
    /**
     * Save fold made in the editor to foldManager
     */
    onMarkdownFold(): void;
    /** @internal On change of editor title element */
    onTitleChange(element: HTMLElement): void;
    /** @internal On keypress on editor title element */
    onTitleKeydown(event: KeyboardEvent): void;
    /** @internal On pasting on editor title element */
    onTitlePaste(element: HTMLElement, event: ClipboardEvent): void;
    /**
     * On unloading widget, unload component and remove scope
     */
    onunload(): void;
    /**
     * Save changes made in editable widget
     */
    save(data: string, delayed?: boolean): Promise<void>;
    /**
     * On blur widget, save title
     */
    saveTitle(element: HTMLElement): void;
    /**
     * Show preview of widget
     */
    showPreview(show?: boolean): void;
}
