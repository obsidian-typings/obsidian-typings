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

## Build & Type Validation

The general build (`build:compile`) sets `skipLibCheck: true` in `tsconfig.json`. This is a
deliberate exception to the usual "never disable `skipLibCheck`" stance: it lets the build
type-check our implementation/script `.ts` files without failing on broken upstream `.d.ts`
files we do not control (e.g. when `obsidian.d.ts` ships type errors for a given version).

Declaration (`.d.ts`) correctness is validated separately, with `skipLibCheck: false`:

- `build:validate-types` — type-checks the `.d.ts` files we author. It derives the file set
  from `tsconfig.json`'s `include` (keeping only declaration files) and reports diagnostics
  **only** for those files; diagnostics originating in any other file (e.g. `obsidian.d.ts`)
  are ignored. The shared logic lives in `scripts/helpers/check-project-types.ts`.
- `build:validate-bundle-types` — validates the generated `dist/cjs/*.d.cts` bundles the same
  way (only diagnostics inside the bundle itself are reported). `dts-bundle-generator` is run
  with `--no-check` because its built-in check forces `skipLibCheck: false` with no way to
  ignore upstream errors.
- `build:validate-bundle` — compiles the `tests/bundle-compat/scenario-*` consumer projects,
  ignoring diagnostics from third-party packages (obsidian, codemirror, …) but keeping those
  from the scenario files and from our published `obsidian-typings` types.
  - Each scenario depends on obsidian via `"obsidian": "file:../../../node_modules/obsidian"`,
    so it always resolves the **same** physical obsidian install as the bundle. Pinning a fixed
    obsidian version here instead causes the consumer and the bundle to load two different
    obsidian copies, and our `declare module 'obsidian'` augmentations then fail to merge into
    the consumer's types. Keeping the `file:` link also makes the scenarios version-agnostic, so
    the same `tests/` fixtures work on every release branch regardless of its obsidian version.

When upstream types are fixed, these steps' "Ignored N diagnostic(s)" count drops to `0`,
signalling the workaround is no longer doing anything.