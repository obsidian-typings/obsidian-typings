# Changelog

## 2.1.0

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
