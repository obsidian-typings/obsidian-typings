# Crawler discrepancy triage for Obsidian 1.14.4

<!-- cspell:ignore microtask Pointerout Pointerover -->

Verified on 2026-10-27 against both maintained streams. The initial triage classified the supplied discrepancy excerpt without changing declarations. The Bases grouping and link-cache declarations, and then the remaining modal, file, workspace and adapter APIs, have since been reconciled as recorded below.

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
| `QueryController` | `getAllGroups`, `getGroupFolds`, `loadGroupFolds`, `saveGroupFolds`, `sourcePath` | `w1`, 146773-147534 | Implemented on both streams; sourcePath is getter-only. See the grouping reconciliation below. |
| `TExternalFile` | `addUser`, `hasUsers`, `metadata`, `removeUser`, `users` | `nI`, 81273-81310 | Implemented on both streams, with `monitor` and the vault's manager; see the modal, file, workspace and adapter reconciliation below. |
| `Modal` | `canAnimate`, `canDismiss`, `isOpen`, `shouldAnimateOpen` | `ST`, 73293-73547 | Implemented on both streams at the base: isOpen and shouldAnimateOpen are stored flags; canAnimate and canDismiss are methods. |
| `UnknownView` | `actionListEl`, `clickableAreaEl`, `emptyStateEl`, `emptyTitleEl` | `aI`, 82426-82517 | Attribution correction: the sampled _empty object is EmptyView. These fields are initialized by EmptyView; UnknownView inherits them. Add to the base, not to UnknownView alone. |
| `BasesView` | `isGroupCollapsed`, `onGroupCollapsedChange`, `toggleGroupCollapsed` | `_J`, 144453-144782 | Implemented on both streams on the exported base. |
| `App` | `getBaseFontSize`, `setBaseFontSize` | `xoe`, 230232-230246 | Implemented on both streams. |
| `ConfirmationModal` | `isOpen`, `shouldAnimateOpen` | `ST`, 73293-73547 | Inherited Modal gaps, resolved by the base change. |
| `LinkValue` | `resolvedFile`, `resolvedTick` | `xK`, 128065-128153 | Implemented on both streams as a nullable file cache and numeric tick. |
| `MarkdownView` | `focusAfterMetadata`, `focusBeforeMetadata` | `f2`, 156105-156113 | Implemented on both streams on MarkdownView only; similarly named methods elsewhere do not establish ownership. |
| `WorkspaceTabs` | `scheduleTouchUnlock`, `touchUnlockTabWidths` | `eF`, 89161-89879 | Implemented on both streams; touchUnlockTabWidths holds an AbortController or null. |
| `BasesViewConfig` | `setGroupOrder` | `h$`, 136334-136487 | Implemented on both streams with serialized frontmatter values; see the grouping reconciliation below. |
| `CapacitorAdapter` | `exportTextFile` | `BA`, 77312-77341 | Implemented on both streams from the mobile class itself. |
| `ConfirmationButton` | `setForm` | `xT`, 73548-73601 | Implemented on both streams. |
| `FileSystemAdapter` | `exportTextFile` | `nc`, 32937-34239 | Implemented on both streams. The reverse fields were removed separately; see below. |
| `FileView` | `createBreadcrumb` | `BO`, 87703-88111 | Implemented on both streams (source line 87887). |
| `FuzzySuggestModal` | `shouldAnimateOpen` | `ST`, 73293-73547 | Inherited Modal flag, resolved by the base change. |
| `MarkdownPreviewRenderer` | `handleMediaClick` | `Lj`, 115805-117131 | Implemented on both streams on the instance interface (source line 115928). |
| `MetadataCache` | `iterateFileCache` | `WR`, 100902-101985 | Implemented on both streams (source line 100982). |
| `SuggestModal` | `shouldAnimateOpen` | `ST`, 73293-73547 | Inherited Modal flag, resolved by the base change. |
| `Vault` | `externalFileManager` | `iI`, 81311-82309 | Implemented on both streams, with `ExternalFileManager` and `ExternalFileMonitor` modelled from their implementations. |
| `Workspace` | `registerOpenFileHandler` | `L3`, 167600-171109 | Implemented registerOpenFileHandler and removed the stale handleXCallback on both streams; it belongs to WorkspaceProtocolHandler. |
| `WorkspaceWindow` | `destroyWindow` | `x3`, 167292-167479 | Implemented on both streams (source line 167460). |

## Reverse findings

The exact view identities and their source implementations support these stale-method findings. Their owning classes do not implement the declared methods; unrelated classes with the same method names are not evidence for retaining them.

1. `FileExplorerView`: `acceptRename`, `attachFileEvents`, `createFolderDom`, `createItemDom`, `onFileMouseout`, `onFileMouseover`, `updateConfig`.
1. `OutlineView`: `filterSearchResults`, `onToggleShowSearch`, `setShowSearch`, `updateSearch`.
1. `AllPropertiesView`: `onToggleShowSearch`, `setShowSearch`, `updateSearch`.
1. `Workspace`: `handleXCallback`.

