# CHANGELOG

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
