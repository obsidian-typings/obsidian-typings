import {
    Notice
} from 'obsidian';
import type { NoticeConstructor } from '../../../internals/constructors/augmentations/NoticeConstructor.d.ts';

/**
 * Get the Notice constructor.
 *
 * @returns The Notice constructor.
 *
 * @public
 * @unofficial
 */
export function getNoticeConstructor(): NoticeConstructor {
    return Notice as NoticeConstructor;
}
