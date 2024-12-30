import type { ViewType } from '../../implementations/Constants/ViewType.js';
import type { MetadataEditor } from '../../internals/MetadataEditor.js';
import type { Token } from '../../internals/Token.js';

export {};

declare module 'obsidian' {
    interface MarkdownView extends TextFileView {
        /**
         * Backlinks component
         * @todo Documentation incomplete
         */
        backlinks: null | unknown;
        /**
         * The embedded backlinks element for the current file
         */
        backlinksEl: HTMLElement;
        /**
         * The currently active markdown view (preview or edit view)
         */
        currentMode: MarkdownSubView;
        /**
         * Editor component of the view
         */
        editMode: MarkdownEditView;
        /**
         * Editable title element of the view
         */
        inlineTitleEl: HTMLElement;
        /**
         * Frontmatter editor of the editor
         */
        metadataEditor: MetadataEditor;
        /**
         * Button for switching between different modes of the view
         */
        modeButtonEl: HTMLAnchorElement;
        /**
         * The registered modes of the view
         */
        modes: { source: MarkdownEditView; preview: MarkdownPreviewView };
        /**
         * Preview component of the view
         */
        previewMode: MarkdownPreviewView;
        /**
         * File frontmatter as a raw string
         */
        rawFrontmatter: string;
        /**
         * Current scroll position of the editor
         */
        scroll: null | number;
        /**
         * Whether to show backlinks in the editor
         */
        showBacklinks: boolean;
        /** @deprecated CM5 Editor */
        sourceMode: { cmEditor: any };

        /**
         * Add property to inline metadata editor or properties plugin
         *
         * @deprecated Removed in 1.6.0
         * @remark Parameter is not used
         */
        addProperty(unused: undefined): void;
        /**
         * Whether the editor can render properties according to the current mode and config
         */
        canShowProperties(): boolean;
        /**
         * Whether the editor can toggle backlinks according to current mode
         */
        canToggleBacklinks(): boolean;
        /**
         * Collapse the properties editor
         */
        collapseProperties(collapse: boolean): void;
        /**
         * Edit the focused property in the metadata editor
         *
         * @remark Parameter is not used
         */
        editProperty(unused: undefined): void;
        /**
         * Focus on the metadata editor given property information
         */
        focusMetadata(focus?: { focusHeading: boolean; propertyIdx?: number; propertyKey?: string }): void;
        /**
         * Gets the ephemeral (non-persistent) state of the editor
         */
        getEphemeralState(): any & { scroll: number };
        /**
         * Get the file attached to the view
         */
        getFile(): TFile | null;
        /** @internal Get the current mode of the editor */
        getHoverSource(): string;
        /**
         * Get the current mode of the editor
         */
        getMode(): MarkdownViewModeType;
        /**
         * Get selection of current mode
         */
        getSelection(): string;
        /**
         * Get the current view type
         */
        getViewType(): typeof ViewType.Markdown;
        /**
         * Validate correctness of frontmatter and update metadata editor
         */
        loadFrontmatter(data: string): void;
        /**
         * Whether the metadata editor has focus
         */
        metadataHasFocus(): boolean;
        /**
         * On app css change, update source mode editor
         */
        onCssChange(): void;
        /**
         * Update editor on external data change (from sync plugin)
         */
        onExternalDataChange(file: TFile, data: string): void;
        /**
         * On blur of inline title, save new filename
         */
        onInlineTitleBlur(): Promise<void>;
        /**
         * On data change of editor, update internal data and metadata editor
         */
        onInternalDataChange(): void;
        /**
         * On loading markdown view, register resize, css-change and quick-preview events
         */
        onload(): void;
        /**
         * On fold of markdown in source editor, save fold info to fold manager
         */
        onMarkdownFold(): void;
        /**
         * On markdown scroll in editors, update scroll, sync state and trigger markdown scroll event
         */
        onMarkdownScroll(): void;
        /**
         * On mod click, opens editor of opposite mode in split view to right
         */
        onSwitchView(event: KeyboardEvent | MouseEvent): Promise<void>;
        /**
         * Opens PDF modal for exporting PDF of the current file
         */
        printToPdf(): void;
        /**
         * Redo action of source mode editor
         */
        redo(): void;
        /**
         * Register editor mode component to view
         */
        registerMode(mode: MarkdownSubView): MarkdownSubView;
        /**
         * Save the frontmatter of the file
         */
        saveFrontmatter(properties: Record<string, any>): void;
        /**
         * Set the mode of the editor
         */
        setMode(component: MarkdownSubView): Promise<void>;
        /**
         * Shift focus to first line of editor
         */
        shiftFocusAfter(): void;
        /**
         * Shift focus to inline title
         */
        shiftFocusBefore(): void;
        /**
         * Toggle backlinks on editor
         */
        toggleBacklinks(): Promise<void>;
        /**
         * Toggle collapse status of properties editor if allowed
         */
        toggleCollapseProperties(): void;
        /**
         * Toggle between source and preview mode
         */
        toggleMode(): void;
        /**
         * Execute functionality of token (open external link, open internal link in leaf, ...)
         */
        triggerClickableToken(token: Token, new_leaf: boolean): void;
        /**
         * Undo action of source mode editor
         */
        undo(): void;
        /**
         * Update the backlinks component for new file
         */
        updateBacklinks(): void;
        /**
         * Update reading/source view action buttons of modeButtonEl with current mode
         */
        updateButtons(): void;
        /**
         * Update options of the editors from settings
         */
        updateOptions(): void;
        /**
         * Hide/render backlinks component
         */
        updateShowBacklinks(): void;
    }
}
