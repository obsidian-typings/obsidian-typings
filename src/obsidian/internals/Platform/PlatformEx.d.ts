import type { PlatformType } from './PlatformType.d.ts';

/**
 * @public
 * @unofficial
 *
 * Due to limitations of TypeScript, we cannot extend the Platform constant directly.
 * @example
 *
 * ```ts
 * import { Platform } from 'obsidian';
 * import type { PlatformEx } from 'obsidian-typings';
 * const platformEx = Platform as PlatformEx;
 * console.log(platformEx.canDisplayRibbon);
 * ```
 */
export interface PlatformEx extends PlatformType {
    /** @todo Documentation incomplete. */
    canDisplayRibbon: boolean;

    /** @todo Documentation incomplete. */
    canExportPdf: boolean;

    /** @todo Documentation incomplete. */
    canPopoutWindow: boolean;

    /** @todo Documentation incomplete. */
    canSplit: boolean;

    /** @todo Documentation incomplete. */
    canStackTabs: boolean;

    /** @todo Documentation incomplete. */
    mobileDeviceHeight: number;

    /** @todo Documentation incomplete. */
    mobileKeyboardHeight: number;

    /** @todo Documentation incomplete. */
    mobileSoftKeyboardVisible: boolean;
}
