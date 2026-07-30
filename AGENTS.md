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

## Supported Surfaces

Only the **latest `release/obsidian-public/*`** and the **latest `release/obsidian-catalyst/*`** branches are actively maintained. Older release branches are frozen — type fixes and new modeling land on the two latest branches only. (Referred to by role, not by pinned version, so this stays current across releases.)

## Reported Gaps

Members that exist at runtime but are not modeled yet. Each names the member, the Obsidian version it was
observed in, and the target branch(es).

- **`SettingDefinitionRender.disabled`** — `disabled?: boolean | (() => boolean)`. Observed in **1.13.4**
  (public). Target: **`release/obsidian-public/1.13.4`** and **`main`**. Obsidian's own `obsidian.d.ts`
  declares `disabled` on `SettingDefinitionControl` and `SettingDefinitionAction` only, and this repo's
  1.13.4 branch mirrors that — but the renderer reads it off **every** definition it draws, `render` rows
  included:

  ```js
  // app.js, the predicate pass driven by refreshDomState()
  var r = 'disabled' in i ? i.disabled : i.control?.disabled;
  if (r !== undefined) e.setting.setDisabled(z2(r, !1));
  ```

  A `Setting` is stored for every rendered definition, so the row-level predicate applies to `render` rows,
  and `Setting.setDisabled` propagates to every component registered on the row. `obsidian-dev-utils` ships a
  local module augmentation as an interim workaround (`src/@types/obsidian.d.ts`), tracked as `T270-P1`;
  this addition is `T269-P8`.

## Documentation

This is a **multi-branch** repo (`main` + long-lived `release/obsidian-public/*` and `release/obsidian-catalyst/*` branches). This `AGENTS.md` lives **only on `main`** — it is intentionally absent from the release branches to avoid divergence. Edit it here.
