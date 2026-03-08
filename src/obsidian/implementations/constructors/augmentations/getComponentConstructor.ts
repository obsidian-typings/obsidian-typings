import {
    Component
} from 'obsidian';
import type { ConstructorBase } from '../../../internals/constructors/ConstructorBase.d.ts';

type ComponentConstructor = ConstructorBase<[], Component>;

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
