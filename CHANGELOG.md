# CHANGELOG

## 1.1.0

**Models:** Obsidian `1.15.1` (`catalyst` channel). Internal members can differ in other app versions, so guard the ones you use when your `minAppVersion` is older.

**Branch:** [`release/obsidian-catalyst/1.15.1`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.15.1)

**Commits:** [`obsidian-public-1.15.0-v1.1.0...obsidian-catalyst-1.15.1-v1.1.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.15.0-v1.1.0...obsidian-catalyst-1.15.1-v1.1.0) -- the first release from this branch, so the range opens at `obsidian-public-1.15.0-v1.1.0`, the nearest earlier release it was cut from

### Breaking changes

- fix(pdfjs)!: reconcile the vendored PDFWorker static API ([`5f48b6d`](https://github.com/obsidian-typings/obsidian-typings/commit/5f48b6d56fed217732254af97530097c23270d24))

### Other changes

- feat: add opt-in PDF.js type interoperability ([`2014cd9`](https://github.com/obsidian-typings/obsidian-typings/commit/2014cd9b0b60c3b9e2c2d05f45046f8b88c7c904))
- chore: generate README.md from template ([`f80b0b2`](https://github.com/obsidian-typings/obsidian-typings/commit/f80b0b2b808519f16fffa9754cb0aa1a06af82c6))
- feat: add opt-in Electron type interoperability ([`7310319`](https://github.com/obsidian-typings/obsidian-typings/commit/73103194f1a943fa2ccd74120672955b7947957c))
- feat: add opt-in Pixi type interoperability ([`037f730`](https://github.com/obsidian-typings/obsidian-typings/commit/037f7301d97f897a251c0b12301f71b71b65f649))
- docs: explain retention of bookmarks with missing targets ([`cc62005`](https://github.com/obsidian-typings/obsidian-typings/commit/cc62005a78bd1ebf1bab0ee7b1f23265a13dc1de))

### Declared API changes

Names only, compared with `obsidian-public-1.15.0-v1.1.0`.

**Added (27):**

- `ElectronInterop`
- `ElectronModuleMember`
- `InteropApplication`
- `InteropContainer`
- `InteropElectronBrowserWindow`
- `InteropElectronModule`
- `InteropElectronRemote`
- `InteropElectronWebContents`
- `InteropGraphics`
- `InteropICanvas`
- `InteropPDFDocumentLoadingTask`
- `InteropPDFDocumentProxy`
- `InteropPDFPageProxy`
- `InteropPDFWorker`
- `InteropPdfJsModule`
- `InteropPixiModule`
- `InteropPixiText`
- `InteropRenderTask`
- `InteropSprite`
- `InteropTextStyle`
- `ObsidianElectronTypes`
- `ObsidianPdfJsTypes`
- `ObsidianPixiTypes`
- `PDFWorker.create`
- `PDFWorker.workerSrc`
- `PdfJsInterop`
- `PixiInterop`

**Removed (1):**

- `PDFWorker.getWorkerSrc`
