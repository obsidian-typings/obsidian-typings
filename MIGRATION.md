# Migration guide

There are some breaking changes made between `v1` and `v2` of this package.

## Mandatory changes

- If you were using in your `tsconfig.json`, `"moduleResolution": "Classic"`, switch it to more modern option.
- Importing undocumented methods now requires you to import from `obsidian-typings`, and not just `obsidian` module. This is done in order to make it more apparent that you are making use of undocumented and possibly volatile API. See below for the full list of interfaces that should be imported as `import { X } from "obsidian-typings"` instead of `import { X } from "obsidian"`:

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
  StarredPluginInstance
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

- If you used to add register you own plugins something like

    ```ts
    declare module "obsidian" {
      interface Plugins {
        plugins: {
          myPlugin: MyPlugin;
        }
      }
    }
    ```

    You have to change it to

    ```ts
    export {};

    declare module "obsidian-typings" {
      interface PluginsPluginsRecord {
        myPlugin: MyPlugin;
      }
    }
    ```

- If you used `obsidian-typings` package with an alias, such as `@types/obsidian-typings`, `import { X } from "obsidian-typings/implementations";` won't work. You will need to adjust [Using `obsidian-typings/implementations`](README.md#using-obsidian-typings-implementations) approach to the corresponding path such as `./node_modules/@types/obsidian-typings/...`.

## Recommended optional changes

While those changes are not strictly required, they will help to keep your code more modern, future-proof and avoids the need to use legacy workarounds.

- Switch to latest `TypeScript` version `npm install typescript@latest --save-dev` to support modern `TypeScript` features.
- Set in `tsconfig.json`, `moduleResolution` option to `NodeNext` or `Bundler`. With `NodeNext` you will have to add extensions to all your relative imports such as `import { fn1 } from "./module2.js";`. With `Bundler` you can keep using `import { fn1 } from "./module2";`
- Set in `tsconfig.json`, `skipLibCheck` to `false`. This will compile your `.d.ts` definitions and allow you to detect the errors earlier.
- Switch to [Add `types` setting to `tsconfig.json`](README.md#add-types-setting-to-tsconfig-json) approach as it is the most robust.
