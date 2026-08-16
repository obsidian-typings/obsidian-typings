/**
 * Scenario 1: Standalone — only obsidian-typings installed.
 * Verifies the package is self-contained and usable without any other dependencies.
 * Internal-only types are accessible as direct exports.
 * @codemirror types are available from their module paths via declare module blocks.
 *
 * This is the only scenario compiled with `types: []`, which is what makes "self-contained"
 * mean anything: `@types/node` is on disk here (a peer dependency of obsidian-typings), but an
 * empty `types` list keeps it out of the compiler's scope, so the bundle has to pull in what it
 * needs itself via its own `/// <reference types="node" />`. Scenarios 2-4 keep `types: ["node"]`
 * — they model consumers that do have the Node types in scope. Without this, the bundle shipped
 * for months using `Buffer` / `NodeJS.*` / `node:fs` while referencing nothing (T519).
 */

import 'obsidian-typings';
import type {
  EditorViewState,
  VimApi
} from 'obsidian-typings';

// Internal-only types are directly exported
declare const viewState: EditorViewState;
declare const vim: VimApi;

// Suppress unused
void viewState;
void vim;
