# Crawler discrepancy triage for Obsidian 1.14.4

<!-- cspell:ignore Pointerout Pointerover -->

Verified on 2026-10-27 against both maintained streams. This report classifies the supplied discrepancy excerpt and records implementation boundaries; it does not change the declarations.

## Reproduction and source identity

The public declaration baseline is commit `39d56a2578d23ccda7a3e7942c5beb68f83f5952`; catalyst is `8d5ff56ac0b7576f89d29e0912ff2e3eedaac398`. The `obsidian-versions` tags `1.14.4` and `catalyst/1.14.4` both resolve `obsidian.asar/app.js` to blob `8b091268ff2b18b7939891bff0b81c4b64f6fb21`. Source line numbers below refer to that formatted blob, not a later application build.

A fresh crawler run launched and disposed an owned isolated Obsidian 1.14.4 instance. Its saved harvest was diffed against each declaration baseline with the same crawler compiler resolver. Both reports contained identical named findings, including every name and candidate in the supplied excerpt. A successful crawler exit means the crawl completed, not that coverage is complete.

Run from an installed crawler checkout, selecting the typings checkout explicitly:

```sh
jiti src/cli.ts --repo=<typings-checkout> --obsidian-version=1.14.4 --save=<harvest.json>
jiti src/cli.ts --repo=<other-stream-checkout> <harvest.json>
```

The supplied heading said 32 types, but its excerpt actually enumerates 28. The fresh run reports 39 named types; the additional 11 are listed separately below. Unresolved runtime groups are outside this named-type triage.

## Per-type disposition

The candidate column preserves every missing member in the supplied excerpt. A confirmed gap means both the runtime/compiler comparison and the owning implementation support the member's existence. It does not establish a complete TypeScript signature. Determine parameter types, return types, nullability, optional construction and helper records before changing declarations.

| Type | Missing candidates | Source class and lines | Disposition |
| --- | --- | --- | --- |
| `FileExplorerView` | `_revealActiveFileQueued`, `_sortQueued`, `activeDom`, `autoRevealButtonEl`, `autoRevealFile`, `collapseOrExpandAllEl`, `fileBeingRenamed`, `fileRenameScope`, `headerDom`, `navFileContainerEl`, `onConfigChanged`, `onFileClick`, `onFilePointerout`, `onFilePointerover`, `onToggleAutoReveal`, `revealActiveFile`, `saveRename`, `search`, `setAutoReveal`, `showSearch`, `updateShowUnsupportedFiles`, `workQueue` | `RO`, 86389-87702 | Confirmed own gaps; seven stale methods. |
| `TagView` | `collapseOrExpandAllEl`, `emptyEl`, `isShowingSearch`, `onToggleShowSearch`, `requestUpdateTags`, `searchComponent`, `searchQuery`, `setShowSearch`, `showSearch`, `showSearchButtonEl`, `sortOrder`, `tagDoms`, `tagPaneEl`, `tree`, `updateSearch`, `useHierarchy`, `useHierarchyEl` | `sre`, 220674-220997 | Confirmed own gaps. Keep its older search-component API distinct from the other views. |
| `OutlineView` | `activeEl`, `cachedHeadingDom`, `collapseOrExpandAllEl`, `emptyEl`, `followCursor`, `followCursorButtonEl`, `onSearchChanged`, `onSelectionChange`, `onToggleFollowCursor`, `plugin`, `prevQuery`, `renderSearchMatches`, `requestUpdate`, `search`, `searchQuery`, `setFollowCursor`, `tree` | `ene`, 204849-205287 | Confirmed own gaps; four stale search methods. |
| `SearchView` | `collapseResultsToggle`, `explainSearch`, `explainSearchToggle`, `extraContextToggle`, `filterSectionToggleEl`, `infoEl`, `matchingCaseButtonEl`, `requestSaveSearch`, `resultCountEl`, `searchContainerEl`, `searchInfoEl`, `searchParamsContainerEl`, `showParams`, `sortOrderDropdown` | `S2`, 157306-157771 | Confirmed UI gaps outside the already-verified queue/matcher surface. |
| `AllPropertiesView` | `deleteProperty`, `doms`, `emptyStateEl`, `onDeleteSelectedItems`, `onSearchChanged`, `propertyBeingRenamed`, `propertyRenameScope`, `requestUpdate`, `root`, `search`, `searchQuery`, `sortOrder`, `tree` | `une`, 205963-206329 | Confirmed own gaps; three stale search methods. |
| `BookmarksView` | `collapseOrExpandAllEl`, `emptyEl`, `invalidStateEl`, `itemDoms`, `onSearchChanged`, `plugin`, `requestUpdate`, `root`, `search`, `searchQuery`, `showSearch`, `tree` | `c9`, 189344-189767 | Confirmed own gaps. |
| `QueryController` | `getAllGroups`, `getGroupFolds`, `loadGroupFolds`, `saveGroupFolds`, `sourcePath` | `w1`, 146773-147534 | Confirmed gaps; sourcePath is an accessor at 147056, not a mutable stored field. |
| `TExternalFile` | `addUser`, `hasUsers`, `metadata`, `removeUser`, `users` | `nI`, 81273-81310 | Confirmed own gaps on the external-file subclass. |
| `Modal` | `canAnimate`, `canDismiss`, `isOpen`, `shouldAnimateOpen` | `ST`, 73293-73547 | Confirmed base gaps; fix once here. isOpen and shouldAnimateOpen are stored flags; canAnimate and canDismiss are methods. |
| `UnknownView` | `actionListEl`, `clickableAreaEl`, `emptyStateEl`, `emptyTitleEl` | `aI`, 82426-82517 | Attribution correction: the sampled _empty object is EmptyView. These fields are initialized by EmptyView; UnknownView inherits them. Add to the base, not to UnknownView alone. |
| `BasesView` | `isGroupCollapsed`, `onGroupCollapsedChange`, `toggleGroupCollapsed` | `_J`, 144453-144782 | Confirmed methods on the exported base. |
| `App` | `getBaseFontSize`, `setBaseFontSize` | `xoe`, 230232-230246 | Confirmed methods on App; other views only call them. |
| `ConfirmationModal` | `isOpen`, `shouldAnimateOpen` | `ST`, 73293-73547 | Inherited Modal gaps, not two independent additions to ConfirmationModal. |
| `LinkValue` | `resolvedFile`, `resolvedTick` | `xK`, 128065-128153 | Confirmed resolution-cache fields. |
| `MarkdownView` | `focusAfterMetadata`, `focusBeforeMetadata` | `f2`, 156105-156113 | Confirmed methods on MarkdownView; similarly named methods elsewhere do not establish ownership. |
| `WorkspaceTabs` | `scheduleTouchUnlock`, `touchUnlockTabWidths` | `eF`, 89161-89879 | Confirmed own field and method; touchUnlockTabWidths holds an AbortController or null. |
| `BasesViewConfig` | `setGroupOrder` | `h$`, 136334-136487 | Confirmed method. Source copies an order array or stores null and saves the query. |
| `CapacitorAdapter` | `exportTextFile` | `BA`, 77312-77341 | Confirmed implementation; desktop observation alone would not establish the mobile implementation. |
| `ConfirmationButton` | `setForm` | `xT`, 73548-73601 | Confirmed method. |
| `FileSystemAdapter` | `exportTextFile` | `nc`, 32937-34239 | Confirmed export method. Keep reverse field observations separate; see below. |
| `FileView` | `createBreadcrumb` | `BO`, 87703-88111 | Confirmed method at 87887, also called during breadcrumb updates. |
| `FuzzySuggestModal` | `shouldAnimateOpen` | `ST`, 73293-73547 | Inherited Modal flag; correct the base. |
| `MarkdownPreviewRenderer` | `handleMediaClick` | `Lj`, 115805-117131 | Confirmed method at 115928. |
| `MetadataCache` | `iterateFileCache` | `WR`, 100902-101985 | Confirmed method at 100982. |
| `SuggestModal` | `shouldAnimateOpen` | `ST`, 73293-73547 | Inherited Modal flag; correct the base. |
| `Vault` | `externalFileManager` | `iI`, 81311-82309 | Confirmed field initialized at 81393; determine the manager interface from its implementation. |
| `Workspace` | `registerOpenFileHandler` | `L3`, 167600-171109 | Confirmed registerOpenFileHandler; stale handleXCallback belongs to WorkspaceProtocolHandler instead. |
| `WorkspaceWindow` | `destroyWindow` | `x3`, 167292-167479 | Confirmed method at 167460. |

