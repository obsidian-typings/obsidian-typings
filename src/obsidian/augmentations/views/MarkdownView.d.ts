import type { ViewType } from '../../implementations/constants/ViewType.d.ts';
import type { getMarkdownViewConstructor } from '../../implementations/constructors/augmentations/getMarkdownViewConstructor.d.ts';
import type { FocusMetadataOptions } from '../../internals/FocusMetadataOptions.d.ts';
import type { BacklinkComponent } from '../../internals/internal-plugins/backlink/BacklinkComponent.d.ts';
import type { MarkdownViewEphemeralState } from '../../internals/MarkdownViewEphemeralState.d.ts';
import type { MarkdownViewModes } from '../../internals/MarkdownViewModes.d.ts';
import type { MarkdownViewSourceMode } from '../../internals/MarkdownViewSourceMode.d.ts';
import type { MetadataEditor } from '../../internals/MetadataEditor.d.ts';
import type { Token } from '../../internals/Token.d.ts';

export {};

declare module 'obsidian' {
    /**
     * A view for markdown files.
     */
    interface MarkdownView extends TextFileView {
        /**
         * Backlinks component.
         *
         * @unofficial
         */
        backlinks: BacklinkComponent | null;

        /**
         * The embedded backlinks element for the current file.
         *
         * @unofficial
         */
        backlinksEl: HTMLElement;

        /**
         * The current mode of the markdown view.
         *
         * @official
         */
        currentMode: MarkdownSubView;

        /**
         * Editor component of the view.
         *
         * @unofficial
         */
        editMode: MarkdownEditView;

        /**
         * The editor of the markdown view.
         *
         * @official
         */
        editor: Editor;

        /**
         * The hover popover of the markdown view.
         *
         * @official
         */
        hoverPopover: HoverPopover | null;

        /**
         * Editable title element of the view.
         *
         * @unofficial
         */
        inlineTitleEl: HTMLElement;

        /**
         * Frontmatter editor of the editor.
         *
         * @unofficial
         */
        metadataEditor: MetadataEditor;

        /**
         * Button for switching between different modes of the view.
         *
         * @unofficial
         */
        modeButtonEl: HTMLAnchorElement;

        /**
         * The registered modes of the view.
         *
         * @unofficial
         */
        modes: MarkdownViewModes;

        /**
         * The preview mode of the markdown view.
         *
         * @official
         */
        previewMode: MarkdownPreviewView;

        /**
         * File frontmatter as a raw string.
         *
         * @unofficial
         */
        rawFrontmatter: string;

        /**
         * Current scroll position of the editor.
         *
         * @unofficial
         */
        scroll: null | number;

        /**
         * Whether to show backlinks in the editor.
         *
         * @unofficial
         */
        showBacklinks: boolean;

        /**
         * @deprecated - CM5 Editor
         * @unofficial
         */
        sourceMode: MarkdownViewSourceMode;

        /**
         * Whether the editor can render properties according to the current mode and config.
         *
         * @returns Whether properties can be shown.
         * To get the constructor instance, use {@link getMarkdownViewConstructor} from `obsidian-typings/implementations`.
         * @unofficial
         */
        canShowProperties(): boolean;

        /**
         * Whether the editor can toggle backlinks according to current mode.
         *
         * @returns Whether backlinks can be toggled.
         * @unofficial
         */
        canToggleBacklinks(): boolean;

        /**
         * Clear the view data of the markdown view.
         *
         * @official
         */
        clear(): void;

        /**
         * Collapse the properties editor.
         *
         * @param collapse - Whether to collapse the properties.
         * @unofficial
         */
        collapseProperties(collapse: boolean): void;

        /**
         * Constructor.
         *
         * To get the constructor instance, use {@link getMarkdownViewConstructor} from `obsidian-typings/implementations`.
         *
         * @param leaf - The workspace leaf to attach the markdown view to.
         * @returns The markdown view instance.
         * @official
         * @deprecated - Added only for typing purposes.
         */
        constructor__(leaf: WorkspaceLeaf): this;

        /**
         * Edit the focused property in the metadata editor.
         *
         * @param _unused - Unused parameter.
         * @remark Parameter is not used.
         * @unofficial
         */
        editProperty(_unused: undefined): void;

        /**
         * The associated file.
         *
         * @returns The associated file or `null`.
         * @example
         * ```ts
         * console.log(markdownFileInfo.file);
         * ```
         * @official
         * @deprecated - Added only for typing purposes. Use {@link file} instead.
         */
        file__?(): TFile | null;

        /**
         * Focus on the metadata editor given property information.
         *
         * @param focus - Options for which property to focus.
         * @unofficial
         */
        focusMetadata(focus?: FocusMetadataOptions): void;

        /**
         * Gets the ephemeral (non-persistent) state of the editor.
         *
         * @returns The ephemeral state.
         * @unofficial
         */
        getEphemeralState(): MarkdownViewEphemeralState;

        /**
         * Get the file attached to the view.
         *
         * @returns The file or `null`.
         * @unofficial
         */
        getFile(): TFile | null;

        /**
         * Get the hover source of the editor.
         *
         * @returns The hover source string.
         * @unofficial
         */
        getHoverSource(): string;

        /**
         * Get the current mode of the markdown view.
         *
         * @returns A string representing the current mode.
         * @official
         */
        getMode(): MarkdownViewModeType;

