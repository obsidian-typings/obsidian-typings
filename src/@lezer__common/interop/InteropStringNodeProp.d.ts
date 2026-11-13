import type { NodeProp } from '../internals/NodeProp.d.ts';
import type { LezerInterop } from './LezerInterop.d.ts';

/**
 * The selected Lezer `NodeProp<string>` contract at Obsidian's token and line class props.
 *
 * @public
 * @unofficial
 */
export type InteropStringNodeProp = LezerInterop<'StringNodeProp', NodeProp<string>>;
