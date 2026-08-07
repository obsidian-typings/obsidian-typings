import type { VimActionArgs } from './VimActionArgs.d.ts';
import type { VimMotionArgs } from './VimMotionArgs.d.ts';
import type { VimOperatorArgs } from './VimOperatorArgs.d.ts';
import type { VimSearchArgs } from './VimSearchArgs.d.ts';

/**
 * The arguments a key mapping passes to the command it binds to, whichever kind of command that is.
 *
 * @public
 * @unofficial
 */
export type VimKeyMappingArgs = VimActionArgs | VimMotionArgs | VimOperatorArgs | VimSearchArgs;
