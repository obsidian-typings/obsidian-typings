import type { LezerTree } from '../internals/LezerTree.d.ts';
import type { LezerInterop } from './LezerInterop.d.ts';

/**
 * The selected Lezer `Tree` contract at Obsidian's language state boundary.
 *
 * @public
 * @unofficial
 */
export type InteropLezerTree = LezerInterop<'Tree', LezerTree>;
