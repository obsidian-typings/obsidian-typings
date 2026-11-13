import type { LezerInterop } from '../../@lezer__common/interop/LezerInterop.d.ts';
import type { ParseContext } from '../internals/ParseContext.d.ts';

/**
 * The selected CodeMirror `ParseContext` contract at Obsidian's language state boundary.
 *
 * @public
 * @unofficial
 */
export type InteropParseContext = LezerInterop<'ParseContext', ParseContext>;
