import type { PlatformType } from './PlatformType.d.ts';

/**
 * @public @unofficial
 *
 * Due to limitations of TypeScript, we cannot extend the Platform constant directly.
 * @example
 * ```ts
 * import { Platform } from 'obsidian';
 * import type { PlatformEx } from 'obsidian-typings';
 * const platformEx = Platform as PlatformEx;
 * console.log(platformEx.canDisplayRibbon);
 * ```
 */
export interface PlatformEx extends PlatformType {
    canDisplayRibbon: boolean;
    canExportPdf: boolean;
    canPopoutWindow: boolean;
    canSplit: boolean;
    canStackTabs: boolean;
    mobileDeviceHeight: number;
    mobileKeyboardHeight: number;
    mobileSoftKeyboardVisible: boolean;
}
