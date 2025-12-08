# Changelog

## 2.3.0

- feat: FileSystemWatchHandler
- feat: DataAdapter.handler/trigger
- fix: mark created fake file/folder as deleted
- fix root folder path
- fix: handle root folder as /
- feat: PromisedQueue
- feat: MarkdownFileInfo.metadataEditor
- fix: ensure style-mod.d.cts is loaded
- feat: add missing public
cd59387 feat: add global app
3ebddbc chore: ensure formatting doesn't remove vars
e1b1d6f chore(release): 2.2.1-beta.9
1a5ddfb fix: add @deprecated to app
a3bc2ef chore(release): 2.2.1-beta.10
ae1786b feat: TFolder.getParentPrefix
05820be chore(release): 2.2.1-beta.11
a52c762 feat: add TFile/TFolder/TAbstractFile methods
3894d9e feat: add ShareReceiver
d2babb8 feat: add all Workspace events
c8ab72c chore: recover sorting
319f22e chore: reformat
56fe232 chore: sort method overloads
57e5bde chore: apply sorting
fb0aca4 chore(release): 2.2.1-beta.12
d24bc71 chore: switch to single quotes
71ded19 chore: spellcheck
00113a8 chore(release): 2.2.1-beta.13
98c199a `getLinkSuggestions()` sometimes has `alias` property
06127a7 feat: getLinkSuggestions() sometimes has alias property (#85)
bab5832 chore: format json
42fc080 chore: reformat
6339f74 chore: spellcheck
291abf4 chore: update node packages
a8b58d1 chore(release): 2.2.1-beta.14
f0de557 chore: fix ... in json README
613e4d4 Extended typings for MarkdownPreviewRenderer
f067c49 Merge remote-tracking branch 'upstream/main'
d00645d fix formatting error in contributing.md
ab390cf feat: Add typings to MarkdownPreviewRenderer and fix contributing.md formatting (#86)
7d0a62d chore: support namespaces
53ea089 chore: add @public
a345e9e Add trailing newline
bee2289 chore(release): 2.2.1-beta.15
5adb556 feat: add more hidden exported types
a3a25f8 feat: extract CapacitorAdapter...
12b7a12 feat: MarkdownPreviewSection
17cbd22 feat: add all global variables
ee68d16 chore(release): 2.2.1-beta.16
4ff488b chore: move libs to dependencies
f8df77f chore(release): 2.2.1-beta.17
eca21f4 feat: fix getAvailablePathForAttachments signature
ee7cbd0 chore(release): 2.2.1-beta.18
1ba2065 feat: getBacklinksForFile change to return ReferenceCache
66b9687 chore(release): 2.2.1-beta.19
243175c Updated PropertyRenderContext.onChange
10f8326 added remark
bb329a3 whoops my remark was wrong
ac4dcfc feat: Updated PropertyRenderContext.onChange (#87)
275ad1f chore(release): 2.2.1-beta.20
e77ee2d chore: update obsidian dep
39eca7b fix: separate AppSetting from existing Setting...
696fcbe Reformat
be67985 chore(release): 2.2.1-beta.21
c74ffe2 fix: add null result
524f56c chore(release): 2.2.1-beta.22
395d226 fix: getBacklinksForFile accept mandatory TFile
1a6443b chore(release): 2.2.1-beta.23
16d577a fix: MetadataCache typings
d903865 chore(release): 2.2.1-beta.24
4cdc7db feat: update LinkResolverQueue
2b2f657 chore: process files in sorted order
0647b24 feat: use posix
6e475ad chore(release): 2.2.1-beta.25
48ad7ad feat: MetadataCache
a2ebd6a chore(release): 2.2.1-beta.26
2ba9869 feat: MetadataCache
96ceb69 chore(release): 2.2.1-beta.27
7bdc833 feat: MetadataCache
93d0806 chore(release): 2.2.1-beta.28
27bf220 feat: Events._
cf7b9b1 fix: computeMetadataAsync
39f2db0 chore(release): 2.2.1-beta.29
b44588e fix: remove unused Starred plugin
d7e6a7e feat: add Plugin typings
061359a chore: format
3fed738 chore: sort interfaces outside of modules
1bf65e1 chore: format
f89f244 chore: switch from lambdas to functions
5cc1f64 feat: AudioRecorderPluginInstance
7a5f0c1 chore: sort overloads regardless of whitespaces
312f983 chore: reformat
ad46d9b chore: add generateTypes helper
f73a710 chore: spellcheck
625498a chore: update docs
714d594 chore: fix link
1109a04 chore: spellcheck
03aadac chore: generate separate types
fde1453 chore: remove extra brackets
95e9756 chore: include all chain for obsidian types
2430d3d chore: add path to the instance in comment
39c48d1 chore: get params from fn.length, not via parsing
077199d chore: function types in array need more brackets
576f5e7 chore: recompile
953a6cd chore: reword
bb3e5f4 feat: add constructors
956995d feat: update InternalPlugins
d46f7d2 chore: generate types only
b779037 added fileManager.renameProperty()
32b3636 chore: refactor to argument object
dd5afc2 chore: add depth
107d681 chore: update depth info
db68018 chore: format
3c17772 chore: don't add extra depth for arrays
ddff8dd chore: don't cache DepthLimitReached
c12ad57 chore: reuse types with the same definition
252d584 chore: use unique numbers to prevent overrides
114d584 chore: ensure types sorted
310a49a feat: more internal plugins
019391e chore: handle functions with additional properties
bac7480 chore: reformat
fb137c5 chore: show paths in the shortest order
691fb01 chore: better logs
6f50eb0 feat: requestSaveConfig
344cbe5 feat: BacklinkPluginInstance
d90c694 fix: Debouncer signature
d590375 chore: change type
35265a4 feat: bookmarks
f6a864a chore: build:tools
9114909 chore: format
fce0e2a chore: fix command
d1ea594 chore: format
52e95ec chore: add support for more builtin types...
606af6c Avoid duplicating TFile/TFolder
82c25ab chore: reformat
5b86a6f feat: Bookmark
a28ed6d feat: added fileManager.renameProperty() (#89)
5fcfa0e feat: App
a4da951 chore: format
fcb61d1 chore: format json with lf
48e9691 chore: exclude dist from cspell
987960a chore: support null prototype
96e53ae chore: handle constructor names
b7d904a chore: better check for prototypes
5309df5 feat: Bookmark
722a9c9 chore: proper exclude tools
1d3d4c5 feat: more types
707b54e feat: Canvas plugin
ec426c1 feat: more types
90279b7 Added colorPickerEl property to ColorComponent
2c73c25 feat: Added colorPickerEl property to ColorComponent (#90)
3882497 feat: add ColorComponent functions
4176b25 feat: WorkspaceItem / WorkspaceSidedock
f82edcd chore: fix api extract warnings
512043f chore: reformat
e748f09 chore(release): 2.2.1-beta.30
37d8a08 Update Tree.d.ts
af9a6a6 docs: switch code samples to single quote
00ec5ae docs: correct terminology
0bbf5dc feat: Update Tree.d.ts (#94)
f8225b1 fix: use proper typing
24b3874 chore: lambdas to functions
ee3ba1e chore: reformat
d069c65 chore(release): 2.2.1-beta.31
ba0c1fd Updated typings for ProgressBarComponent
e481ce7 feat: Updated typings for ProgressBarComponent (#96)
0504897 fix: typo
8578d4a feat: add method
91e0c61 chore: reformat
3b170b5 chore(release): 2.2.1-beta.32
708f36e chore: fix Plugin$1 in generated code
f9ef2e3 chore(release): 2.2.1-beta.33
820ef98 fix: changed CustomArrayDict
d8b11e7 chore(release): 2.2.1-beta.34
7d17f54 fix: signature for getBacklinksForFile
3f42f5a chore(release): 2.2.1-beta.35
da7e309 feat: add type guards
f8c61f3 chore: ignore tsbuildinfo
07315c8 chore(release): 2.2.1-beta.36
a7d765f feat: Update ConfigItems
59733a1 chore(release): 2.2.1-beta.37
31714c2 fix: CustomArrayDict
f1de130 chore(release): 2.2.1-beta.38
744f471 feat: add debugMode
1bac717 chore(release): 2.3.0

## 2.2.0
- Added typings for `LinkUpdateHandler` for `inProgressUpdates` and `runAsyncLinkUpdate` (`FileManager`)
- Added typings for `onChange` method (`Vault`)
- Fix first parameter type of `exists` (`Vault`)
- Fix optionality of `getAvailablePathForAttachments` (`Vault`)

## 2.1.3

-   Added _initial_ typings for following views:
    -   `AllPropertiesView`
    -   `AudioView`
    -   `BacklinkView`
    -   `BookmarksView`
    -   `BrowserHistoryView`
    -   `BrowserView`
    -   `CanvasView`
    -   `EmptyView`
    -   `FilePropertiesView`
    -   `GraphView`
    -   `ImageView`
    -   `InfoFileView`
    -   `LocalGraphView`
    -   `OutgoingLinkView`
    -   `OutlineView`
    -   `PdfView`
    -   `ReleaseNotesView`
    -   `SearchView`
    -   `TagView`
    -   `UnknownView`
    -   `VideoView`
-   Add typings for `queue` method on `FileManager`

## 2.0.0

-   Split up typings codebase into separate files
-   Added `/implementations` submodule which provides additional code imports
    -   `InternalPluginName`
    -   `createTFile` and `createTFolder` functions
    -   `CustomArrayDictImpl`
-   Added typings for:
    -   Missing `Platform` constants
    -   `HotkeysSettingTab`
    -   `LinkUpdaters`
    -   `DragManager`
-   Fixed typings for:
    -   `enable` is async (`Plugin`)
    -   Return type of `getEnabledPluginById` (`InternalPlugins`)
    -   Return type of `saveAttachment` (`App`)
    -   Return type of `importAttachments` (`App`)
    -   Parameter order of `getAvailablePathForAttachments` (`Vault`)
-   Improved compatibility with older and newer Node and TS configurations

## 1.1.6

-   Refactored `InternalPlugin` instance structure
-   Fixed return type of `splitLeafOrActive`, returns `WorkspaceLeaf`

## 1.1.5

-   **DEPRECATED:** `app.isMobile` will be removed in a future version, prefer usage of `Platform.isMobile`
-   **DEPRECATED:** `app.account` has been removed
-   Fix `getFileInfo`, returns `undefined` if file does not exist

## 1.1.4

-   **NOTE:** the global `app` variable has been removed from the official Obsidian API as of 1.6.0, it will _not_ be re-added by `obsidian-typings`.
-   **DEPRECATED:** `loadProgress` has been made inaccessible in version 1.6.0
-   **DEPRECATED:** `collapsed`/`collapsible` properties of `TreeItem` have been removed in 1.6.0
-   `showRibbon` setting was added
-   `footnotes` were added to `MetadataCache`
-   Added typings for `DomElementInfo` to allow for adding event listeners directly within `createEl`
-   Added `instance` to `InternalPlugin` definitions
-   New methods/variables added in 1.6.0/1.6.1 have gotten preliminary typings

## 1.1.3

-   Use obsidian as a peer dependency when installing the package

## 1.1.2

-   Renamed `Editor` to `BaseEditor` and `ExtendedEditor` to `Editor`, as most components and views directly make use of
    the `Editor` class (and `BaseEditor` is never used directly)

## 1.1.1

-   Fix incorrect return type for `loadLocalStorage` function

## 1.1.0

-   Add typings for Live Preview Editor instances (`MarkdownView`, `MarkdownEditView`, `MarkdownScrollableEditView`, ...)
-   Improved typings for `MetadataEditor` and `PropertyWidgetType`
-   Add basic typings for Vim CM plugin to `@codemirror/view` module
-   Moved all interfaces and classes under the `obsidian` module
-   Removed commented trigger functions from `Events`-derived classes
-   Removed duplicated definitions
-   Sorted file interfaces alphabetically, applied dprint formatting

## 1.0.8

-   Add `aliases` widget type to `PropertyWidgetType`
-   Allow arbitrary widgets for `PropertyWidgetType`

## 1.0.7

-   Fix `setType` and `unsetType` of `app.metadataTypeManager` not being marked as `async`

## 1.0.6

-   Fix unnecessary typings for overridden `trigger` functions on `Events`-derived classes
-   Fix `revealInFolder` for file-explorer plugin not accepting `TFile` inputs

## v1.0.5

-   Fix some methods on `Menu` and `MenuItem` not being chainable

## v1.0.4

-   Added missing EventRef types
    -   **View Registry:** `view-registered`, `view-unregistered`, `extensions-updated`
    -   **Metadata Cache:** `initialized`, `finished`
    -   **Workspace:** `hover-link`, `tab-group-menu`, `swipe`, `layout-ready`, `url-menu`, `search:results-menu`, `receive-text-menu`,
        `receive-files-menu`, `canvas:selection-menu`, `canvas:node-menu`, `canvas:node-connection-drop-menu`, `canvas:edge-menu`
    -   **Workspace Leaf:** `history-change`, `leaf-menu`
-   Added missing typings for `Menu` and `MenuItem` classes
-   Added missing typings for `Tree` and `TreeItem` classes (used in `Outline` and `FileExplorer` plugin views)
-   Set vertical height for a split leaf item via `setDimension`
-   Bumped `electron-types` version

## v1.0.3

-   Change `electron-types` types inclusion
-   Added note in `README.md` on automatically including new types
-   Fix lambda definitions and tsc compilation

## v1.0.2

-   Changed `any` type to `unknown` to enforcing explicit type casting
-   Fixed `CONTRIBUTING.md` link in `README.md`
-   Added badges to `README.md`

## v1.0.1

-   Automated npm publishing

## v1.0.0 (initial npm release)

-   Made package installable via npm
-   Clarified README, added contribution guidelines
