import {
    Notice
} from 'obsidian';
import type { NoticeConstructor } from '../../../internals/Constructors/augmentations/NoticeConstructor.ts';

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
