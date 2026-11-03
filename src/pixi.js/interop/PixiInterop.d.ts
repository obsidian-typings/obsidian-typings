// eslint-disable-next-line import-x/no-empty-named-blocks, import-x/no-unassigned-import -- Load the ambient registry for direct source consumers without a runtime import.
import type {} from '../../globals/augmentations/ObsidianPixiTypes.d.ts';

/**
 * Selects a real upstream Pixi type when the integration is loaded, otherwise the standalone mirror.
 *
 * @public
 * @unofficial
 */
export type PixiInterop<Name extends string, Standalone> = Name extends keyof ObsidianPixiTypes ? ObsidianPixiTypes[Name] : Standalone;