File explorer uses `saveRename`, pointer event handlers and `onConfigChanged` in this version. Outline and All Properties use their newer search wrapper and `onSearchChanged`; Tag View still implements `setShowSearch` and `updateSearch`. Do not remove those names globally. Workspace's `handleXCallback` is implemented on the protocol handler at source line 166770 onward, as documented in the [protocol-handler report](protocol-handler-1.14.4.md).

The desktop adapter's `ipcRenderer` and `watcher` were reviewed from the source rather than from the harvest, and both were removed. Neither is initialized as an adapter field or assigned in its complete source class. The only `watcher` the class touches, at line 33883, is a `watchers` record entry's. A separate external-file monitor initializes its own `watcher` at line 80824. Nothing in the bundle assigns an `ipcRenderer` property or reads `adapter.ipcRenderer` / `adapter.watcher`. A missing field in one runtime harvest alone would not have been enough to delete either.

## Implementation boundaries

1. Reconcile the six sidebar views together, including the stale methods and all candidates above. Put the empty-state fields on `EmptyView` so `UnknownView` inherits them.
2. Bases grouping, group persistence and `LinkValue` caching were reconciled together; their verified shapes and validation are recorded below.
3. The remaining Modal, file, adapter and workspace APIs were reconciled together, with the inherited modal findings fixed at `Modal` and the adapter reverse fields judged separately. See below.

Each change must be applied to both maintained streams and pass the full type-change build gate, lint, spellcheck and formatting. The initial triage required no release. The [Search report](core-search-1.14.4.md) remains the authority for the queue and matcher surface.

## Bases grouping and link-cache reconciliation

