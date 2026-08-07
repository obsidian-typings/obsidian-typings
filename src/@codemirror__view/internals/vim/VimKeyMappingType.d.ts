import type { VimKeyMapping } from './VimKeyMapping.d.ts';

/**
 * The discriminator naming which kind of command a {@link VimKeyMapping} binds to.
 *
 * @public
 * @unofficial
 */
export type VimKeyMappingType = VimKeyMapping['type'];
