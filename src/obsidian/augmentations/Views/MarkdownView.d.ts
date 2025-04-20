import type { ViewType } from '../../implementations/Constants/ViewType.d.ts';
import type { FocusMetadataOptions } from '../../internals/FocusMetadataOptions.d.ts';
import type { BacklinkComponent } from '../../internals/InternalPlugins/Backlink/BacklinkComponent.d.ts';
import type { MarkdownViewEphemeralState } from '../../internals/MarkdownViewEphemeralState.d.ts';
import type { MarkdownViewModes } from '../../internals/MarkdownViewModes.d.ts';
import type { MarkdownViewSourceMode } from '../../internals/MarkdownViewSourceMode.d.ts';
import type { MetadataEditor } from '../../internals/MetadataEditor.d.ts';
import type { Token } from '../../internals/Token.d.ts';

export {};

declare module 'obsidian' {
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
         * The currently active markdown view (preview or edit view).
         *
         * @unofficial
         */
        currentMode: MarkdownSubView;
        /**
         * Editor component of the view.
         *
         * @unofficial
         */
        editMode: MarkdownEditView;
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
         * Preview component of the view.
         *
         * @unofficial
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
         * Add property to inline metadata editor or properties plugin.
         *
         * @deprecated - Removed in 1.6.0.
         * @remark Parameter is not used.
         *
         * @unofficial
         */
        addProperty(unused: undefined): void;
        /**
         * Whether the editor can render properties according to the current mode and config.
         *
         * @unofficial
         */
        canShowProperties(): boolean;
        /**
         * Whether the editor can toggle backlinks according to current mode.
         *
         * @unofficial
         */
        canToggleBacklinks(): boolean;
        /**
         * Collapse the properties editor.
         *
         * @unofficial
         */
        collapseProperties(collapse: boolean): void;
        /**
         * Edit the focused property in the metadata editor.
         *
         * @remark Parameter is not used.
         * @unofficial
         */
        editProperty(unused: undefined): void;
        /**
         * Focus on the metadata editor given property information.
         *
         * @unofficial
         */
        focusMetadata(focus?: FocusMetadataOptions): void;
        /**
         * Gets the ephemeral (non-persistent) state of the editor.
         *
         * @unofficial
         */
        getEphemeralState(): MarkdownViewEphemeralState;
        /**
         * Get the file attached to the view.
         *
         * @unofficial
         */
        getFile(): TFile | null;
        /**
         * Get the hover source of the editor.
         *
         * @unofficial
         */
        getHoverSource(): string;
        /**
         * Get the current mode of the editor.
         *
         * @unofficial
         */
        getMode(): MarkdownViewModeType;
        /**
         * Get selection of current mode.
         *
         * @unofficial
         */
        getSelection(): string;
        /**
         * Get the current view type.
         *
         * @unofficial
         */
        getViewType(): typeof ViewType.Markdown;
        /**
         * Validate correctness of frontmatter and update metadata editor.
         *
         * @unofficial
         */
        loadFrontmatter(data: string): void;
        /**
         * Whether the metadata editor has focus.
         *
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
         * @unofficial
         */
        onExternalDataChange(file: TFile, data: string): void;
        /**
         * On blur of inline title, save new filename.
         *
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
         * @unofficial
         */
        registerMode(mode: MarkdownSubView): MarkdownSubView;
        /**
         * Save the frontmatter of the file.
         *
         * @unofficial
         */
        saveFrontmatter(properties: Record<string, any>): void;
        /**
         * Set the mode of the editor.
         *
         * @unofficial
         */
        setMode(component: MarkdownSubView): Promise<void>;
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
         * Toggle backlinks on editor.
         *
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
         * @unofficial
         */
        triggerClickableToken(token: Token, new_leaf: boolean): void;
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
