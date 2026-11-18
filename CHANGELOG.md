# CHANGELOG

> [!NOTE]
>
> **This file is the archive of the releases published before the move to scoped packages. It stops at
> `6.15.0`, the last release tagged and published from this repository's history as the package itself, and
> nothing will add to it.** The `obsidian-typings` versions after it are the legacy wrapper over the latest
> public package, and each one carries its own changelog in its tarball.
>
> Each heading carries the release date and, for a release cut from a release branch, that branch. The
> `5.x` and `6.x` sections and the regrouped older ones were back-filled on 2026-11-18 from each release's
> own recorded commits, and the matching GitHub release bodies were rewritten to the same text.
>
> The `1.x` to `6.x` numbering belongs to the single `obsidian-typings` package that predated
> `@obsidian-typings/obsidian-<channel>-<version>`. Each of those per-version packages lives on its own
> release branch, versions itself from `1.0.0`, and keeps **its own `CHANGELOG.md`** — written at publish
> time by [`workflow-scripts/publish-release.ts`](workflow-scripts/publish-release.ts) and shipped inside
> the package, with the same section as the body of that release on the
> [releases page](https://github.com/obsidian-typings/obsidian-typings/releases).
>
> So the changelog for anything you can install today is in the package you installed, not here. Until
> 2026-09-23 every published package carried a stub pointing at this file instead, which is what the note
> exists to end.

## 6.15.0 (2026-05-29, obsidian-public-1.12.7)

This release has 1 fix. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### Fixed

- build

## 6.14.0 (2026-05-26, obsidian-public-1.12.7)

This release has 1 new feature.

### New

- add missing members to CM5, PrismJS, and Turndown types

## 6.13.0 (2026-05-26, obsidian-public-1.12.7)

This release has 1 new feature and 1 documentation change.

### New

- replace unknown types with proper CM5 types

### Documentation

- fix link

## 6.12.0 (2026-05-22, obsidian-public-1.12.7)

This release has 1 new feature and 1 documentation change.

### New

- extract multiples

### Documentation

- fix

## 6.11.0 (2026-05-21, obsidian-public-1.12.7)

This release has 3 documentation changes. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Documentation

- add package# prefix to cross-package @link references
- convert backtick references to @link tags
- fix trailing dots

## 6.10.0 (2026-05-20, obsidian-public-1.12.7)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 6.9.0 (2026-05-20, obsidian-public-1.12.7)

- No changes recorded since the previous release.

## 6.7.0 (2026-05-19, obsidian-public-1.12.7)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 6.6.0 (2026-05-18, obsidian-public-1.12.7)

This release has 1 new feature and 1 fix. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- refactor to TAbstractFile

### Fixed

- compilation

## 6.5.0 (2026-05-17, obsidian-public-1.12.7)

This release has 1 new feature and 1 fix.

### New

- switch to method syntax

### Fixed

- duplicates

## 6.4.0 (2026-05-17, obsidian-public-1.12.7)

This release has 2 fixes.

### Fixed

- make `value__` optional on StateEffect and Annotation augmentations
- resolve bundle type errors and integrate bundle validation into build

## 6.3.0 (2026-05-17, obsidian-public-1.12.7)

This release has 2 fixes. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### Fixed

- use `RangeValue` instead of `unknown` for RangeSet.empty type parameter
- resolve @codemirror type unification with real packages

## 5.24.0 (2026-05-16, obsidian-public-1.12.7)

- No changes recorded since the previous release.

## 5.22.0 (2026-05-16, obsidian-public-1.12.7)

This release has 1 new feature and 1 documentation change. 7 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- add lib types

### Documentation

- switch links

## 5.21.0 (2026-04-23, obsidian-public-1.12.7)

This release has 1 new feature, 1 fix and 1 documentation change. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- plugin members

### Fixed

- build

### Documentation

- switch to multiline tsdocs

## 5.20.0 (2026-04-06, obsidian-public-1.12.7)

This release has 1 fix.

### Fixed

- update patches for @pixi/events and @types/css-font-loading-module

## 5.19.0 (2026-04-06, obsidian-public-1.12.7)

This release has 1 fix. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### Fixed

- incorrectly removed members

## 5.18.0 (2026-03-23, obsidian-public-1.12.7)

This release has maintenance changes only. 7 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 5.17.0 (2026-03-23)

This release has 1 fix. 5 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Fixed

- inheritDoc

## 5.16.0 (2026-03-20)

This release has maintenance changes only. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 5.15.0 (2026-03-20)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 5.13.0 (2026-03-12, obsidian-public-1.12.4)

This release has 2 fixes and 1 documentation change. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Fixed

- generator added $ types
- missing docs

### Documentation

- fix ERROR

## 5.12.0 (2026-03-12, obsidian-public-1.12.4)

This release has 1 fix and 1 documentation change. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### Fixed

- vars

### Documentation

- missing docs

## 5.8.0 (2026-03-11, obsidian-public-1.12.4)

This release has 2 fixes.

### Fixed

- tsdocs
- move to DataAdapterEx

## 5.7.0 (2026-03-11, obsidian-public-1.12.4)

This release has 1 fix.

### Fixed

- @unofficial tag

## 5.6.0 (2026-03-11, obsidian-public-1.12.4)

This release has 2 new features and 2 fixes. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- add window-member-file-sync ESLint rule
- extract functions/vars

### Fixed

- rename Window
- add missing

## 5.5.0 (2026-03-10, obsidian-public-1.12.4)

This release has 1 fix.

### Fixed

- function signatures

## 5.4.0 (2026-03-10, obsidian-public-1.12.4)

This release has maintenance changes only. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 5.3.0 (2026-03-10, obsidian-public-1.12.4)

This release has maintenance changes only. 8 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 5.2.0 (2026-03-10, obsidian-public-1.12.4)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 5.1.0 (2026-03-09, obsidian-public-1.12.4)

This release has 9 new features, 17 fixes and 3 documentation changes. 19 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- add missing constructor__ methods, view getters, and cascade numbering
- rewrite constructor-getter-placement rule for cross-file validation
- add constructor-getter-placement ESLint rule
- add ESLint config with perfectionist and custom obsidian-typings rules
- add ConstructorBase-based types for internal constructors
- add constructor types for remaining classes (Value types, private/protected, null)
- add constructor types and get*Constructor() for all obsidian.d.ts classes
- add get*Constructor implementations for all major app objects
- add constructor types for all major app objects

### Fixed

- use full import path for getDomEventsHandlersConstructor hint
- add import type for {@link get*Constructor} to enable TSDoc resolution
- use .d.ts extension for import type in implementations
- remove constructor types for classes that are null at runtime
- align constructor args with official typings, remove unnecessary double assertions
- use method syntax for CliHandlerEntry.handler
- alphabetize interface members and document ordering convention
- remove member-level @unofficial tags from internals files
- iterateCodeMirrors param type to unknown (can't deduce from empty body)
- rename iterateCodeMirrors param to _unused (empty method body)
- replace unknown types with proper types and add missing @param docs
- restore backtick escaping for false in CliFlag prose
- type fixFileLinks second param as sourcePath string
- revert incorrect TSDoc escaping for non-null and @defaultValue
- simplify mobileQuickActions type (null is already in unknown)
- validate and correct type definitions against runtime
- correct global Window typings based on runtime validation

### Documentation

- unify constructor__ TSDoc to use {@link} hints and consistent format
- restore @deprecated tag on constructor__ methods
- replace @deprecated on constructor__ with usage hints in TSDoc body

## 4.111.0 (2026-03-06, obsidian-catalyst-1.12.5)

This release has 1 new feature. 5 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- update 1.12.0 API changes

## 4.110.0 (2026-03-03, obsidian-public-1.12.4)

This release has 1 documentation change.

### Documentation

- add more tsdocs

## 4.109.0 (2026-03-02, obsidian-public-1.12.4)

This release has 1 new feature.

### New

- iterateReferencesForFile

## 4.108.0 (2026-03-02, obsidian-public-1.12.4)

This release has 2 new features.

### New

- get unmerged changes
- update API changes

## 4.107.0 (2026-03-02, obsidian-public-1.12.4)

This release has 1 new feature and 1 fix. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- extract anonymous types

### Fixed

- move link updaters

## 4.106.0 (2026-02-27, obsidian-public-1.12.4)

This release has 1 new feature. 6 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- update 1.12.0 API changes

## 4.105.0 (2026-02-25)

This release has 3 new features.

### New

- update API changes
- add internals of SettingGroup
- update obsidian API to 1.12.2

## 4.104.0 (2026-02-25)

This release has 1 new feature. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- update 1.12.0 API changes

## 4.103.0 (2026-02-24)

This release has 1 new feature. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- update 1.12.0 API changes

## 4.102.0 (2026-02-24)

This release has 1 new feature. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- update 1.12.0 API changes

## 4.101.0 (2026-02-24, obsidian-public-1.11.7)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.100.0 (2026-02-22, obsidian-public-1.11.7)

This release has 1 new feature.

### New

- update obsidian API to 1.12.2

## 4.99.0 (2026-02-11, obsidian-public-1.11.7)

This release has 1 new feature.

### New

- add internals of SettingGroup

## 4.98.0 (2026-02-11, obsidian-public-1.11.7)

This release has 1 fix and 1 documentation change. 7 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Fixed

- wrong SecretStorage.loadSecrets type

### Documentation

- proper changelog url

## 4.97.0 (2026-02-11)

This release has 1 new feature.

### New

- update 1.12.0 API changes

## 4.96.0 (2026-02-11, obsidian-catalyst-1.12.0)

This release has 1 fix. 5 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Fixed

- wrong SecretStorage.loadSecrets type

## 4.95.0 (2026-02-11)

This release has 1 fix. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Fixed

- wrong SecretStorage.loadSecrets type

## 4.94.0 (2026-01-26)

This release has 1 fix. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Fixed

- wrong SecretStorage.loadSecrets type

## 4.93.0 (2026-01-14, obsidian-public-1.11.4)

This release has 1 new feature.

### New

- add internals of SettingGroup

## 4.92.0 (2026-01-12, obsidian-public-1.11.4)

This release has 1 fix. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Fixed

- wrong SecretStorage.loadSecrets type

## 4.91.0 (2026-01-09)

This release has 3 new features and 1 fix.

### New

- update API to 1.11.0
- update widget components
- add public API changes

### Fixed

- wrong SecretStorage.loadSecrets type

## 4.90.0 (2026-01-09)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.89.0 (2026-01-08, obsidian-catalyst-1.11.4)

This release has 1 new feature.

### New

- add public API changes

## 4.88.0 (2025-12-19)

This release has 2 new features.

### New

- update API to 1.11.0
- update widget components

## 4.87.0 (2025-12-19, obsidian-public-1.10.6)

This release has 1 documentation change.

### Documentation

- fix @since

## 4.86.0 (2025-12-18, obsidian-catalyst-1.11.1)

This release has 2 new features.

### New

- update API to 1.11.0
- update widget components

## 4.85.0 (2025-12-18, obsidian-public-1.10.6)

This release has 1 new feature.

### New

- rename DomEventsHandlers

## 4.84.0 (2025-12-17, obsidian-catalyst-1.11.1)

- Merge branch 'release/obsidian-public/1.10.6' into release/obsidian-catalyst/1.11.1 ([`cda2656`](https://github.com/obsidian-typings/obsidian-typings/commit/cda2656bba729ae08e74553d9b4245fb33be330b))

## 4.83.0 (2025-12-17, obsidian-public-1.10.6)

This release has 1 new feature.

### New

- registerDomEvents

## 4.82.0 (2025-12-15, obsidian-catalyst-1.11.1)

This release has 1 new feature.

### New

- update widget components

## 4.81.0 (2025-12-14, obsidian-catalyst-1.11.1)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 4.80.0 (2025-12-14, obsidian-public-1.10.6)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.79.0 (2025-12-14, obsidian-public-1.10.6)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.78.0 (2025-12-14, obsidian-catalyst-1.11.1)

- Merge branch 'release/obsidian-public/1.10.6' into release/obsidian-catalyst/1.11.1 ([`10d16c0`](https://github.com/obsidian-typings/obsidian-typings/commit/10d16c03fa13f5cc24e458934ad7290b55d58ff4))
- Merge branch 'release/obsidian-public/1.10.6' into release/obsidian-catalyst/1.11.1 ([`4b44696`](https://github.com/obsidian-typings/obsidian-typings/commit/4b4469655c88aca889ededa03d0df3926abb9252))

## 4.77.0 (2025-12-14, obsidian-public-1.10.6)

This release has 1 documentation change. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Documentation

- update changelog

## 4.76.0 (2025-12-13, obsidian-catalyst-1.11.1)

This release has 1 new feature. 6 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- update API to 1.11.0

## 4.75.0 (2025-12-13, obsidian-public-1.10.6)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 4.74.0 (2025-12-12, obsidian-public-1.10.6)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.73.0 (2025-12-11)

This release has 1 new feature.

### New

- update API to 1.11.0

## 4.72.0 (2025-12-11, obsidian-public-1.10.6)

- No changes recorded since the previous release.

## 4.70.0 (2025-12-08, obsidian-public-1.10.6)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.69.0 (2025-12-08, obsidian-public-1.10.6)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 4.68.0 (2025-11-25, obsidian-public-1.10.6)

This release has 2 new features and 1 fix.

### New

- remove moment dependency
- add BasesPropertyType

### Fixed

- api-extractor warnings

## 4.67.0 (2025-11-25)

- Merge branch 'release/obsidian-public/1.10.3' into release/obsidian-catalyst/1.10.5 ([`b85b33c`](https://github.com/obsidian-typings/obsidian-typings/commit/b85b33cbdc4bf8ca28c946be215b65b8ea9c8564))

## 4.66.0 (2025-11-25)

This release has 2 new features and 1 fix. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- remove moment dependency
- add BasesPropertyType

### Fixed

- api-extractor warnings

## 4.65.0 (2025-11-19, obsidian-catalyst-1.10.5)

This release has maintenance changes only. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 4.64.0 (2025-11-19)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 4.63.0 (2025-11-12, obsidian-public-1.10.3)

This release has 2 new features.

### New

- move load... functions to implementations
- update typings

## 4.62.0 (2025-11-12, obsidian-public-1.10.3)

This release has 3 new features and 3 fixes.

### New

- apply obsidian.d.ts changes
- add 1.10.0 official API changes
- include since config

### Fixed

- build
- add missing import
- add missing API and @since

## 4.61.0 (2025-11-06)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.60.0 (2025-10-30)

This release has 2 new features and 1 fix. 7 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- apply obsidian.d.ts changes
- add 1.10.0 official API changes

### Fixed

- build

## 4.59.0 (2025-10-30)

This release has 1 new feature. 5 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- add 1.10.0 official API changes

## 4.58.0 (2025-10-02, obsidian-public-1.9.14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.57.0 (2025-10-02)

This release has 1 new feature. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- add 1.10.0 official API changes

## 4.56.0 (2025-10-02, obsidian-public-1.9.14)

This release has 1 new feature, 3 fixes and 2 documentation changes. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- include since config

### Fixed

- build
- add missing import
- add missing API and @since

### Documentation

- sort tags
- parseFromString

## 4.55.0 (2025-10-01, obsidian-catalyst-1.10.0)

This release has 1 documentation change. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Documentation

- update changelog

## 4.54.0 (2025-10-01, obsidian-public-1.9.14)

This release has 1 fix.

### Fixed

- build

## 4.53.0 (2025-09-27, obsidian-catalyst-1.9.14)

This release has 1 new feature.

### New

- Command

## 4.52.0 (2025-09-22)

This release has maintenance changes only. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 4.51.0 (2025-09-16, obsidian-public-1.9.12)

This release has 1 new feature. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- Command

## 4.50.0 (2025-09-07, obsidian-public-1.9.12)

This release has 1 fix.

### Fixed

- patch @types/css-font-loading-module

## 4.49.0 (2025-08-31, obsidian-public-1.9.12)

This release has 1 new feature.

### New

- Updated MultiSelect #131

## 4.48.0 (2025-08-30, obsidian-public-1.9.12)

This release has 1 new feature.

### New

- ImportedAttachment

## 4.47.0 (2025-08-29, obsidian-public-1.9.12)

This release has 1 fix.

### Fixed

- BookmarkItem

## 4.46.0 (2025-08-29, obsidian-public-1.9.12)

This release has 1 fix.

### Fixed

- GetRecentFilesOptions

## 4.45.0 (2025-08-29, obsidian-public-1.9.12)

This release has 3 new features.

### New

- SuggestModalChooser
- BookmarkItem
- GetRecentFilesOptions

## 4.44.0 (2025-08-27, obsidian-public-1.9.12)

This release has 1 fix.

### Fixed

- wrong data type

## 4.43.0 (2025-08-27, obsidian-public-1.9.12)

This release has 1 new feature.

### New

- more bases

## 4.42.0 (2025-08-27, obsidian-public-1.9.12)

This release has 1 fix.

### Fixed

- data type

## 4.41.0 (2025-08-27, obsidian-public-1.9.12)

This release has 1 new feature.

### New

- more bases

## 4.40.0 (2025-08-27, obsidian-public-1.9.12)

This release has 1 fix.

### Fixed

- more bases-related

## 4.39.0 (2025-08-26, obsidian-public-1.9.12)

This release has 1 fix.

### Fixed

- don't assume type in widgets

## 4.38.0 (2025-08-26, obsidian-public-1.9.12)

This release has 2 new features.

### New

- cleanup GetTypeInfoOptions
- Updated MetadataTypeManager.getTypeInfo() #130

## 4.37.0 (2025-08-26)

- Merge branch 'release/obsidian-catalyst/1.9.11' into release/obsidian-catalyst/1.9.12 ([`88de907`](https://github.com/obsidian-typings/obsidian-typings/commit/88de9076b0c2566d0c049175f91bc6e0fb343ab4))

## 4.36.0 (2025-08-26)

- Merge branch 'release/obsidian-public/1.9.10' into release/obsidian-catalyst/1.9.11 ([`e11586f`](https://github.com/obsidian-typings/obsidian-typings/commit/e11586fe1d2b731ea5f887f88521411d2f98c1c8))

## 4.35.0 (2025-08-26)

This release has 2 new features and 1 fix.

### New

- cleanup GetTypeInfoOptions
- Updated MetadataTypeManager.getTypeInfo() #130

### Fixed

- render/data add null type

## 4.34.0 (2025-08-26, obsidian-public-1.9.12)

- No changes recorded since the previous release.

## 4.33.0 (2025-08-26, obsidian-public-1.9.12)

This release has 1 fix and 2 documentation changes. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### Fixed

- PropertyWidget/render always accepts null

### Documentation

- update url
- changelog url

## 4.32.0 (2025-08-26, obsidian-catalyst-1.9.12)

This release has 2 fixes.

### Fixed

- PropertyWidget/render always accepts null
- render/data add null type

## 4.31.0 (2025-08-24, obsidian-catalyst-1.9.11)

- Merge branch 'release/obsidian-public/1.9.10' into release/obsidian-catalyst/1.9.11 ([`9ffce95`](https://github.com/obsidian-typings/obsidian-typings/commit/9ffce953ba17beaa762293dfd23f37211b60c5b8))

## 4.30.0 (2025-08-24, obsidian-public-1.9.10)

This release has 1 fix.

### Fixed

- missing moment import

## 4.29.0 (2025-08-24, obsidian-catalyst-1.9.11)

- Merge branch 'release/obsidian-public/1.9.10' into release/obsidian-catalyst/1.9.11 ([`5e0c51d`](https://github.com/obsidian-typings/obsidian-typings/commit/5e0c51df18be4e90a730705df8a121889387c2dc))

## 4.28.0 (2025-08-24, obsidian-public-1.9.10)

This release has 1 new feature.

### New

- merge editors

## 4.27.0 (2025-08-23, obsidian-catalyst-1.9.11)

- Merge branch 'release/obsidian-public/1.9.10' into release/obsidian-catalyst/1.9.11 ([`c08591e`](https://github.com/obsidian-typings/obsidian-typings/commit/c08591e98b3d40a8632ed9e1fb40bd3d4fa2a2f3))

## 4.26.0 (2025-08-23, obsidian-public-1.9.10)

This release has 3 new features.

### New

- revisit all PropertyWidgetComponents
- fuzzySearch/prepareQuery
- Various MetadataTypeManager related updates #128

## 4.25.0 (2025-08-22, obsidian-catalyst-1.9.11)

- Created PropertyPropertyWidgetComponent and updated entry in MetadataTypeManagerRegisteredTypeWidgetsRecord
- Removed unused import
- PropertyComponentBase does not extend Component
- Removed metadataEditor property from PropertyRenderContext
- Updated PropertyInfo
- Added 'property' type widget'
- Updated MetadataTypeManager

## 4.24.0 (2025-08-21, obsidian-public-1.9.10)

This release has 1 fix.

### Fixed

- receive-files-menu / receive-text-menu

## 4.23.0 (2025-08-21)

- No changes recorded since the previous release.

## 4.22.0 (2025-08-19, obsidian-public-1.9.10)

This release has maintenance changes only. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 4.21.0 (2025-08-19, obsidian-catalyst-1.9.10)

- Merge branch 'release/obsidian-catalyst/1.9.9' into release/obsidian-catalyst/1.9.10 ([`3101c55`](https://github.com/obsidian-typings/obsidian-typings/commit/3101c55eda90350d121c8660091f98c921a49fe7))

## 4.20.0 (2025-08-19)

- Merge branch 'release/obsidian-public/1.8.10' into release/obsidian-catalyst/1.9.9 ([`77f20e0`](https://github.com/obsidian-typings/obsidian-typings/commit/77f20e0bc642073ffffb7da37f13587bc3619b94))

## 4.19.0 (2025-08-19, obsidian-public-1.8.10)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 4.18.0 (2025-08-19, obsidian-public-1.8.10)

- No changes recorded since the previous release.

## 4.10.0 (2025-08-18, obsidian-public-1.8.10)

- No changes recorded since the previous release.

## 4.1.0

This release has 2 fixes. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### Fixed

- remove deprecated in 1.9.0
- remove 1.9.0 code

## 3.16.6 (2025-08-16)

This release has 1 fix.

### Fixed

- name() type

## 3.16.5 (2025-08-15)

This release has 1 documentation change.

### Documentation

- fix misleading comment

## 3.16.4 (2025-08-14)

This release has 1 fix.

### Fixed

- revert incorrect watch changes

## 3.16.3 (2025-08-13)

This release has 1 fix.

### Fixed

- build

## 3.16.2

This release has 1 fix.

### Fixed

- watch typings

## 3.16.1 (2025-08-13)

This release has 1 fix.

### Fixed

- include menu separator

## 3.16.0 (2025-08-10)

This release has 1 new feature.

### New

- EmberContext

## 3.15.0 (2025-08-04)

This release has 1 new feature.

### New

- AbstractInputSuggest / PopoverSuggest / SuggestionContainer

## 3.14.1 (2025-08-03)

This release has 1 fix.

### Fixed

- allow null to TextProperty

## 3.14.0 (2025-08-03)

This release has 1 new feature.

### New

- extend isUserEvent() with overloads #122

## 3.13.5 (2025-07-29)

This release has 1 fix.

### Fixed

- update codemirror packages

## 3.13.4

This release has 1 fix.

### Fixed

- missing patch

## 3.13.3

This release has 1 fix.

### Fixed

- Use precise versions of dep libs (#109)

## 3.13.2 (2025-07-28)

This release has 1 fix.

### Fixed

- PropertyWidget. Support both versions:

## 3.13.1 (2025-07-26)

This release has 1 fix.

### Fixed

- PropertyWidget

## 3.13.0

This release has 1 fix.

### Fixed

- PropertyWidget

## 3.12.1 (2025-07-03)

This release has maintenance changes only. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 3.12.0 (2025-06-19)

This release has 1 new feature.

### New

- WorkspaceLeaf/WorkspaceItem

## 3.11.0 (2025-06-17)

This release has 1 new feature and 1 other change.

### New

- Add documentation for the graph and fix some errors #121

### Other changes

- Add documentation and fix some errors

## 3.10.0 (2025-06-16)

This release has 1 new feature.

### New

- Menu.forEvent

## 3.9.6 (2025-06-06)

This release has 1 fix.

### Fixed

- patch @antfu/utils

## 3.9.5 (2025-05-26)

This release has 1 fix.

### Fixed

- dompurify transitive dep

## 3.9.4

This release has 1 fix.

### Fixed

- build

## 3.9.3

This release has 2 fixes.

### Fixed

- patch pixi.js
- rollback capacitor

## 3.9.2

This release has 2 fixes.

### Fixed

- update libs and patches
- use exact versions for patched libs

## 3.9.1 (2025-05-26)

This release has 1 fix.

### Fixed

- add trust-types dep

## 3.9.0 (2025-05-23)

This release has 1 new feature.

### New

- Bases/Footnotes internal plugins

## 3.8.2 (2025-05-22)

This release has 1 fix.

### Fixed

- incorrect type of setState #120

## 3.8.1 (2025-05-22)

This release has 1 fix.

### Fixed

- missing bun deps

## 3.8.0

This release has 4 new features and 6 fixes. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- improve Webviewer plugin typings
- add CodeMirror augmentations based on Obsidian-patched CM modules
- add `LanguageState` interface
- Improve Webviewer plugin and CodeMirror typings, and fix editor.activeCM #119

### Fixed

- incorrect type of `markdown-viewport-menu`
- incorrect getter name `activeCM`
- JSDoc typo
- build
- API generator
- spellcheck

## 3.7.1 (2025-05-11)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 3.7.0 (2025-05-06)

This release has 2 fixes.

### Fixed

- patch to <https://github.com/obsidianmd/obsidian-api/commit/9ab497e64afeac291a2546d2faeded6a7bed626a>
- update hover types

## 3.6.0 (2025-05-03)

This release has 5 new features and 6 fixes. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- add `ResultDomItemChild`
- add `TreeRoot`
- add `TreeCollapsibleItem`
- improve `FileExplorerView`
- Made some improvements to Tree and FileExplorerView #117 #118

### Fixed

- remove collapsible props from `TreeItem`
- use `TreeItem` and `TreeRoot` as base
- extend `GraphOptions` with `TreeCollapsibleItem`
- `FileTreeItem`
- simplify definition
- remove @internal

## 3.5.1 (2025-05-02)

This release has 1 other change.

### Other changes

- Revert "feat: Made some improvements to Tree and FileExplorerView #117"

## 3.5.0

This release has 8 new features and 6 fixes. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- add `ContainerTreeItem`
- add `TreeRoot`
- add `AbstractFileTreeItem`
- add `FolderTreeItem`
- add `FileTreeItemParent` type
- add sort order for FileExplorerView
- improve `FileExplorerView`
- Made some improvements to Tree and FileExplorerView #117

### Fixed

- use getter for `children` in `TreeNodeVChildren`
- `Tree` and `TreeItem`
- `FileTreeItem` now implements `AbstractFileTreeItem` and `TreeItem`
- `FileExplorerViewFileItemsRecord`
- `attachDropHandler` doc
- CustomArrayDictImpl.count

## 3.4.0 (2025-04-28)

This release has 1 fix.

### Fixed

- FileExplorerView

## 3.3.0 (2025-04-26)

This release has 1 fix.

### Fixed

- runAsyncLinkUpdate

## 3.2.2 (2025-04-24)

This release has 1 fix.

### Fixed

- make fake functions optional

## 3.2.1 (2025-04-23)

This release has 1 fix.

### Fixed

- specify typescript dependency

## 3.2.0 (2025-04-23)

This release has 1 fix.

### Fixed

- remove duplicates

## 3.1.0 (2025-04-21)

This release has 1 fix.

### Fixed

- moment type

## 3.0.0 (2025-04-21)

This release has 7 new features and 1 fix.

### New

- include all public obsidian API
- globals
- DomElementInfo
- more globals
- EditorView
- all functions
- merge with official typings

### Fixed

- compilation

## 2.44.3 (2025-04-18)

This release has 1 fix.

### Fixed

- @antfu types

## 2.44.2 (2025-04-18)

This release has 2 fixes.

### Fixed

- inline PdfJsTestingUtils
- move dependencies to peer

## 2.44.1 (2025-04-18)

This release has 1 fix.

### Fixed

- compilation

## 2.43.3 (2025-04-18)

This release has 1 fix.

### Fixed

- force reexport

## 2.43.2 (2025-04-18)

This release has maintenance changes only. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 2.43.0

This release has 6 new features and 3 fixes.

### New

- refactor vars
- MathJax
- mermaid
- Prism
- pdf.js
- combine functions

### Fixed

- patch dompurify types
- compilation with moment type
- compilation

## 2.42.0 (2025-04-08)

This release has 2 new features, 1 fix and 1 other change.

### New

- Add initGraphics, destroyGraphics and iframeEl to GraphRenderer #116
- Graph

### Fixed

- posAtCoords

### Other changes

- Add initGraphics, destroyGraphics and iframeEl to GraphRenderer

## 2.41.4 (2025-03-31)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.41.3 (2025-03-31)

This release has 1 fix.

### Fixed

- remove duplicated promise property

## 2.41.2 (2025-03-31)

This release has 1 fix.

### Fixed

- queue signature

## 2.41.1 (2025-03-30)

This release has 1 new feature.

### New

- improve docs

## 2.41.0 (2025-03-30)

This release has 1 new feature.

### New

- reconcileFile

## 2.40.0 (2025-03-29)

This release has 1 new feature.

### New

- config-changed

## 2.39.0 (2025-03-28)

This release has 1 new feature.

### New

- FileManager

## 2.38.2 (2025-03-27)

This release has 1 new feature.

### New

- Note composer - HeadingInfo

## 2.38.1 (2025-03-27)

This release has 1 fix.

### Fixed

- missing null

## 2.38.0 (2025-03-27)

This release has 1 new feature.

### New

- Note composer

## 2.37.0 (2025-03-20)

This release has 1 new feature.

### New

- DataAdapter

## 2.36.2 (2025-03-19)

This release has 1 new feature.

### New

- onFileChange

## 2.36.1 (2025-03-18)

This release has 1 fix.

### Fixed

- add missing @public

## 2.36.0 (2025-03-18)

This release has 1 new feature.

### New

- CommandPalette

## 2.35.0 (2025-02-26)

This release has 1 new feature.

### New

- MarkdownView.backlinks

## 2.34.1 (2025-02-25)

This release has 1 fix.

### Fixed

- possible null

## 2.34.0 (2025-02-24)

This release has 1 new feature.

### New

- getMatchCount

## 2.33.0 (2025-02-24)

This release has 1 new feature.

### New

- better types for ResultDomResult

## 2.32.0 (2025-02-24)

This release has 1 new feature.

### New

- addResult / renderContentMatches

## 2.31.0 (2025-02-24)

This release has 1 new feature.

### New

- improve GraphEngine type #114

## 2.30.0 (2025-02-24)

This release has 2 new features.

### New

- improve GraphEngine type #114
- improve FileSystemWatchHandler type

## 2.29.1 (2025-02-24)

This release has 1 fix.

### Fixed

- nullable queue

## 2.29.0 (2025-02-24)

This release has 3 new features.

### New

- ItemQueue
- refactor Tree
- BacklinkComponent

## 2.28.0 (2025-02-23)

This release has 2 new features.

### New

- improve EmbedRegistryEmbedByExtensionRecord type #112
- add all EmbeddableConstructors

## 2.27.0 (2025-02-20)

This release has 2 new features and 1 fix.

### New

- improve Vault type
- A few minor changes and fixes #111

### Fixed

- fix typo in FileSystemAdapter

## 2.26.1 (2025-02-19)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.26.0 (2025-02-19)

This release has 4 new features and 9 fixes.

### New

- improve types related to metadataCache and file adapters
- improve Reference type
- A few improvements to filesystem-related APIs #110
- extract nested objects

### Fixed

- fix different filesystem API interfaces
- listRecursiveChild
- reconcileFileCreation
- CapacitorFileEntry
- _preload
- computeFileMetadataAsync
- Reference
- rename 2-suffixed
- replace any with unknown

## 2.25.0 (2025-02-18)

This release has 1 new feature.

### New

- CanvasView types

## 2.24.0 (2025-02-18)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.23.6 (2025-02-17)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.23.5 (2025-02-17)

This release has 1 fix.

### Fixed

- attw for node10

## 2.23.4 (2025-02-16)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.23.3 (2025-02-16)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.23.2 (2025-02-16)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.23.1 (2025-02-16)

This release has 1 fix.

### Fixed

- implementations.d.mts

## 2.23.0 (2025-02-16)

This release has maintenance changes only. 6 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 2.22.0 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.16 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.15 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.12 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.11 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.10 (2025-02-14)

- Ensure postinstall is published ([`a3db8d4`](https://github.com/obsidian-typings/obsidian-typings/commit/a3db8d435184b9edbd72f8d957c9e9f2f66da058))

## 2.21.4-beta.9 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.8 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.6 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.5 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.4 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.4-beta.2 (2025-02-14)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.3 (2025-02-12)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.2 (2025-02-12)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.1 (2025-02-12)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.21.0 (2025-02-12)

This release has 1 new feature.

### New

- Add new typings to the graph core plugin #108

## 2.20.2 (2025-02-12)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.20.1 (2025-02-11)

This release has 1 fix.

### Fixed

- node10 typing

## 2.20.0 (2025-02-11)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.19.0 (2025-02-10)

This release has 1 new feature.

### New

- add missing arg

## 2.18.2 (2025-02-10)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.18.1 (2025-02-10)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.18.0 (2025-02-10)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 2.17.0 (2025-02-06)

This release has 1 new feature.

### New

- Add BookmarkItems

## 2.16.0 (2025-02-02)

This release has 1 new feature.

### New

- rename parameter

## 2.15.0 (2025-01-26)

This release has 1 fix.

### Fixed

- wrong argument name

## 2.14.6 (2025-01-20)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.14.3 (2025-01-13)

This release has 1 fix.

### Fixed

- remove package-lock

## 2.14.2 (2025-01-13)

This release has maintenance changes only. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 2.14.1 (2025-01-13)

This release has 1 fix.

### Fixed

- move moment dependency

## 2.14.0 (2025-01-13)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.13.9 (2025-01-13)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.13.8 (2025-01-13)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 2.13.7 (2025-01-13)

This release has 1 fix.

### Fixed

- use temporary fork for pixi.js

## 2.13.6 (2025-01-13)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.13.5 (2025-01-13)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.13.4 (2025-01-13)

This release has 1 fix.

### Fixed

- PromiseWithResolvers

## 2.13.3

This release has 1 fix.

### Fixed

- PromiseWithResolvers

## 2.13.2 (2025-01-12)

This release has maintenance changes only. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 2.13.0

This release has 3 new features.

### New

- Add options to DailyNotesPluginInstance #104
- more DailyNotesPluginInstance
- Add engine and renderer to views #105

## 2.12.0 (2025-01-12)

This release has 2 new features and 3 fixes.

### New

- Add typings for the graph plugin #103
- GraphPluginInstance unknowns

### Fixed

- broken image links
- onFileMenu
- pixi.js types

## 2.11.2-beta.1 (2025-01-12)

This release has 2 new features, 2 fixes, 3 documentation changes and 1 other change. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- GraphPluginInstance unknowns
- Add typings for the graph plugin #103

### Fixed

- onFileMenu
- broken image links

### Documentation

- fix missing class
- fix missing sentence
- update Class hierarchies

### Other changes

- Fix pixi.js types

## 2.11.1 (2025-01-08)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.11.0

This release has 1 new feature.

### New

- make createNewFile args optional

## 2.10.0 (2025-01-08)

This release has 1 new feature.

### New

- openLinkText

## 2.9.0 (2025-01-06)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.8.2 (2025-01-06)

This release has 1 fix.

### Fixed

- MenuItem.titleEl

## 2.8.1 (2025-01-02)

This release has 1 fix.

### Fixed

- stat type

## 2.8.0 (2024-12-30)

This release has 2 new features and 1 fix.

### New

- added typings for SearchComponent (#102)
- update Components

### Fixed

- registerMode

## 2.7.0 (2024-12-19)

This release has 1 new feature.

### New

- browser plugin is no longer disabled starting from Obsidian 1.8.0

## 2.6.1 (2024-12-17)

This release has 1 fix.

### Fixed

- Bookmarks signatures

## 2.6.0 (2024-12-14)

This release has 13 new features and 1 fix.

### New

- add all views and leaves
- add new augmentation
- add SyncView
- refactor constructor functions
- add hidden Browser plugin
- add constructors for all views
- add ViewRegistryTypeByExtensionRecord
- add UI Plugin Names
- update defaultOn for plugins
- make generic
- add Browser plugin mappings
- fill ViewRegistryViewByTypeRecord
- change signature for createTFileInstance/createTFolderInstance

### Fixed

- properly extend Platform

## 2.5.0 (2024-12-09)

This release has 1 new feature.

### New

- add optional plugin functions

## 2.4.0 (2024-12-08)

This release has 1 new feature and 1 fix.

### New

- add recomputeBacklink

### Fixed

- signature

## 2.3.4 (2024-11-25)

This release has 1 fix.

### Fixed

- MetadataTypeManagerTypesRecord

## 2.3.3 (2024-11-13)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 2.3.2 (2024-11-13)

This release has 1 new feature and 1 fix.

### New

- EditorView

### Fixed

- CustomArrayDictImpl.add

## 2.3.1-beta.1 (2024-11-08)

This release has 1 new feature.

### New

- EditorView

## 2.3.0 (2024-11-04)

This release has 48 new features, 17 fixes and 1 other change.

### New

- FileSystemWatchHandler
- DataAdapter.handler/trigger
- PromisedQueue
- MarkdownFileInfo.metadataEditor
- add missing public
- add global app
- TFolder.getParentPrefix
- add TFile/TFolder/TAbstractFile methods
- add ShareReceiver
- add all Workspace events
- getLinkSuggestions() sometimes has alias property (#85)
- Extended typings for MarkdownPreviewRenderer
- Add typings to MarkdownPreviewRenderer and fix contributing.md formatting (#86)
- add more hidden exported types
- extract CapacitorAdapter
- MarkdownPreviewSection
- add all global variables
- fix getAvailablePathForAttachments signature
- getBacklinksForFile change to return ReferenceCache
- Updated PropertyRenderContext.onChange
- Updated PropertyRenderContext.onChange (#87)
- update LinkResolverQueue
- use posix
- MetadataCache
- Events._
- add Plugin typings
- AudioRecorderPluginInstance
- add constructors
- update InternalPlugins
- added fileManager.renameProperty()
- more internal plugins
- requestSaveConfig
- BacklinkPluginInstance
- bookmarks
- Bookmark
- added fileManager.renameProperty() (#89)
- App
- more types
- Canvas plugin
- Added colorPickerEl property to ColorComponent (#90)
- add ColorComponent functions
- WorkspaceItem / WorkspaceSidedock
- Update Tree.d.ts (#94)
- Updated typings for ProgressBarComponent (#96)
- add method
- add type guards
- Update ConfigItems
- add debugMode

### Fixed

- mark created fake file/folder as deleted
- handle root folder as /
- ensure style-mod.d.cts is loaded
- add @deprecated to app
- `getLinkSuggestions()` sometimes has `alias` property
- separate AppSetting from existing Setting
- add null result
- getBacklinksForFile accept mandatory TFile
- MetadataCache typings
- computeMetadataAsync
- remove unused Starred plugin
- Debouncer signature
- Avoid duplicating TFile/TFolder
- use proper typing
- changed CustomArrayDict
- signature for getBacklinksForFile
- CustomArrayDict

### Other changes

- fix root folder path

## 2.2.1-beta.38 (2024-11-03)

This release has 1 fix.

### Fixed

- CustomArrayDict

## 2.2.1-beta.37 (2024-10-29)

This release has 1 new feature.

### New

- Update ConfigItems

## 2.2.1-beta.36 (2024-10-25)

This release has 1 new feature. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- add type guards

## 2.2.1-beta.35 (2024-10-25)

This release has 1 fix.

### Fixed

- signature for getBacklinksForFile

## 2.2.1-beta.34 (2024-10-24)

This release has 1 fix.

### Fixed

- changed CustomArrayDict

## 2.2.1-beta.33 (2024-10-17)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.2.1-beta.32 (2024-10-16)

This release has 2 new features and 1 fix. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- add method
- Updated typings for ProgressBarComponent (#96)

### Fixed

- typo

## 2.2.1-beta.31 (2024-10-15)

This release has 1 new feature, 1 fix and 2 documentation changes. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- Update Tree.d.ts (#94)

### Fixed

- use proper typing

### Documentation

- correct terminology
- switch code samples to single quote

## 2.2.1-beta.30 (2024-10-08)

This release has 16 new features, 2 fixes and 1 other change. 49 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- WorkspaceItem / WorkspaceSidedock
- add ColorComponent functions
- Added colorPickerEl property to ColorComponent (#90)
- more types
- Canvas plugin
- Bookmark
- App
- added fileManager.renameProperty() (#89)
- bookmarks
- BacklinkPluginInstance
- requestSaveConfig
- more internal plugins
- update InternalPlugins
- add constructors
- AudioRecorderPluginInstance
- add Plugin typings

### Fixed

- Debouncer signature
- remove unused Starred plugin

### Other changes

- Avoid duplicating TFile/TFolder

## 2.2.1-beta.29 (2024-09-23)

This release has 1 new feature and 1 fix.

### New

- Events._

### Fixed

- computeMetadataAsync

## 2.2.1-beta.28 (2024-09-23)

This release has 1 new feature.

### New

- MetadataCache

## 2.2.1-beta.27 (2024-09-23)

This release has 1 new feature.

### New

- MetadataCache

## 2.2.1-beta.26 (2024-09-23)

This release has 1 new feature.

### New

- MetadataCache

## 2.2.1-beta.25 (2024-09-23)

This release has 2 new features. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- use posix
- update LinkResolverQueue

## 2.2.1-beta.24 (2024-09-22)

This release has 1 fix.

### Fixed

- MetadataCache typings

## 2.2.1-beta.23 (2024-09-21)

This release has 1 fix.

### Fixed

- getBacklinksForFile accept mandatory TFile

## 2.2.1-beta.22 (2024-09-21)

This release has 1 fix.

### Fixed

- add null result

## 2.2.1-beta.21 (2024-09-21)

This release has 1 fix and 1 other change. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### Fixed

- separate AppSetting from existing Setting...

### Other changes

- Reformat

## 2.2.1-beta.20 (2024-09-19)

This release has 1 new feature.

### New

- Updated PropertyRenderContext.onChange (#87)

## 2.2.1-beta.19 (2024-09-18)

This release has 1 new feature.

### New

- getBacklinksForFile change to return ReferenceCache

## 2.2.1-beta.18 (2024-09-18)

This release has 1 new feature.

### New

- fix getAvailablePathForAttachments signature

## 2.2.1-beta.17 (2024-09-17)

This release has maintenance changes only. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

## 2.2.1-beta.16 (2024-09-17)

This release has 4 new features.

### New

- add all global variables
- MarkdownPreviewSection
- extract CapacitorAdapter...
- add more hidden exported types

## 2.2.1-beta.15 (2024-09-15)

This release has 1 new feature and 1 other change. 3 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- Add typings to MarkdownPreviewRenderer and fix contributing.md formatting (#86)

### Other changes

- Add trailing newline

## 2.2.1-beta.14 (2024-09-14)

This release has 1 new feature. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- getLinkSuggestions() sometimes has alias property (#85)

## 2.2.1-beta.13 (2024-09-11)

This release has maintenance changes only. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

## 2.2.1-beta.12 (2024-09-11)

This release has 3 new features. 4 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- add all Workspace events
- add ShareReceiver
- add TFile/TFolder/TAbstractFile methods

## 2.2.1-beta.11 (2024-09-08)

This release has 1 new feature.

### New

- TFolder.getParentPrefix

## 2.2.1-beta.10 (2024-08-22)

This release has 1 fix.

### Fixed

- add @deprecated to app

## 2.2.1-beta.9 (2024-08-20)

This release has 1 new feature. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### New

- add global app

## 2.2.1-beta.8 (2024-08-18)

This release has 1 new feature and 1 fix.

### New

- add missing public

### Fixed

- ensure style-mod.d.cts is loaded

## 2.2.1-beta.7 (2024-08-15)

This release has 1 new feature.

### New

- MarkdownFileInfo.metadataEditor

## 2.2.1-beta.6 (2024-08-12)

This release has 1 new feature.

### New

- PromisedQueue

## 2.2.1-beta.5 (2024-08-12)

This release has 1 fix.

### Fixed

- handle root folder as /

## 2.2.1-beta.4 (2024-08-12)

This release has 1 fix. 1 maintenance commit (tests, build, CI, refactoring, dependencies) is not listed.

### Fixed

- fix root folder path

## 2.2.1-beta.3 (2024-08-11)

This release has 1 fix.

### Fixed

- mark created fake file/folder as deleted

## 2.2.1-beta.2 (2024-08-09)

This release has 1 new feature. 2 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- DataAdapter.handler/trigger

## 2.2.1-beta.1 (2024-08-09)

This release has 1 new feature. 7 maintenance commits (tests, build, CI, refactoring, dependencies) are not listed.

### New

- FileSystemWatchHandler

## 2.2.0 (2024-08-09)

- Added typings for `LinkUpdateHandler` for `inProgressUpdates` and `runAsyncLinkUpdate` (`FileManager`)
- Added typings for `onChange` method (`Vault`)
- Fix first parameter type of `exists` (`Vault`)
- Fix optionality of `getAvailablePathForAttachments` (`Vault`)

## 2.1.3 (2024-08-05)

- Added _initial_ typings for following views:
  - `AllPropertiesView`
  - `AudioView`
  - `BacklinkView`
  - `BookmarksView`
  - `BrowserHistoryView`
  - `BrowserView`
  - `CanvasView`
  - `EmptyView`
  - `FilePropertiesView`
  - `GraphView`
  - `ImageView`
  - `InfoFileView`
  - `LocalGraphView`
  - `OutgoingLinkView`
  - `OutlineView`
  - `PdfView`
  - `ReleaseNotesView`
  - `SearchView`
  - `TagView`
  - `UnknownView`
  - `VideoView`
- Add typings for `queue` method on `FileManager`

## 2.0.0 (2024-07-30)

- Split up typings codebase into separate files
- Added `/implementations` submodule which provides additional code imports
  - `InternalPluginName`
  - `createTFile` and `createTFolder` functions
  - `CustomArrayDictImpl`
- Added typings for:
  - Missing `Platform` constants
  - `HotkeysSettingTab`
  - `LinkUpdaters`
  - `DragManager`
- Fixed typings for:
  - `enable` is async (`Plugin`)
  - Return type of `getEnabledPluginById` (`InternalPlugins`)
  - Return type of `saveAttachment` (`App`)
  - Return type of `importAttachments` (`App`)
  - Parameter order of `getAvailablePathForAttachments` (`Vault`)
- Improved compatibility with older and newer Node and TS configurations

## 1.1.6

- Refactored `InternalPlugin` instance structure
- Fixed return type of `splitLeafOrActive`, returns `WorkspaceLeaf`

## 1.1.5

- **DEPRECATED:** `app.isMobile` will be removed in a future version, prefer usage of `Platform.isMobile`
- **DEPRECATED:** `app.account` has been removed
- Fix `getFileInfo`, returns `undefined` if file does not exist

## 1.1.4

- **NOTE:** the global `app` variable has been removed from the official Obsidian API as of 1.6.0, it will _not_ be re-added by `obsidian-typings`.
- **DEPRECATED:** `loadProgress` has been made inaccessible in version 1.6.0
- **DEPRECATED:** `collapsed`/`collapsible` properties of `TreeItem` have been removed in 1.6.0
- `showRibbon` setting was added
- `footnotes` were added to `MetadataCache`
- Added typings for `DomElementInfo` to allow for adding event listeners directly within `createEl`
- Added `instance` to `InternalPlugin` definitions
- New methods/variables added in 1.6.0/1.6.1 have gotten preliminary typings

## 1.1.3

- Use obsidian as a peer dependency when installing the package

## 1.1.2

- Renamed `Editor` to `BaseEditor` and `ExtendedEditor` to `Editor`, as most components and views directly make use of
    the `Editor` class (and `BaseEditor` is never used directly)

## 1.1.1

- Fix incorrect return type for `loadLocalStorage` function

## 1.1.0

- Add typings for Live Preview Editor instances (`MarkdownView`, `MarkdownEditView`, `MarkdownScrollableEditView`, ...)
- Improved typings for `MetadataEditor` and `PropertyWidgetType`
- Add basic typings for Vim CM plugin to `@codemirror/view` module
- Moved all interfaces and classes under the `obsidian` module
- Removed commented trigger functions from `Events`-derived classes
- Removed duplicated definitions
- Sorted file interfaces alphabetically, applied dprint formatting

## 1.0.8

- Add `aliases` widget type to `PropertyWidgetType`
- Allow arbitrary widgets for `PropertyWidgetType`

## 1.0.7

- Fix `setType` and `unsetType` of `app.metadataTypeManager` not being marked as `async`

## 1.0.6

- Fix unnecessary typings for overridden `trigger` functions on `Events`-derived classes
- Fix `revealInFolder` for file-explorer plugin not accepting `TFile` inputs

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
- Fix lambda definitions and tsc compilation

## v1.0.2

- Changed `any` type to `unknown` to enforcing explicit type casting
- Fixed `CONTRIBUTING.md` link in `README.md`
- Added badges to `README.md`

## v1.0.1

- Automated npm publishing

## v1.0.0 (initial npm release)

- Made package installable via npm
- Clarified README, added contribution guidelines
