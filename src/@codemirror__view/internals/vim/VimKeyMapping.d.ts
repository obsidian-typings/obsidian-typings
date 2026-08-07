import type { VimActionKeyMapping } from './VimActionKeyMapping.d.ts';
import type { VimExKeyMapping } from './VimExKeyMapping.d.ts';
import type { VimIdleKeyMapping } from './VimIdleKeyMapping.d.ts';
import type { VimKeyToExKeyMapping } from './VimKeyToExKeyMapping.d.ts';
import type { VimKeyToKeyKeyMapping } from './VimKeyToKeyKeyMapping.d.ts';
import type { VimMotionKeyMapping } from './VimMotionKeyMapping.d.ts';
import type { VimOperatorKeyMapping } from './VimOperatorKeyMapping.d.ts';
import type { VimOperatorMotionKeyMapping } from './VimOperatorMotionKeyMapping.d.ts';
import type { VimSearchKeyMapping } from './VimSearchKeyMapping.d.ts';

/**
 * An entry in the Vim key map, discriminated by its `type`.
 *
 * @public
 * @unofficial
 */
export type VimKeyMapping =
  | VimActionKeyMapping
  | VimExKeyMapping
  | VimIdleKeyMapping
  | VimKeyToExKeyMapping
  | VimKeyToKeyKeyMapping
  | VimMotionKeyMapping
  | VimOperatorKeyMapping
  | VimOperatorMotionKeyMapping
  | VimSearchKeyMapping;
