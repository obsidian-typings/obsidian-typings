import type {
  getEditableFileViewConstructor
} from '../../implementations/constructors/augmentations/views/getEditableFileViewConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Editable file view
   * @since 0.9.7
   */
  interface EditableFileView extends FileView {
    /**
     * The file that is currently being renamed.
     *
     * @unofficial
     */
    fileBeingRenamed: null | TFile;

    /**
     * Constructor.
     *
     * To extract the constructor type, use `ExtractConstructor<EditableFileView>`.
     *
     * @param leaf - The workspace leaf.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(leaf: WorkspaceLeaf): this;

    /**
     * Is called when the titleEl looses focus.
     *
     * Event type: 'blur'.
     *
     * @returns A promise that resolves when the blur handling is complete.
     * @unofficial
     */
    onTitleBlur(): Promise<void>;

    /**
     * Is called when the titleEl is changed.
     *
     * Event type: 'input'.
     *
     * @param titleEl - The title element of the view.
     * @unofficial
     */
    onTitleChange(titleEl: HTMLElement): void;

    /**
     * Is called when the titleEl gains focus.
     *
     * Event type: 'focus'.
     *
     * @unofficial
     */
    onTitleFocus(): void;

    /**
     * Is called when the titleEl is focused and a keydown is triggered.
     *
     * Event type: 'keydown'.
     *
     * @param event - The keyboard event which triggered this function.
     * @unofficial
     */
    onTitleKeydown(event: KeyboardEvent): void;

    /**
     * Is called when the titleEl is focused and a paste event is triggered.
     *
     * Event type: 'paste'.
     *
     * @param titleEl - The title element of the view.
     * @param event - The clipboard event which triggered this function.
     * @unofficial
     */
    onTitlePaste(titleEl: HTMLElement, event: ClipboardEvent): void;

    /**
     * Updates the file to match the updated title.
     *
     * @param titleEl - The current title element.
     * @returns A promise that resolves when the title is saved.
     * @unofficial
     */
    saveTitle(titleEl: HTMLElement): Promise<void>;
  }
}
