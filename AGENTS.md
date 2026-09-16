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

## Gates on `main`

`main` carries no build — it is the docs and tooling branch — so its whole gate is six npm scripts: `lint`, `lint:md`, `format:check`, `spellcheck`, `typecheck` and `check:exec-helpers`. [`verify.yml`](.github/workflows/verify.yml) runs all six on every `push` and `pull_request` against `main`, plus `typecheck` inside `workflow-scripts` and inside `docs`, and each gate carries `if: ${{ !cancelled() }}` so one push reports every problem it has rather than one per fix. They also fire from the pre-commit hook (`nano-staged` → `lint:fix` + `format` on staged `.ts`/`.mts`, `lint:fix` alone on `.astro`, `spellcheck` on everything staged, `lint:md:fix` on `.md`), which is the fast local pass and was never a substitute for the workflow: `nano-staged` is handed only the **staged** files, so a change that breaks a file it does not touch is invisible; `HUSKY=0` and `NANO_STAGED=0` are documented, supported opt-outs that a gitignored `.env` can park permanently (`scripts/helpers/env-toggle.ts` gives every npm script one); `format:check` and `typecheck` are not in the hook at all; and a contributor has no hook installed until `npm install` has run. The `.astro` entry has no `format` beside it because dprint loads a TypeScript, a JSON and a markdown plugin and none of them formats Astro; it was added with `eslint-plugin-astro` in 2026-09, since before that a staged `.astro` change matched no task but `spellcheck`.

`npm run typecheck` exists in **all three** packages because it has to be run in all three, and the root `tsconfig.json` is the reason twice over. It does `include` `workflow-scripts/**/*.ts`, but it checks those files against the root's dependencies, `lib` and `target` rather than the subpackage's own — a near-miss, not a substitute for `npm run typecheck` inside `workflow-scripts`. It `exclude`s `docs` outright, so there the root gate is not a near-miss but a blank.

`workflow-scripts/tsconfig.json` sets `skipLibCheck: true`, against `@tsconfig/strictest`'s `false`, and the file itself carries the reasoning. In short: `false` earns its keep only where the `.d.ts` files *are* the product, which is the release branches; here it bought a permanently red `tsc --noEmit` on a transitive dependency's own declaration file (`eslint-import-context`, still unfixed upstream), and `skipLibCheck` has no per-package escape hatch. It skips declarations only — nothing about the scripts themselves is checked less strictly.

`docs/` is a **third** npm package (`"name": "site"`), and its `npm run typecheck` is **`astro check`, not `tsc --noEmit`** — the one place the two npm scripts of that name differ. The root `tsconfig.json` names `docs` in its `exclude`, so nothing else type-checks that tree, and `tsc` run there standalone is 13 errors of which only one is real: 8 `TS2307` on the `.astro` imports in `src/components/api/index.ts`, which only the Astro language plugin can resolve, and 4 `TS4111` inside `@astrojs/starlight`, which ships `.ts` **sources** that `skipLibCheck` therefore does not cover. `astro check` reports none of the 12, runs `astro sync` as its own first step, and checks the `.astro` components themselves.

That last part is the one thing to know before editing `docs/tsconfig.json`: **`astro check` checks exactly what `include` names, and nothing else.** With the original `**/*.ts` it checked 38 files and not one of the 15 `.astro` components — a deliberate `const x: number = 'str'` in a component's frontmatter was reported by nothing. `**/*.astro` is in `include` for that reason, and dropping it would silently narrow the gate rather than break it.

The same file's `files` entry, reaching into `node_modules` for `@astrojs/starlight/virtual-internal.d.ts`, looks wrong and is not. Starlight splits its virtual-module declarations deliberately: the triple-slash references at the top of its `index.ts` pull `virtual.d.ts` into a consumer's program, while `virtual-internal.d.ts` is in neither that set nor the package's `exports` map. The three Starlight component overrides in `docs/src/components/` import from the private half — `virtual:starlight/pagefind-config`, `virtual:starlight/components/MobileMenuFooter`, `virtual:starlight/user-images` — which Vite resolves at build time and nothing types, so without that entry the gate is four `TS2307`s red. Loading Starlight's own file beats re-declaring those three modules locally: a hand-copy goes stale in silence, while an upgrade that moves this file fails the gate on the next run. It is in `files` rather than `include` because `exclude` filters `include` and names `node_modules`, while `files` is not filtered — and in the tsconfig rather than in `docs/src/env.d.ts` beside the other two type loads, because a relative import across a package boundary is what `import-x/no-relative-packages` exists to reject and the subpath it suggests instead is the one the `exports` map withholds.

