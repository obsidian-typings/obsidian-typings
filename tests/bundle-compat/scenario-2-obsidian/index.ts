/**
 * Scenario 2: With obsidian — obsidian + obsidian-typings installed.
 * obsidian's peerDependencies (@codemirror/*) are NOT installed.
 * Verifies obsidian augmentations compile without type conflicts.
 */

import 'obsidian-typings';
import type {
  Editor,
  Plugin,
  Workspace
} from 'obsidian';

// Augmented obsidian types are accessible
declare const editor: Editor;
void editor.cm;
void editor.containerEl;
void editor.activeCM;

// Obsidian-typings augmentations on official types
declare const plugin: Plugin;
void plugin;

declare const workspace: Workspace;
void workspace;
