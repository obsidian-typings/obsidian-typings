# CHANGELOG

## 1.6.0

**Models:** Obsidian `1.14.5` (`public` channel). Internal members can differ in other app versions, so guard the ones you use when your `minAppVersion` is older.

**Branch:** [`release/obsidian-public/1.14.5`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.5)

**Commits:** [`obsidian-public-1.14.5-v1.5.0...obsidian-public-1.14.5-v1.6.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.5-v1.5.0...obsidian-public-1.14.5-v1.6.0)

### Breaking changes

- fix!: use upstream Lezer and CodeMirror type identities ([`2e74af7`](https://github.com/obsidian-typings/obsidian-typings/commit/2e74af742925a3dfcebdbb5336b15dedc927ec1e))
- feat(bases): type the formula functions that Plugin.registerGlobalFunc and registerInstanceFunc take ([`5b33471`](https://github.com/obsidian-typings/obsidian-typings/commit/5b334719f42d05c9cfeb3d2f45d93fb8ac28c2c0))

### Other changes

- docs: explain file-open, getMode in Live Preview, isMobile vs isMobileApp and Vault.rename ([`2a1f26c`](https://github.com/obsidian-typings/obsidian-typings/commit/2a1f26c87f4f3e66f97e3b74ad02c1101293f20d))

### Declared API changes

Names only, compared with `obsidian-public-1.14.5-v1.5.0`.

**Added (14):**

- `FormulaFunction`
- `FormulaFunction.apply`
- `FormulaFunction.applyWithContext`
- `FormulaFunction.ctx`
- `FormulaFunction.docString`
- `FormulaFunction.name`
- `FormulaFunction.params`
- `FormulaFunction.serialize`
- `FormulaFunctionParam`
- `FormulaFunctionParam.customWidget`
- `FormulaFunctionParam.name`
- `FormulaFunctionParam.optional`
- `FormulaFunctionParam.type`
- `FormulaFunctionParam.variadic`

**Removed (138):**

- `CmText`
- `CmText.empty`
- `CmText.length`
- `CmText.line`
- `CmText.lineAt`
- `CmText.lines`
- `CmText.of`
- `CmText.sliceString`
- `CmText.toString`
- `Input`
- `Input.chunk`
- `Input.length`
- `Input.lineChunks`
- `Input.read`
- `IterMode`
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
- `SyntaxNode`
- `SyntaxNode.cursor`
- `SyntaxNode.firstChild`
- `SyntaxNode.from`
- `SyntaxNode.lastChild`
- `SyntaxNode.name`
- `SyntaxNode.nextSibling`
- `SyntaxNode.parent`
- `SyntaxNode.prevSibling`
- `SyntaxNode.resolve`
- `SyntaxNode.to`
- `SyntaxNode.tree`
- `SyntaxNode.type`
- `SyntaxNodeRef`
- `SyntaxNodeRef.from`
- `SyntaxNodeRef.name`
- `SyntaxNodeRef.node`
- `SyntaxNodeRef.to`
- `SyntaxNodeRef.tree`
- `SyntaxNodeRef.type`

## 1.5.0

**Branch:** [`release/obsidian-public/1.14.5`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.5)

**Commits:** [`obsidian-public-1.14.5-v1.4.0...obsidian-public-1.14.5-v1.5.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.5-v1.4.0...obsidian-public-1.14.5-v1.5.0)