**It was never outside the other four gates either** — `lint`, `lint:md`, `format:check`, `spellcheck` — and the reason is the rule in the section below: `docs/` has no `eslint.config.mts` of its own, so the **nearest** config to its files is the root one — which names `docs/**/*.ts` in `typeScriptFiles`, and roughly half the files a root `npm run lint` reports on live under `docs/`. `spellcheck` runs `cspell` over `.`, and `dprint` excludes only lock files and `**/*.md`, both reaching `docs/` the same way. Measured 2026-09-15, when tightening the root ESLint config put four new findings in `docs/scripts/helpers/` and `npm run lint` at the root failed on them. Do not read "no `eslint.config.mts` of its own" as "not gated" — for ESLint it means the opposite. That is why [`verify.yml`](.github/workflows/verify.yml) installs `docs/` as well as the root and `workflow-scripts`: the root `lint` resolves that tree's types through its dependencies.

It also runs **`npx astro sync` inside `docs/`** before any gate, and so must anyone linting a fresh clone. `docs/src/env.d.ts` imports `docs/.astro/types.d.ts`, which Astro generates and `.gitignore` hides, so on a checkout that has never had a docs build the root `npm run lint` fails with 12 errors that have nothing to do with the change in hand: one `import-x/no-unresolved` on that import, then 11 `no-unsafe-*` and `restrict-plus-operands` in `docs/src/route-middleware.ts`, which loses its types and degrades to `any`. `astro sync` is `astro build`'s own first step run alone, and takes ~20 s — the full build is not an option here, since it needs ~21 GB and OOM-kills a standard runner (see [`build-pages.yml`](.github/workflows/build-pages.yml)). A machine that has built or served the docs already has the file, which is why this stayed invisible locally.

### `exec.ts` and `root.ts` exist three times over, and `check:exec-helpers` is what keeps the copies equal

`scripts/helpers/`, `workflow-scripts/helpers/` and `docs/scripts/helpers/` each carry their own copy of `exec.ts` and `root.ts`. That is deliberate and is not going away: each tree is a self-contained island with its own `package.json`, `tsconfig.json` and dependency tree, and `workflow-scripts` is additionally synced into a release branch's working copy with `git restore --source=main --worktree -- ./workflow-scripts`, so reaching into a sibling tree would tie it to whichever `scripts/` the host branch happens to carry. `helpers/env-toggle.ts` and `helpers/git.ts` are forked for the same reason, and the header of `workflow-scripts/helpers/env-toggle.ts` is where that was first written down.

What was going away was the copies being *the same file*. Left to hand-syncing they aged apart over twelve measured differences, and the divergence was not symmetric: the root copy alone implemented the MSVCRT backslash/quote rules (`argvQuote`), escaped `cmd.exe` metacharacters, refused to send a newline-bearing command through `cmd.exe`, and put the child's `stderr` in the failure message; the other two alone could run `execFromRoot` from a folder with no `package.json` ancestor, which `docs/scripts/setup.ts` needs. Two hand-copies of one hand-copy had also started to differ from each other over which helpers they exported. Both halves are now in one file that all three trees carry byte-for-byte, with `shouldFailIfCalledFromOutsideRoot` declared on `ExecFromRootOption` in `root.ts` rather than on `ExecOption` — `exec` never reads it.

**So edit one copy and copy it over the other two.** `npm run check:exec-helpers` fails on any difference and names the `git diff --no-index` that shows it. It also asserts the quoting itself, which nothing else in this repo ever exercised: a trailing backslash on a path with a space, an embedded quote, an embedded newline, and `&` / `|` / `%` reaching `cmd.exe`. Those run as pure-function assertions on every platform; the end-to-end argv round trip through a real child process is Windows-only, because `exec` applies these Windows rules on **every** platform and escapes nothing for `/bin/sh`, so on POSIX a backslash-bearing argument does not survive the shell. That is a separate known defect — asserting the round trip there would assert the bug.

