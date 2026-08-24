# obsidian-typings

TypeScript type definitions for Obsidian's internal/unofficial APIs.

## File Conventions

### Augmentations (`src/obsidian/augmentations/`)

These augment the official `obsidian` module using module declaration merging.

- Start with `import type` statements, then `export {};`, then `declare module 'obsidian' { ... }`.
- Each member has an `@official` or `@unofficial` tag in its TSDoc.
- Interface-level TSDoc does NOT use `@public`/`@unofficial` (the per-member tags handle it).

### Internals (`src/obsidian/internals/`)

These are standalone exported interfaces for Obsidian's internal objects.

- Use plain `export interface` — no `declare module` or `export {}`.
- Interface-level TSDoc has both `@public` and `@unofficial` tags.
- Individual members do NOT repeat `@unofficial` (the interface-level tag covers them).

### File Organization

- One interface per file, file named after the interface (e.g., `Cli.d.ts` for `Cli`).
- When an interface has helper types (sub-records, entry types, etc.), place them in a directory named after the main interface, each in its own file (e.g., `Cli/Cli.d.ts`, `Cli/CliTreeNode.d.ts`, `Cli/CliHandlerEntry.d.ts`).

### Parallel Folder Structure (Augmentations ↔ Implementations)

- `implementations/constructors/augmentations/` must mirror the subdirectory structure of `augmentations/`.
- If an augmentation type is in `augmentations/{subdir}/Foo.d.ts`, its constructor getter must be in `implementations/constructors/augmentations/{subdir}/getFooConstructor.ts`.
- Types directly under `augmentations/` (not in a subdirectory) keep their getter directly under `implementations/constructors/augmentations/`.
- Enforced by ESLint rule `constructor-getter-placement` (`subdirectoryMismatch` message).

### Shared Conventions

- All imports use `import type` with explicit `.d.ts` extension in relative paths.
- Imports sorted alphabetically: `obsidian` imports first, then local relative imports.
- Multi-member imports from the same module use one `import type` block with members on separate lines.
- Properties use short single-line TSDoc: `/** Description. */`
- Methods use multi-line TSDoc with `@param` and `@returns` tags.
- Simple methods with no parameters can use short single-line TSDoc.
- `@param` format: `@param name - Description.`
- HTML element variables are suffixed with `El` (e.g., `containerEl`, `styleEl`).
- Prefer method syntax `method(args): returnType` over property-with-function syntax `prop: (args) => returnType` when applicable.
- Inside interfaces, fields (properties) go first in alphabetical order, then methods in alphabetical order.

## Build Gate

The authoritative pre-commit gate for type changes is the **full `npm run build`**, not `build:compile`.

`build:compile` runs with `skipLibCheck` and does not run API Extractor, so it silently passes real defects. The full build additionally runs:

- `build:validate-types` (`skipLibCheck: false`) — catches `.d.ts` type errors `build:compile` skips (e.g. `typeof` on an `interface` that should be a `declare class`, or an incompatible property override against an inherited DOM type).
- `build:extract-api` (API Extractor / TSDoc) — requires every `@deprecated` to carry a message, `>`/`<` in TSDoc to be escaped, etc.
- `build:validate-bundle-types` (`skipLibCheck: false`, **`types: []`**) — type-checks the emitted `dist/cjs/*.d.cts` the way a consumer that is handed nothing sees them. The empty `types` list is the point: the repo's own `tsconfig.json` lists `node`, and checking the bundle under that hid for months that both bundles use `Buffer`, `NodeJS.*` and `node:fs` while referencing nothing (fixed by prepending `/// <reference types="node" />` in `fix-bundle-types`). Anything a bundle needs must arrive through the bundle itself — a peer dependency puts types on disk, not in scope.
- `build:validate-bundle` — validates the bundled output against the `tests/bundle-compat` consumer scenarios (restored from `main`, so they are edited here). Scenario 1 is the standalone one and is the only one compiled with `types: []`; scenarios 2-4 model consumers that do have the Node types in scope.

Always run the full `npm run build` (plus `lint`, `spellcheck`, `format`) before committing type changes.

## Pinned Versions

An **exact** version (no `^`) is how a dependency is held back here, and it is also what makes it invisible to `update-npm-deps.ps1`: that script upgrades caret ranges and *silently* skips exact pins. Nothing will ever remind you a pin is stale, so every pin carries a row in [`pinned-versions.json`](pinned-versions.json) naming the condition that releases it and the command that tests that condition.

| Package | Pin | Why | Upgrade when |
| --- | --- | --- | --- |
| `typescript` | `6.0.3` | `typescript-eslint` peer-requires `>=4.8.4 <6.1.0` and throws `typescript-eslint does not support TS 7.0.` as soon as `scripts/eslint-config.ts` imports it, so `npm run lint` cannot even load its config on TypeScript 7. `npx tsc --noEmit` breaks too — `tsconfig.json` sets `skipLibCheck` to `false`, so `@typescript-eslint`'s own `.d.ts` files fail against the restructured TS 7 API. A dependency sweep bumped this to `^7.0.2` and broke both; the pin is exact so the next sweep cannot drift it back. `6.0.3` is the newest stable `6.x`. Propagates to the whole tree via `overrides.typescript = $typescript`. | `typescript-eslint`'s peer range admits `7.x` — `node -e "console.log(require('typescript-eslint/package.json').peerDependencies.typescript)"`, tracked upstream as [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940) |

