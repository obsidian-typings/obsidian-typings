import {
    ImageValue
} from 'obsidian';
import type { ImageValueConstructor } from '../../../internals/Constructors/augmentations/ImageValueConstructor.ts';

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
