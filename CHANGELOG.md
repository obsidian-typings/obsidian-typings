# CHANGELOG

## 1.2.0

**Branch:** [`release/obsidian-catalyst/1.15.0`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.15.0)

**Commits:** [`obsidian-catalyst-1.15.0-v1.1.0...obsidian-catalyst-1.15.0-v1.2.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-catalyst-1.15.0-v1.1.0...obsidian-catalyst-1.15.0-v1.2.0)

### Breaking changes

- feat: declare the markdown editor view constructors ([`929c25b`](https://github.com/obsidian-typings/obsidian-typings/commit/929c25b8b13a7c0b556e1b0ab1520a8325962cdc))
- fix: type Vault.appendBinary as taking a TFile, as Obsidian does ([`42253bd`](https://github.com/obsidian-typings/obsidian-typings/commit/42253bd6e31bda45a89ededbc76e0e6868728599))
- fix(editable-file-view): type saveTitle as resolving a boolean ([`b23e0db`](https://github.com/obsidian-typings/obsidian-typings/commit/b23e0db149611d7d9245a5b80caf24edc5ecbdb8))
- fix(types)!: remove Modal.shouldAnimate, renamed to shouldAnimateOpen in 1.14.0 ([`3c212f2`](https://github.com/obsidian-typings/obsidian-typings/commit/3c212f28b6796ab529200e60f86fafa2c0c8454d))
- fix(types): reconcile Obsidian 1.15.0 runtime changes from the crawler pass ([`0ab369a`](https://github.com/obsidian-typings/obsidian-typings/commit/0ab369aec4bdeb0a3ecaeac383e6d7e502051bc9))
- fix: type the hotkey conflict map and correct the canvas edge multimaps ([`343a10b`](https://github.com/obsidian-typings/obsidian-typings/commit/343a10ba455486a071110e8c755927dc41618117))

### Other changes

- build(deps): override re2js to ^2.9.1 for GHSA-gg6h-894w-4m9c ([`e67baac`](https://github.com/obsidian-typings/obsidian-typings/commit/e67baacd155806082714630ef3aca9e2faf87c10))
- fix(spellcheck): accept multimaps, so the release changelog commits ([`0e29f31`](https://github.com/obsidian-typings/obsidian-typings/commit/0e29f31a6ae24541252cb94d50a3d926d6f9051b))

## 1.1.0

**Branch:** [`release/obsidian-catalyst/1.15.0`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.15.0)

**Commits:** [`obsidian-public-1.14.4-v1.15.0...obsidian-catalyst-1.15.0-v1.1.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.4-v1.15.0...obsidian-catalyst-1.15.0-v1.1.0) -- the first release from this branch, so the range opens at `obsidian-public-1.14.4-v1.15.0`, the nearest earlier release it was cut from

### Breaking changes

- fix(types): reconcile the extra 1.14.4 crawler findings ([`95e9b77`](https://github.com/obsidian-typings/obsidian-typings/commit/95e9b776bb4b7b50c884fc47772208672a17b28a))
- fix(types): reconcile Obsidian 1.14.4 modal, file, workspace and adapter APIs ([`4248cd4`](https://github.com/obsidian-typings/obsidian-typings/commit/4248cd4cf61779b654dc5f72150d105a7606d51f))

### Other changes

- chore: generate README.md from template ([`abeb79b`](https://github.com/obsidian-typings/obsidian-typings/commit/abeb79ba914674bcf6d87984e3493476aee508bb))
- chore: generate README.md from template ([`e2f90a6`](https://github.com/obsidian-typings/obsidian-typings/commit/e2f90a6792d12c7b49dfa893b7709d8da590082d))
- docs: describe CustomArrayDict as a dictionary of unique-value arrays ([`9bd1c77`](https://github.com/obsidian-typings/obsidian-typings/commit/9bd1c773d7312bc3a7cc28606548e8439d23be99))
- feat(types): type native open-url dispatch and the mobile Filesystem.choose plugin ([`b466c36`](https://github.com/obsidian-typings/obsidian-typings/commit/b466c36ac35854fcf7dd653059b4248d60389226))
- feat(bases): type group folding, manual order and link resolution cache ([`e8be46a`](https://github.com/obsidian-typings/obsidian-typings/commit/e8be46abed74ba4c42afadfa76d0fd6762110239))
- fix(types): reconcile Obsidian 1.14.4 sidebar view APIs ([`79a00e0`](https://github.com/obsidian-typings/obsidian-typings/commit/79a00e00fec196b7112dcaf3b5baf5e254144e02))
- fix(deps): clear maintained tooling audit advisories ([`eaacec4`](https://github.com/obsidian-typings/obsidian-typings/commit/eaacec4ab034890d90b04cb838d1cba2012e13a0))
