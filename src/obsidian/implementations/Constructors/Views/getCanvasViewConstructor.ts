import type {
    App
} from 'obsidian';
import type { CanvasViewConstructor } from '../../../internals/Constructors/Views/CanvasViewConstructor.d.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the CanvasView constructor.
 *
 * @returns The CanvasView constructor.
 * @public
 */
export function getCanvasViewConstructor(app: App): CanvasViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Canvas) as CanvasViewConstructor;
}
