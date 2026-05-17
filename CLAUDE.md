# obsidian-typings

## Current Task

Docs redesign: replacing TypeDoc with a custom markdown generator for Starlight.

## Pending Questions

### Q1: Use ts-morph instead of api-extractor for docs generation?

**Context**: The existing `dist/obsidian-typings.api.json` only contains our augmentation types (586 interfaces, 162 functions, etc.) — NOT the base Obsidian types (App, Vault, MetadataCache, etc.) because they come from the `obsidian` npm package and api-extractor treats them as external. Adding `"bundledPackages": ["obsidian"]` didn't help because our types are module augmentations.

**Options**:
- A) Use `ts-morph` to parse `dist/cjs/types.d.cts` (the fully bundled/self-contained types file) and generate markdown directly. ts-morph is already a docs dependency and can extract everything: classes, interfaces, methods, overloads, JSDoc, inheritance.
- B) Run api-extractor on a custom entry point that merges official + augmented types into a single non-augmentation file (would need significant preprocessing).
- C) Generate two api.json files (one from obsidian, one from our augmentations) and merge them in the markdown generator.

**Auto-selected**: **A (ts-morph)** — simplest, we already have the dependency and precedent in preprocess.ts, and the bundled types.d.cts is a complete self-contained file.
