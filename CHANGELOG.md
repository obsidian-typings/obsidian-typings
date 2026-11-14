# CHANGELOG

## 1.2.0

**Models:** Obsidian `1.15.1` (`catalyst` channel). Internal members can differ in other app versions, so guard the ones you use when your `minAppVersion` is older.

**Branch:** [`release/obsidian-catalyst/1.15.1`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-catalyst/1.15.1)

**Commits:** [`obsidian-catalyst-1.15.1-v1.1.0...obsidian-catalyst-1.15.1-v1.2.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-catalyst-1.15.1-v1.1.0...obsidian-catalyst-1.15.1-v1.2.0)

### Breaking changes

- feat(workspace): type the members unset before the layout loads as nullable, with a LayoutReadyWorkspace view ([`fcf5ea3`](https://github.com/obsidian-typings/obsidian-typings/commit/fcf5ea3c34bf5a533241e3d3d26f26311978c36a))
- fix(workspace): correct members whose declared type disagrees with the 1.15.1 runtime ([`dfb5729`](https://github.com/obsidian-typings/obsidian-typings/commit/dfb5729cd12160d72cec2d11fbefec0e1274d1f3))
- fix(embed-registry): let EmbedCreator decline a file and loadFile be async ([`fe0b8a2`](https://github.com/obsidian-typings/obsidian-typings/commit/fe0b8a212052674c80803f65d6e3d2b4863a815a))
- fix!: move the Lezer and CodeMirror language/search boundaries behind an opt-in /lezer subpath ([`06914f0`](https://github.com/obsidian-typings/obsidian-typings/commit/06914f07e87e992d02f59874a18d40f42b7f197c))
- fix(hotkey-manager)!: type save and load as returning Promise<void> ([`8667b0d`](https://github.com/obsidian-typings/obsidian-typings/commit/8667b0df6444b52ae3dc230da0b7495fb3e0e3e8))
- feat(runtime)!: model the Obsidian catalyst 1.15.1 runtime changes ([`f6a9f25`](https://github.com/obsidian-typings/obsidian-typings/commit/f6a9f256d2b00b40480c02ac58282b2971ff0ecb))
- fix(pdfjs)!: match the vendored PDF.js page and render task ([`46d804d`](https://github.com/obsidian-typings/obsidian-typings/commit/46d804d89debb3bdfa822c374e5d8c7fbe6c5e81))
- fix(bases)!: type the Bases file view controller as QueryController ([`c8aa214`](https://github.com/obsidian-typings/obsidian-typings/commit/c8aa21437c85e4061667da2659a759990d264ae4))

### Other changes

- feat(sync): declare the local file records and file-event handlers of SyncPluginInstance ([`9fb7463`](https://github.com/obsidian-typings/obsidian-typings/commit/9fb74634d1b102f8dd5cac99eedfce55e9cf3989))
- feat: type the Workspaces plugin instance state and methods ([`4668cb8`](https://github.com/obsidian-typings/obsidian-typings/commit/4668cb8524207ca8047aaf92972afb654016c293))
- docs(bases): describe the table scroll position as fractions, not pixels ([`c0d275a`](https://github.com/obsidian-typings/obsidian-typings/commit/c0d275af1888a0715a922196a3973e995a7865f1))
- feat: type the Sync and Publish instance members, the Sync history view and the Publish dialog ([`8ea2a3c`](https://github.com/obsidian-typings/obsidian-typings/commit/8ea2a3c43089eedc561c0a70c46f176864415fdf))
- feat(sync): type the remote vault and the selective-sync filter ([`943c5c5`](https://github.com/obsidian-typings/obsidian-typings/commit/943c5c5a67631e73584e56b41584faf364754723))
- fix(lint): raise the shipped-code Node floor to the 1.1.9 launcher's Node 16.16.0 ([`4d186a6`](https://github.com/obsidian-typings/obsidian-typings/commit/4d186a6cf0c8f390346d87cdfa65b071d3b3269d))
- docs: do not promise the key-presence precedence of SettingDefinitionBase.disabled ([`a9fb471`](https://github.com/obsidian-typings/obsidian-typings/commit/a9fb471da002274c379352c87aa3d466a489d9a7))
- feat: type the quick switcher modal and its file-suggest base ([`56eaa0f`](https://github.com/obsidian-typings/obsidian-typings/commit/56eaa0f90e91ae8a5cf3bef0acf09388b853aeff))

### Declared API changes

Names only, compared with `obsidian-catalyst-1.15.1-v1.1.0`.

**Added (359):**

- `CanvasIndex.cancelRun`
- `CapacitorAdapter.readByUrl`
- `Editor.everyLine`
- `Editor.getSelectionHeadingLevel`
- `Editor.isSelectionBlockquote`
- `Editor.isSelectionBulletList`
- `Editor.isSelectionCheckedTask`
- `Editor.isSelectionNumberList`
- `Editor.iterateSelectedLines`
- `EmptyView.updateActions`
- `FileManager.getTrashOption`
- `FileManager.showSystemTrashFailed`
- `FileManager.systemTrashFailure`
- `FileSuggestModal`
- `FileSuggestModal.allowCreateNewFile`
- `FileSuggestModal.constructor__`
- `FileSuggestModal.context`
- `FileSuggestModal.createButtonEl`
- `FileSuggestModal.getSuggestions`
- `FileSuggestModal.renderSuggestion`
- `FileSuggestModal.shouldShowAlias`
- `FileSuggestModal.shouldShowAllTypes`
- `FileSuggestModal.shouldShowImages`
- `FileSuggestModal.shouldShowMarkdown`
- `FileSuggestModal.shouldShowNonAttachments`
- `FileSuggestModal.shouldShowNonFileBookmarks`
- `FileSuggestModal.shouldShowNonImageAttachments`
- `FileSuggestModal.shouldShowUnresolved`
- `FileSuggestModal.supportsCreate`
- `FileSuggestModalAliasSuggestion`
- `FileSuggestModalAliasSuggestion.alias`
- `FileSuggestModalAliasSuggestion.downranked`
- `FileSuggestModalAliasSuggestion.file`
- `FileSuggestModalAliasSuggestion.match`
- `FileSuggestModalAliasSuggestion.type`
- `FileSuggestModalBookmarkSuggestion`
- `FileSuggestModalBookmarkSuggestion.bookmarkPath`
- `FileSuggestModalBookmarkSuggestion.item`
- `FileSuggestModalBookmarkSuggestion.match`
- `FileSuggestModalBookmarkSuggestion.type`
- `FileSuggestModalFileSuggestion`
- `FileSuggestModalFileSuggestion.downranked`
- `FileSuggestModalFileSuggestion.file`
- `FileSuggestModalFileSuggestion.match`
- `FileSuggestModalFileSuggestion.type`
- `FileSuggestModalSuggestion`
- `FileSuggestModalUnresolvedSuggestion`
- `FileSuggestModalUnresolvedSuggestion.linktext`
- `FileSuggestModalUnresolvedSuggestion.match`
- `FileSuggestModalUnresolvedSuggestion.type`
- `FileSystemAdapter.unreadablePaths`
- `GraphRenderer.cancelRender`
- `InfinityScroll.blockSize`
- `InfinityScroll.cancelCompute`
- `InfinityScroll.lastPass`
- `InfinityScroll.minPassInterval`
- `InfinityScroll.setMinPassInterval`
- `Input`
- `Input.chunk`
- `Input.length`
- `Input.lineChunks`
- `Input.read`
- `InteropLezerTree`
- `InteropParseContext`
- `InteropSearchQuery`
- `InteropStringNodeProp`
- `IterMode`
- `LayoutReadyWorkspace`
- `LayoutReadyWorkspace.activeTabGroup`
- `LayoutReadyWorkspace.floatingSplit`
- `LayoutReadyWorkspace.layoutReady`
- `LezerInterop`
- `LezerTree`
- `LezerTree.children`
- `LezerTree.constructor`
- `LezerTree.cursor`
- `LezerTree.cursorAt`
- `LezerTree.empty`
- `LezerTree.length`
- `LezerTree.positions`
- `LezerTree.prop`
- `LezerTree.resolve`
- `LezerTree.resolveInner`
- `LezerTree.topNode`
- `LezerTree.type`
- `LezerTreeBuffer`
- `LezerTreeBuffer.buffer`
- `LezerTreeBuffer.length`
- `LezerTreeBuffer.set`
- `LezerTreeCursor`
- `LezerTreeCursor.firstChild`
- `LezerTreeCursor.from`
- `LezerTreeCursor.lastChild`
- `LezerTreeCursor.name`
- `LezerTreeCursor.next`
- `LezerTreeCursor.nextSibling`
- `LezerTreeCursor.node`
- `LezerTreeCursor.parent`
- `LezerTreeCursor.prev`
- `LezerTreeCursor.prevSibling`
- `LezerTreeCursor.to`
- `LezerTreeCursor.tree`
- `LezerTreeCursor.type`
- `LezerTreeFragment`
- `LezerTreeFragment.from`
- `LezerTreeFragment.offset`
- `LezerTreeFragment.to`
- `LezerTreeFragment.tree`
- `LezerTreeRange`
- `LezerTreeRange.from`
- `LezerTreeRange.to`
- `MountedLezerTree`
- `MountedLezerTree.overlay`
- `MountedLezerTree.parser`
- `MountedLezerTree.tree`
- `NodeProp`
- `NodeProp.add`
- `NodeProp.closedBy`
- `NodeProp.constructor`
- `NodeProp.contextHash`
- `NodeProp.deserialize`
- `NodeProp.group`
- `NodeProp.lookAhead`
- `NodeProp.mounted`
- `NodeProp.openedBy`
- `NodeProp.perNode`
- `NodePropConfig`
- `NodePropConfig.deserialize`
- `NodePropConfig.perNode`
- `NodePropSelectorMap`
- `NodePropSource`
- `NodeSet`
- `NodeSet.types`
- `NodeType`
- `NodeType.id`
- `NodeType.name`
- `NodeType.none`
- `NodeType.prop`
- `Notice.autoHide`
- `Notice.hidden`
- `Notice.hovered`
- `Notice.isHidden`
- `Notice.tryHide`
- `ObsidianLezerTypes`
- `ParseContext`
- `ParseContext.get`
- `ParseContext.skipUntilInView`
- `ParseContext.state`
- `ParseContext.viewport`
- `ParseContextRange`
- `ParseContextRange.from`
- `ParseContextRange.to`
- `Parser`
- `Parser.createParse`
- `Parser.parse`
- `PartialParse`
- `PartialParse.advance`
- `PartialParse.parsedPos`
- `PartialParse.stopAt`
- `PartialParse.stoppedAt`
- `PlatformEx.canUseSystemTrash`
- `Plugins.getPluginManifest`
- `Plugins.isInstalled`
- `Plugins.readManifest`
- `PublishFileDiff`
- `PublishFileDiff.checked`
- `PublishFileDiff.ctime`
- `PublishFileDiff.mtime`
- `PublishFileDiff.path`
- `PublishFileDiff.size`
- `PublishFileDiff.type`
- `PublishFileListSection`
- `PublishFileListSection.checkAll`
- `PublishFileListSection.childrenEl`
- `PublishFileListSection.clear`
- `PublishFileListSection.collapsed`
- `PublishFileListSection.files`
- `PublishFileListSection.headerEl`
- `PublishFileListSection.publish`
- `PublishFileListSection.sectionEl`
- `PublishFileListSection.uncheckAll`
- `PublishFileTreeItem`
- `PublishFileTreeItem.checkboxEl`
- `PublishFileTreeItem.diff`
- `PublishFileTreeItem.name`
- `PublishFileTreeItem.path`
- `PublishFileTreeItem.section`
- `PublishFileTreeItem.setChecked`
- `PublishModal`
- `PublishModal.openReviewChanges`
- `PublishModal.plugin`
- `PublishModal.reviewChangesSection`
- `PublishPluginInstance.getCurrentSlug`
- `PublishPluginInstance.modal`
- `PublishPluginInstance.openModal`
- `PublishPluginInstance.siteId`
- `PublishReviewChangesSection`
- `PublishReviewChangesSection.app`
- `PublishReviewChangesSection.el`
- `PublishReviewChangesSection.hide`
- `PublishReviewChangesSection.parentModal`
- `PublishReviewChangesSection.pathToDiffMap`
- `PublishReviewChangesSection.sectionChanged`
- `PublishReviewChangesSection.sectionNew`
- `PublishReviewChangesSection.sectionUnchanged`
- `PublishReviewChangesSection.show`
- `QuickSwitcherModal`
- `QuickSwitcherModal.constructor2__`
- `QuickSwitcherModal.onChooseSuggestion`
- `RenderTask.onError`
- `ResultDom.changedDuringSearch`
- `ResultDom.getQueueSortFunction`
- `ResultDom.getRelevance`
- `ResultDom.relevance`
- `ResultDomItem.getScore`
- `ResultDomItem.score`
- `ResultDomItem.scoreQuery`
- `SearchQuery`
- `SearchQuery.caseSensitive`
- `SearchQuery.constructor`
- `SearchQuery.eq`
- `SearchQuery.getCursor`
- `SearchQuery.literal`
- `SearchQuery.regexp`
- `SearchQuery.replace`
- `SearchQuery.search`
- `SearchQuery.valid`
- `SearchQuery.wholeWord`
- `SearchQueryConfig`
- `SearchQueryConfig.caseSensitive`
- `SearchQueryConfig.literal`
- `SearchQueryConfig.regexp`
- `SearchQueryConfig.replace`
- `SearchQueryConfig.search`
- `SearchQueryConfig.wholeWord`
- `SearchQueryMatch`
- `SearchQueryMatch.from`
- `SearchQueryMatch.to`
- `SearchQueueComponent.setMatched`
- `SearchQueueComponent.unmatchedFiles`
- `SearchQueueStartOptions.narrows`
- `SearchRelevance`
- `SearchRelevance.app`
- `SearchRelevance.caseSensitive`
- `SearchRelevance.matcher`
- `SearchRelevance.matchesTitle`
- `SearchRelevance.score`
- `SwitcherPluginOptions`
- `SwitcherPluginOptions.showAllFileTypes`
- `SwitcherPluginOptions.showAttachments`
- `SwitcherPluginOptions.showExistingOnly`
- `SyncFileTreeItem`
- `SyncFileTreeItem.sFile`
- `SyncFileTreeItem.view`
- `SyncFilter`
- `SyncFilter._allowSyncFile`
- `SyncFilter.allowSpecialFiles`
- `SyncFilter.allowSyncFile`
- `SyncFilter.allowTypes`
- `SyncFilter.changeFilter`
- `SyncFilter.clear`
- `SyncFilter.clearCache`
- `SyncFilter.configDir`
- `SyncFilter.filterCache`
- `SyncFilter.findUnreadable`
- `SyncFilter.ignoreFolders`
- `SyncFilter.isPluginFile`
- `SyncFilter.set`
- `SyncFilterFile`
- `SyncFilterFile.folder`
- `SyncFilterFile.path`
- `SyncLocalFile`
- `SyncLocalFile.ctime`
- `SyncLocalFile.folder`
- `SyncLocalFile.hash`
- `SyncLocalFile.mtime`
- `SyncLocalFile.path`
- `SyncLocalFile.previouspath`
- `SyncLocalFile.size`
- `SyncLocalFile.synchash`
- `SyncLocalFile.synctime`
- `SyncPluginInstance.boundOnFileAdd`
- `SyncPluginInstance.boundOnFileRemove`
- `SyncPluginInstance.boundOnFileRename`
- `SyncPluginInstance.changeFilter`
- `SyncPluginInstance.filter`
- `SyncPluginInstance.getRemoteVaultId`
- `SyncPluginInstance.getRemoteVaultName`
- `SyncPluginInstance.getStatus`
- `SyncPluginInstance.localFiles`
- `SyncPluginInstance.onFileAdd`
- `SyncPluginInstance.onFileRemove`
- `SyncPluginInstance.onFileRename`
- `SyncPluginInstance.scanFiles`
- `SyncPluginInstance.serverFiles`
- `SyncPluginInstance.setAllowSpecialFile`
- `SyncPluginInstance.setIgnoreFolders`
- `SyncPluginInstance.setRemoteVaultName`
- `SyncPluginInstance.setSyncType`
- `SyncPluginInstance.skippedFiles`
- ...and 59 more

**Removed (65):**

- `BasesController`
- `BasesController.addResult`
- `BasesController.app`
- `BasesController.buildBasesContext`
- `BasesController.clear`
- `BasesController.clearError`
- `BasesController.ctx`
- `BasesController.currentFile`
- `BasesController.displayError`
- `BasesController.error`
- `BasesController.errorEl`
- `BasesController.errors`
- `BasesController.evaluateRelevantProperties`
- `BasesController.events`
- `BasesController.filterMenu`
- `BasesController.getActiveBasesViewOfType`
- `BasesController.getCurrentFile`
- `BasesController.getEditorLanguageSupport`
- `BasesController.getMockValue`
- `BasesController.getMockValueForIdent`
- `BasesController.getProperties`
- `BasesController.getQueryViewNames`
- `BasesController.getViewConfig`
- `BasesController.getWidgetForProperty`
- `BasesController.initialScan`
- `BasesController.mockContext`
- `BasesController.newItemMenu`
- `BasesController.notifyView`
- `BasesController.onConfigChanged`
- `BasesController.onResize`
- `BasesController.plugin`
- `BasesController.promptForAddView`
- `BasesController.propertyMenu`
- `BasesController.query`
- `BasesController.queryState`
- `BasesController.queue`
- `BasesController.relevantProperties`
- `BasesController.removeResult`
- `BasesController.requestNotifyView`
- `BasesController.results`
- `BasesController.resultsMenu`
- `BasesController.runQuery`
- `BasesController.selectView`
- `BasesController.setQuery`
- `BasesController.setQueryAndView`
- `BasesController.sortMenu`
- `BasesController.startLoader`
- `BasesController.stopLoader`
- `BasesController.update`
- `BasesController.updateCurrentFile`
- `BasesController.view`
- `BasesController.viewContainerEl`
- `BasesController.viewEstates`
- `BasesController.viewHeaderEl`
- `BasesController.viewMenu`
- `BasesController.viewName`
- `CanvasIndex.frame`
- `FileExplorerPlugin.revealInFolder`
- `GraphRenderer.renderTimer`
- `InfinityScroll.queued`
- `InfinityScroll.renderBlockSize`
- `PDFPageProxy.height`
- `PDFPageProxy.width`
- `RecentFileTracker.onFileCreated`
- `View.closeable`

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
