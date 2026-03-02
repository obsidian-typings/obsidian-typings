import type {
    App,
    MarkdownView,
    TAbstractFile
} from 'obsidian';
import type { ImportedAttachment } from './ImportedAttachment.d.ts';

/**
 * Manager for clipboard operations in the markdown editor, handling paste, drag, and drop.
 * @public
 * @unofficial
 */
export interface ClipboardManager {
    /**
     * Reference to the app.
     */
    app: App;

    /**
     * Reference to the Editor View.
     */
    info: MarkdownView;

    /**
     * Get current path of editor view for determining storage location embed.
     *
     * @returns Current editor view path.
     */
    getPath(): string;

    /**
     * Process incoming data (image, text, url, html).
     *
     * @param data - The data transfer object.
     * @returns Null or a promise for async HTML processing.
     * @remark When processing HTML, function will be async.
     */
    handleDataTransfer(data: DataTransfer): null | Promise<void>;

    /**
     * Handle an incoming drag-over event.
     *
     * @param event - The drag event.
     */
    handleDragOver(event: DragEvent): void;

    /**
     * Handle an incoming drag-drop event.
     *
     * @param event - The drag event.
     * @returns Whether the drop was handled.
     */
    handleDrop(event: DragEvent): boolean;

    /**
     * Process a drop event into the editor.
     *
     * @param event - The drag event.
     * @returns The inserted text, or null.
     */
    handleDropIntoEditor(event: DragEvent): null | string;

    /**
     * Handle an incoming paste event.
     *
     * @param event - The clipboard event.
     * @returns Whether the paste was handled.
     */
    handlePaste(event: ClipboardEvent): boolean;

    /**
     * Insert single file as embed into the editor.
     *
     * @param file - File to embed.
     * @param replace - Whether to replace the current selection.
     */
    insertAttachmentEmbed(file: TAbstractFile, replace: boolean): Promise<void>;

    /**
     * Insert files from drop-event into the editor.
     *
     * @param importedAttachments - Attachments to insert.
     */
    insertFiles(importedAttachments: ImportedAttachment[]): Promise<void>;

    /**
     * Save an attachment of specified name and extension to the vault.
     *
     * @param name - Attachment file name.
     * @param extension - File extension.
     * @param data - Binary data of the attachment.
     * @param replace - Whether to replace the current selection.
     * @remark Invokes insertAttachmentEmbed.
     */
    saveAttachment(name: string, extension: string, data: ArrayBuffer, replace: boolean): Promise<void>;
}
