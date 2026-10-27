# CHANGELOG

## 1.12.0

**Branch:** [`release/obsidian-catalyst/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.14.4)

**Commits:** [`obsidian-catalyst-1.14.4-v1.11.0...obsidian-catalyst-1.14.4-v1.12.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-catalyst-1.14.4-v1.11.0...obsidian-catalyst-1.14.4-v1.12.0)

### Breaking changes

- fix(metadata-cache): type updateInternalLinks as taking a CustomArrayDict ([`95db2fe`](https://github.com/obsidian-typings/obsidian-typings/commit/95db2feae9d6b54b23a93c11e96975e595935af4))
- fix(hotkey-manager): type the stored hotkeys as Hotkey, not KeymapInfo ([`c157e7a`](https://github.com/obsidian-typings/obsidian-typings/commit/c157e7adb6496d70ff2f20221ccc028b87e411c4))

### Other changes

- feat(search): type the file queue and concrete matcher tree ([`3767fb3`](https://github.com/obsidian-typings/obsidian-typings/commit/3767fb3c52ccab284e90950f64f81d8981b7904e))
- feat(electron): type every IPC channel of Obsidian's main process on the ipcRenderer ([`0fc022f`](https://github.com/obsidian-typings/obsidian-typings/commit/0fc022f7e983651a662992aa75d0475a5e16a9b9))
- feat: declare the bookmarks:bookmarks-menu and markdown-properties-menu workspace events ([`8538e29`](https://github.com/obsidian-typings/obsidian-typings/commit/8538e29f95743de340d18c2ceaf7bc8f8b73c2e3))
- build(deps): raise typescript-dev-toolkit to 3.x and point DomEventsHandlers at obsidian-lib ([`0e8089c`](https://github.com/obsidian-typings/obsidian-typings/commit/0e8089c0c66eb0740c78213992fa35fc4bb6a25d))

## 1.11.0

**Branch:** [`release/obsidian-catalyst/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.14.4)

**Commits:** [`obsidian-catalyst-1.14.4-v1.10.0...obsidian-catalyst-1.14.4-v1.11.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-catalyst-1.14.4-v1.10.0...obsidian-catalyst-1.14.4-v1.11.0)

### Breaking changes

- fix(read-view-renderer): add header, footer, sizerEl and the section API ([`b119ad7`](https://github.com/obsidian-typings/obsidian-typings/commit/b119ad7d8df7fc74ca04db9ad2a89996a9a82038))
- fix(file-explorer): type getSortedFolderItems as returning folder rows too ([`6db4ad7`](https://github.com/obsidian-typings/obsidian-typings/commit/6db4ad7590b5adebbb50c77b6cfdcfa8d331d21f))
- fix(file-explorer): type a folder row's file as TFolder ([`4f907e8`](https://github.com/obsidian-typings/obsidian-typings/commit/4f907e8aef745e2afbbb5ed95b81cb41b0315876))

### Other changes

- feat(implementations): let evaluateBaseHeadless take a .base file or its vault path ([`b85bb8d`](https://github.com/obsidian-typings/obsidian-typings/commit/b85bb8da3ce5a977aa776a8d0d18f9e9a7c814c5))
- fix(tree): type handleItemSelection as returning boolean, and declare the missing selection members ([`ca8ff69`](https://github.com/obsidian-typings/obsidian-typings/commit/ca8ff69841380acf89709836ed0c27af4a7cee47))

## 1.10.0

**Branch:** [`release/obsidian-catalyst/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.14.4)

**Commits:** [`obsidian-catalyst-1.14.4-v1.9.0...obsidian-catalyst-1.14.4-v1.10.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-catalyst-1.14.4-v1.9.0...obsidian-catalyst-1.14.4-v1.10.0)

### Breaking changes

- fix(app): type ImportedAttachment as Obsidian builds it, and importAttachments as returning files ([`a313fa6`](https://github.com/obsidian-typings/obsidian-typings/commit/a313fa6ff231f7e21fce1e37ae7a0108d6efe854))

## 1.9.0

**Branch:** [`release/obsidian-catalyst/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.14.4)

**Commits:** [`obsidian-catalyst-1.14.4-v1.8.0...obsidian-catalyst-1.14.4-v1.9.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-catalyst-1.14.4-v1.8.0...obsidian-catalyst-1.14.4-v1.9.0)

### Breaking changes

- fix(result-dom): widen ResultProperty.subkey to (number | string)[] ([`fe80b0b`](https://github.com/obsidian-typings/obsidian-typings/commit/fe80b0b852bc8aab990e30aa0e20aa46beeee66b))
- fix(types): make every ResultDomResult member optional, and add the search match keys ([`9f2834a`](https://github.com/obsidian-typings/obsidian-typings/commit/9f2834ac0cf20b0b41778d3ef0026812d670eb2c))
- fix(types): let App.changeTheme take 'system', and drop App.setTheme's parameter ([`3990491`](https://github.com/obsidian-typings/obsidian-typings/commit/3990491e5fbba53c2ab54eab1d19b78c2ff1fb93))

## 1.8.0

### Breaking changes

- fix(types): type the outgoing-link and backlink pane internals, and reach the typed getLeavesOfType

## 1.7.0

### Breaking changes

- feat: type ephemeral-state subpath, MarkdownView state, the property-value suggest and IPC toggles

## 1.6.0

### Breaking changes

- feat(search-query): type the global-search matcher tree, SearchView.searchQuery and the property row
- fix(result-dom): make ResultProperty.pos and subkey optional, and type ResultDomItem's rows

## 1.5.0

### Breaking changes

- feat: type vault config reads by key, and the appearance config file

### Other changes

- build(eslint): lint the tooling with the toolkit's shared ESLint config
- build(scripts): import the script helpers and ESLint rules from the @mnaoumov packages

## 1.4.0

- feat: add the FrontmatterValue augmentation, and fail the build on an export without one

## 1.3.0

- feat: reconcile with the obsidian 1.14.4 public API

## 1.2.0

### Breaking changes

- fix!: drop the Bases function registry that 1.14.4 no longer has
- fix(bases): drop the TableView workspace view and type the view registrations as they are

### Other changes

- chore: update obsidian API version to 1.14.4
- feat(bases): model the Bases table view and its rows

## 1.1.0

- chore: generate README.md from template
- chore: generate README.md from template
