import type {
  App,
  BasesEntry
} from 'obsidian';

import {
  Component,
  TFile
} from 'obsidian';

import { getBasesControllerFromRender } from './getBasesControllerFromRender.ts';

/**
 * Evaluate a `.base` file in headless mode — with no leaf or open view — and return its entries.
 *
 * The file is read with {@link obsidian#Vault.cachedRead}, and its own path supplies the query's file context.
 *
 * @example
 * ```ts
 * const entries = await evaluateBaseHeadless(app, 'Projects/Tasks.base');
 * ```
 *
 * @param app - The app instance.
 * @param base - The `.base` file, or its vault path.
 * @returns The evaluated base entries.
 * @throws If no file exists at the given path, or the file is not a `.base` file.
 *
 * @public
 * @unofficial
 */
export async function evaluateBaseHeadless(app: App, base: string | TFile): Promise<BasesEntry[]>;
/**
 * Evaluate `.base` content in headless mode — with no leaf or open view — and return its entries.
 *
 * Use this form for content that is not a `.base` file of its own, such as the body of a `base` code block in a
 * note.
 *
 * @example
 * ```ts
 * const entries = await evaluateBaseHeadless(app, 'filters:\n  and:\n    - file.hasTag("task")\n', 'Notes/Today.md');
 * ```
 *
 * @param app - The app instance.
 * @param content - The `.base` file content (the body of a `base` code block).
 * @param sourcePath - The path supplying the query's file context.
 * @returns The evaluated base entries.
 *
 * @public
 * @unofficial
 */
export async function evaluateBaseHeadless(app: App, content: string, sourcePath: string): Promise<BasesEntry[]>;
/**
 * Evaluate a base in headless mode — with no leaf or open view — and return its entries.
 *
 * It renders the base off-screen via {@link getBasesControllerFromRender}, waits for the initial vault scan
 * to settle, then reads the controller's results. Everything is torn down before returning.
 *
 * @param app - The app instance.
 * @param baseOrContent - The `.base` file or its vault path, or the `.base` content when `sourcePath` is given.
 * @param sourcePath - The path supplying the query's file context, given only with `.base` content.
 * @returns The evaluated base entries.
 *
 * @public
 * @unofficial
 */
export async function evaluateBaseHeadless(app: App, baseOrContent: string | TFile, sourcePath?: string): Promise<BasesEntry[]> {
  const SCAN_POLL_INTERVAL_IN_MILLISECONDS = 50;
  const SCAN_TIMEOUT_IN_MILLISECONDS = 30000;

  let content: string;
  let querySourcePath: string;

  if (sourcePath === undefined) {
    const file = typeof baseOrContent === 'string' ? app.vault.getAbstractFileByPath(baseOrContent) : baseOrContent;
    if (!(file instanceof TFile)) {
      throw new Error(`No .base file exists at '${String(baseOrContent)}'.`);
    }
    if (file.extension !== 'base') {
      throw new Error(`'${file.path}' is not a .base file.`);
    }
    content = await app.vault.cachedRead(file);
    querySourcePath = file.path;
  } else {
    if (typeof baseOrContent !== 'string') {
      throw new Error('Pass the .base file on its own, without a source path.');
    }
    content = baseOrContent;
    querySourcePath = sourcePath;
  }

  const component = new Component();
  try {
    const controller = await getBasesControllerFromRender(app, content, querySourcePath, component);

    const startTime = performance.now();
    while (controller.initialScan) {
      if (performance.now() - startTime > SCAN_TIMEOUT_IN_MILLISECONDS) {
        throw new Error('Timed out waiting for the base initial scan to settle.');
      }
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, SCAN_POLL_INTERVAL_IN_MILLISECONDS);
      });
    }

    return Array.from(controller.results.values());
  } finally {
    component.unload();
  }
}
