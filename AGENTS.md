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
- `build:validate-bundle` — validates the bundled output.

Always run the full `npm run build` (plus `lint`, `spellcheck`, `format`) before committing type changes.

## Pinned Versions

An **exact** version (no `^`) is how a dependency is held back here, and it is also what makes it invisible to `update-npm-deps.ps1`: that script upgrades caret ranges and *silently* skips exact pins. Nothing will ever remind you a pin is stale, so every pin carries a row in [`pinned-versions.json`](pinned-versions.json) naming the condition that releases it and the command that tests that condition.

| Package | Pin | Why | Upgrade when |
| --- | --- | --- | --- |
| `typescript` | `6.0.3` | `typescript-eslint` peer-requires `>=4.8.4 <6.1.0` and throws `typescript-eslint does not support TS 7.0.` as soon as `scripts/eslint-config.ts` imports it, so `npm run lint` cannot even load its config on TypeScript 7. `npx tsc --noEmit` breaks too — `tsconfig.json` sets `skipLibCheck` to `false`, so `@typescript-eslint`'s own `.d.ts` files fail against the restructured TS 7 API. A dependency sweep bumped this to `^7.0.2` and broke both; the pin is exact so the next sweep cannot drift it back. `6.0.3` is the newest stable `6.x`. Propagates to the whole tree via `overrides.typescript = $typescript`. | `typescript-eslint`'s peer range admits `7.x` — `node -e "console.log(require('typescript-eslint/package.json').peerDependencies.typescript)"`, tracked upstream as [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940) |

`main` carries its own toolchain: the release branches keep a separate `package.json`, and `checkout.ts` only ever restores `./workflow-scripts` from `main`. Pruning a devDependency here does not touch what a release branch builds with.

## Supported Surfaces

Only the **latest `release/obsidian-public/*`** and the **latest `release/obsidian-catalyst/*`** branches are actively maintained. Older release branches are frozen — type fixes and new modeling land on the two latest branches only. (Referred to by role, not by pinned version, so this stays current across releases.)

## Reported Gaps

Members that exist at runtime but are not modeled yet. Each names the member, the Obsidian version it was
observed in, and the target branch(es).

None currently — the last one, `SettingDefinitionBase.disabled`, was modeled on both latest release
branches by `T269-P8`.

## Documentation

This is a **multi-branch** repo (`main` + long-lived `release/obsidian-public/*` and `release/obsidian-catalyst/*` branches). This `AGENTS.md` lives **only on `main`** — it is intentionally absent from the release branches to avoid divergence. Edit it here.
