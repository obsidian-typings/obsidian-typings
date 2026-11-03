# Standalone library mirror audit

Audit date: 2026-11-03. The default declaration entry points must remain usable without installing the libraries whose APIs Obsidian exposes. The initial audit made no dependency or declaration changes. Verified follow-up corrections and integrations are recorded below.

## Scope and evidence

The declaration baseline is public 1.15.0 at `cc62005a78bd1ebf1bab0ee7b1f23265a13dc1de` and catalyst 1.15.0 at `2128b6f83b00f9b654602686b833f5aeb6b88c55`. Their Electron, Pixi, PDF.js and MathJax source trees are identical. Those four trees also have no changes from public 1.14.4 at `9bd1c773d7312bc3a7cc28606548e8439d23be99`.

Runtime evidence comes from the formatted sources in the `obsidian-versions` source archive, tags `1.14.4` (`c9ee8b9720f94a6423c98e65c84914dcbfc54a2e`) and `1.15.0` (`5f68e29bf20c676b1b6160da4c1e3d509935e997`). Both tags identify:

1. `obsidian.asar/lib/pixi.min.js`: `pixi.js-legacy` 7.2.4.
2. `obsidian.asar/lib/pdfjs/pdf.min.mjs`: PDF.js 5.3.34, build `cc1e2a3e0`.
3. `obsidian.asar/lib/mathjax/obsidian-mathjax.js`: MathJax 4.1.3.

Electron's version belongs to the installed desktop launcher. An application archive version does not establish its Electron version. Electron 37.3.1 is used below as a published comparison reference, not as a claimed launcher requirement.

The registry has no `pdfjs-dist@5.3.34`. Published `5.3.31` is the nearby comparison reference. Its declarations cannot establish the exact signatures of Obsidian's vendor build. Version 5.3.93 also exists; neither should silently replace the vendor version.

## Disposition

