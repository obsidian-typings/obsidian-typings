import {
    Component
} from 'obsidian';
import type { ComponentConstructor } from '../../../internals/constructors/augmentations/ComponentConstructor.ts';

/**
 * Get the Component constructor.
 *
 * @returns The Component constructor.
 *
 * @public
 * @unofficial
 */
export function getComponentConstructor(): ComponentConstructor {
    return Component as ComponentConstructor;
}
