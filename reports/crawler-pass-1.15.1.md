# Crawler pass for Obsidian catalyst 1.15.1

Run on 2026-11-12 against `release/obsidian-catalyst/1.15.1` at `4d186a6cf`. That branch was cut from `release/obsidian-public/1.15.0` and carried its declarations unchanged until this pass. The changes below landed on it in `f6a9f256`, after a full `npm run build` with all fifteen consumer scenarios passing.

## Method

The crawler harvested Obsidian 1.15.0 and 1.15.1 against **one** typings checkout, the 1.15.1 branch, and saved both harvests. With the typings fixed, a difference between the two harvests is a runtime change, never a typing one. A member-level diff of the two harvests added the changes on groups that no declared type is named for. Each change was then read in the formatted `obsidian.asar/app.js` of the `obsidian-versions` tags:

| Tag | `app.js` blob |
| --- | --- |
| `1.15.0` (identical in `catalyst/1.15.0`) | `b6482efddf06b7cf792d2e0d4362feb19c80328c` |
| `catalyst/1.15.1` | `8f2855f7021408dee6b0dfcc3a5af0d7cd9d3dd3` |

```sh
jiti src/cli.ts --repo=<typings-checkout> --obsidian-version=<version> --save=<harvest.json>
jiti src/cli.ts --repo=<edited-checkout> <harvest.json>
```

A plain text diff of the two `app.js` blobs is no use here: the minifier renamed most identifiers, so 86,513 lines differ. Every change below was found from the harvests and then read at its line in the 1.15.1 blob. Line numbers refer to that blob.

## Named findings

The 1.15.0 harvest reports only the two findings the 1.14.4 triage already settled: `Component.app` (derived attribution) and `WorkspaceLeaf.setDimension` (inherited from `WorkspaceItem`). The 1.15.1 harvest reports nine more.

| Type | Change | Source | Disposition |
| --- | --- | --- | --- |
| `Editor` | `iterateSelectedLines`, `everyLine`, `getSelectionHeadingLevel`, `isSelectionBlockquote`, `isSelectionBulletList`, `isSelectionNumberList`, `isSelectionCheckedTask` added | 80445-80493 | Added. `processLines` now iterates through `iterateSelectedLines`. |
| `Notice` | `autoHide`, `hovered`, `hidden`, `isHidden`, `tryHide` added | 65619-65685 | Added. A hovered notice is not auto-hidden, and leaving it reschedules the hide for 1 second. |
| `FileManager` | `systemTrashFailure`, `getTrashOption`, `showSystemTrashFailed` added | 85344, 85693-85719 | Added, with `SystemTrashFailure`. `trashFile` falls back to `local` where the system trash is unavailable, and reports a failed system-trash move. |
| `Platform` | `canUseSystemTrash` added | 39802 | Added to `PlatformEx`. It is `false` only in the Android app. |
| `Plugins` | `readManifest`, `getPluginManifest`, `isInstalled` added | 136771, 137018, 137131 | Added. `loadManifest`, `loadManifests` and `writePluginFiles` use them. |
| `CapacitorAdapter` | `readByUrl` added | 67034 | Added. Mobile reads a plugin's `main.js` through it before falling back to `read`. |
| `FileSystemAdapter` | `unreadablePaths` added | 21043, 21082-21105 | Added. A listing that hits `EACCES` or `EPERM` records the path and triggers the new vault `unreadable` event, which the app shows as a notice (176000). Sync pauses while an unreadable path is not excluded (169517). Added the `Vault.on('unreadable')` overload. |
| `Workspace` | `layoutReadyCallbacksDone` added | 133593, 134828 | Added. It is the promise over the queued `onLayoutReady` callbacks, which the startup snapshot waits for (175572). |
| `WorkspaceProtocolHandler` | `isCallbacksEnabled`, `setCallbacksEnabled` added | 132967-132972 | Added. x-callback-url handling (`x-success` / `x-error`) and the `hook-get-address` action now do nothing unless URI callbacks are on. That is a per-device `uri-callbacks` local storage flag, off by default, set from a Settings control (173741). |
| `EmptyView` (reported on `UnknownView`, which extends it) | `updateActions` added | 69174 | Added to `EmptyView`. The new-tab actions are rebuilt when an internal plugin changes. |

After the changes, the saved 1.15.1 harvest re-checked against the edited branch reports only `Component.app` and `WorkspaceLeaf.setDimension`.

## Changes on declared types the harvest named no type for

| Type | Change | Source | Disposition |
| --- | --- | --- | --- |
| `InfinityScroll` | `blockSize`, `cancelCompute`, `lastPass`, `minPassInterval`, `setMinPassInterval` added; `renderBlockSize`, `queued` removed | 71305-71412 | Replaced. The block size now adapts to how long a pass takes, and passes can be rate-limited. |
| `ResultDom` | `changedDuringSearch`, `relevance`, `getRelevance`, `getQueueSortFunction` added | 95496-95556 | Added, with the new `SearchRelevance`. Search results can be sorted `byRelevance`. |
| `ResultDomItem` | `score`, `scoreQuery`, `getScore` added | 94933, 94994 | Added. |
| `SearchQueueComponent` | `unmatchedFiles`, `setMatched` added; `start` takes `narrows` | 97757-97830 | Added, with `SearchQueueStartOptions.narrows`. A query that only narrows the previous one skips the files the previous one did not match (`hZ`, 70797). |
| `CanvasIndex` | `cancelRun` added; `frame` removed | 156531-156592 | Replaced. |
| `GraphRenderer` | `cancelRender` added; `renderTimer` removed | 113768, 114405 | Replaced. The harvest never reaches a graph renderer. Found while tracing the next row. |

The last two rows, and the `InfinityScroll` one, are one refactor. 1.15.1 replaced the debounce helper that returned an object with `cancel()` with one that returns a cancel function, and renamed the fields that hold one to `cancel*`. A scan of every field 1.15.0 assigned through the old helper found no other declared one.

## PDF.js

The vendored PDF.js tree, `obsidian.asar/lib/pdfjs`, has the same git tree id (`6ef2e1b7e40ad6bace327cacd45aab20520be000`) in `1.15.0` and `catalyst/1.15.1`, and `version.json` says 5.3.34, build 34, commit `cc1e2a3e0`. The PDF.js declarations and the opt-in `/pdfjs` registry therefore hold for 1.15.1 as they did for 1.15.0, with the same caveat as before: the closest published `pdfjs-dist` is 5.3.31.

## Leads not acted on

1. `AppSetting` lost its own `close` override, which saved the vault config before closing. The typings never declared it, and `close` is still inherited from `Modal`.
2. The Files and links settings tab (`app.setting.settingTabs.4`) gained `getControlValue` / `setControlValue` overrides for the `uriCallbacks` control. That tab has no declared type.
3. The Sync filter gained `findUnreadable`. Sync's internals are not declared.
4. `MarkdownPreviewRenderer` now holds `cancelRender` and `queuedHigh` instead of `queued`. Neither was declared.
5. `index.html` now preloads `app.js` and shows a startup snapshot before evaluating it. The harvest found no new window globals.
