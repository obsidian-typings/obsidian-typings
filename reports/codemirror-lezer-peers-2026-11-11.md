# CodeMirror and Lezer peer review

Review date: 2026-11-11. The question is whether the CodeMirror and Lezer peers the Lezer `NodeProp` interoperability fix published can coexist with rule L1 in [`AGENTS.md`](../AGENTS.md): the default declaration entry points stay usable without installing the libraries whose APIs Obsidian exposes. No declaration or dependency contract changed in this review.

## Scope and evidence

The measured packages are `@obsidian-typings/obsidian-public-1.15.0@1.1.0` and `@obsidian-typings/obsidian-catalyst-1.15.1@1.1.0`, the latest releases of both maintained branches. The branch tips at the time were `0eb62ab8e1427241154d04896bc3f505b62b8f81` (public) and `a9fb471da002274c379352c87aa3d466a489d9a7` (catalyst). Both declare the same peers, and neither declares `peerDependenciesMeta`:

| Peer | Range | Already a peer of `obsidian@1.14.4` |
| --- | --- | --- |
| `@codemirror/state` | `^6.7.6` | yes, exact `6.7.6` |
| `@codemirror/view` | `^6.43.13` | yes, exact `6.43.13` |
| `@codemirror/language` | `^6.13.1` | no |
| `@codemirror/search` | `^6.7.2` | no |
| `@lezer/common` | `^1.5.5` | no |
| `@types/node` | `>=16.0.0` | no, but a peer here before the Lezer fix |

Every probe below used TypeScript 6.0.3, `module` and `moduleResolution` `node16`, `strict`, `types: []`, and a consumer importing the package beside `obsidian@1.14.4`. The consumer reads `App.plugins`, `LanguageState.tree` and `CodeMirrorEditor.addOverlay`.

## Findings

1. **Only three of the five peers add anything.** `obsidian` itself peers `@codemirror/state` and `@codemirror/view` at exact versions and imports them unconditionally from `obsidian.d.ts`, so a consumer that type-checks `obsidian` already has them. Declaring them here costs nothing.
2. **The three additional peers are a small, script-free download under npm.** npm 7 and later installs required peers. Against a consumer holding only `obsidian`, the package brought `@codemirror/language`, `@codemirror/search` and `@lezer/common`, plus `@codemirror/streamparser`, `@lezer/highlight` and `@lezer/lr` through `@codemirror/language`. Together they are about 950 KB of JavaScript and declarations, with no install scripts. For comparison, the `@types/node` peer and its `undici-types` dependency are about 2.6 MB. This is a different order of cost from the Electron or MathJax packages L1 was written against.
3. **A consumer without them fails, or silently loses the types.** Installed with `--legacy-peer-deps`, so with only `obsidian` and its two CodeMirror peers, the consumer reports three `TS2307` errors under `skipLibCheck: false`: one each for `@codemirror/language`, `@codemirror/search` and `@lezer/common` (plus the pre-existing `@types/node` errors, since nothing installed it either). Under `skipLibCheck: true` it reports nothing, and `LanguageState.tree` and the `addOverlay` result become `any`: assigning either to an unrelated branded object type compiles. The same consumer with the peers installed has no errors under either setting. Yarn Berry, which does not install peers, and pnpm with `auto-install-peers` off, put a consumer in this position too.
4. **Optional peer metadata does not help.** A one-file package declaring `@lezer/common` as a peer with `peerDependenciesMeta` `optional: true`, and importing `NodeProp` from it, was installed by npm without `@lezer/common`. The consumer then failed with `TS2307` on that import. Optional metadata only stops the install; it cannot make an unconditional import resolve. L1 already states this, and this probe shows it.
5. **A bare augmentation does not defer the import.** `declare module '@codemirror/language'` of a module that is not installed produces no error of its own, but an `import('@lezer/common')` type inside that block still reports `TS2307`. So moving the Lezer-typed members into the augmentation blocks does not make them conditional. `LanguageState.tree` and `.context` live on an interface of this package anyway, outside any augmentation.

## Conclusion

No declaration shape gives both consumers what they need by default. An import that resolves only when its package is installed does not exist in TypeScript, and the two workarounds measured above either fail or degrade to `any`. So the choice is between:

1. **Required peers, as published now.** Upstream identity works by default, which is what the reported `tokenClassNodeProp` failure needed. The cost is the three packages of finding 2 for npm and pnpm users, and finding 3 for everyone else. It contradicts L1 as written.
2. **The opt-in integration pattern already used for Pixi, Electron and PDF.js.** Keep `@codemirror/state` and `@codemirror/view` as peers, since `obsidian` requires them anyway. Restore standalone declarations for the `@codemirror/language`, `@codemirror/search` and `@lezer/common` boundaries in the default bundles. Add a type-only subpath that selects the real types through a reserved global registry. A consumer that passes `tokenClassNodeProp` to the real `NodeType.prop` then adds one `import type {} from '<package>/lezer'` line.

Option 2 is what L1 asks for, and it is the pattern this repository already applies to the other libraries with private-member identity. The Lezer mirrors can never be identity-compatible on their own, because `NodeProp.add` reaches `NodeType`'s private members, so the subpath carries the real types the way `/pixi` does. The CommonJS and ESM `NodeProp` scenarios stay, opted into the subpath. A new scenario installs neither `@codemirror/language`, `@codemirror/search` nor `@lezer/common`, and checks the default bundles with `skipLibCheck: false`. That scenario cannot be added before the change, because the current bundles fail it, and every release build restores the scenarios from `main`.
