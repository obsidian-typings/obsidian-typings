import type { EditorState } from '@codemirror/state';
import type {
    App,
    Component,
    HoverPopover,
    MarkdownPreviewView,
    TFile
} from 'obsidian';
import type { IFramedMarkdownEditor } from './IFramedMarkdownEditor.d.ts';

/** @public */
export interface EmbeddedEditorView extends Component {
    /**
     * Reference to the app
     */
    app: App;
    /**
     * Container element for the embedded view
     */
    containerEl: HTMLElement;
    /**
     * Whether the view is currently saving
     */
    dirty: boolean;
    /**
     * Whether the editor may be edited
     *
     * @remark Fun fact, setting this to true and calling showEditor() for embedded MD views, allows them to be edited.
     *          Though the experience is a little buggy
     */
    editable: boolean;
    /**
     * Editor component of the view
     */
    editMode?: IFramedMarkdownEditor | undefined;
    /**
     * Container in which the editor is embedded
     */
    editorEl: HTMLElement;
    /**
     * File to which the view is attached
     */
    file: null | TFile;
    /**
     * Hover element container
     */
    hoverPopover: null | HoverPopover;
    /**
     * Element containing the preview for the embedded markdown
     */
    previewEl: HTMLElement;
    /**
     * Preview component of the view
     */
    previewMode: MarkdownPreviewView;
    /**
     * Current state of the editor
     */
    state: {} | EditorState | unknown;
    /**
     * Text contents being embedded
     */
    text: string;
    /**
     * Whether the view renders contents using an iFrame
     */
    useIframe: boolean;
    /**
     * Get the preview editor, if exists
     */
    get editor(): IFramedMarkdownEditor | null;
    /**
     * Get the path to the file, if any file registered
     */
    get path(): string;
    /**
     * Get the scroll of the file renderer component
     */
    get scroll(): unknown;

    /**
     * Destroy edit component editor and save contents if specified
     */
    destroyEditor(save?: boolean): void;
    /**
     * Gets currently active mode (editMode returns 'source')
     */
    getMode(): 'source' | 'preview';
    /**
     * On load of editor, show preview
     */
    onload(): void;
    /**
     * Trigger markdown scroll on workspace
     */
    onMarkdownScroll(): void;
    /**
     * On unload of editor, destroy editor and unset workspace activeEditor
     */
    onunload(): void;
    /**
     * Debounced save of contents
     */
    requestSave(): void;
    /**
     * Debounced save of editor folds
     */
    requestSaveFolds(): void;
    /**
     * Set file contents
     */
    save(data: string, save?: boolean): void;
    /**
     * Set the state of the editor
     */
    set(data: string, clear: boolean): void;
    /**
     * Reveal the editor if editable widget and applies saved state
     */
    showEditor(): void;
    /**
     * Reveal preview mode and destroy editor, save if specified
     */
    showPreview(save?: boolean): void;
    /**
     * Reveal search component in file renderer component
     */
    showSearch(replace?: boolean): void;
    /**
     * Toggle between edit and preview mode
     */
    toggleMode(): void;
}
