// eslint-disable-next-line import-x/no-empty-named-blocks, import-x/no-unassigned-import -- Load the ambient registry for direct source consumers without a runtime import.
import type {} from '../../globals/augmentations/ObsidianPdfJsTypes.d.ts';

/**
 * Selects installed PDF.js declarations only when the explicit integration is loaded.
 *
 * @public
 * @unofficial
 */
export type PdfJsInterop<Name extends string, Standalone> = Name extends keyof ObsidianPdfJsTypes ? ObsidianPdfJsTypes[Name] : Standalone;