Implemented on 2026-10-27 in [public](https://github.com/obsidian-typings/obsidian-typings/commit/e8be46ab) and [catalyst](https://github.com/obsidian-typings/obsidian-typings/commit/bc30a44e). Both version tags still resolve to the application blob recorded above. The five declaration files are identical across streams.

1. `QueryController.getAllGroups()` returns `BasesGroupSummary[]`, with a `Value` key, numeric `count` and boolean `isVisible`. It returns an empty array unless both group-by configuration and manual ordering are enabled. Visible groups precede unlisted groups. A missing grouping value becomes a `NullValue`, rather than JavaScript `null`.
2. `getGroupFolds()` lazily returns the current view's mutable `Set<string>`. `loadGroupFolds()` returns a null-prototype `Record<string, Set<string>>`, accepting stored string arrays only for views still in the query. `saveGroupFolds()` serializes nonempty sets to arrays under `bases-group-fold-<query-file-path>`, clears storage with `null` when no folds remain, and does nothing without a query file or loaded folds. Fold identifiers are opaque strings derived from the grouping value's constructor and string representation.
3. `sourcePath` is readonly: current file path, then query file path, then `''`. Each of the three `BasesView` collapse methods receives a `BasesQueryResultGroup`; the predicate returns `boolean`, and toggling saves before calling `onGroupCollapsedChange`.
4. `setGroupOrder(order: FrontmatterValue[] | null)` copies serialized values and saves the query. `[]` enables manual ordering with no visible groups; `null` disables manual ordering. These are stored values, not runtime `Value` instances.
5. `LinkValue.resolvedFile` is `TFile | null`, initially `null`; `resolvedTick` is a number, initially `-1`. Resolution reuses the file within a cache tick, and a queued microtask advances the shared tick so the next resolution refreshes it.

Validation passed on each stream through the full `npm run build`, including lint, spellcheck, formatting, strict source and bundle checks, API Extractor and all seven consumer scenarios. Isolated probes executed functions extracted from the tagged source to check summary shapes, fold filtering and persistence, path fallbacks, collapse notifications, order copying and link-cache ticks. These probes use controlled dependencies; they are not a live application test. No package release was performed.

## Modal, file, workspace and adapter reconciliation

Implemented on 2026-10-28 in [public](https://github.com/obsidian-typings/obsidian-typings/commit/4248cd4c) and [catalyst](https://github.com/obsidian-typings/obsidian-typings/commit/82516b1d). The source was re-read from the shared application blob recorded above. The touched declaration files were identical across streams before and after the change.

1. `Modal` carries `isOpen` (cleared in the constructor, set on open and close) and `shouldAnimateOpen` (initially `true`). `canAnimate()` returns whether the device is a phone at the base, and the settings modal overrides it. `canDismiss()` returns `true` at the base, and the account login modal overrides it with its form's dirty state. `ConfirmationModal`, `FuzzySuggestModal` and `SuggestModal` inherit all four.
2. `TExternalFile` carries `metadata: CachedMetadata | null`, `users: Set<unknown>` and `monitor`, which the monitor's constructor assigns. `addUser` starts the monitor and triggers `external-watch`. `removeUser` stops it on the last release and clears the cached data and metadata. Its callers pass views, so `users` is deliberately left as `unknown`.
3. `Vault.externalFileManager` is the new internal `ExternalFileManager`: `files` maps resolved paths to monitors, with `fs` (`original-fs`), `path`, `vault`, a 5-second cleanup `interval`, `getExternalFile`, `getLoadedFile`, `rename` and `cleanup`. `ExternalFileMonitor` holds a `WeakRef` to its file behind a readonly `file` getter, plus `watcher`, `watchpath` and `inode`.
4. `App.getBaseFontSize()` reads local storage, falls back to the vault config and then the default, and clamps to 10-30. `setBaseFontSize(size)` stores the clamped size and updates the font.
5. Both adapters' `exportTextFile(text, filename): Promise<void>` are separate implementations. The desktop one clicks a plain-text download link. The mobile one writes into an `export` cache folder and opens the file.
6. `ConfirmationButton.setForm(formEl)` makes the button a submit button for the form's `id` and returns `this`. `FileView.createBreadcrumb(text)` returns the breadcrumb `HTMLSpanElement`. `MarkdownPreviewRenderer.handleMediaClick(evt, targetEl)` is an instance method, so it is declared on the interface, not the namespace. `MetadataCache.iterateFileCache(callback)` ignores the callback's return value. `MarkdownView.focusAfterMetadata()` / `focusBeforeMetadata()`, `WorkspaceTabs.scheduleTouchUnlock()` with `touchUnlockTabWidths: AbortController | null`, `Workspace.registerOpenFileHandler()` and `WorkspaceWindow.destroyWindow()` all return `void`.
7. Removed: `FileSystemAdapter.ipcRenderer` and `.watcher`, and `Workspace.handleXCallback`, which stays declared on `WorkspaceProtocolHandler`. The commit carries a `BREAKING CHANGE` footer naming the `TS2339` a consumer now gets and the replacement for each.

Validation passed on each stream through the full `npm run build`, including lint, spellcheck, formatting, strict source and bundle checks, API Extractor and all seven consumer scenarios. The emitted bundles were checked for each removed name: the only survivors are `DataAdapterWatchersRecordEntry.watcher`, `ElectronModule.ipcRenderer`, `ExternalFileMonitor.watcher` and `WorkspaceProtocolHandler.handleXCallback`. No package release was performed.

## Additional findings from the fresh run

The same harvest names 11 more types. Each was checked against the shared blob and reconciled on 2026-10-28 in [public](https://github.com/obsidian-typings/obsidian-typings/commit/95e9b776) and [catalyst](https://github.com/obsidian-typings/obsidian-typings/commit/bcbaf87e).

| Type | Candidates | Source class and lines | Disposition |
| --- | --- | --- | --- |
| `AppSetting` | `canAnimate`, `findTabById`, `focusNavItemAt`, `focusSearch`, `focusSettingItemAt`, `getTabSequence`, `isOpen`, `isVimGG`, `navigateToPage`, `openPagePath`, `shouldAnimateOpen`, `shouldUsePopout`, `windowTitle` | `doe`, 226606-227620, over the popout modal `u3` at 164022 | Added. `isOpen`, `shouldAnimateOpen` and `canAnimate` were already inherited from `Modal` after the reconciliation above. |
| `MetadataTypeManager` | `getPropertyOccurrences`, `onCacheChanged`, `onCacheFinished`, `onVaultConfigChanged`, `rebuildProperties` | 102112-102220 | Added. The declared `updatePropertyInfoCache` appears nowhere in the bundle, so it was removed. |
| `CustomCSS` | `disabled`, `globallyDisable`, `globallyEnable` | 74620, 75357-75388 | Added. Both toggles are async and reload the theme and snippets. |
| `AppMenuBarManager` | `shareMenuFilePath` | 70704-71167 | Added, as `null \| string`. |
| `DragManager` | `edgeScroll` | 99931-100160 | Added, with the new `DragManagerEdgeScroll` record. |
| `BacklinkView`, `OutgoingLinkView` | `requestUpdate` | `T2`, 157869 | Added on their shared base `InfoFileView`, which assigns it. |
| `Component` | `app` | - | No change. The sampled objects are `CustomCSS` and internal plugins, which already declare `app`. |
| `FileManager` | stale `mergeFile` | - | Removed. Only the Note Composer plugin instance implements it. |
| `Scope` | stale `setTabFocusContainer`, field `cb` | `vS`, 69159-69182, and `gS`, 69183 | Removed both. The class has `setTabFocusContainerEl`. `cb` belongs to the delegating subclass that `Workspace.scope` is built from (167634), now typed as `WorkspaceScope`. |
| `WorkspaceLeaf` | stale `setDimension` | `UO`, 88443 | No change. The leaf inherits it from `WorkspaceItem`, so the finding is an attribution miss. |

The removals carry a `BREAKING CHANGE` footer naming the replacement for each. The full `npm run build` passed on each stream, including all seven consumer scenarios. No package release was performed.
