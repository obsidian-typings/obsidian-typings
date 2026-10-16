# CHANGELOG

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