1. **Keep the standalone copies.** No unconditional upstream type imports are justified by this audit. An optional peer still cannot satisfy an import when the package is absent.
2. **Separate structural gaps from nominal identity.** Missing public methods can be copied after runtime verification. Upstream private and protected members require their original declaration identity. Copying their names cannot supply it. See [TypeScript's compatibility rules](https://www.typescriptlang.org/docs/handbook/type-compatibility.html).
3. **Use a separate, explicitly imported integration surface when full upstream identity is needed.** The Pixi follow-up below delivers such a surface. Its imports must be unreachable from the default declaration bundles. Merely augmenting an upstream module cannot redirect a field whose type still names the local class.
4. **Keep vendor additions local.** Obsidian IPC channel overloads, graph records and PDF testing helpers are not replaceable wholesale by a public package export. An opt-in integration needs to retain them alongside the public surface. Selected public facades, including MathJax's startup-generated methods, can also remain useful standalone contracts.

## Electron: 277 declaration files

Public boundaries include `FrameDom.eWin`, `ElectronWindow`, `ElectronRemote.BrowserWindow`, and the global Electron module and remote handles. The copied records and classes model a broad public API, while `ElectronIpcRenderer` adds Obsidian's channel-specific overloads. `ElectronWindow` adds application-specific state.

The copied classes have no TypeScript private/protected declarations. Their names alone therefore do not create a Lezer-style nominal conflict. The published comparison instead exposes missing methods, removed methods and reachable signature differences:

1. `ElectronBrowserWindow` cannot be assigned to Electron 37.3.1 `BrowserWindow`: the compiler reports `off`, `getAccentColor`, `getWindowButtonPosition`, `invalidateShadow`, and further missing members.
2. The reverse assignment fails because the local copy requires `getTrafficLightPosition` and `setTrafficLightPosition`, which that upstream version does not expose.
3. `ElectronNativeImage` is assignable to that upstream `NativeImage`, but the reverse fails: upstream `getBitmap` returns `void`, while the copy returns `Buffer`.
4. `ElectronRectangle` passes in both directions. A copied structural record is not inherently incompatible.

These initial findings used a comparison reference, not a launcher requirement. The launcher matrix below records the follow-up evidence. A direct import of `electron` would add a module-resolution requirement even with runtime installation scripts disabled; it is unsuitable for the default standalone surface.

### Launcher matrix and interoperability follow-up

Checked 2026-11-03: the [desktop update manifest](https://github.com/obsidianmd/obsidian-releases/blob/master/desktop-releases.json) sets `minimumVersion: "1.1.9"` for both public and catalyst 1.15.0. The archived launcher's updater compares that value with `app.getVersion()`, independently of the application archive version. The [1.1.9 release notes](https://obsidian.md/changelog/2022-12-23-desktop-v1.1.9/) identify Electron 21. The [1.14.5 installer release](https://obsidian.md/changelog/2026-10-22-desktop-v1.14.5/) upgrades Electron from 43.7.5 to 43.8.3. The old documentation's Electron 18 floor is therefore stale. This floor describes updater acceptance, not security support for old Electron versions.

The following declaration probes use TypeScript 6.0.3 with full declaration checking. Patch versions 21.3.1, 28.3.3 and 34.3.3 are published comparison points in historical launcher generations, not assertions that every corresponding Obsidian installer shipped those exact patches. Electron 43.8.3 is an explicitly documented installer pin. The matrix samples changes across the accepted range; it does not certify every intermediate release or distribution repackaging.

| Electron declarations | Node declarations | BrowserWindow, local to upstream | BrowserWindow, upstream to local | NativeImage | Rectangle |
| --- | --- | --- | --- | --- | --- |
| 21.3.1 | 20.17.30 | Missing event-emitter and window members | Reaches required local `webContents.noContextMenu` | Both directions pass | Both directions pass |
| 28.3.3 | 20.17.30 | Missing event-emitter and newer window members | Missing old traffic-light methods | Both directions pass | Both directions pass |
| 34.3.3 | 20.17.30 | Missing event-emitter and newer window members | Missing old traffic-light methods | Both directions pass | Both directions pass |
| 43.8.3 | 24.9.0 | Missing event-emitter and newer window members | Missing old traffic-light methods | Upstream to local fails on `getBitmap(): void` | Both directions pass |

All four comparisons have zero upstream declaration diagnostics with those pins. Node 18.19.0 failed against the modern compiler's generic typed arrays; Node 20.17.30 resolves that baseline for the older Electron packages. Electron 43.8.3's own dependency range starts at Node declarations 24.9.0. The pins keep Electron's global `Process.noDeprecation` declaration compatible, rather than suppressing its conflict with newer Node declarations. These are compiler compatibility pins, not runtime Node version claims.

One default mirror cannot have the exact signatures of all these launcher generations. The explicit `/electron` integration selects the consumer's installed Electron contracts at `FrameDom`, the global module handles and `ElectronWindow`. Standalone declarations keep their local copies and import no Electron package. The integration preserves Obsidian IPC channel overloads and the local window extension; it does not replace Obsidian's renderer module with the entire main-process namespace. Consumers must choose Electron declarations matching their actual launcher and still feature-detect newer APIs. The original `ElectronBrowserWindow` and other mirror exports remain standalone contracts, independently of this selection.

The integration has landed on both maintained 1.15.0 streams: [public](https://github.com/obsidian-typings/obsidian-typings/commit/73103194f1a943fa2ccd74120672955b7947957c) and [catalyst](https://github.com/obsidian-typings/obsidian-typings/commit/8ab6de93323250d729c7e1577042a69f837a609a). Both fresh full builds pass all thirteen consumer scenarios, all four default declaration-bundle checks and API Extractor. The [Electron CommonJS](https://github.com/obsidian-typings/obsidian-typings/blob/main/tests/bundle-compat/scenario-12-electron-cjs/index.ts) and [Electron ESM](https://github.com/obsidian-typings/obsidian-typings/blob/main/tests/bundle-compat/scenario-13-electron-esm/index.ts) scenarios retain every diagnostic, including upstream files, and report zero. They check ordinary window assignments in both directions, constructors, images, rectangles, vendor extensions and non-`any` typed IPC results. Additional emitted-declaration probes against all four matrix versions in both module formats report zero diagnostics in all eight programs.

All 277 original Electron mirror files are unchanged. The standalone consumer installs no Electron package, and all four default bundles import none. The optional CJS and ESM entries are byte-identical and included in package dry runs; both wrapper layers forward them. Both branches also pass all eighteen script tests with one worker. No dependency or peer requirement was added, and the changes are ready for the next release.

## Pixi: 37 declaration files

Public boundaries include `loadPixi()`, `Window.PIXI`, `PixiModule`, and graph renderer, node, link and power-tag members. The copied `Texture` is especially narrow: it declares static `EMPTY` and `WHITE` but no instance members.

Against `pixi.js-legacy@7.2.4`:

1. Local `Texture`, `DisplayObject`, `Container` and `Matrix` all fail assignment to their upstream counterparts because of missing members.
2. Upstream `Texture` and `Matrix` pass assignment to their smaller local shapes.
3. Upstream `DisplayObject` and `Container` also fail assignment to the local shapes. The recursive `parent.addChild` contract reaches incompatible display-object types; a second path reaches `transform.pivot.copyTo`, whose upstream target must implement `IPoint`, while the local target needs only `IPointData`.
4. Upstream `DisplayObject` declares private `tempDisplayObjectParent` and `_maskRefCount`, plus protected members including `_boundsID` and `_destroyed`. Upstream `Texture` declares protected `_rotate`. Even a complete structural copy would not share their identity.

A full upstream-compatible graph surface therefore needs an opt-in integration or a deliberately limited structural boundary. Copying every public field is insufficient. The default mirrors remain unchanged by the integration below.

### Opt-in interoperability follow-up

The type-only `/pixi` entry point has landed on both maintained 1.15.0 streams: [public](https://github.com/obsidian-typings/obsidian-typings/commit/037f7301d97f897a251c0b12301f71b71b65f649) and [catalyst](https://github.com/obsidian-typings/obsidian-typings/commit/ee8dcd87ffe6f144cc9b4fa656a36c955f317ccb). Loading it with `import type {} from 'obsidian-typings/pixi';` selects the installed `pixi.js-legacy@7.2.4` declarations for `loadPixi()`, `Window.PIXI`, global `PIXI`, and the Pixi boundaries of `GraphRenderer`, `GraphNode`, `GraphLink` and `PowerTag`. All graph records and their vendor members remain available. All 37 original Pixi mirror files are unchanged byte for byte; the default bundles import no Pixi package, and the package adds no Pixi dependency or peer requirement. Both wrapper layers forward the opt-in subpath.

Both fresh full builds pass all eleven consumer scenarios. The [CommonJS](https://github.com/obsidian-typings/obsidian-typings/blob/main/tests/bundle-compat/scenario-10-pixi-cjs/index.ts) and [ESM](https://github.com/obsidian-typings/obsidian-typings/blob/main/tests/bundle-compat/scenario-11-pixi-esm/index.ts) scenarios pin the real published library and check ordinary assignments in both directions, including constructors, textures, transforms, graph fields and graph methods. The standalone scenario installs no Pixi package and reports zero diagnostics. All four default declaration bundles also validate with zero diagnostics.

The two opt-in scenarios each report twelve upstream Pixi, DOM and module-resolution diagnostics separately under `TypeScript 6.0.3`. Declaration checking remains enabled with `skipLibCheck: false`; no casts or `any` bridges supply compatibility. The boundary gates pass, while the upstream declaration baseline retains those errors. Additional compiler probes covered CommonJS, ESM with bundler resolution, and Node16 ESM loading the default bundle through `types`: each checked sixteen initializers that were not `any`, and removing the opt-in import produced 23 boundary diagnostics with the same twelve upstream diagnostics. These probes supplement the persisted consumer scenarios.

The implementations entry point needs the empty ambient registry too. Its bundler normally omits global declarations, so its postprocessor copies that one registry from the source file. Inlining every global instead was rejected by the consumers that load both entry points: it duplicates the existing global event index signature. The optional integration source stays outside index generation, and both packaged Pixi entry points are byte-identical copies of it.

## PDF.js: 39 declaration files

`loadPdfJs()`, `Window.pdfjsLib`, `PdfJsModule.getDocument()` and its loading task, document and page results expose the library surface. `PdfJsTestingUtils`, `HighlightOutline` and `HighlightOutliner` include testing/editor implementation details; they must be checked against the vendor sources rather than assumed to be root public exports.

Published 5.3.31 declares `#private` directly on `PDFWorker`, `PDFPageProxy` and `RenderTask`. `PDFDocumentProxy` has no direct private identifier, but its public signatures reach the page and task classes. Standalone replicas cannot acquire upstream private identity by adding copied fields. Public document/worker interoperability needs the same explicit integration decision as Pixi, with the additional vendor-version caveat above.

All four local-to-upstream assignments fail. The reverse worker assignment passes; the other reverse assignments fail on `fingerprints` (array versus a required pair), vendor page `height`/`width` fields, and the `onContinue` callback. These differences must be checked against the vendor build before changing local contracts.

At the audit baseline, the local `PDFWorker` declared static `fromPort()` and `getWorkerSrc()`, but lacked `create()` and the `workerSrc` getter. The archived 1.14.4 and 1.15.0 vendor modules are byte-identical. Their complete initialization retains `fromPort()` as a deprecated alias: after `za = PDFWorker`, an initializer assigns `za.fromPort` and delegates to `za.create`. The initial class-only audit missed that assignment. `getWorkerSrc()` is absent. `create()` reuses a worker already registered for the supplied port and otherwise constructs one; omitted parameters are accepted.

The static API correction has landed on both maintained 1.15.0 streams: [public](https://github.com/obsidian-typings/obsidian-typings/commit/5f48b6d56fed217732254af97530097c23270d24) and [catalyst](https://github.com/obsidian-typings/obsidian-typings/commit/a9ab732b870b44dcfd57d360619e3f4d5cf1017e). Both retain and deprecate `fromPort()`, add `create(params?: PDFWorkerParams)` and the read-only `workerSrc` getter, and remove `getWorkerSrc()`. The [standalone consumer](https://github.com/obsidian-typings/obsidian-typings/blob/main/tests/bundle-compat/scenario-1-standalone/pdf-worker.ts) and [ESM consumer](https://github.com/obsidian-typings/obsidian-typings/blob/main/tests/bundle-compat/scenario-5-esm-bundler/pdf-worker.ts) cover the corrected surface, including absence of the obsolete method. Both full builds passed all nine consumer scenarios. No dependency contract changed; older release branches remain frozen.

## MathJax: two declaration files

`MathJaxEx` and `ExtendedMetrics` describe the global rendering facade, not the complete MathJax package or its internal class graph. The facade's `config`, `loader` and `options` are intentionally opaque. `chtmlStylesheet()` is an upstream startup-generated method: `components/startup.ts` installs the output name plus `Stylesheet` and calls the output's `styleSheet()` method. Its use in Obsidian does not make it vendor-specific. The runtime source contains both a main 4.1.3 version and separately versioned font/extension components; those component versions must not be used as the facade version.

Retain this local facade and its metric record. Replacing it with the entire upstream namespace would change what is promised and still require a declaration package. No nominal identity conflict was established for this structural facade. This is not a claim that every option or callback has been exhaustively compared with upstream.

The installed `@mathjax/src@4.1.3` declarations confirm that distinction: `components/global.d.ts` exports a `MathJaxObject` with `version`, `_` and `config`; `components/startup.d.ts` extends it with the startup class graph. Neither is the same contract as Obsidian's selected rendering facade. Those upstream configuration records also use broad index signatures, so substituting them would not by itself improve the opaque local configuration fields.

## Remaining source inventory

The baseline also contains these copied library families outside the excluded CodeMirror/Lezer surface:

1. `@capacitor__core`: 13 declaration files; platform/plugin bridge records and callbacks.
2. `dompurify`: 10; callable facade, configuration and hook records.
3. `i18next`: 32; translation facade, options and callback records.
4. `mermaid`: 12; rendering facade, diagram/configuration and loader records.
5. `prismjs`: 27; tokenizer/grammar, hooks and token records.
6. `scrypt-js`: three; function and module facade.
7. `style-mod`: five; style-module facade and records.
8. `turndown`: 11; service, rules and options.
9. `web-sql`: five; browser database interfaces and callbacks.

Retain these standalone surfaces. Their presence is not evidence of a type-identity defect. This inventory is a source triage, not a certified full assignment matrix for every package version. The concrete high-risk public class boundaries investigated above take priority over a wholesale replacement of all third-party declarations. Future corrections should target a demonstrated consumer failure and verify the vendor version first.

## Compiler method and limits

The probes use TypeScript 6.0.3, `strict: true`, `skipLibCheck: false`, `types: []`, ESNext libraries and NodeNext resolution. They import the unchanged local declaration files and the real installed library declarations. Each pair is checked with ordinary assignments in both directions; neither casts nor `any` bridges are used. For example:

```ts
import type { Container as UpstreamContainer } from 'pixi.js-legacy';
import type { Container as LocalContainer } from './src/pixi.js/internals/Container.d.ts';

declare const local: LocalContainer;
declare const upstream: UpstreamContainer;
const upstreamResult: UpstreamContainer = local;
const localResult: LocalContainer = upstream;
```

The expected failing diagnostics establish drift; they are not a green interoperability gate. The mixed-library probe also reports upstream baseline problems: Pixi's old DOM declarations conflict with the modern DOM library, NodeNext cannot resolve `colord/types`, and Electron's required `process.noDeprecation` conflicts with Node's optional declaration. These errors are retained rather than hidden with `skipLibCheck`. A production consumer scenario needs compatible dependency/compiler pins before it can serve as a clean regression gate.

A separate directory containing the copied source and no installed third-party library packages successfully checks imports of `ElectronBrowserWindow`, Pixi `Container`, `PDFWorker` and `MathJaxEx`: zero diagnostics and zero loaded Electron/Pixi/PDF.js/MathJax package files. It explicitly references the existing Node types, as the emitted bundles do, while retaining `types: []` and `skipLibCheck: false`. A raw source probe without that reference reports missing `Buffer`/`NodeJS`; that is why the published bundle's reference must be preserved. This focused check establishes standalone resolution for those four boundaries, not a replacement for the full emitted-bundle gate.

The initial audit corrected no public boundary. The worker static API follow-up above adds consumer coverage for the verified runtime contract; it does not change the nominal identity findings. A separate strict check accepted real PDF.js 5.3.31 factory parameters and upstream worker instances through the local worker surface with zero diagnostics, without casts or skipped declaration checks. That is not a claim of local-to-upstream worker identity compatibility. Further interoperability work must demonstrate standalone consumption and actual upstream assignments independently, with full declaration checking enabled.
