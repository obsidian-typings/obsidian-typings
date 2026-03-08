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

### Shared Conventions

- All imports use `import type` with explicit `.d.ts` extension in relative paths.
- Imports sorted alphabetically: `obsidian` imports first, then local relative imports.
- Multi-member imports from the same module use one `import type` block with members on separate lines.
- Properties use short single-line TSDoc: `/** Description. */`
- Methods use multi-line TSDoc with `@param` and `@returns` tags.
- Simple methods with no parameters can use short single-line TSDoc.
- `@param` format: `@param name - Description.`
- HTML element variables are suffixed with `El` (e.g., `containerEl`, `styleEl`).