        /**
         * Get selection of current mode.
         *
         * @returns The selected text.
         * @unofficial
         */
        getSelection(): string;

        /**
         * Get the view data of the markdown view.
         *
         * @returns A string representing the view data.
         * @official
         */
        getViewData(): string;

        /**
         * Get the view type of the markdown view.
         *
         * @returns A string representing the view type.
         * @official - changed the return type.
         */
        getViewType(): typeof ViewType.Markdown;

        /**
         * Validate correctness of frontmatter and update metadata editor.
         *
         * @param data - The file data containing frontmatter.
         * @unofficial
         */
        loadFrontmatter(data: string): void;

        /**
         * Whether the metadata editor has focus.
         *
         * @returns Whether the metadata editor is focused.
         * @unofficial
         */
        metadataHasFocus(): boolean;

        /**
         * On app css change, update source mode editor.
         *
         * @unofficial
         */
        onCssChange(): void;

        /**
         * Update editor on external data change (from sync plugin).
         *
         * @param file - The file that changed.
         * @param data - The new file data.
         * @unofficial
         */
        onExternalDataChange(file: TFile, data: string): void;

        /**
         * On blur of inline title, save new filename.
         *
         * @returns A promise that resolves when the new filename is saved.
         * @unofficial
         */
        onInlineTitleBlur(): Promise<void>;

        /**
         * On data change of editor, update internal data and metadata editor.
         *
         * @unofficial
         */
        onInternalDataChange(): void;

        /**
         * On loading markdown view, register resize, css-change and quick-preview events.
         *
         * @unofficial
         */
        onload(): void;

        /**
         * On fold of markdown in source editor, save fold info to fold manager.
         *
         * @unofficial
         */
        onMarkdownFold(): void;

        /**
         * On markdown scroll in editors, update scroll, sync state and trigger markdown scroll event.
         *
         * @unofficial
         */
        onMarkdownScroll(): void;

        /**
         * On mod click, opens editor of opposite mode in split view to right.
         *
         * @param event - The keyboard or mouse event.
         * @returns A promise that resolves when the view is switched.
         * @unofficial
         */
        onSwitchView(event: KeyboardEvent | MouseEvent): Promise<void>;

        /**
         * Opens PDF modal for exporting PDF of the current file.
         *
         * @unofficial
         */
        printToPdf(): void;

        /**
         * Redo action of source mode editor.
         *
         * @unofficial
         */
        redo(): void;

        /**
         * Register editor mode component to view.
         *
         * @param mode - The markdown subview mode to register.
         * @returns The registered mode.
         * @unofficial
         */
        registerMode(mode: MarkdownSubView): MarkdownSubView;

        /**
         * Save the frontmatter of the file.
         *
         * @param properties - The frontmatter properties to save.
         * @unofficial
         */
        saveFrontmatter(properties: Record<string, unknown>): void;

        /**
         * Set the mode of the editor.
         *
         * @param component - The markdown subview mode to set.
         * @returns A promise that resolves when the mode is set.
         * @unofficial
         */
        setMode(component: MarkdownSubView): Promise<void>;

        /**
         * Set the view data of the markdown view.
         *
         * @param data - The view data.
         * @param clear - Whether to clear the view data before setting it.
         * @example
         * ```ts
         * markdownView.setViewData('**foo** bar', true);
         * ```
         * @official
         */
        setViewData(data: string, clear: boolean): void;

        /**
         * Shift focus to first line of editor.
         *
         * @unofficial
         */
        shiftFocusAfter(): void;

        /**
         * Shift focus to inline title.
         *
         * @unofficial
         */
        shiftFocusBefore(): void;

        /**
         * Show the search modal.
         *
         * @param replace - Whether to perform a search & replace.
         * - `true` - Perform a search & replace.
         * - `false` - Perform a search.
         * @example
         * ```ts
         * markdownView.showSearch(true);
         * ```
         * @official
         */
        showSearch(replace?: boolean): void;

        /**
         * Toggle backlinks on editor.
         *
         * @returns A promise that resolves when backlinks are toggled.
         * @unofficial
         */
        toggleBacklinks(): Promise<void>;

        /**
         * Toggle collapse status of properties editor if allowed.
         *
         * @unofficial
         */
        toggleCollapseProperties(): void;

        /**
         * Toggle between source and preview mode.
         *
         * @unofficial
         */
        toggleMode(): void;

        /**
         * Execute functionality of token (open external link, open internal link in leaf, ...).
         *
         * @param token - The token to trigger.
         * @param newLeaf - Whether to open in a new leaf.
         * @unofficial
         */
        triggerClickableToken(token: Token, newLeaf: boolean): void;

        /**
         * Undo action of source mode editor.
         *
         * @unofficial
         */
        undo(): void;

        /**
         * Update the backlinks component for new file.
         *
         * @unofficial
         */
        updateBacklinks(): void;

        /**
         * Update reading/source view action buttons of modeButtonEl with current mode.
         *
         * @unofficial
         */
        updateButtons(): void;

        /**
         * Update options of the editors from settings.
         *
         * @unofficial
         */
        updateOptions(): void;

        /**
         * Hide/render backlinks component.
         *
         * @unofficial
         */
        updateShowBacklinks(): void;
    }
}
