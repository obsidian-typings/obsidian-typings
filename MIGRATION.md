# Migration guide

Some breaking changes were made between `1.x.x` and `2.0.0` versions of this package.

## Mandatory changes

- If you were using in your `tsconfig.json`, `"moduleResolution": "classic"`, you will need to switch to a more modern option (such as `bundler`, `nodenext`, `node16`, `node`, `node10`).
- Importing undocumented methods now requires you to import from `obsidian-typings`, rather than the `obsidian` package. This is done in order to make it more apparent that you are making use of undocumented and possibly volatile API. These should be imported as `import { X } from "obsidian-typings"` instead of `import { X } from "obsidian"`. See below for the full list of interfaces:

  <details>
    <summary>Full list of interfaces that need to be imported from <code>obsidian-typings</code> module</summary>
    <pre><code>AbstractSearchComponent
  Account
  AppMenuBarManager
  AppVaultConfig
  AppVaultConfigHotkeysRecord
  AudioRecorderPluginInstance
  BacklinkPluginInstance
  BaseEditor
  BookmarksPluginInstance
  CanvasConnection
  CanvasLeaf
  CanvasNode
  CanvasPluginInstance
  CanvasView
  ClipBoardManager
  CommandPalettePluginInstance
  Commands
  CommandsCommandsRecord
  CommandsEditorCommandsRecord
  ConfigItem
  CustomArrayDict
  CustomArrayDictDataRecord
  CustomCSS
  CustomCSSThemesRecord
  CustomCSSUpdatesRecord
  DailyNotesPluginInstance
  DataAdapterFilesRecord
  DataAdapterWatchersRecord
  Draggable
  DragManager
  DragStartEvent
  DropResult
  EditorSearchComponent
  EditorStatusPluginInstance
  EditorSuggests
  EmbedContext
  EmbeddableConstructor
  EmbeddedEditorView
  EmbedRegistry
  EmbedRegistryEmbedByExtensionRecord
  FileCacheEntry
  FileEntry
  FileExplorerLeaf
  FileExplorerPluginInstance
  FileExplorerView
  FileExplorerViewFileItemsRecord
  FileRecoveryPluginInstance
  FileSuggest
  FileSuggestManager
  FileTreeItem
  FoldInfo
  FoldManager
  FootnoteCache
  GlobalSearchLeaf
  GlobalSearchPluginInstance
  GraphPluginInstance
  HotkeyManager
  HotkeyManagerCustomKeysRecord
  HotkeyManagerDefaultKeysRecord
  HotkeysSettingTab
  HoverLinkEvent
  IFramedMarkdownEditor
  ImportedAttachments
  InfinityScroll
  InternalPlugin
  InternalPluginInstance
  InternalPluginNameInstancesMapping
  InternalPluginNameType
  InternalPlugins
  InternalPluginsConfigRecord
  KeyScope
  LeafEntry
  LinkChangeUpdate
  LinkUpdate
  LinkUpdaters
  LoadProgress
  MarkdownBaseView
  MarkdownImporterPluginInstance
  MarkdownScrollableEditView
  MenuSubmenuConfigRecord
  MetadataCacheFileCacheRecord
  MetadataCacheMetadataCacheRecord
  MetadataEditor
  MetadataEditorProperty
  MetadataTypeManager
  MetadataTypeManagerPropertiesRecord
  MetadataTypeManagerRegisteredTypeWidgetsRecord
  MetadataTypeManagerTypesRecord
  MetadataWidget
  MobileNavbar
  MobileToolbar
  NoteComposerPluginInstance
  ObsidianDOM
  ObsidianTouchEvent
  OutgoingLinkPluginInstance
  OutlinePluginInstance
  PagePreviewPluginInstance
  Plugins
  PluginsManifestsRecord
  PluginsPluginsRecord
  PluginUpdateManifest
  PositionedReference
  PropertiesPluginInstance
  PropertyEntryData
  PropertyInfo
  PropertyRenderContext
  PropertyWidget
  PropertyWidgetType
  PublishPluginInstance
  RandomNotePluginInstance
  ReadViewRenderer
  RecentFileTracker
  RendererSection
  Runnable
  SearchCursor
  SerializedWorkspace
  SerializedWorkspaceLeftRibbonHiddenItemsRecord
  SlashCommandPluginInstance
  SlidesPluginInstance
  StateHistory
  SuggestionContainer
  SwitcherPluginInstance
  SyncPluginInstance
  TableCell
  TableCellEditor
  TableEditor
  TagPanePluginInstance
  TemplatesPluginInstance
  ThemeManifest
  Token
  Tree
  TreeItem
  TreeNode
  VaultFileMapRecord
  ViewRegistry
  ViewRegistryTypeByExtensionRecord
  ViewRegistryViewByTypeRecord
  WeakMapWrapper
  WidgetEditorView
  WindowSelection
  WordCountPluginInstance
  WorkspaceHoverLinkSourcesRecord
  WorkspacesPluginInstance
  ZkPrefixerPluginInstance
  </code></pre>
  </details>

- If you used to register your own plugins using a declaration like:

    ```ts
    declare module "obsidian" {
      interface Plugins {
        plugins: {
          myPlugin: MyPlugin;
        }
      }
    }
    ```

    You will have to change it to the [new approach](https://github.com/Fevol/obsidian-typings/blob/main/README.md#extend-with-your-own-typings).

- If you used `obsidian-typings` package with an alias, such as `@types/obsidian-typings`, `import { X } from "obsidian-typings/implementations";` will not work. You will need to use the ["Using `obsidian-typings/implementations`"](https://github.com/Fevol/obsidian-typings/blob/main/README.md#using-obsidian-typings-implementations) approach to alias the import to the corresponding path.

## Recommended optional changes

While these changes are not strictly required, they will help to keep your code more modern, future-proof and avoids the need to use legacy workarounds.

- Switch to latest `TypeScript` version `npm install typescript@latest --save-dev` to support modern `TypeScript` features.<br>The sample plugin has version 4.7.6 set as its default, so it is likely that you need to upgrade. 
- Set in `tsconfig.json`, `moduleResolution` option to `nodenext` or `bundler`. <br>With `nodenext` you will have to add extensions to all your relative imports such as `import { fn1 } from "./module2.js";`. <br>With `bundler` you can keep using `import { fn1 } from "./module2";`
- Set in `tsconfig.json`, `skipLibCheck` to `false`. This will compile your `.d.ts` definitions and allow you to detect the errors earlier.
- Switch to the ["Add `types` setting to `tsconfig.json`"](https://github.com/Fevol/obsidian-typings/blob/main/README.md#add-types-setting-to-tsconfig-json) approach, as it is the most robust.
