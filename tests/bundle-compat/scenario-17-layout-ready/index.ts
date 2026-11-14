/**
 * Scenario 17: members that are `null` before the workspace layout loads.
 *
 * A plugin's `onload` on a cold start runs before the layout exists, so `Workspace.activeTabGroup` and
 * `Workspace.floatingSplit` are declared `| null`. The ready phase narrows them back through
 * `LayoutReadyWorkspace`, which the `isLayoutReady` guard and the `onLayoutReadyEx` helper hand out.
 * `MetadataCache.db` and `transactionSave` stay nullable in every phase: they are unset for the whole
 * session when the cache database fails to open.
 *
 * Each `@ts-expect-error` asserts that an unguarded read is nullable; each plain assignment asserts that a
 * guarded read needs no `!`.
 */

import type {
  MetadataCache,
  Workspace,
  WorkspaceFloating,
  WorkspaceTabs
} from 'obsidian';
import type { LayoutReadyWorkspace } from 'obsidian-typings';

import 'obsidian-typings';
import {
  isLayoutReady,
  onLayoutReadyEx
} from 'obsidian-typings/implementations';

declare const workspace: Workspace;
declare const metadataCache: MetadataCache;

// === Unguarded: nullable ===
// @ts-expect-error -- `null` before the layout loads.
const _unguardedTabs: WorkspaceTabs = workspace.activeTabGroup;
// @ts-expect-error -- `null` before the layout loads.
const _unguardedFloating: WorkspaceFloating = workspace.floatingSplit;
const _nullableTabs: null | WorkspaceTabs = workspace.activeTabGroup;
const _nullableFloating: null | WorkspaceFloating = workspace.floatingSplit;
void _unguardedTabs;
void _unguardedFloating;
void _nullableTabs;
void _nullableFloating;

// === After the guard: non-null, no `!` ===
if (isLayoutReady(workspace)) {
  const tabs: WorkspaceTabs = workspace.activeTabGroup;
  const floating: WorkspaceFloating = workspace.floatingSplit;
  const ready: true = workspace.layoutReady;
  void tabs;
  void floating;
  void ready;
}

// === In the helper's callback: non-null, no `!` ===
onLayoutReadyEx(workspace, (readyWorkspace) => {
  const view: LayoutReadyWorkspace = readyWorkspace;
  const tabs: WorkspaceTabs = readyWorkspace.activeTabGroup;
  const floating: WorkspaceFloating = readyWorkspace.floatingSplit;
  void view;
  void tabs;
  void floating;
});

// === A plain `onLayoutReady` callback gets no argument, but the guard narrows there too ===
workspace.onLayoutReady(() => {
  if (!isLayoutReady(workspace)) {
    return;
  }
  const floating: WorkspaceFloating = workspace.floatingSplit;
  void floating;
});

// === The metadata cache database: nullable in every phase ===
// @ts-expect-error -- `null` until the database opens, and for the session if it fails to open.
const _unguardedDb: IDBDatabase = metadataCache.db;
const _nullableDb: IDBDatabase | null = metadataCache.db;
void _unguardedDb;
void _nullableDb;

// @ts-expect-error -- unset until the database opens, so it cannot be called unchecked.
void metadataCache.transactionSave('metadata', 'hash', null);
void metadataCache.transactionSave?.('metadata', 'hash', null);
void metadataCache.transactionSave?.('file', 'note.md', null);
