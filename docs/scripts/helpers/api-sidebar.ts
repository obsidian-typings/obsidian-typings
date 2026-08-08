import {
  existsSync,
  readFileSync
} from 'node:fs';
import { dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

import type { SidebarTreeNode } from '../../src/sidebar-config.ts';

const HELPERS_DIR = dirname(fileURLToPath(import.meta.url));
const SIDEBAR_JSON_PATH = `${dirname(dirname(HELPERS_DIR))}/src/generated-sidebar.json`;

/**
 * Reads the API portion of the sidebar produced by `generate-api-docs.ts`.
 *
 * NODE CONTEXTS ONLY — the Astro config, which is loaded from its real path on disk. Do NOT call
 * this from a component or page: those are bundled into the SSR output, where `import.meta.url` no
 * longer points at the source tree, so the path below silently resolves to nothing. That is exactly
 * how the deployed sidebar once shipped with no API reference at all. Page code should let Vite
 * resolve the JSON at build time instead (see `src/pages/sidebar.astro`).
 *
 * Returns an empty array when the file is missing — at config-load time the generator legitimately
 * may not have run yet, and that must not fail the build.
 */
export function getApiSidebar(): SidebarTreeNode[] {
  if (!existsSync(SIDEBAR_JSON_PATH)) {
    console.warn(`[api-sidebar] not found at ${SIDEBAR_JSON_PATH}. Run generate-api-docs first.`);
    return [];
  }

  return JSON.parse(readFileSync(SIDEBAR_JSON_PATH, 'utf-8')) as SidebarTreeNode[];
}
