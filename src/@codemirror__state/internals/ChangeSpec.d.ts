import type { ChangeSet } from './ChangeSet.d.ts';
import type { CmText } from './CmText.d.ts';

/**
 * A specification for a document change.
 *
 * @public
 * @unofficial
 */
export type ChangeSpec = { from: number; to?: number; insert?: CmText | string } | ChangeSet | readonly ChangeSpec[];