## Reverse findings

The exact view identities and their source implementations support these stale-method findings. Their owning classes do not implement the declared methods; unrelated classes with the same method names are not evidence for retaining them.

1. `FileExplorerView`: `acceptRename`, `attachFileEvents`, `createFolderDom`, `createItemDom`, `onFileMouseout`, `onFileMouseover`, `updateConfig`.
1. `OutlineView`: `filterSearchResults`, `onToggleShowSearch`, `setShowSearch`, `updateSearch`.
1. `AllPropertiesView`: `onToggleShowSearch`, `setShowSearch`, `updateSearch`.
1. `Workspace`: `handleXCallback`.

File explorer uses `saveRename`, pointer event handlers and `onConfigChanged` in this version. Outline and All Properties use their newer search wrapper and `onSearchChanged`; Tag View still implements `setShowSearch` and `updateSearch`. Do not remove those names globally. Workspace's `handleXCallback` is implemented on the protocol handler at source line 166770 onward, as documented in the [protocol-handler report](protocol-handler-1.14.4.md).

The desktop adapter's `ipcRenderer` and `watcher` remain a conservative review category. Neither is initialized as an adapter field or assigned as such in its complete source class. The real adapter stores `watchers`, whose entries contain a `watcher`; a separate external-file monitor initializes its own `watcher` at line 80824. Electron IPC references elsewhere do not establish an adapter field. The current `ipcRenderer` declaration is already optional. These observations warrant reviewing the declarations, but a missing field in one runtime harvest alone is not permission to delete it or to infer its lifetime.

## Implementation boundaries

1. Reconcile the six sidebar views together, including the stale methods and all candidates above. Put the empty-state fields on `EmptyView` so `UnknownView` inherits them.
2. Reconcile Bases grouping, group persistence and `LinkValue` caching together. Inspect serialized group-fold shapes and order semantics before declaring helper types.
3. Reconcile the remaining Modal, file, adapter and workspace APIs. Fix inherited modal findings at `Modal`, and inspect adapter reverse fields separately.

Each change must be applied to both maintained streams and pass the full type-change build gate, lint, spellcheck and formatting. This triage changes no release declarations and requires no release. The [Search report](core-search-1.14.4.md) remains the authority for the queue and matcher surface.

## Additional findings from the fresh run

The extra named types are `AppSetting`, `MetadataTypeManager`, `CustomCSS`, `AppMenuBarManager`, `DragManager`, `BacklinkView`, `OutgoingLinkView`, `Component`, `FileManager`, `Scope` and `WorkspaceLeaf`. They need their own ownership/source triage. In particular, `Component.app` can arise from derived-group attribution; `FileManager.mergeFile` overlaps the separate investigation of the core Note Composer merge flow. Neither should be blindly added or removed.
