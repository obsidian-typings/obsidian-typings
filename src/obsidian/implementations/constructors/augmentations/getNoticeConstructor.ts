import {
  Notice
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type NoticeConstructor = ExtractConstructor<Notice>;

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
