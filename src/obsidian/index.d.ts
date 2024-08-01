/**
 * @see Original module
 * {@link https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts}
 * {@link file://./../../node_modules/obsidian/obsidian.d.ts}
 */

import "./augmentations/AbstractInputSuggest.js";
import "./augmentations/AbstractTextComponent.js";
import "./augmentations/App.js";
import "./augmentations/BaseComponent.js";
import "./augmentations/BlockCache.js";
import "./augmentations/BlockSubpathResult.js";
import "./augmentations/ButtonComponent.js";
import "./augmentations/CachedMetadata.js";
import "./augmentations/CacheItem.js";
import "./augmentations/CloseableComponent.js";
import "./augmentations/ColorComponent.js";
import "./augmentations/Command.js";
import "./augmentations/Component.js";
import "./augmentations/DataAdapter.js";
import "./augmentations/DataWriteOptions.js";
import "./augmentations/Debouncer.js";
import "./augmentations/DropdownComponent.js";
import "./augmentations/EditableFileView.js";
import "./augmentations/Editor.js";
import "./augmentations/EditorChange.js";
import "./augmentations/EditorPosition.js";
import "./augmentations/EditorRange.js";
import "./augmentations/EditorRangeOrCaret.js";
import "./augmentations/EditorScrollInfo.js";
import "./augmentations/EditorSelection.js";
import "./augmentations/EditorSelectionOrCaret.js";
import "./augmentations/EditorSuggest.js";
import "./augmentations/EditorSuggestContext.js";
import "./augmentations/EditorSuggestTriggerInfo.js";
import "./augmentations/EditorTransaction.js";
import "./augmentations/EmbedCache.js";
import "./augmentations/EventRef.js";
import "./augmentations/Events.js";
import "./augmentations/ExtraButtonComponent.js";
import "./augmentations/FileManager.js";
import "./augmentations/FileStats.js";
import "./augmentations/FileSystemAdapter.js";
import "./augmentations/FileView.js";
import "./augmentations/FootnoteCache.js";
import "./augmentations/FrontMatterCache.js";
import "./augmentations/FrontMatterInfo.js";
import "./augmentations/FrontmatterLinkCache.js";
import "./augmentations/FuzzyMatch.js";
import "./augmentations/FuzzySuggestModal.js";
import "./augmentations/HeadingCache.js";
import "./augmentations/HeadingSubpathResult.js";
import "./augmentations/Hotkey.js";
import "./augmentations/HoverLinkSource.js";
import "./augmentations/HoverParent.js";
import "./augmentations/HoverPopover.js";
import "./augmentations/HSL.js";
import "./augmentations/Instruction.js";
import "./augmentations/ISuggestOwner.js";
import "./augmentations/ItemView.js";
import "./augmentations/Keymap.js";
import "./augmentations/KeymapContext.js";
import "./augmentations/KeymapEventHandler.js";
import "./augmentations/KeymapInfo.js";
import "./augmentations/LinkCache.js";
import "./augmentations/ListedFiles.js";
import "./augmentations/ListItemCache.js";
import "./augmentations/LivePreviewState.js";
import "./augmentations/Loc.js";
import "./augmentations/MarkdownEditView.js";
import "./augmentations/MarkdownFileInfo.js";
import "./augmentations/MarkdownPostProcessor.js";
import "./augmentations/MarkdownPostProcessorContext.js";
import "./augmentations/MarkdownPreviewEvents.js";
import "./augmentations/MarkdownPreviewRenderer.js";
import "./augmentations/MarkdownPreviewView.js";
import "./augmentations/MarkdownRenderChild.js";
import "./augmentations/MarkdownRenderer.js";
import "./augmentations/MarkdownSectionInformation.js";
import "./augmentations/MarkdownSubView.js";
import "./augmentations/MarkdownView.js";
import "./augmentations/Menu.js";
import "./augmentations/MenuItem.js";
import "./augmentations/MenuPositionDef.js";
import "./augmentations/MenuSeparator.js";
import "./augmentations/MetadataCache.js";
import "./augmentations/Modal.js";
import "./augmentations/MomentFormatComponent.js";
import "./augmentations/Notice.js";
import "./augmentations/ObsidianProtocolData.js";
import "./augmentations/OpenViewState.js";
import "./augmentations/Platform.js";
import "./augmentations/Plugin.js";
import "./augmentations/PluginManifest.js";
import "./augmentations/PluginSettingTab.js";
import "./augmentations/Point.js";
import "./augmentations/PopoverSuggest.js";
import "./augmentations/Pos.js";
import "./augmentations/PreparedQuery.js";
import "./augmentations/ProgressBarComponent.js";
import "./augmentations/Reference.js";
import "./augmentations/ReferenceCache.js";
import "./augmentations/RequestUrlParam.js";
import "./augmentations/RequestUrlResponse.js";
import "./augmentations/RequestUrlResponsePromise.js";
import "./augmentations/RGB.js";
import "./augmentations/Scope.js";
import "./augmentations/SearchComponent.js";
import "./augmentations/SearchResult.js";
import "./augmentations/SearchResultContainer.js";
import "./augmentations/SectionCache.js";
import "./augmentations/Setting.js";
import "./augmentations/SettingTab.js";
import "./augmentations/SliderComponent.js";
import "./augmentations/Stat.js";
import "./augmentations/SubpathResult.js";
import "./augmentations/SuggestModal.js";
import "./augmentations/TAbstractFile.js";
import "./augmentations/TagCache.js";
import "./augmentations/Tasks.js";
import "./augmentations/TextAreaComponent.js";
import "./augmentations/TextComponent.js";
import "./augmentations/TextFileView.js";
import "./augmentations/TFile.js";
import "./augmentations/TFolder.js";
import "./augmentations/ToggleComponent.js";
import "./augmentations/TooltipOptions.js";
import "./augmentations/ValueComponent.js";
import "./augmentations/Vault.js";
import "./augmentations/View.js";
import "./augmentations/ViewState.js";
import "./augmentations/ViewStateResult.js";
import "./augmentations/Workspace.js";
import "./augmentations/WorkspaceContainer.js";
import "./augmentations/WorkspaceFloating.js";
import "./augmentations/WorkspaceItem.js";
import "./augmentations/WorkspaceLeaf.js";
import "./augmentations/WorkspaceMobileDrawer.js";
import "./augmentations/WorkspaceParent.js";
import "./augmentations/WorkspaceRibbon.js";
import "./augmentations/WorkspaceRoot.js";
import "./augmentations/WorkspaceSidedock.js";
import "./augmentations/WorkspaceSplit.js";
import "./augmentations/WorkspaceTabs.js";
import "./augmentations/WorkspaceWindow.js";
import "./augmentations/WorkspaceWindowInitData.js";

