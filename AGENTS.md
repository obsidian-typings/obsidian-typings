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
- `build:validate-bundle-types` (`skipLibCheck: false`, **`types: []`**) — type-checks all four emitted bundles (`dist/cjs/*.d.cts` **and** `dist/esm/*.d.mts`) the way a consumer that is handed nothing sees them. The empty `types` list is the point: the repo's own `tsconfig.json` lists `node`, and checking the bundle under that hid for months that both bundles use `Buffer`, `NodeJS.*` and `node:fs` while referencing nothing (fixed by prepending `/// <reference types="node" />` in `fix-bundle-types`). Anything a bundle needs must arrive through the bundle itself — a peer dependency puts types on disk, not in scope. Checking the `.d.mts` files matters for a second reason: the repo's `tsconfig.json` is `module: node16`, so a `.d.mts` root file gets `impliedNodeFormat: ESM` and resolves its bare specifiers under the `import` condition — the surface no gate touched while the ESM entry points were shims. The same step also asserts each `.d.mts` is **byte-identical** to its `.d.cts` source, because a shim type-checks perfectly well on its own and nothing else would catch the regression.
- `build:copy-esm-bundle-types` — writes those copies. The ESM entry points must be full copies, never re-export shims: a declaration file has exactly one `impliedNodeFormat`, so a shim into `dist/cjs` keeps resolving `@codemirror/*` under `require` and attaches every augmentation to the `.d.cts` copy an ESM consumer never loads. `scripts/helpers/esm-bundle-copies.ts` carries the full rationale, including the alternative that must not be taken.
- `build:validate-bundle` — validates the bundled output against the `tests/bundle-compat` consumer scenarios (restored from `main`, so they are edited here). Scenario 1 is the standalone one and is the only one compiled with `types: []`; scenarios 2-4 model CJS consumers that do have the Node types in scope. Scenarios 5-6 are the ESM consumers — `esnext` + `bundler` (the Obsidian sample plugin's own defaults) and `node16` + `"type": "module"` — and are the only ones that resolve the package through the `import` condition. Note `.gitignore`'s bare `index.ts` rule matches at any depth, so a scenario's entry file needs the `!tests/bundle-compat/*/index.ts` negation to be committable at all.

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

### A new Obsidian version needs two manual steps, and the second is the one that gets skipped

A new release branch mints a package name npm has never seen, and a publisher can only be attached to a package that already exists — npm has no pre-registration ([npm/cli#8544](https://github.com/npm/cli/issues/8544)). CI has no credential capable of creating it, so `create-new-release-branch` stops instead of dispatching a release that could not succeed, and tells you to run:

```bash
npm run bootstrap-new-package -- <obsidianVersion> <public|catalyst>
```

That publishes a `0.0.0` placeholder under a `bootstrap` dist-tag — claiming the name, and needing your interactive 2FA to do it — then prints the exact fields to enter on npmjs.com. **Saving that form is a second, separate step.** The two fail independently and only the first announces itself: claiming the name is interactive and either works or errors in front of you, while attaching the publisher is a form on a web page that nothing checks afterwards. Save it, then `npm run release`. Every subsequent release of that package is fully automated.

Skipping the second step is invisible until CI publishes, and then it surfaces as a bare `E404` — the same misreading the local half produces, arriving from the other side. `npm publish` requests an OIDC credential, the registry refuses it because no publisher is attached, and npm treats that refusal as "this registry does not offer OIDC": it logs at `verbose` and publishes anyway, with no credential at all. The registry then answers the unauthorized `PUT` with **404**, so the run dies reporting that a package which plainly exists `could not be found or you do not have permission`. It happened twice on 2026-09-14, on `obsidian-catalyst/1.14.0` and `1.14.1`, and it is not a cheap failure: the version bump is committed, pushed and tagged *before* the first publish, so each attempt burns a minor version and leaves a tag pointing at a release that never happened.

Two guards now stand in front of that. `publish-release.ts` asks npm the same question `npm publish` asks and discards — the OIDC token exchange — for **every** package the run will publish, before it installs, builds, or bumps anything; a definite refusal aborts the run having changed nothing, while an inconclusive answer is reported and allowed through. And when a publish fails anyway, the error names the likely cause and the `/access` page to fix it instead of passing npm's message through.

**"The package exists" is not the predicate for "the bootstrap is done"**, and both scripts used to treat it as one. There is no way to read a package's trusted publisher — `npm access` has no subcommand for it and the registry exposes no endpoint — so what is asked instead is whether anything has ever published through the name. A package carrying a real release has already published from this workflow, so its publisher is attached; one carrying only the placeholder has not, and `create-new-release-branch` refuses to dispatch into it rather than burning a version to find out.

The placeholder is published under a `bootstrap` dist-tag, but on a brand-new package it takes `latest` as well — there is no other version for `latest` to point at — so installing the name before its first real release gets an empty stub. That window is normally minutes wide, and only stays open when the hand-back above stalls.

Claiming the name is also the **only** step in the whole release path that needs a local npm credential — every other publish goes out from CI through trusted publishing, with no token anywhere — so it is the one place a stale `npm login` can surface, and the one place nobody expects it. It surfaces badly: npm answers an *unauthorized* `PUT` to a package that does not exist yet with **404**, not 401, because it will not confirm the existence of something you may not read. A dead credential therefore reads as `E404 ... could not be found or you do not have permission` against the very name you are claiming, as if the registry had refused the scope. Both scripts now ask `npm whoami` first and say `npm login` in those words instead — `bootstrap-new-package` before it builds or publishes anything (but *after* its already-claimed short-circuit, which needs no credential, so re-running stays safe), and `create-new-release-branch` on the path where it hands the step over. The 2FA prompt never appearing is the original tell, if you ever meet the raw error again.

### Which branch a new release branch is cut from

`create-new-release-branch` derives the base branch rather than taking it as an argument, from one ordering that is easy to get backwards: **for one and the same Obsidian version the `public` branch is cut AFTER the `catalyst` one**, so on a version tie `public` is the *later* of the two and is the base. The script's channel comparison is `<= 0` for exactly that reason, and the equal-version guard below it encodes the same ordering from the other side — it refuses a new `catalyst` at the latest version and lets a new `public` through. Change either one and they contradict each other; a `< 0` there silently based `1.14.0` on the older of the two `1.13.7` branches.

The base **content** comes from `origin/<baseBranch>`, not from the local ref, because the base branch *name* is chosen by reading the remote refs. The local `release/...` branch is never checked out or moved, so local unpushed commits are neither shipped nor destroyed. `npm run checkout` is the opposite case by design: it checks out your local ref, which is what you want when you have local work in the tree.

## Reported Gaps

Members that exist at runtime but are not modeled yet. Each names the member, the Obsidian version it was
observed in, and the target branch(es).

None currently — the last ones, the suggestion-chooser members, are modeled on both latest
release branches.

## Documentation

This is a **multi-branch** repo (`main` + long-lived `release/obsidian-public/*` and `release/obsidian-catalyst/*` branches). This `AGENTS.md` lives **only on `main`** — it is intentionally absent from the release branches to avoid divergence. Edit it here.
