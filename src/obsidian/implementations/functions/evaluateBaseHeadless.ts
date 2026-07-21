import type {
  App,
  BasesEntry
} from 'obsidian';

import { Component } from 'obsidian';

import { getBasesControllerFromRender } from './getBasesControllerFromRender.ts';

/**
 * Evaluate a `.base` file in headless mode — with no leaf or open view — and return its entries.
 *
 * It renders the base off-screen via {@link getBasesControllerFromRender}, waits for the initial vault scan
 * to settle, then reads the controller's results. Everything is torn down before returning.
 *
 * @param app - The app instance.
 * @param content - The `.base` file content (the body of a `base` code block).
 * @param sourcePath - The path supplying the query's file context.
 * @returns The evaluated base entries.
 *
 * @public
 * @unofficial
 */
export async function evaluateBaseHeadless(app: App, content: string, sourcePath: string): Promise<BasesEntry[]> {
  const SCAN_POLL_INTERVAL_IN_MILLISECONDS = 50;
  const SCAN_TIMEOUT_IN_MILLISECONDS = 30000;

  const component = new Component();
  try {
    const controller = await getBasesControllerFromRender(app, content, sourcePath, component);

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
