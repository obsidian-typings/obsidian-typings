# Layout-ready probe: declared members against runtime values, Obsidian 1.15.1

The probe checks the declarations the other way round from the crawler. It does not look for runtime members the typings lack. It asks whether each **declared** member holds what its declaration says, and it asks twice: in a plugin's `onload` on a cold start, before the workspace layout exists, and again inside `onLayoutReady`. It is `npm run probe` in the private `obsidian-typings-crawler` repository, whose README describes how it works.

## Run

1. Target: `release/obsidian-public/1.15.1` at `1129934b`, against Obsidian 1.15.1 desktop in an isolated profile.
2. Declared paths: every member reachable from `App` to a depth of four properties. That is 793 paths declared in the official `obsidian.d.ts` and 2,602 declared only here. Each object type is walked once, at its shortest path.
3. Vaults: an empty one, and one with 3,000 generated notes. Both runs gave the same 33 findings.
4. In `onload`, `workspace.layoutReady` was `false` and `vault.getFiles()` returned no files, even in the 3,000-note vault. In `onLayoutReady`, `layoutReady` was `true` and all 3,000 files were there.
5. Reads are plain property reads: getters run, methods are never called. No member of either source had a value of the wrong `typeof` kind, and no read threw.

## Official `obsidian.d.ts`

These are upstream mismatches. This repository cannot change an official member's type through an augmentation.

| Path | Declared | `onload` | `onLayoutReady` |
| --- | --- | --- | --- |
| `app.workspace.rootSplit` | `WorkspaceRoot` | `null` | object |
| `app.workspace.leftSplit` | `WorkspaceSidedock \| WorkspaceMobileDrawer` | `null` | object |
| `app.workspace.rightSplit` | `WorkspaceSidedock \| WorkspaceMobileDrawer` | `null` | object |
| `app.workspace.rootSplit.parent` | `WorkspaceParent` | not read | `null` |
| `app.workspace.floatingSplit.parent` | `WorkspaceParent` | not read | `null` |

The probe also reported `app.metadataCache.blockCache.id` and `.position`. Those two belong to the next section: they are official `BlockCache` members, read through a member this repository types wrongly.

## obsidian-typings

### Corrected on both maintained branches

The 1.15.1 bundle (`obsidian-versions` tags `1.15.1` and `catalyst/1.15.1`) was checked for each one before its declaration changed.

| Member | Was | Now | Why |
| --- | --- | --- | --- |
| `Workspace.floatingSplit` | `WorkspaceSplit` | `WorkspaceFloating` | The runtime object has none of `WorkspaceSplit`'s own members (`direction`, `setDirection`, the resize methods). |
| `Workspace.lastActiveFile` | `TFile` | `null \| TFile` | Initialized to `null`; stays `null` until a file is opened. |
| `AppSetting.popoutStorageKey` | `string` | `null \| string` | Initialized to `null`; set only while the settings are open in a popout. |
| `WorkspaceItem.parentSplit` | `WorkspaceParent` | `null \| WorkspaceParent` | The getter returns `this.parent`, which is `null` for top-level containers. |
| `AppVaultConfig.accentColor`, `communityPluginSortOrder`, `communityThemeSortOrder`, `types` | required | optional | Absent from a fresh vault's config: only the keys with defaults are present. |
| `View.closeable` | declared | removed | Not in the 1.14.4 or 1.15.1 bundles. |
| `RecentFileTracker.onFileCreated` | declared | removed | Not in the 1.14.4 or 1.15.1 bundles. |
| `FileExplorerPlugin.revealInFolder` | declared | removed | Not on the plugin registration. It is on `FileExplorerPluginInstance` and `FileExplorerView`, where it stays. |

### `null` in `onload` only

These are set by the time `onLayoutReady` fires. Both maintained branches now type them as the last section describes. The bundle split them into two groups:

1. `activeTabGroup` and `floatingSplit` are `null | ...`. `LayoutReadyWorkspace` holds them non-null, and the `isLayoutReady` guard and the `onLayoutReadyEx` helper return that view.
2. `db` is `IDBDatabase | null`, and `transactionSave` is an optional method. Neither gets a ready-phase view. Both are assigned only when `MetadataCache._preload` opens the cache database, so if it fails to open they stay unset for the whole session. `transactionSave` was also wrongly typed as a `Debouncer`. It writes a value to the `file` or `metadata` store, and deletes the key when the value is `null`.

| Member | Declared | `onload` |
| --- | --- | --- |
| `Workspace.activeTabGroup` | `WorkspaceTabs` | `null` |
| `Workspace.floatingSplit` | `WorkspaceFloating` | `null` |
| `MetadataCache.db` | `IDBDatabase` | `null` |
| `MetadataCache.transactionSave` | `Debouncer<[], void>` | missing |

### Open

1. `MetadataCache.blockCache` is typed as the official `BlockCache`, a single block's cache entry with `id` and `position`. At runtime it is a per-file cache of block suggestions, with `app`, `cache`, `clear()`, `getForFile()` and `getAll()`. It needs its own interface.
2. `InternalPlugins.plugins['markdown-importer']` is missing at runtime on desktop 1.15.1. The id is still in the bundle's list of core plugin ids, so whether to drop it or make it optional needs that list checked.

## Correct and usable: how the `onload`-only gaps are typed

An honest `| null` on every member that is unset in `onload` would make every `onLayoutReady` caller write `!` or a check. That trades a crash for noise. The chosen pattern makes the phase part of the type:

1. Declare each such member as it is: `rootSplit: WorkspaceRoot | null`.
2. Give the ready phase a narrowed view, `LayoutReadyWorkspace`, in which those members are non-null. Two helpers in the implementations entry point produce it. The `onLayoutReadyEx(workspace, callback)` helper passes the view to its callback. A plain `onLayoutReady` overload cannot, because Obsidian calls that callback with no argument. The `isLayoutReady(workspace)` guard narrows to the view from `workspace.layoutReady`.
3. Code in `onLayoutReady`, or after the guard, keeps the non-null types. Code in `onload` must handle `null`, which is what the runtime requires.

This repository can do that for the members it declares. The official ones go upstream in the same shape, with a plain `| null` plus `@remarks` as the minimal fallback.