The JSON and path helpers that used to sit in the same file as `exec` now live in `workflow-scripts/helpers/json.ts`, the one tree with callers. The `docs/` copy of them was entirely dead, and `type-fest` left `docs/package.json` with it.

### ESLint resolves the config nearest to each file, and that used to hide 22 of these 25 files

`workflow-scripts` is a separate npm package with its own ESLint config, and ESLint picks the **nearest** `eslint.config.mts` to the file it is linting. So the root `npm run lint` gates that tree through `workflow-scripts/eslint.config.mts`, never through the root config — which makes the subpackage config's `files` globs load-bearing for the root gate.

They were `src/**/*.ts` + `scripts/**/*.ts`, copied from the root config where both name real directories. Here there is no `src/`, and `scripts/` holds only the three files that build this package's own tooling, so **every release-critical script matched no glob at all** — `publish-release.ts`, `create-new-release-branch.ts`, `bootstrap-new-package.ts`, `release.ts`, all of `helpers/`. ESLint reports that as *"File ignored because no matching configuration was supplied"*, a **warning**, so both `npm run lint` and the pre-commit hook stayed green over 22 of the package's 25 files. What it hid, once the globs were widened: three un-awaited `execFromRoot` calls in `release.ts` that must run in sequence, and 150 findings in total.

The globs are now the whole package. `no-console` and `import-x/no-nodejs-modules` are off **package-wide** rather than over a `scripts/` subdirectory, because every file here is a script — the root config scopes those two to `scripts/**` for the opposite reason, that the package around it is a typings surface.

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

### A new Obsidian version needs one local command, and it is the only step in the release path that does

