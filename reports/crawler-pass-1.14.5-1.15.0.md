# Crawler pass for Obsidian 1.14.5 and catalyst 1.15.0

Run on 2026-10-29 against the two release branches cut for these versions: `release/obsidian-public/1.14.5` at `fa4ba8ccdd6b065392782fd79b2a14d0d5ba39e6` and `release/obsidian-catalyst/1.15.0` at `343a10ba455486a071110e8c755927dc41618117`. Both branches carried the same `src/` and `scripts/` trees when the pass started.

## Method

The crawler harvested Obsidian 1.14.4, 1.14.5 and 1.15.0 against **one** typings checkout, the 1.14.5 branch, and saved each harvest. Because the typings were the same for all three runs, a difference between two harvests is a runtime change and never a typing one. Each change was then read in the formatted `obsidian.asar/app.js` of the `obsidian-versions` tags:

| Tag | `app.js` blob |
| --- | --- |
| `1.14.4` | `8b091268ff2b18b7939891bff0b81c4b64f6fb21` |
| `1.14.5` | `c2c89184bddf2a0fd3eded6a8e4380257164a71f` |
| `catalyst/1.15.0` | `b6482efddf06b7cf792d2e0d4362feb19c80328c` |

```sh
jiti src/cli.ts --repo=<typings-checkout> --obsidian-version=<version> --save=<harvest.json>
jiti src/cli.ts --repo=<edited-checkout> <harvest.json>
```

The second command re-checks an edited checkout against a saved harvest without launching Obsidian.

## Public 1.14.5: no change

The 1.14.4 and 1.14.5 harvests are identical, member for member, and both report only the two named findings that the 1.14.4 triage already settled: `Component.app` (derived attribution) and `WorkspaceLeaf.setDimension` (inherited from `WorkspaceItem`). The source agrees. Between the two tags `app.js` differs in one line, the version string `goe = '1.14.5'`. The other changes are the version in `package.json`, `RELEASE.md`, and a new `lib/pele.min.js` (Pele 1.8.0) that nothing in 1.14.5 loads.

## Catalyst 1.15.0

The 1.15.0 harvest reports 13 named findings beyond those two, and the harvest diff shows three members that disappeared. Line numbers refer to the `catalyst/1.15.0` blob.

| Type | Change | Source | Disposition |
| --- | --- | --- | --- |
| `Modal` (and `ConfirmationModal`, `FuzzySuggestModal`, `SuggestModal`, `AppSetting`) | `isAnimated` added | 67529, set in `open` from `canAnimate()` | Added to `Modal`; the subclasses inherit it. |
| `Menu` | `presenter` added, `bgEl` removed | 64362; presenter class 48845 | `bgEl` moved onto the new presenter. Added `SheetPresenter` and `Menu.presenter`; removed `Menu.bgEl`. |
| `DragManager` | `shouldClearAction`, `shouldClearHover` added; `isDragOverHandled` removed | 85342, `onDragOverFirst` 85387 | Replaced the one flag with the two, cleared by `setAction` and `updateHover`. |
| `FileManager` | `insertIntoHeadingSection` added | 88173; `insertIntoFile` 88211 | Added, with `HeadingSectionParts`. `insertIntoFile` also gained its `heading` and `spacing` parameters. |
| `MarkdownView` | `showSource` added | 144138 | Added. |
| `TextFileView` | `writeData` added; `saving` now a getter over `savePromise`; `saveAgain` gone | 132317-132374 | Added `writeData` and `savePromise`, made `saving` readonly, removed `saveAgain`. |
| `WidgetEditorView` | Same save rework, plus `showSource` | 126835-126925 | Added `savePromise`, `showSource` and `writeData`; removed `saveAgain` and `saving`, which it no longer has. |
| `Plugins` | `writePluginFiles` added | 138809 | Added, with `PluginReleaseFiles`. |
| `Platform` | `hasHaptics` added | 43568, filled in at 177298 | Added to `PlatformEx`. |
| `BasesViewConfig` | `getShownCount` added | 114124 | Added. |
| `QueryController` | `getWidgetForProperty`, `evaluateProperty` added; `getWidgetForIdent` removed | 120665-120670 | Renamed `getWidgetForIdent` to `getWidgetForProperty`, which now takes a property id; added `evaluateProperty`. Also renamed on `BasesController`. |
| `obsidian` module | `loadPixi` exported | 130947, 97957 | Added `loadPixi` as an unofficial export. PixiJS is no longer a startup script (`index.html` dropped `lib/pixi.min.js`), so `Window.PIXI` and the global `PIXI` are now optional. |

After the changes, the saved 1.15.0 harvest re-checked against the edited catalyst checkout reports only `Component.app` and `WorkspaceLeaf.setDimension`.

## Harvest artifacts and leads not acted on

1. The harvest dropped the module exports `getBlobArrayBuffer`, `loadMathJax`, `loadMermaid`, `loadPdfJs`, `loadPrism` and `request`. All six are still in the 1.15.0 export map. 1.15.0 ships them as native `async` functions, which have no prototype, so the harvest no longer records them as groups. `loadPixi` went unreported for the same reason.
2. The window globals `wf`, `Sf`, `Cf`, `mr`, `bl` and `El` are absent from the 1.15.0 harvest. They are minified helpers leaked by `pixi.min.js`, so they exist only once PixiJS has been loaded. Their declarations were left unchanged.
3. `Modal.shouldAnimate` is declared, but neither 1.14.5 nor 1.15.0 has it. It was stale before this pass, and is not one of the changes above.