`workflow-scripts` is a **separate npm package** with its own [`package.json`](workflow-scripts/package.json), its own `node_modules` and therefore its own [`workflow-scripts/pinned-versions.json`](workflow-scripts/pinned-versions.json) — the table above does not reach it, and `update-npm-deps.ps1` has to be run there as a second sweep, from that directory. It carries the same `typescript` pin for the same reason: it runs the same `typescript-eslint`, and while it had no pin file a sweep bumped it to `^7.0.2` on its own.

`main` carries its own toolchain: the release branches keep a separate `package.json`, and `checkout.ts` only ever restores `./workflow-scripts` from `main`. Pruning a devDependency here does not touch what a release branch builds with.

## Supported Surfaces

Only the **latest `release/obsidian-public/*`** and the **latest `release/obsidian-catalyst/*`** branches are actively maintained. Older release branches are frozen — type fixes and new modeling land on the two latest branches only. (Referred to by role, not by pinned version, so this stays current across releases.)

## Publishing

There is **no npm token in this repo**. `publish-release.yml` authenticates to npm through [trusted
publishing](https://docs.npmjs.com/trusted-publishers): the job's `id-token: write` permission mints a
short-lived OIDC credential scoped to that one workflow file. Nothing to rotate, nothing to leak.

The cost is that npm binds a trusted publisher to a **package**, not to a scope or an org, so **every package
this repo publishes needs its own publisher configured on npmjs.com** before CI can publish it — the
per-version packages, both `-latest` wrappers, and the legacy `obsidian-typings`. All of them take identical
settings: owner `obsidian-typings`, repo `obsidian-typings`, workflow `publish-release.yml`, no environment.

Renaming `publish-release.yml`, or publishing from a second workflow, silently breaks every one of those
configurations at once — the publisher is pinned to the filename.

Provenance is not merely attached, it is **checked**: npm validates the published manifest against the
statement and rejects the publish outright when the manifest's `repository.url` disagrees with the
repository the workflow ran from. Three manifests here are generated from object literals rather than being
the repo's own `package.json` — both wrappers in `publish-release.ts` and the placeholder in
`bootstrap-new-package.ts` — so each takes `REPOSITORY` from `workflow-scripts/helpers/npm.ts`. Any further
generated manifest has to do the same, or its publish dies with `E422` after the packages ahead of it in the
run have already gone out.

### A new Obsidian version needs one manual step

A new release branch mints a package name npm has never seen, and a publisher can only be attached to a
package that already exists — npm has no pre-registration ([npm/cli#8544](https://github.com/npm/cli/issues/8544)).
CI has no credential capable of creating it, so `create-new-release-branch` stops instead of dispatching a
release that could not succeed, and tells you to run:

```bash
npm run bootstrap-new-package -- <obsidianVersion> <public|catalyst>
```

That publishes a `0.0.0` placeholder under a `bootstrap` dist-tag — claiming the name, and needing your
interactive 2FA to do it — then prints the exact fields to enter on npmjs.com. Save the trusted publisher,
then `npm run release`. Every subsequent release of that package is fully automated.

The placeholder deliberately does not take the `latest` tag, so nothing installs an empty stub in the window
before the first real release, which starts at `1.1.0`.

## Reported Gaps

Members that exist at runtime but are not modeled yet. Each names the member, the Obsidian version it was
observed in, and the target branch(es).

Observed in **1.13.7**, target **both latest release branches**. Found by `T583-P8` while fixing
[#142](https://github.com/obsidian-typings/obsidian-typings/issues/142), reading the chooser class out of
`obsidian-1.13.7.asar` rather than from a report.

`SuggestModal.chooser` and `PopoverSuggest.suggestions` are the **same runtime class**, modeled here by
two separate interfaces — `SuggestModalChooser` and `SuggestionContainer` — so a member missing from both
has to be added twice, and the two disagree today in ways worth settling at the same time
(`Event` vs `KeyboardEvent | MouseEvent`; `boolean` vs `false | void` returns on
`moveUp`/`moveDown`/`pageUp`/`pageDown`).

Missing from **both** interfaces:

- `renderSuggestions(): void` — empties `containerEl`, re-creates one `div.suggestion-item` per value
  through `chooser.renderSuggestion`, re-applies `is-selected`, and reassigns `suggestions`.
- `shouldSelectOnHover(value: boolean): this` — setter for `selectOnHover`; returns `this`, so it is
  meant to be called on the freshly constructed instance.
- `selectOnHover: boolean` — set to `true` in the constructor; while false, `onSuggestionMouseover`
  does nothing.

Missing from `SuggestModalChooser` only (`SuggestionContainer` already has both):

- `getSelectedElement(): HTMLDivElement | null`
- `getSelectedValue(): T | null`

One more on the **chooser** side — the modal, not the container — and so on neither interface above:

- `onSelectedChange?(value: T, evt: KeyboardEvent | MouseEvent | null): void` — an optional hook
  `forceSetSelectedItem` calls after every selection change. Obsidian's own theme-switcher modal
  implements it, to preview a theme when the selection moved by keyboard. `evt` is nullable for the same
  reason `setSelectedItem`'s is (see `T583-P8`), so model it that way from the start.

The previous entry, `SettingDefinitionBase.disabled`, was modeled on both latest release branches by
`T269-P8`.

## Documentation

This is a **multi-branch** repo (`main` + long-lived `release/obsidian-public/*` and `release/obsidian-catalyst/*` branches). This `AGENTS.md` lives **only on `main`** — it is intentionally absent from the release branches to avoid divergence. Edit it here.
