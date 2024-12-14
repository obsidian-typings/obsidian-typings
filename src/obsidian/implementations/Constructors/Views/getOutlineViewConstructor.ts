import type {
    App
} from 'obsidian';
import type { OutlineViewConstructor } from '../../../internals/Constructors/Views/OutlineViewConstructor.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the OutlineView constructor.
 *
 * @returns The OutlineView constructor.
 * @public
 */
export function getOutlineViewConstructor(app: App): OutlineViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Outline) as OutlineViewConstructor;
}
