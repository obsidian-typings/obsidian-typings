# CHANGELOG

## 1.15.0

**Branch:** [`release/obsidian-public/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.4)

**Commits:** [`obsidian-public-1.14.4-v1.14.0...obsidian-public-1.14.4-v1.15.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.4-v1.14.0...obsidian-public-1.14.4-v1.15.0)

### Breaking changes

- fix!: remove obsolete protocol action trust declarations ([`39d56a2`](https://github.com/obsidian-typings/obsidian-typings/commit/39d56a2578d23ccda7a3e7942c5beb68f83f5952))

### Other changes

- feat: type core note composer merge flow ([`bce6918`](https://github.com/obsidian-typings/obsidian-typings/commit/bce6918099961e0bbb92e5ad5b692a582de872df))
- chore: enforce keyword binding names in declarations ([`1926207`](https://github.com/obsidian-typings/obsidian-typings/commit/1926207bb4c1c7ac3225af66e1ec3beb10a267d6))

## 1.14.0

**Branch:** [`release/obsidian-public/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.4)

**Commits:** [`obsidian-public-1.14.4-v1.13.0...obsidian-public-1.14.4-v1.14.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.4-v1.13.0...obsidian-public-1.14.4-v1.14.0)

### Breaking changes

- fix(metadata-cache): type updateInternalLinks as taking a CustomArrayDict ([`abbd9c9`](https://github.com/obsidian-typings/obsidian-typings/commit/abbd9c97b9421ef5eaeb567e52de1a7aba1110cd))
- fix(hotkey-manager): type the stored hotkeys as Hotkey, not KeymapInfo ([`ec892c6`](https://github.com/obsidian-typings/obsidian-typings/commit/ec892c6dbe672b95a8c73c5c3db335b284a04f82))

### Other changes

- feat(search): type the file queue and concrete matcher tree ([`5671412`](https://github.com/obsidian-typings/obsidian-typings/commit/567141221011877d222794248fd5faf4f64c1571))
- feat(electron): type every IPC channel of Obsidian's main process on the ipcRenderer ([`29ad055`](https://github.com/obsidian-typings/obsidian-typings/commit/29ad055ad40468e9befccb806deaf9bd65e889c2))
- feat: declare the bookmarks:bookmarks-menu and markdown-properties-menu workspace events ([`56404f2`](https://github.com/obsidian-typings/obsidian-typings/commit/56404f2c573cad9f3bcf94f9d881bdd90bc1122f))
- build(deps): raise typescript-dev-toolkit to 3.x and point DomEventsHandlers at obsidian-lib ([`c2bd624`](https://github.com/obsidian-typings/obsidian-typings/commit/c2bd624e5cdca5d71faed50bd14352f88663d28f))

## 1.13.0

**Branch:** [`release/obsidian-public/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.4)

**Commits:** [`obsidian-public-1.14.4-v1.12.0...obsidian-public-1.14.4-v1.13.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.4-v1.12.0...obsidian-public-1.14.4-v1.13.0)

### Breaking changes

- fix(read-view-renderer): add header, footer, sizerEl and the section API ([`c3fa457`](https://github.com/obsidian-typings/obsidian-typings/commit/c3fa457952257689c113582da8a3f4117be63ac1))
- fix(file-explorer): type getSortedFolderItems as returning folder rows too ([`9b2f30a`](https://github.com/obsidian-typings/obsidian-typings/commit/9b2f30a9c95e37b41241ddef47be37cf81362970))
- fix(file-explorer): type a folder row's file as TFolder ([`0b18da0`](https://github.com/obsidian-typings/obsidian-typings/commit/0b18da0f4107bbd18ab0d1a75e02f6f4562ca7e7))

### Other changes

- feat(implementations): let evaluateBaseHeadless take a .base file or its vault path ([`1f69286`](https://github.com/obsidian-typings/obsidian-typings/commit/1f6928653f7743fb3aa3eab1638393b92b2da3ff))
- fix(tree): type handleItemSelection as returning boolean, and declare the missing selection members ([`9c84175`](https://github.com/obsidian-typings/obsidian-typings/commit/9c84175b0963febab7866c541923d0d9f846b390))

## 1.12.0

**Branch:** [`release/obsidian-public/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.4)

**Commits:** [`obsidian-public-1.14.4-v1.11.0...obsidian-public-1.14.4-v1.12.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.4-v1.11.0...obsidian-public-1.14.4-v1.12.0)

### Breaking changes

- fix(app): type ImportedAttachment as Obsidian builds it, and importAttachments as returning files ([`70e3eb5`](https://github.com/obsidian-typings/obsidian-typings/commit/70e3eb553900a8efe24725fb5b8539499016f796))

## 1.11.0

**Branch:** [`release/obsidian-public/1.14.4`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.4)

**Commits:** [`obsidian-public-1.14.4-v1.10.0...obsidian-public-1.14.4-v1.11.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.4-v1.10.0...obsidian-public-1.14.4-v1.11.0)

### Breaking changes

- fix(result-dom): widen ResultProperty.subkey to (number | string)[] ([`dfc0aaa`](https://github.com/obsidian-typings/obsidian-typings/commit/dfc0aaa56d41610683c4a06126c41ec0d3dfd29e))
- fix(types): make every ResultDomResult member optional, and add the search match keys ([`0feb598`](https://github.com/obsidian-typings/obsidian-typings/commit/0feb598e49ee9352592407758e1da0bbdcc62725))
- fix(types): let App.changeTheme take 'system', and drop App.setTheme's parameter ([`af9103f`](https://github.com/obsidian-typings/obsidian-typings/commit/af9103f99e2dd39858984bd08967b69976dd8030))

## 1.10.0

- No changes recorded since the previous release.

## 1.9.0

### Breaking changes

- fix(types): type the outgoing-link and backlink pane internals, and reach the typed getLeavesOfType

## 1.8.0

### Breaking changes

- feat: type ephemeral-state subpath, MarkdownView state, the property-value suggest and IPC toggles

## 1.7.0

### Breaking changes

- fix(result-dom): make ResultProperty.pos and subkey optional, and type ResultDomItem's rows

### Other changes

- feat(search-query): type the global-search matcher tree, SearchView.searchQuery and the property row

## 1.6.0

### Breaking changes

- feat: type vault config reads by key, and the appearance config file

### Other changes

- build(eslint): lint the tooling with the toolkit's shared ESLint config
- build(scripts): import the script helpers and ESLint rules from the @mnaoumov packages

## 1.5.0

- feat: add the FrontmatterValue augmentation, and fail the build on an export without one

## 1.4.0

- feat: reconcile with the obsidian 1.14.4 public API

## 1.3.0

### Breaking changes

- fix!: drop the Bases function registry that 1.14.4 no longer has

### Other changes

- chore: update obsidian API version to 1.14.4

## 1.2.0

### Breaking changes

- fix(bases): drop the TableView workspace view and type the view registrations as they are

### Other changes

- feat(bases): model the Bases table view and its rows

## 1.1.0

- chore: generate README.md from template
- chore: generate README.md from template
- chore: generate README.md from template
