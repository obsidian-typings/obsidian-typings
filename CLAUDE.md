# obsidian-typings

## Current Task

None.

## Known Issues

- Dev server (`npm run dev`) is too slow with ~11K content pages — content sync takes too long. Use `npm run build && npm run preview` instead.
- Description multiline partially lost in JSX attrs (escapeJsxAttr replaces \n with space — affects ConstructorBlock description).

## Deferred Tasks

~~- Phase 5: Split generate-api-docs.ts (1587 lines) into modules (extract-types, resolve-links, render-mdx, orchestrator). Pure code quality — no user-visible effect.~~ (Done)
