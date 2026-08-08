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
 * Shared by the Starlight config and the standalone sidebar document so both render the same tree.
 * Returns an empty array when the file is missing — the generator has simply not run yet, which is
 * the normal state of a fresh checkout and must not fail the build.
 */
export function getApiSidebar(): SidebarTreeNode[] {
  if (!existsSync(SIDEBAR_JSON_PATH)) {
    console.warn('[api-sidebar] generated-sidebar.json not found. Run generate-api-docs first.');
    return [];
  }

  return JSON.parse(readFileSync(SIDEBAR_JSON_PATH, 'utf-8')) as SidebarTreeNode[];
}
