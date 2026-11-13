// eslint-disable-next-line import-x/no-empty-named-blocks, import-x/no-unassigned-import -- Load the ambient registry for direct source consumers without a runtime import.
import type {} from '../../globals/augmentations/ObsidianLezerTypes.d.ts';

/**
 * Selects installed `@lezer/common`, `@codemirror/language` and `@codemirror/search` declarations only when the explicit integration is loaded.
 *
 * @public
 * @unofficial
 */
export type LezerInterop<Name extends string, Standalone> = Name extends keyof ObsidianLezerTypes ? ObsidianLezerTypes[Name] : Standalone;
