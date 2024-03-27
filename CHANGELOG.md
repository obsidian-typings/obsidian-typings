# Changelog

## v1.0.5
- Fix some methods on `Menu` and `MenuItem` not being chainable 

## v1.0.4
- Added missing EventRef types
  - **View Registry:** `view-registered`, `view-unregistered`, `extensions-updated`
  - **Metadata Cache:** `initialized`, `finished`
  - **Workspace:** `hover-link`, `tab-group-menu`, `swipe`, `layout-ready`, `url-menu`, `search:results-menu`, `receive-text-menu`,
            `receive-files-menu`, `canvas:selection-menu`, `canvas:node-menu`, `canvas:node-connection-drop-menu`, `canvas:edge-menu`
  - **Workspace Leaf:** `history-change`, `leaf-menu`
- Added missing typings for `Menu` and `MenuItem` classes
- Added missing typings for `Tree` and `TreeItem` classes (used in `Outline` and `FileExplorer` plugin views)
- Set vertical height for a split leaf item via `setDimension`
- Bumped `electron-types` version

## v1.0.3
- Change `electron-types` types inclusion
- Added note in `README.md` on automatically including new types
- Fix lambda definitions and tsc compilatiion

## v1.0.2
- Changed `any` type to `unknown` to enforcing explicit type casting
- Fixed `CONTRIBUTING.md` link in `README.md`
- Added badges to `README.md`

## v1.0.1
- Automated npm publishing

## v1.0.0 (initial npm release)
- Made package installable via npm
- Clarified README, added contribution guidelines