A new release branch mints a package name npm has never seen, and a publisher can only be attached to a package that already exists — npm has no pre-registration ([npm/cli#8544](https://github.com/npm/cli/issues/8544)). CI has no credential capable of creating it, so `create-new-release-branch` stops instead of dispatching a release that could not succeed, and tells you to run:

```bash
npm run bootstrap-new-package -- <obsidianVersion> <public|catalyst>
```

That publishes a `0.0.0` placeholder under a `bootstrap` dist-tag — claiming the name, and needing your interactive 2FA to do it — and then **attaches the publisher itself**, with `npm trust github`. Both steps run in the one terminal, and each asks for its own one-time password: npm's `otplease` challenges per operation and caches nothing between processes, so the second code is not avoidable. Every subsequent release of that package is fully automated.

This used to stop after the first step and print the npmjs.com fields for you to enter by hand, and that form was the half that got skipped — the two fail independently and only the first announces itself, since claiming the name errors in front of you while a web form nothing checks afterwards does not. `npm trust github` writes the same `/-/package/<name>/trust` record the form writes, so the script can do it while it still holds your terminal. The printed fields remain as the fallback for when that call fails.

**Then `bootstrap-new-package` dispatches the release, and only asks first when it could not confirm the publisher.** That release used to be a third step, printed as `npm run release` at the end of the instructions and owned by nobody: nothing ran it, and nothing noticed it had not been run. `origin/release/obsidian-catalyst/1.14.0` and `1.14.1` both sat created-but-unreleased from 2026-09-14 for exactly that reason. Where the question is still put, it does not have to be answered *correctly*: since `publish-release.ts` gained its preflight, a dispatch into a package with no publisher attached is refused at the top of the job, before anything is installed, built, bumped, committed or tagged. A wrong "yes" costs one red run carrying the `/access` link; a release nobody dispatches costs a branch that is never published at all. Declining the prompt is a normal answer and prints the two commands that do it by hand — `git checkout "<branch>"` then `npm run release`, in that order, because **`npm run release` is defined only on a release branch** and dies with `Missing script: "release"` on `main`. `create-new-release-branch` now leaves the checkout on the new branch for the same reason; it used to leave you on `main`, where the last instruction it printed could not run at all. The whole of this lives in `workflow-scripts/helpers/handBack.ts`, and it never prompts without a terminal.

Skipping the second step is invisible until CI publishes, and then it surfaces as a bare `E404` — the same misreading the local half produces, arriving from the other side. `npm publish` requests an OIDC credential, the registry refuses it because no publisher is attached, and npm treats that refusal as "this registry does not offer OIDC": it logs at `verbose` and publishes anyway, with no credential at all. The registry then answers the unauthorized `PUT` with **404**, so the run dies reporting that a package which plainly exists `could not be found or you do not have permission`. It happened twice on 2026-09-14, on `obsidian-catalyst/1.14.0` and `1.14.1`, and it was not a cheap failure at the time: the version bump was committed, pushed and tagged *before* the first publish, so each attempt burned a minor version and left a tag pointing at a release that never happened.

Three guards now stand in front of that. `publish-release.ts` asks npm the same question `npm publish` asks and discards — the OIDC token exchange — for **every** package the run will publish, before it installs, builds, or bumps anything; a definite refusal aborts the run having changed nothing, while an inconclusive answer is reported and allowed through. When a publish fails anyway, the error names the likely cause and the `/access` page to fix it instead of passing npm's message through.

And the version bump no longer reaches the remote before the publish it pays for. `npm publish` ships whatever `package.json` holds, so the bump cannot move *after* the publish — but the half that is hard to undo can, and has: `updateNpmVersions()` commits and tags locally, and `pushRelease()` does the single `git push origin --follow-tags` once the per-version package is actually on npm. A refused publish now leaves nothing but refs the runner discards. The mirror failure that creates is narrower by everything that used to sit between the bump and the publish — an install, a full build, and the publish itself — and it is the one direction that must never pass quietly: a publish that succeeded with a push that did not means npm holds a version no branch records, and a plain re-dispatch then recomputes that same version and is answered `E403`. So `pushRelease()` throws naming the published version and the four commands that rebuild the commit and the tag from a fresh checkout.

**"The package exists" is not the predicate for "the bootstrap is done"**, and both scripts used to treat it as one. `getPackageRegistryState` asks the narrower question — has anything ever published through this name? — over an unauthenticated `fetch`. A package carrying a real release has already published from this workflow, so its publisher is attached; one carrying only the placeholder has not, and from there its publisher state is unknown.

**That heuristic was justified here, until 2026-09-15, by a claim that was false**: that there is no way to read a package's trusted publisher, `npm access` having no subcommand for it and the registry no endpoint. `npm access` really does not have one, and the conclusion was then generalized without looking for a separate top-level command. `npm trust` is one — `npm trust list <package> --json` GETs `/-/package/<name>/trust` — and `readTrustedPublisherState` calls it on the `placeholderOnly` arm of both scripts, dispatching the release outright when npm confirms a publisher.

The heuristic survives anyway, for a narrower reason that the correction does not touch, and two measurements pin it down (npm 12.0.2, 2026-09-15). **That read is 2FA-gated per call, not merely authenticated**: with `npm whoami` answering seconds earlier, `npm trust list` on an owned package came back `EOTP ... This operation requires a one-time password`. And **the challenge cannot be answered by a script that reads the output** — npm's `otplease` opens with `if (!process.stdin.isTTY || !process.stdout.isTTY) { throw err }`, and capturing stdout is exactly what makes stdout not a TTY. So a caller gets the answer or gets a terminal, never both; it fails fast rather than hanging, which is what makes the call safe to attempt unconditionally before falling back. Two more shapes matter to whoever touches the parsing: under `--json` an empty result prints **nothing at all** (the "No trust configurations found" line goes through `dialogue`, which `--json` suppresses), and multiple configurations print as concatenated objects rather than an array — so the output is deliberately not `JSON.parse`d, and the predicate is non-empty stdout on a zero exit.

CI keeps its own predicate for a third reason again: it holds no npm credential at all, so `npm trust list` is not available to it in any form, and `hasTrustedPublisher`'s OIDC exchange is the only question it can ask.

The placeholder is published under a `bootstrap` dist-tag, but on a brand-new package it takes `latest` as well — there is no other version for `latest` to point at — so installing the name before its first real release resolves to the stub. That window is normally minutes wide, and only stays open when the hand-back above stalls.

**So the placeholder is published deprecated**, which is what keeps that window from being silent: the install still succeeds, and npm prints what the package is and that it holds no types. The field is written into the placeholder's manifest, so it costs no second command and no second 2FA prompt, and nothing has to clear it afterwards — the first real release is simply not deprecated and takes `latest` when it lands. Moving `latest` off the placeholder with `npm dist-tag rm` was the obvious alternative and is deliberately not done: it needs a second authenticated write inside the one interactive script, and what it buys is a name that answers `No matching version found`, which does not say why.

Claiming the name is also the **only** step in the whole release path that needs a local npm credential — every other publish goes out from CI through trusted publishing, with no token anywhere — so it is the one place a stale `npm login` can surface, and the one place nobody expects it. It surfaces badly: npm answers an *unauthorized* `PUT` to a package that does not exist yet with **404**, not 401, because it will not confirm the existence of something you may not read. A dead credential therefore reads as `E404 ... could not be found or you do not have permission` against the very name you are claiming, as if the registry had refused the scope. Both scripts now ask `npm whoami` first and say `npm login` in those words instead — `bootstrap-new-package` before it builds or publishes anything (but *after* its already-claimed short-circuit, which needs no credential, so re-running stays safe), and `create-new-release-branch` on the path where it hands the step over. The 2FA prompt never appearing is the original tell, if you ever meet the raw error again.

### `main`'s README rows follow the registry, not the branch

`main`'s two "Latest `<channel>` release" rows name a git branch **and** the npm package that branch publishes, and those two do not come into existence together. `create-new-release-branch` cuts and pushes the branch, then stops and hands the package-claiming steps above back to a human — so between those two moments the branch is real and the package is not. The row used to be written optimistically at branch-cut time, which advertised a name npm had never seen: `npm run lint:md` went red on `main` from the moment a branch was cut until somebody finished a manual step with no deadline, and it stayed red for everyone, because the row is committed and pushed.

So `generateMainReadmeLine()` asks the registry before it links anything. The predicate is `getPackageRegistryState() === 'released'` — the same one `create-new-release-branch` uses to decide whether to dispatch a release, deliberately, so "released" means one thing across the repository. Mere existence is not enough: a name carrying only the bootstrap placeholder answers 200 on npmjs.com, so a link check is happy with it, and what it holds is a `0.0.0` stub with no types in it. Linking that is the same lie as linking a 404, just one the gate cannot catch.

A row whose package is not released keeps its branch link and the `-latest` wrapper badge — the wrapper is a stable name that has been published for as long as the channel has, so it is linked unconditionally — and says `not published to npm yet` where the per-version badge goes. A registry that cannot be reached is a third answer: that channel's row is left exactly as it stands and a warning is printed, because whatever it says today was true when it was written, whereas both guesses get committed and pushed.

That alone would mean the badge never comes back — the next `generateMainReadme()` call is the next branch cut, which writes a badge-less row for the *next* version — so `check-obsidian-package-update.ts` now calls it once at the top of every run, before the loop checks out a release branch and stays there. It is idempotent by construction: `generateMainReadme()` returns before committing when the README it would write is the one already there, so the usual 3-hourly run makes two registry requests and stops. The badge therefore reappears within three hours of the release actually landing, with no extra manual step.

### Which branch a new release branch is cut from

`create-new-release-branch` derives the base branch rather than taking it as an argument, from one ordering that is easy to get backwards: **for one and the same Obsidian version the `public` branch is cut AFTER the `catalyst` one**, so on a version tie `public` is the *later* of the two and is the base. The script's channel comparison is `<= 0` for exactly that reason, and the equal-version guard below it encodes the same ordering from the other side — it refuses a new `catalyst` at the latest version and lets a new `public` through. Change either one and they contradict each other; a `< 0` there silently based `1.14.0` on the older of the two `1.13.7` branches.

The base **content** comes from `origin/<baseBranch>`, not from the local ref, because the base branch *name* is chosen by reading the remote refs. The local `release/...` branch is never checked out or moved, so local unpushed commits are neither shipped nor destroyed. `npm run checkout` is the opposite case by design: it checks out your local ref, which is what you want when you have local work in the tree.

### The two workflow-dispatched scripts are CI-only, and now say so

It is the other script that picks a branch name off the remote refs, and the only one that has to **be on** that branch and commit to it — so it cannot use the trick above of never touching the local ref. It instead resets the local branch onto its remote tip, `git checkout -B "<branch>" --track "origin/<branch>"`, which is the same shape `publish-release.ts` uses to leave CI's detached checkout. `--track` is insurance, not a requirement: the release path ends in `git pull origin --rebase`, which needs `branch.<name>.merge` set, and git's default `branch.autoSetupMerge=true` already sets it when the start point is a remote-tracking ref. It only matters under `branch.autoSetupMerge=false`, where the pull otherwise dies with `you must specify a branch on the command line`.

That reset is right on a runner and hostile in a developer checkout, where it would discard local unpushed commits, so the script now **refuses to run unless `GITHUB_ACTIONS` is set**. Its only caller is [`check-obsidian-package-update.yml`](.github/workflows/check-obsidian-package-update.yml); there is deliberately no npm script for it, and by hand it would switch your checkout onto a release branch, commit as `github-actions[bot]`, push, and dispatch a release. The guard is a typo detector, not a boundary — the variable is one `export` away — which is the right strength for a hand-run mistake.

Before this it was correct **by accident**: a fresh CI clone has no local `release/...` branch, so git's DWIM (do-what-I-mean) shortcut created one at the remote tip and local happened to equal remote. Nothing said so, and a developer checkout breaks the assumption — a local `release/...` branch sitting several commits ahead of `origin` is an ordinary state to be in after a round of tooling fixes, and both 1.13.7 branches were in exactly it.

`publish-release.ts` is the other workflow-dispatched script, and it carries the same guard for worse consequences: by hand it bumps the branch's version, commits and tags it, publishes every package of the release to npm, and pushes. It too was stopped only **by accident**, and by a check written for something else — `main()` resolves which release branch CI dispatched against by asking which remote refs point at `HEAD`, and on a developer branch none do, so it threw. That is not a statement about where the script may run, and it does not hold where it matters: on a release branch whose tip equals `origin`'s — the ordinary state right after `npm run checkout` — exactly one ref points at `HEAD`, the check passes, and the whole publish runs. So the guard is now the first statement of `main()`, above the branch resolution.

The guard itself lives in [`workflow-scripts/helpers/githubActions.ts`](workflow-scripts/helpers/githubActions.ts) now that two scripts want it, and it takes the sentence naming what a hand-run would have done — the point of the message is not that the run was blocked but why being blocked was a favour. It derives the workflow file from the script name, which both callers satisfy (`check-obsidian-package-update.yml`, `publish-release.yml`). Neither script has an npm script, deliberately; that is the first half of saying they are CI-only, and the guard is the half that holds when somebody runs the file directly anyway.

Freeing that branch-count check from its second job also let it say what it means. It had been reporting "no remote branch points at `HEAD`" as `Expected 1 branch, got 1:` with nothing after the colon, because `getBranchNames` split an empty output into `['']` — one entry, blank. It now drops blank entries, so no branches is an empty array, and the two unactionable answers read differently: none means the commit is on no published branch, several means nothing in the script can choose between them.

`release.ts` / `release-impl.ts` are untouched and must stay that way. `npm run release` is a real developer command — it is the last step of the new-branch hand-back — and it does not run this script: it dispatches `publish-release.yml` with `gh workflow run`, so the job that actually publishes still starts on a runner, with `GITHUB_ACTIONS` set.

## Reported Gaps

Members that exist at runtime but are not modeled yet. Each names the member, the Obsidian version it was
observed in, and the target branch(es).

None currently — the last ones, the suggestion-chooser members, are modeled on both latest
release branches.

## Documentation

This is a **multi-branch** repo (`main` + long-lived `release/obsidian-public/*` and `release/obsidian-catalyst/*` branches). This `AGENTS.md` lives **only on `main`** — it is intentionally absent from the release branches to avoid divergence. Edit it here.
