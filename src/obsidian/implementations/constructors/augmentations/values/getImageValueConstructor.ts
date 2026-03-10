import {
  ImageValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

type ImageValueConstructor = ExtractConstructor<ImageValue>;

/**
 * Get the ImageValue constructor.
 *
 * @returns The ImageValue constructor.
 *
 * @public
 * @unofficial
 */
export function getImageValueConstructor(): ImageValueConstructor {
  return ImageValue as ImageValueConstructor;
}
