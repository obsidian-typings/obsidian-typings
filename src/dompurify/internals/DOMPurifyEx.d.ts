import type { DOMPurifyI } from './DOMPurifyI.d.ts';

/**
 * DOMPurify library type, callable to create a new instance scoped to a window.
 *
 * @public
 * @unofficial
 */
export type DOMPurifyEx = {
  (window?: Window): DOMPurifyI;
} & DOMPurifyI;
