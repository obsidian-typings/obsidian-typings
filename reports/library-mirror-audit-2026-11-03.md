# Standalone library mirror audit

Audit date: 2026-11-03. The default declaration entry points must remain usable without installing the libraries whose APIs Obsidian exposes. This audit makes no dependency or declaration changes.

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
3. **Use a separate, explicitly imported integration surface when full upstream identity is needed.** This is a direction for implementation and consumer testing, not an adapter delivered by this audit. Its imports must be unreachable from the default declaration bundles. Merely augmenting an upstream module cannot redirect a field whose type still names the local class.
4. **Keep vendor additions local.** Obsidian IPC channel overloads, graph records and PDF testing helpers are not replaceable wholesale by a public package export. An opt-in integration needs to retain them alongside the public surface. Selected public facades, including MathJax's startup-generated methods, can also remain useful standalone contracts.

## Electron: 277 declaration files

Public boundaries include `FrameDom.eWin`, `ElectronWindow`, `ElectronRemote.BrowserWindow`, and the global Electron module and remote handles. The copied records and classes model a broad public API, while `ElectronIpcRenderer` adds Obsidian's channel-specific overloads. `ElectronWindow` adds application-specific state.

The copied classes have no TypeScript private/protected declarations. Their names alone therefore do not create a Lezer-style nominal conflict. The published comparison instead exposes missing methods, removed methods and reachable signature differences:

1. `ElectronBrowserWindow` cannot be assigned to Electron 37.3.1 `BrowserWindow`: the compiler reports `off`, `getAccentColor`, `getWindowButtonPosition`, `invalidateShadow`, and further missing members.
2. The reverse assignment fails because the local copy requires `getTrafficLightPosition` and `setTrafficLightPosition`, which that upstream version does not expose.
3. `ElectronNativeImage` is assignable to that upstream `NativeImage`, but the reverse fails: upstream `getBitmap` returns `void`, while the copy returns `Buffer`.
4. `ElectronRectangle` passes in both directions. A copied structural record is not inherently incompatible.

These are reference-version findings. Establish the supported launcher versions before deleting or replacing members. Preserve IPC channel contracts and the local window extension. A direct import of `electron` would add a module-resolution requirement even with runtime installation scripts disabled; it is unsuitable for the default standalone surface.

## Pixi: 37 declaration files

Public boundaries include `loadPixi()`, `Window.PIXI`, `PixiModule`, and graph renderer, node, link and power-tag members. The copied `Texture` is especially narrow: it declares static `EMPTY` and `WHITE` but no instance members.

Against `pixi.js-legacy@7.2.4`:

1. Local `Texture`, `DisplayObject`, `Container` and `Matrix` all fail assignment to their upstream counterparts because of missing members.
2. Upstream `Texture` and `Matrix` pass assignment to their smaller local shapes.
3. Upstream `DisplayObject` and `Container` also fail assignment to the local shapes. The recursive `parent.addChild` contract reaches incompatible display-object types; a second path reaches `transform.pivot.copyTo`, whose upstream target must implement `IPoint`, while the local target needs only `IPointData`.
4. Upstream `DisplayObject` declares private `tempDisplayObjectParent` and `_maskRefCount`, plus protected members including `_boundsID` and `_destroyed`. Upstream `Texture` declares protected `_rotate`. Even a complete structural copy would not share their identity.

A full upstream-compatible graph surface therefore needs an opt-in integration or a deliberately limited structural boundary. Copying every public field is insufficient. Keep the default shapes until that integration has both standalone and installed-library consumer tests.

## PDF.js: 39 declaration files

`loadPdfJs()`, `Window.pdfjsLib`, `PdfJsModule.getDocument()` and its loading task, document and page results expose the library surface. `PdfJsTestingUtils`, `HighlightOutline` and `HighlightOutliner` include testing/editor implementation details; they must be checked against the vendor sources rather than assumed to be root public exports.

Published 5.3.31 declares `#private` directly on `PDFWorker`, `PDFPageProxy` and `RenderTask`. `PDFDocumentProxy` has no direct private identifier, but its public signatures reach the page and task classes. Standalone replicas cannot acquire upstream private identity by adding copied fields. Public document/worker interoperability needs the same explicit integration decision as Pixi, with the additional vendor-version caveat above.

All four local-to-upstream assignments fail. The reverse worker assignment passes; the other reverse assignments fail on `fingerprints` (array versus a required pair), vendor page `height`/`width` fields, and the `onContinue` callback. These differences must be checked against the vendor build before changing local contracts.

There is also a concrete runtime mismatch independent of upstream assignability: the local `PDFWorker` declares static `fromPort()` and `getWorkerSrc()`. The archived 1.15.0 vendor class instead defines `create()` and a `workerSrc` getter; neither legacy method occurs in that module. Reconcile those signatures from the actual vendor implementation before changing declarations, then carry the correction to the maintained streams and add consumer coverage.

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

No public boundary is corrected here, so this report adds no claim of new compatibility and no test that blesses the existing incompatibility. Implementation follow-ups must demonstrate standalone consumption and actual upstream assignments independently, with full declaration checking enabled.