export type { AbstractSearchComponent } from "./internals/AbstractSearchComponent.js";
export type { Account } from "./internals/Account.js";
export type { AppMenuBarManager } from "./internals/AppMenuBarManager.js";
export type {
    AppVaultConfig,
    AppVaultConfigHotkeysRecord
} from "./internals/AppVaultConfig.js";
export type { BaseEditor } from "./internals/BaseEditor.js";
export type { CanvasConnection } from "./internals/CanvasConnection.js";
export type { CanvasLeaf } from "./internals/CanvasLeaf.js";
export type { CanvasNode } from "./internals/CanvasNode.js";
export type { CanvasView } from "./internals/CanvasView.js";
export type { ClipBoardManager } from "./internals/ClipBoardManager.js";
export type {
    Commands,
    CommandsEditorCommandsRecord,
    CommandsCommandsRecord
} from "./internals/Commands.js";
export type { ConfigItem } from "./internals/ConfigItem.js";
export type {
    CustomArrayDict,
    CustomArrayDictDataRecord
} from "./internals/CustomArrayDict.js";
export type {
    CustomCSS,
    CustomCSSThemesRecord,
    CustomCSSUpdatesRecord
} from "./internals/CustomCSS.js";
export type {
    DataAdapterFilesRecord,
    DataAdapterWatchersRecord
} from "./internals/DataAdapterRecords.js";
export type {
    Draggable,
    DragManager,
    DragStartEvent,
    DropResult
} from "./internals/DragManager.js";
export type { EditorSearchComponent } from "./internals/EditorSearchComponent.js";
export type { EditorSuggests } from "./internals/EditorSuggests.js";
export type { EmbedContext } from "./internals/EmbedContext.js";
export type { EmbeddableConstructor } from "./internals/EmbeddableConstructor.js";
export type { EmbeddedEditorView } from "./internals/EmbeddedEditorView.js";
export type {
    EmbedRegistry,
    EmbedRegistryEmbedByExtensionRecord
} from "./internals/EmbedRegistry.js";
export type { FileCacheEntry } from "./internals/FileCacheEntry.js";
export type { FileEntry } from "./internals/FileEntry.js";
export type { FileExplorerLeaf } from "./internals/FileExplorerLeaf.js";
export type {
    FileExplorerView,
    FileExplorerViewFileItemsRecord
} from "./internals/FileExplorerView.js";
export type { FileSuggest } from "./internals/FileSuggest.js";
export type { FileSuggestManager } from "./internals/FileSuggestManager.js";
export type { FileTreeItem } from "./internals/FileTreeItem.js";
export type { FoldInfo } from "./internals/FoldInfo.js";
export type { FoldManager } from "./internals/FoldManager.js";
export type { GlobalSearchLeaf } from "./internals/GlobalSearchLeaf.js";
export type {
    HotkeyManager,
    HotkeyManagerCustomKeysRecord,
    HotkeyManagerDefaultKeysRecord
} from "./internals/HotkeyManager.js";
export type { HotkeysSettingTab } from "./internals/HotkeysSettingTab.js";
export type { HoverLinkEvent } from "./internals/HoverLinkEvent.js";
export type { IFramedMarkdownEditor } from "./internals/IFramedMarkdownEditor.js";
export type { ImportedAttachments } from "./internals/ImportedAttachments.js";
export type { InfinityScroll } from "./internals/InfinityScroll.js";
export type {
    AudioRecorderPluginInstance,
    BacklinkPluginInstance,
    BookmarksPluginInstance,
    CanvasPluginInstance,
    CommandPalettePluginInstance,
    DailyNotesPluginInstance,
    EditorStatusPluginInstance,
    FileExplorerPluginInstance,
    FileRecoveryPluginInstance,
    GlobalSearchPluginInstance,
    GraphPluginInstance,
    InternalPlugin,
    InternalPluginInstance,
    InternalPluginNameInstancesMapping,
    InternalPluginNameType,
    InternalPlugins,
    InternalPluginsConfigRecord,
    MarkdownImporterPluginInstance,
    NoteComposerPluginInstance,
    OutgoingLinkPluginInstance,
    OutlinePluginInstance,
    PagePreviewPluginInstance,
    PropertiesPluginInstance,
    PublishPluginInstance,
    RandomNotePluginInstance,
    SlashCommandPluginInstance,
    SlidesPluginInstance,
    StarredPluginInstance,
    SwitcherPluginInstance,
    SyncPluginInstance,
    TagPanePluginInstance,
    TemplatesPluginInstance,
    WordCountPluginInstance,
    WorkspacesPluginInstance,
    ZkPrefixerPluginInstance
} from "./internals/InternalPlugin.js";
export type { KeyScope } from "./internals/KeyScope.js";
export type { LeafEntry } from "./internals/LeafEntry.js";
export type {
    LinkChangeUpdate,
    LinkUpdate,
    LinkUpdaters
} from "./internals/LinkUpdate.js";
export type { LoadProgress } from "./internals/LoadProgress.js";
export type { MarkdownBaseView } from "./internals/MarkdownBaseView.js";
export type { MarkdownScrollableEditView } from "./internals/MarkdownScrollableEditView.js";
export type { MenuSubmenuConfigRecord } from "./internals/MenuRecords.js";
export type {
    MetadataCacheFileCacheRecord,
    MetadataCacheMetadataCacheRecord
} from "./internals/MetadataCacheRecords.d.ts";
export type { MetadataEditor } from "./internals/MetadataEditor.js";
export type { MetadataEditorProperty } from "./internals/MetadataEditorProperty.js";
export type {
    MetadataTypeManager,
    MetadataTypeManagerPropertiesRecord,
    MetadataTypeManagerRegisteredTypeWidgetsRecord,
    MetadataTypeManagerTypesRecord
} from "./internals/MetadataTypeManager.js";
export type { MetadataWidget } from "./internals/MetadataWidget.js";
export type { MobileNavbar } from "./internals/MobileNavbar.js";
export type { MobileToolbar } from "./internals/MobileToolbar.js";
export type { ObsidianDOM } from "./internals/ObsidianDOM.js";
export type { ObsidianTouchEvent } from "./internals/ObsidianTouchEvent.js";
export type {
    Plugins,
    PluginsManifestsRecord,
    PluginsPluginsRecord
} from "./internals/Plugins.js";
export type { PluginUpdateManifest } from "./internals/PluginUpdateManifest.js";
export type { PositionedReference } from "./internals/PositionedReference.js";
export type { PropertyEntryData } from "./internals/PropertyEntryData.js";
export type { PropertyInfo } from "./internals/PropertyInfo.js";
export type { PropertyRenderContext } from "./internals/PropertyRenderContext.js";
export type { PropertyWidget } from "./internals/PropertyWidget.js";
export type { PropertyWidgetType } from "./internals/PropertyWidgetType.js";
export type { ReadViewRenderer } from "./internals/ReadViewRenderer.js";
export type { RecentFileTracker } from "./internals/RecentFileTracker.js";
export type { RendererSection } from "./internals/RendererSection.js";
export type { Runnable } from "./internals/Runnable.js";
export type { SearchCursor } from "./internals/SearchCursor.js";
export type {
    SerializedWorkspace,
    SerializedWorkspaceLeftRibbonHiddenItemsRecord
} from "./internals/SerializedWorkspace.js";
export type { StateHistory } from "./internals/StateHistory.js";
export type { SuggestionContainer } from "./internals/SuggestionContainer.js";
export type { TableCell } from "./internals/TableCell.js";
export type { TableCellEditor } from "./internals/TableCellEditor.js";
export type { TableEditor } from "./internals/TableEditor.js";
export type { ThemeManifest } from "./internals/ThemeManifest.js";
export type { Token } from "./internals/Token.js";
export type { Tree } from "./internals/Tree.js";
export type { TreeItem } from "./internals/TreeItem.js";
export type { TreeNode } from "./internals/TreeNode.js";
export type { VaultFileMapRecord } from "./internals/VaultRecords.js";
export type {
    ViewRegistry,
    ViewRegistryTypeByExtensionRecord,
    ViewRegistryViewByTypeRecord
} from "./internals/ViewRegistry.js";
export type { WeakMapWrapper } from "./internals/WeakMapWrapper.js";
export type { WidgetEditorView } from "./internals/WidgetEditorView.js";
export type { WindowSelection } from "./internals/WindowSelection.js";
export type { WorkspaceHoverLinkSourcesRecord } from "./internals/WorkspaceRecords.js";