- fix(editor-suggest): type the trigger file as nullable ([`1838ab8`](https://github.com/obsidian-typings/obsidian-typings/commit/1838ab851d5dd3a5b28a199918ee1fcf248252fb))

## 1.4.0

**Branch:** [`release/obsidian-public/1.14.5`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.5)

**Commits:** [`obsidian-public-1.14.5-v1.3.0...obsidian-public-1.14.5-v1.4.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.5-v1.3.0...obsidian-public-1.14.5-v1.4.0)

### Breaking changes

- fix(bases): type BasesView group methods on BasesEntryGroup ([`68a0b24`](https://github.com/obsidian-typings/obsidian-typings/commit/68a0b246a8cbc4d548d2f86b666413b9c20e4c5f))

## 1.3.0

**Branch:** [`release/obsidian-public/1.14.5`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.5)

**Commits:** [`obsidian-public-1.14.5-v1.2.0...obsidian-public-1.14.5-v1.3.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.5-v1.2.0...obsidian-public-1.14.5-v1.3.0)

### Breaking changes

- feat: declare the markdown editor view constructors ([`7d72443`](https://github.com/obsidian-typings/obsidian-typings/commit/7d7244369063f3c8b45ae5c27e0f714c2c449b8e))
- fix: type Vault.appendBinary as taking a TFile, as Obsidian does ([`fe9ea3d`](https://github.com/obsidian-typings/obsidian-typings/commit/fe9ea3d3daac58ca6eb4c9a42a79dfe77df3f3f3))

### Other changes

- build(deps): override re2js to ^2.9.1 for GHSA-gg6h-894w-4m9c ([`85aaf0d`](https://github.com/obsidian-typings/obsidian-typings/commit/85aaf0d2bb110b2ef6449a412c8dc7ad8cf764e7))

## 1.2.0

**Branch:** [`release/obsidian-public/1.14.5`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.5)

**Commits:** [`obsidian-public-1.14.5-v1.1.0...obsidian-public-1.14.5-v1.2.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.5-v1.1.0...obsidian-public-1.14.5-v1.2.0)

### Breaking changes

- fix(editable-file-view): type saveTitle as resolving a boolean ([`ee1582c`](https://github.com/obsidian-typings/obsidian-typings/commit/ee1582c8abe733d8d3170ce3e187aa5f82799841))
- fix(types)!: remove Modal.shouldAnimate, renamed to shouldAnimateOpen in 1.14.0 ([`886fb24`](https://github.com/obsidian-typings/obsidian-typings/commit/886fb24d2df5aac035e3bdb735397fbe949da94c))
- fix: type the hotkey conflict map and correct the canvas edge multimaps ([`fa4ba8c`](https://github.com/obsidian-typings/obsidian-typings/commit/fa4ba8ccdd6b065392782fd79b2a14d0d5ba39e6))

### Other changes

- fix(spellcheck): accept multimaps, so the release changelog commits ([`18a07ad`](https://github.com/obsidian-typings/obsidian-typings/commit/18a07add18604f1af6a47ff11975ce311bded526))

## 1.1.0

**Branch:** [`release/obsidian-public/1.14.5`](https://github.com/obsidian-typings/obsidian-typings/tree/release/obsidian-public/1.14.5)

**Commits:** [`obsidian-public-1.14.4-v1.15.0...obsidian-public-1.14.5-v1.1.0`](https://github.com/obsidian-typings/obsidian-typings/compare/obsidian-public-1.14.4-v1.15.0...obsidian-public-1.14.5-v1.1.0) -- the first release from this branch, so the range opens at `obsidian-public-1.14.4-v1.15.0`, the nearest earlier release it was cut from

### Breaking changes

- fix(types): reconcile the extra 1.14.4 crawler findings ([`95e9b77`](https://github.com/obsidian-typings/obsidian-typings/commit/95e9b776bb4b7b50c884fc47772208672a17b28a))
- fix(types): reconcile Obsidian 1.14.4 modal, file, workspace and adapter APIs ([`4248cd4`](https://github.com/obsidian-typings/obsidian-typings/commit/4248cd4cf61779b654dc5f72150d105a7606d51f))

### Other changes

- chore: generate README.md from template ([`e2f90a6`](https://github.com/obsidian-typings/obsidian-typings/commit/e2f90a6792d12c7b49dfa893b7709d8da590082d))
- docs: describe CustomArrayDict as a dictionary of unique-value arrays ([`9bd1c77`](https://github.com/obsidian-typings/obsidian-typings/commit/9bd1c773d7312bc3a7cc28606548e8439d23be99))
- feat(types): type native open-url dispatch and the mobile Filesystem.choose plugin ([`b466c36`](https://github.com/obsidian-typings/obsidian-typings/commit/b466c36ac35854fcf7dd653059b4248d60389226))
- feat(bases): type group folding, manual order and link resolution cache ([`e8be46a`](https://github.com/obsidian-typings/obsidian-typings/commit/e8be46abed74ba4c42afadfa76d0fd6762110239))
- fix(types): reconcile Obsidian 1.14.4 sidebar view APIs ([`79a00e0`](https://github.com/obsidian-typings/obsidian-typings/commit/79a00e00fec196b7112dcaf3b5baf5e254144e02))
- fix(deps): clear maintained tooling audit advisories ([`eaacec4`](https://github.com/obsidian-typings/obsidian-typings/commit/eaacec4ab034890d90b04cb838d1cba2012e13a0))
