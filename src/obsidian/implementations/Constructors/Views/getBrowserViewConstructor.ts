import type {
    App
} from 'obsidian';
import type { BrowserViewConstructor } from '../../../internals/Constructors/Views/BrowserViewConstructor.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the BrowserView constructor.
 *
 * @returns The BrowserView constructor.
 * @public
 */
export function getBrowserViewConstructor(app: App): BrowserViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Browser) as BrowserViewConstructor;
}
